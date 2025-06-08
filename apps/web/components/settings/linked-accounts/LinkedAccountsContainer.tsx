'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Tabs, TabsContent } from '@repo/ui/components/tabs';
import { AccountsList } from './AccountsList';
import { LinkedAccount } from '@/types/linkedAccounts';
import Link from 'next/link';
import { getFacebookOAuthUrl } from '@/services/server/connectors/facebook-token.service';

export function LinkedAccountsContainer({
  linkedAccounts,
}: {
  linkedAccounts: LinkedAccount[];
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === '1') {
      toast.error('Failed to authenticate with Facebook. Please try again.');
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Linked Accounts</h1>
          <p className="text-muted-foreground">
            Manage your connected accounts
          </p>
        </div>
        <Link
          href={getFacebookOAuthUrl()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm border"
        >
          Link Account
        </Link>
      </div>

      <Tabs defaultValue="facebook" className="w-full">
        {/* Later to add google and other account types and group by tabs */}
        {/* <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
        </TabsList> */}
        <TabsContent value="facebook">
          <AccountsList accounts={linkedAccounts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
