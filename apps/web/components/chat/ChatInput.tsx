'use client';

import { useState, useRef } from 'react';
import { SendIcon } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { ChatInputProps, SelectedAccount } from '@/types/chat';
import { AccountSelector } from './AccountSelector';

export function ChatInput({ onSendMessage, linkedAccounts }: ChatInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAccount, setSelectedAccount] =
    useState<SelectedAccount | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const message = formData.get('message') as string;

      if (!message?.trim()) return;

      (e.target as HTMLFormElement).reset();
      await onSendMessage(message, selectedAccount);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      (e.currentTarget.form as HTMLFormElement).requestSubmit();
    }
  };

  const handleAccountSelect = (account: SelectedAccount | null) => {
    setSelectedAccount(account);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        name="message"
        id="message"
        className="w-full h-24 resize-none outline-0 p-4"
        placeholder="Type your message here..."
        onKeyDown={handleKeyDown}
      />
      <div className="absolute bottom-0 right-0 p-4 flex gap-2 items-center">
        <AccountSelector
          isDisabled={isSubmitting}
          linkedAccounts={linkedAccounts}
          onAccountSelect={handleAccountSelect}
        />
        <Button
          variant="outline"
          size="sm"
          type="submit"
          disabled={isSubmitting}
        >
          <SendIcon />
        </Button>
      </div>
    </form>
  );
}
