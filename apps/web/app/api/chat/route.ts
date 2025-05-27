import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@repo/database';
import sendMessageToClaude from '@/services/claude';

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { message } = await request.json();

    // Save the user's message
    await prisma.message.create({
      data: {
        content: message,
        userId: user.id,
        variant: 'user',
      },
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

    // Create a new TransformStream for streaming the response
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    // Start streaming Claude's response in the background
    (async () => {
      try {
        let fullResponse = '';
        for await (const chunk of sendMessageToClaude(message, user.id)) {
          fullResponse += chunk;
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
