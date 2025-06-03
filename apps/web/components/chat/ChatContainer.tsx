'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { ChatInput } from './ChatInput';
import { LoadingSpinner } from './LoadingSpinner';
import { MessagesList } from './MessagesList';
import { useMessages } from '@/hooks/useMessages';
import { ChatService } from '@/services/client/chat.service';
import { MessageFactory } from '@/factories/message.factory';
import { CurrentUser, FacebookAdAccount } from '@/types/chat';

export default function ChatContainer({
  currentUser,
  adAccounts,
}: {
  currentUser: CurrentUser;
  adAccounts: FacebookAdAccount[];
}) {
  const {
    messages,
    isLoading,
    fetchMessages,
    addMessage,
    updateOrCreateAssistantMessage,
    markLastAssistantMessageAsComplete,
  } = useMessages();

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleNewMessage = async (content: string) => {
    const userMessage = MessageFactory.createUserMessage(content);
    addMessage(userMessage);

    try {
      await ChatService.sendMessage(content, (messageId, chunk) => {
        updateOrCreateAssistantMessage(messageId, chunk);
      });
      markLastAssistantMessageAsComplete();
    } catch (error) {
      console.error('Error sending message', error);
      toast.error('Error sending message');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <MessagesList messages={messages} currentUser={currentUser} />
      <div className="absolute inset-x-0 bottom-0 border-t overflow-hidden rounded-b-lg bg-background">
        <ChatInput onSendMessage={handleNewMessage} adAccounts={adAccounts} />
      </div>
    </>
  );
}
