import { Message, MessageRole } from '@/types/chat';

export class MessageFactory {
  static createUserMessage(content: string): Message {
    return {
      id: `temp-${Date.now()}`,
      content,
      role: 'user' as MessageRole,
    };
  }

  static createAssistantMessage(
    id: string,
    content: string,
    isLoading = true,
  ): Message {
    return {
      id,
      content,
      role: 'assistant' as MessageRole,
      isLoading,
    };
  }
}
