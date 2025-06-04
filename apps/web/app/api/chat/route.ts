import { UserService } from '@/services/server/user.service';
import { ApiErrorHandler } from '@/utils/error-handler';
import { ApiUtils } from '@/utils/api.utils';
import { MessageService } from '@/services/server/message.service';
import { ChatValidator } from '@/validators/chat.validator';
import { ChatService } from '@/services/server/chat.service';
import { StreamingService } from '@/services/server/streaming.service';
import { type ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export async function POST(request: Request) {
  try {
    const userId = await UserService.requireAuth();
    const { message } = ChatValidator.validateMessage(await request.json());
    const accessToken = await UserService.getFacebookAccessToken(userId);

    const chatHistory = await MessageService.getUserChatHistory(userId);
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

export async function GET() {
  try {
    const userId = await UserService.requireAuth();
    const messages = await MessageService.getUserMessages(userId);

    return ApiUtils.createResponse({ messages });
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
}
