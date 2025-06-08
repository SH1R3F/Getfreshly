import { LinkedAccountsContainer } from '@/components/settings/linked-accounts/LinkedAccountsContainer';
import { BreadcrumbsConsumer } from '@/consumers/breadcrumbsConsumer';
import { Breadcrumb } from '@/types/breadcrumbs';
import { prisma } from '@repo/database';
import { UserService } from '@/services/user.service';

const breadCrumbs: Breadcrumb[] = [
  {
    label: 'Settings',
    link: '/settings',
  },
  {
    label: 'Linked Accounts',
    link: '/settings/linked-accounts',
  },
];

export default async function LinkedAccountsPage() {
  const userId = await UserService.requireAuth();

  const linkedAccounts = await prisma.linkedAccount.findMany({
    select: {
      id: true,
      userId: true,
      accountId: true,
      accountName: true,
      expiresAt: true,
      adAccounts: {
        select: {
          id: true,
          accountId: true,
          accountName: true,
        },
      },
    },
    where: {
      userId,
    },
  });

  return (
    <div className="pb-6">
      <BreadcrumbsConsumer breadcrumbs={breadCrumbs} />
      <LinkedAccountsContainer linkedAccounts={linkedAccounts} />
    </div>
  );
}
