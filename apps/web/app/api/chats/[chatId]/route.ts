import { UserService } from '@/services/user.service';
import { ApiErrorHandler } from '@/utils/error-handler';
import { ApiUtils } from '@/utils/api.utils';
import { MessageService } from '@/services/server/message.service';
import { ChatValidator } from '@/validators/chat.validator';
import { ChatService } from '@/services/server/chat.service';
import { StreamingService } from '@/services/server/streaming.service';
import { type ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { prisma } from '@repo/database';
import { NextRequest } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const resolvedParams = await params;
    const { chatId } = resolvedParams;
    const userId = await UserService.requireAuth();
    const { message, adAccountId, accessToken } = ChatValidator.validateMessage(
      await request.json(),
    );

    // Verify the chat exists and belongs to the user
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });

    if (!chat) {
      return ApiUtils.createErrorResponse('Chat not found', 404);
    }

    const chatHistory = await MessageService.getUserChatHistory(userId, chatId);
    const messages = [
      ...chatHistory,
      { role: 'user', content: message },
    ] as ChatCompletionMessageParam[];

    // Set up streaming
    const { stream, writer } = StreamingService.createStream();
    const streamingService = new StreamingService(writer);

    ChatService.streamChatResponse(
      streamingService,
      messages,
      userId,
      accessToken,
      adAccountId,
      chatId,
    ).finally(() => streamingService.close());

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
}

// Get all messages for a chat using chatId and userId from request
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const resolvedParams = await params;
    const { chatId } = resolvedParams;
    const userId = await UserService.requireAuth();
    const messages = await MessageService.getUserMessages(userId, chatId);

    return ApiUtils.createResponse({ messages });
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
}

// Delete a chat and all its messages
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const resolvedParams = await params;
    const { chatId } = resolvedParams;
    const userId = await UserService.requireAuth();

    // Verify the chat belongs to the user
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userId,
      },
    });

    if (!chat) {
      return ApiUtils.createErrorResponse('Chat not found', 404);
    }

    // Delete the chat (messages will be deleted automatically due to cascade)
    await prisma.chat.delete({
      where: {
        id: chatId,
      },
    });

    return ApiUtils.createResponse({ success: true });
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
}
