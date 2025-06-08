'use client';

import { useEffect, useRef } from 'react';
import { ChatBubble } from '@repo/ui/components/chat-bubble';
import type { Message } from '@/types/chat';

interface MessagesProps {
  messages: Message[];
  currentUser: {
    name?: string;
    image?: string;
  };
}

export function Messages({ messages, currentUser }: MessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="p-4 pb-24 flex flex-col gap-4 max-h-full overflow-y-scroll">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          variant={message.role}
          message={message.content}
          userName={message.role === 'user' ? currentUser.name : undefined}
          userImage={message.role === 'user' ? currentUser.image : undefined}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
