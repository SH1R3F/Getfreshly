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
    userId: string,
    messageId: string,
    streamingService: StreamingService,
  ): Promise<void> {
    try {
      const chatHistory = await MessageService.getUserChatHistory(userId);
      let fullResponse = '';

      for await (const chunk of chatWithOpenAI(
        'FACEBOOK_ACCESS_TOKEN',
        chatHistory,
      )) {
        fullResponse += chunk;
        await streamingService.writeChunk(chunk);
      }

      // Finalize the message in database
      await MessageService.finalizeAssistantMessage(messageId, fullResponse);
      await streamingService.writeDone();
    } catch (error) {
      console.error('Error in streaming response:', error);
      await streamingService.writeError('Error processing response');
    }
  }
}
