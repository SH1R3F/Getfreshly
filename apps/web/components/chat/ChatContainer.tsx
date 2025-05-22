'use client';

import { ChatBubble } from '@repo/ui/components/chat-bubble';
import { useState } from 'react';
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

const messageHistory: Message[] = [];

export default function ChatContainer({
  currentUser,
}: {
  currentUser: CurrentUser;
}) {
  const [messages, setMessages] = useState<Message[]>(messageHistory);

  const handleNewMessage = async (content: string) => {
    // Add the user message with loading state
    const tempMessage: Message = {
      id: Date.now().toString(),
      content,
      variant: 'user',
      isLoading: true,
    };

    // Add message immediately
    setMessages((prev) => [...prev, tempMessage]);

    try {
      // Make API call after showing the message
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Update the message with the saved version from the database
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id
            ? { ...data.message, isLoading: false }
            : msg,
        ),
      );
    } catch (error) {
      // Handle error if needed
      // Update the message to show error state
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id
            ? {
                ...msg,
                isLoading: false,
                content: `${msg.content} (Failed to send)`,
              }
            : msg,
        ),
      );
    }
  };

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
        <ChatInput onSendMessage={handleNewMessage} />
      </div>
    </>
  );
}
