'use client';

import { ChatBubble } from '@repo/ui/components/chat-bubble';
import { useEffect, useState } from 'react';
import { ChatInput } from './ChatInput';
import { ScrollToBottom } from './scroll-to-bottom';

type Message = {
  id: string;
  content: string;
  variant: 'user' | 'assistant';
  isLoading?: boolean;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

interface CurrentUser {
  name?: string;
  image?: string;
}

interface FacebookAdAccount {
  id: string;
  accountId: string;
  name: string;
}

export default function ChatContainer({
  currentUser,
  adAccounts,
}: {
  currentUser: CurrentUser;
  adAccounts: FacebookAdAccount[];
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/chat');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch messages');
        }

        setMessages(data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleNewMessage = async (content: string) => {
    // Add the user message
    const tempUserMessage: Message = {
      id: `temp-${Date.now()}`,
      content,
      variant: 'user',
    };

    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      // Make API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      // Create a text decoder
      const decoder = new TextDecoder();

      // Read the stream
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { done, value } = await reader.read();
        if (done) break;

        // Decode the chunk and split into SSE messages
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        // eslint-disable-next-line no-restricted-syntax
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const { chunk: textChunk, messageId } = JSON.parse(data) as {
                chunk: string;
                messageId: string;
              };

              setMessages((prev) => {
                const messageIndex = prev.findIndex(
                  (msg) => msg.id === messageId,
                );
                if (messageIndex === -1) {
                  // Add new assistant message if it doesn't exist
                  const newMessage: Message = {
                    id: messageId,
                    content: textChunk,
                    variant: 'assistant',
                    isLoading: true,
                  };
                  return [...prev, newMessage];
                }

                // Update existing message
                const newMessages = [...prev];
                const existingMessage = newMessages[messageIndex];
                if (!existingMessage) return prev;

                newMessages[messageIndex] = {
                  ...existingMessage,
                  content: existingMessage.content + textChunk,
                };
                return newMessages;
              });
            } catch (e) {
              console.error('Error parsing SSE message:', e);
            }
          }
        }
      }

      // Update the final message state to not loading
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.variant === 'assistant') {
          const newMessages = [...prev];
          newMessages[prev.length - 1] = {
            ...lastMessage,
            isLoading: false,
          };
          return newMessages;
        }
        return prev;
      });
    } catch (error) {
      console.error('Error sending message:', error);
      // Update message to show error state
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (!lastMessage) return prev;

        return [
          ...prev.slice(0, -1),
          {
            ...lastMessage,
            content:
              lastMessage.variant === 'user'
                ? `${lastMessage.content} (Failed to send)`
                : 'Failed to get response',
            isLoading: false,
          },
        ];
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 pb-24 flex flex-col gap-4 max-h-full overflow-y-scroll">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            variant={message.variant}
            message={message.content}
            userName={message.variant === 'user' ? currentUser.name : undefined}
            userImage={
              message.variant === 'user' ? currentUser.image : undefined
            }
            isLoading={message.isLoading}
          />
        ))}
        <ScrollToBottom deps={[messages]} />
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t overflow-hidden rounded-b-lg bg-background">
        <ChatInput onSendMessage={handleNewMessage} adAccounts={adAccounts} />
      </div>
    </>
  );
}
