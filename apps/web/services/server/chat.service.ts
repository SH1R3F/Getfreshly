import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { chatWithOpenAI } from './AI/openai.service';
import { MessageService } from './message.service';
import { StreamingService } from './streaming.service';

export class ChatService {
  static async processUserMessage(userId: string, messageContent: string) {
    // Save user message
    await MessageService.createMessage({
      content: messageContent,
      userId,
      role: 'user',
    });

    // Create assistant message placeholder
    const assistantMessage = await MessageService.createMessage({
      content: '',
      userId,
      role: 'assistant',
      isLoading: true,
    });

    return assistantMessage;
  }

  static async streamChatResponse(
    streamingService: StreamingService,
    messages: ChatCompletionMessageParam[],
    userId: string,
  ): Promise<void> {
    try {
      let fullResponse = '';

      for await (const chunk of chatWithOpenAI(
        'FACEBOOK_ACCESS_TOKEN',
        messages,
      )) {
        fullResponse += chunk;
        await streamingService.writeChunk(chunk);
      }

      // Store messages in database
      const newMessages = [
        messages[messages.length - 1],
        { role: 'assistant', content: fullResponse },
      ] as ChatCompletionMessageParam[];

      await MessageService.storeMessages(userId, newMessages);
      await streamingService.writeDone();
    } catch (error) {
      console.error('Error in streaming response:', error);
      await streamingService.writeError('Error processing response');
    }
  }
}
