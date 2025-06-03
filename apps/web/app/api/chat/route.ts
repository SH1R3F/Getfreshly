import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@repo/database';
import chatWithClaude from '@/services/claude';
import chatWithOpenAI from '@/services/openai';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages.mjs';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { executeToolCall } from '@/services/mcp-client';

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { message, provider = 'openai' } = await request.json();

    // Get the Facebook access token from the database
    const facebookAuth = await prisma.facebookAuth.findUnique({
      where: { userId: user.id },
      select: { accessToken: true },
    });

    // if (!facebookAuth) {
    //   return new Response(
    //     'Facebook authentication not found. Please connect your Facebook account.',
    //     { status: 400 },
    //   );
    // }

    // Save the user's message
    await prisma.message.create({
      data: {
        content: message,
        userId: user.id,
        variant: 'user',
      },
    });

    const messages = await prisma.message.findMany({
      where: {
        userId: user.id,
        content: { not: '' }, // Filter at DB level
      },
      orderBy: { createdAt: 'asc' },
      select: {
        variant: true,
        content: true,
      },
    });

    // Convert messages to the appropriate format based on the provider
    const chatHistory = messages.map((msg) => {
      if (provider === 'claude') {
        return {
          role: msg.variant,
          content: msg.content,
        } as MessageParam;
      }
      return {
        role: msg.variant === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      } as ChatCompletionMessageParam;
    });

    // Create a new message for the assistant's response
    const assistantMessage = await prisma.message.create({
      data: {
        content: '',
        userId: user.id,
        variant: 'assistant',
        isLoading: true,
      },
    });

    if (!facebookAuth) {
      return new Response(
        'Facebook authentication not found. Please connect your Facebook account.',
        { status: 400 },
      );
    }

    // Create a new TransformStream for streaming the response
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    // Start streaming the response in the background
    (async () => {
      try {
        let fullResponse = '';
        const chatService =
          provider === 'claude'
            ? () =>
                chatWithClaude(
                  facebookAuth.accessToken,
                  chatHistory as MessageParam[],
                )
            : () =>
                chatWithOpenAI(
                  facebookAuth.accessToken,
                  chatHistory as ChatCompletionMessageParam[],
                );

        // eslint-disable-next-line no-restricted-syntax
        for await (const chunk of chatService()) {
          fullResponse += chunk;
          // eslint-disable-next-line no-await-in-loop
          await writer.write(
            encoder.encode(
              `data: ${JSON.stringify({ chunk, messageId: assistantMessage.id })}\n\n`,
            ),
          );
        }

        // Update the assistant message with the complete response
        await prisma.message.update({
          where: { id: assistantMessage.id },
          data: {
            content: fullResponse,
            isLoading: false,
          },
        });

        await writer.write(encoder.encode('data: [DONE]\n\n'));
      } catch (error) {
        console.error('Error in streaming response:', error);
        await writer.write(
          encoder.encode(
            `data: ${JSON.stringify({ error: 'Error processing response' })}\n\n`,
          ),
        );
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Fetch messages for the current user
    const messages = await prisma.message.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return Response.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
