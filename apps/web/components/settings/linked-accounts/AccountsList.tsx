'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';
import { ChevronDown, ChevronRight, Unlink } from 'lucide-react';
import { toast } from 'sonner';
import { LinkedAccount } from '@/types/linkedAccounts';

export function AccountsList({ accounts }: { accounts: LinkedAccount[] }) {
  const router = useRouter();
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(
    new Set(),
  );
  const [loadingAccounts, setLoadingAccounts] = useState<Set<string>>(
    new Set(),
  );

  const handleUnlinkAccount = async (accountId: string) => {
    setLoadingAccounts((prev) => new Set(prev).add(accountId));

    try {
      const response = await fetch(`/api/linked-accounts/${accountId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to unlink account');
      }

      toast.success('Account unlinked successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to unlink account. Please try again.');
    } finally {
      setLoadingAccounts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(accountId);
        return newSet;
      });
    }
  };

  const toggleExpanded = (accountId: string) => {
    const newExpanded = new Set(expandedAccounts);
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId);
    } else {
      newExpanded.add(accountId);
    }
    setExpandedAccounts(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">
                <div className="flex items-center space-x-3">
                  <div className="w-6" />
                  <span>Account Name</span>
                </div>
              </TableHead>
              <TableHead className="w-auto">Status</TableHead>
              <TableHead className="w-auto text-right">
                <div className="flex justify-start space-x-2">
                  <span>Actions</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-8 text-muted-foreground"
                >
                  No accounts connected
                </TableCell>
              </TableRow>
            ) : (
              accounts.map((account) => (
                <React.Fragment key={account.id}>
                  {/* Main Account Row */}
                  <TableRow key={account.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        {account.adAccounts && account.adAccounts.length > 0 ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(account.id)}
                            className="p-1 h-6 w-6"
                          >
                            {expandedAccounts.has(account.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </Button>
                        ) : (
                          <div className="w-6" />
                        )}
                        <div>
                          <div className="font-medium">
                            {account.accountName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ID: {account.accountId}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          account.expiresAt > new Date()
                            ? 'default'
                            : 'secondary'
                        }
                        className={
                          account.expiresAt > new Date()
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }
                      >
                        {account.expiresAt > new Date()
                          ? 'Connected'
                          : 'Token Expired'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnlinkAccount(account.id)}
                          disabled={loadingAccounts.has(account.id)}
                          loading={loadingAccounts.has(account.id)}
                          className="flex items-center text-destructive hover:text-destructive"
                          title="Unlink account"
                        >
                          <Unlink className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Ad Accounts Rows */}
                  {account.adAccounts &&
                    account.adAccounts.length > 0 &&
                    expandedAccounts.has(account.id) &&
                    account.adAccounts.map((adAccount) => (
                      <TableRow
                        key={`${account.id}-${adAccount.id}`}
                        className="bg-muted/30 hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3 pl-9">
                            <div className="w-2 h-2 rounded-full bg-primary/60" />
                            <div>
                              <div className="text-sm">
                                {adAccount.accountName}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                ID: {adAccount.accountId}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            Ad Account
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right" />
                      </TableRow>
                    ))}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
