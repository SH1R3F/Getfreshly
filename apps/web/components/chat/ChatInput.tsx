'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@repo/ui/components/dropdown-menu';
import { DropdownMenuTrigger } from '@repo/ui/components/dropdown-menu';
import { DropdownMenu } from '@repo/ui/components/dropdown-menu';
import { ChevronDownIcon, SendIcon } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
}

interface ModelSelectorProps {
  isDisabled?: boolean;
}

export function ModelSelector({ isDisabled }: ModelSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex w-fit items-center border justify-between gap-2 rounded-md bg-background px-3 py-1 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isDisabled}
      >
        <span>Ad account: Mahmoud Shiref</span>
        <ChevronDownIcon className="size-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Account: Mahmoud Shiref 1</DropdownMenuItem>
          <DropdownMenuItem>Account: Mahmoud Shiref 2</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Connect different account</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="message"
        id="message"
        className="w-full h-24 resize-none outline-0 p-4"
        placeholder="Type your message here..."
        disabled={isSubmitting}
      ></textarea>
      <div className="absolute bottom-0 right-0 p-4 flex gap-2 items-center">
        <ModelSelector isDisabled={isSubmitting} />
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
