'use client';

import { useState, useRef } from 'react';
import { ChevronDownIcon, SendIcon } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import getFacebookOAuthUrl from '@/services/meta';
import { toast } from 'sonner';
import { ChatInputProps, ModelSelectorProps } from '@/types/chat';

export function ModelSelector({ isDisabled, accountInfo }: ModelSelectorProps) {
  const handleDisconnectFacebook = async () => {
    try {
      // Remove Facebook auth data
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to disconnect Facebook account');
      }

      // Refresh the page to update the UI
      window.location.reload();
    } catch (error) {
      toast.error('Failed to disconnect Facebook account. Please try again.');
    }
  };

  if (!accountInfo.account_id) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="whitespace-nowrap"
        asChild
        disabled={isDisabled}
      >
        <a href={getFacebookOAuthUrl()}>Connect Facebook</a>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex w-fit items-center border justify-between gap-2 rounded-md bg-background px-3 py-1 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isDisabled}
      >
        <span>
          {accountInfo
            ? `Account: ${accountInfo.account_name}`
            : 'Connect Facebook'}
        </span>
        <ChevronDownIcon className="size-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {accountInfo && (
            <DropdownMenuItem>
              Account: {accountInfo.account_name}
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleDisconnectFacebook}>
          Disconnect Facebook
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ChatInput({ onSendMessage, accountInfo }: ChatInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const message = formData.get('message') as string;

      if (!message?.trim()) return;

      // Clear the form immediately
      (e.target as HTMLFormElement).reset();

      await onSendMessage(message);
      // Focus the textarea after sending
      textareaRef.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      const message = e.currentTarget.value.trim();
      if (!message || isSubmitting) return;

      setIsSubmitting(true);
      try {
        // Clear the textarea
        e.currentTarget.value = '';
        await onSendMessage(message);
        // Focus the textarea after sending
        textareaRef.current?.focus();
      } finally {
        setIsSubmitting(false);
      }
    }
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
        <ModelSelector isDisabled={isSubmitting} accountInfo={accountInfo} />
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
