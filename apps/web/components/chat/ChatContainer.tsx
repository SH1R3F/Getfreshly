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
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content,
      variant: 'user',
      isLoading: true,
    };

    // Add message immediately
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      // Make API call after showing the message
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data = await response.json();

      // Update the message to remove loading state
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newUserMessage.id ? { ...msg, isLoading: false } : msg,
        ),
      );
    } catch (error) {
      // Update the message to remove loading state even if there's an error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newUserMessage.id ? { ...msg, isLoading: false } : msg,
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
