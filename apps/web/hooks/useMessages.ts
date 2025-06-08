import { useState } from 'react';
import { toast } from 'sonner';
import { Message } from '@/types/chat';
import { ChatService } from '@/services/chat.service';
import { MessageFactory } from '@/factories/message.factory';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const data = await ChatService.fetchMessages();
      setMessages(data.messages);
    } catch (error) {
      toast.error('Error fetching messages');
      console.error('Error fetching messages', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateOrCreateAssistantMessage = (
    messageId: string,
    textChunk: string,
  ) => {
    setMessages((prev) => {
      const messageIndex = prev.findIndex((msg) => msg.id === messageId);

      if (messageIndex === -1) {
        const newMessage = MessageFactory.createAssistantMessage(
          messageId,
          textChunk,
        );
        return [...prev, newMessage];
      }

      const updatedMessages = [...prev];
      const existingMessage = updatedMessages[messageIndex];
      if (!existingMessage) return prev;

      updatedMessages[messageIndex] = {
        ...existingMessage,
        content: existingMessage.content + textChunk,
      };
      return updatedMessages;
    });
  };

  const updateLastAssistantMessage = (textChunk: string) => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage?.role !== 'assistant') {
        // Create new assistant message if last message is not from assistant
        const newMessage = MessageFactory.createAssistantMessage(
          crypto.randomUUID(),
          textChunk,
        );
        return [...prev, newMessage];
      }

      // Update the last message
      const updatedMessages = [...prev];
      updatedMessages[prev.length - 1] = {
        ...lastMessage,
        content: lastMessage.content + textChunk,
      };
      return updatedMessages;
    });
  };

  const markLastAssistantMessageAsComplete = () => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage?.role === 'assistant' && lastMessage.isLoading) {
        const updatedMessages = [...prev];
        updatedMessages[prev.length - 1] = {
          ...lastMessage,
          isLoading: false,
        };
        return updatedMessages;
      }
      return prev;
    });
  };

  return {
    messages,
    isLoading,
    fetchMessages,
    addMessage,
    updateOrCreateAssistantMessage,
    updateLastAssistantMessage,
    markLastAssistantMessageAsComplete,
  };
}
