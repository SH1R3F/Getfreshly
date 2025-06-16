import { Message, MessageRole } from '@/types/chat';

export class MessageFactory {
  static createUserMessage(content: string, chatId: string): Message {
    return {
      chatId: chatId,
      id: `temp-${Date.now()}`,
      content,
      role: 'user' as MessageRole,
    };
  }

  static createAssistantMessage(
    id: string,
    chatId: string,
    content: string,
    isLoading = true,
  ): Message {
    return {
      id,
      chatId: chatId,
      content,
      role: 'assistant' as MessageRole,
      isLoading,
    };
  }
}
