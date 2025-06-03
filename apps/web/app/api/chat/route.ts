import { UserService } from '@/services/server/user.service';
import { ApiErrorHandler } from '@/utils/error-handler';
import { ApiUtils } from '@/utils/api.utils';
import { MessageService } from '@/services/server/message.service';
import { ChatValidator } from '@/validators/chat.validator';
import { ChatService } from '@/services/server/chat.service';
import { StreamingService } from '@/services/server/streaming.service';

export async function POST(request: Request) {
  try {
    const user = await UserService.requireAuth();
    const { message } = ChatValidator.validateMessage(await request.json());

    // Process user message and create assistant placeholder
    const assistantMessage = await ChatService.processUserMessage(
      user.id,
      message,
    );

    // Set up streaming
    const { stream, writer } = StreamingService.createStream();
    const streamingService = new StreamingService(writer);

    ChatService.streamChatResponse(
      user.id,
      assistantMessage.id,
      streamingService,
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
    const user = await UserService.requireAuth();
    const messages = await MessageService.getUserMessages(user.id);

    return ApiUtils.createResponse({ messages });
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
}
