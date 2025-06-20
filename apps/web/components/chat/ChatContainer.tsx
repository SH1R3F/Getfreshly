'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { ChatInput } from './ChatInput';
import { MessagesList } from './MessagesList';
import { useMessages } from '@/hooks/useMessages';
import { MessageFactory } from '@/factories/message.factory';
import { CurrentUser, SelectedAccount } from '@/types/chat';
import { ChatService } from '@/services/client/chat.service';
import { LinkedAccount } from '@/types/linkedAccounts';
import { WelcomeChat } from './WelcomeChat';

const STORED_MESSAGE_KEY = 'firstMessage';

export default function ChatContainer({
  currentUser,
  linkedAccounts,
}: {
  currentUser: CurrentUser;
  linkedAccounts: LinkedAccount[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [chatId, setChatId] = useState<string | undefined>(
    params.chatId as string,
  );
  const [isRedirecting, setIsRedirecting] = useState(false);
  const hasSentFirstMessage = useRef(false);

  const {
    messages,
    fetchMessages,
    addMessage,
    updateLastAssistantMessage,
    markLastAssistantMessageAsComplete,
  } = useMessages(chatId || '');

  const createNewChat = async (content: string) => {
    const response = await fetch('/api/chats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: content }),
    });

    if (!response.ok) {
      throw new Error('Failed to create chat');
    }

    const { chat } = await response.json();
    return chat;
  };

  const sendMessage = async (
    content: string,
    currentChatId: string,
    selectedAccount?: SelectedAccount | null,
    skipAddMessage?: boolean,
  ) => {
    if (!skipAddMessage) {
      const userMessage = MessageFactory.createUserMessage(
        content,
        currentChatId,
      );
      addMessage(userMessage);
    }
    await ChatService.sendMessage(
      currentChatId,
      content,
      (chunk) => updateLastAssistantMessage(chunk),
      selectedAccount,
    );
    markLastAssistantMessageAsComplete();
  };

  const handleNewChat = async (
    content: string,
    selectedAccount?: SelectedAccount | null,
  ) => {
    try {
      setIsRedirecting(true);
      localStorage.setItem(
        STORED_MESSAGE_KEY,
        JSON.stringify({ content, selectedAccount }),
      );
      const chat = await createNewChat(content);
      setChatId(chat.id);
      router.replace(`/chat/${chat.id}`);
      router.refresh();
    } catch {
      toast.error('Failed to create new chat');
      setIsRedirecting(false);
    }
  };

  const handleExistingChat = async (
    content: string,
    selectedAccount?: SelectedAccount | null,
  ) => {
    try {
      if (!chatId) {
        throw new Error('Chat ID is required');
      }
      await sendMessage(content, chatId, selectedAccount);
    } catch {
      toast.error('Failed to send message');
    }
  };

  const handleNewMessage = async (
    content: string,
    selectedAccount?: SelectedAccount | null,
  ) => {
    if (pathname === '/new') {
      await handleNewChat(content, selectedAccount);
    } else if (pathname.includes('/chat')) {
      await handleExistingChat(content, selectedAccount);
    }
  };

  useEffect(() => {
    if (chatId && pathname.includes('/chat/')) {
      const run = async () => {
        if (hasSentFirstMessage.current) return;
        const storedMessage = localStorage.getItem(STORED_MESSAGE_KEY);
        if (storedMessage) {
          hasSentFirstMessage.current = true;
          localStorage.removeItem(STORED_MESSAGE_KEY);
          const { content, selectedAccount } = JSON.parse(storedMessage);
          const userMessage = MessageFactory.createUserMessage(content, chatId);
          addMessage(userMessage);
          await sendMessage(content, chatId, selectedAccount, true);
        }
        await fetchMessages();
      };
      run();
    }
  }, [chatId, pathname]);

  if (pathname === '/new') {
    return (
      <>
        <WelcomeChat isRedirecting={isRedirecting} />
        <div className="absolute inset-x-0 bottom-0 border-t overflow-hidden rounded-b-lg bg-background">
          <ChatInput
            onSendMessage={handleNewMessage}
            linkedAccounts={linkedAccounts}
          />
        </div>
      </>
    );
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
