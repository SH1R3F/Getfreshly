'use client';

import { useState } from 'react';
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

interface FacebookAdAccount {
  id: string;
  accountId: string;
  name: string;
}

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  adAccounts: FacebookAdAccount[];
}

interface ModelSelectorProps {
  isDisabled?: boolean;
  adAccounts: FacebookAdAccount[];
}

export function ModelSelector({ isDisabled, adAccounts }: ModelSelectorProps) {
  const [selectedAccount, setSelectedAccount] =
    useState<FacebookAdAccount | null>(adAccounts[0] ?? null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex w-fit items-center border justify-between gap-2 rounded-md bg-background px-3 py-1 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isDisabled}
      >
        <span>
          {selectedAccount
            ? `Ad account: ${selectedAccount.name}`
            : 'Select ad account'}
        </span>
        <ChevronDownIcon className="size-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {adAccounts.map((account) => (
            <DropdownMenuItem
              key={account.id}
              onClick={() => setSelectedAccount(account)}
            >
              Account: {account.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        {adAccounts.length !== 0 && <DropdownMenuSeparator />}

        <DropdownMenuItem>
          <a href={getFacebookOAuthUrl()}>Connect an account</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ChatInput({ onSendMessage, adAccounts }: ChatInputProps) {
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
      />
      <div className="absolute bottom-0 right-0 p-4 flex gap-2 items-center">
        <ModelSelector isDisabled={isSubmitting} adAccounts={adAccounts} />
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
