'use client';

import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { AccountSelectorProps, SelectedAccount } from '@/types/chat';
import { useSelectedAccount } from '@/hooks/useSelectedAccount';
import Link from 'next/link';
import { useMemo, useEffect } from 'react';

export function AccountSelector({
  isDisabled,
  linkedAccounts,
  onAccountSelect,
}: AccountSelectorProps) {
  const { selectedAccount, setSelectedAccount } = useSelectedAccount();

  // Notify parent component when selected account changes
  useEffect(() => {
    onAccountSelect?.(selectedAccount);
  }, [selectedAccount, onAccountSelect]);

  // Group ad accounts by Facebook account name
  const groupedAccounts = useMemo(() => {
    const groups: Record<
      string,
      Array<{
        accountId: string;
        accountName: string;
        accessToken: string;
      }>
    > = {};

    linkedAccounts.forEach((linkedAccount) => {
      if (linkedAccount.adAccounts) {
        linkedAccount.adAccounts.forEach((adAccount) => {
          const key = linkedAccount.accountName; // Facebook account name
          if (!groups[key]) {
            groups[key] = [];
          }
          groups[key].push({
            accountId: adAccount.accountId,
            accountName: adAccount.accountName,
            accessToken: linkedAccount.accessToken,
          });
        });
      }
    });

    return groups;
  }, [linkedAccounts]);

  const handleAccountSelect = (account: SelectedAccount) => {
    setSelectedAccount(account);
  };

  const handleClearSelection = () => {
    setSelectedAccount(null);
  };

  // Check if we have any ad accounts
  const hasAdAccounts = Object.keys(groupedAccounts).length > 0;

  if (!hasAdAccounts) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="whitespace-nowrap"
        asChild
        disabled={isDisabled}
      >
        <Link href="/settings/linked-accounts">Link Account</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex w-fit items-center border justify-between gap-2 rounded-md bg-background px-3 py-1 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isDisabled}
      >
        <span className="truncate max-w-[200px]">
          {selectedAccount
            ? `${selectedAccount.accountName}`
            : 'Select Ad Account'}
        </span>
        <ChevronDownIcon className="size-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        {Object.entries(groupedAccounts).map(
          ([facebookAccountName, accounts], groupIndex) => (
            <div key={facebookAccountName}>
              {groupIndex > 0 && <DropdownMenuSeparator />}
              <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold text-foreground bg-muted/30 sticky top-0">
                {facebookAccountName}
              </DropdownMenuLabel>
              <DropdownMenuGroup className="bg-muted/10">
                {accounts.map((account) => (
                  <DropdownMenuItem
                    key={account.accountId}
                    onClick={() => handleAccountSelect(account)}
                    className="cursor-pointer ml-2 mr-1"
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{account.accountName}</span>
                      <span className="text-xs text-muted-foreground">
                        ID: {account.accountId}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </div>
          ),
        )}
        {selectedAccount && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleClearSelection}
              className="cursor-pointer text-muted-foreground"
            >
              Clear Selection
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
