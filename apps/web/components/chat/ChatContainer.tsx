'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { ChatInput } from './ChatInput';
import { LoadingSpinner } from './LoadingSpinner';
import { MessagesList } from './MessagesList';
import { useMessages } from '@/hooks/useMessages';
import { MessageFactory } from '@/factories/message.factory';
import { CurrentUser, SelectedAccount } from '@/types/chat';
import { ChatService } from '@/services/client/chat.service';
import { LinkedAccount } from '@/types/linkedAccounts';

export default function ChatContainer({
  currentUser,
  linkedAccounts,
}: {
  currentUser: CurrentUser;
  linkedAccounts: LinkedAccount[];
}) {
  const {
    messages,
    isLoading,
    fetchMessages,
    addMessage,
    updateLastAssistantMessage,
    markLastAssistantMessageAsComplete,
  } = useMessages();

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleNewMessage = async (
    content: string,
    selectedAccount?: SelectedAccount | null,
  ) => {
    const userMessage = MessageFactory.createUserMessage(content);
    addMessage(userMessage);

    try {
      await ChatService.sendMessage(
        content,
        (chunk) => {
          updateLastAssistantMessage(chunk);
        },
        selectedAccount,
      );
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
        <ChatInput
          onSendMessage={handleNewMessage}
          linkedAccounts={linkedAccounts}
        />
      </div>
    </>
  );
}
