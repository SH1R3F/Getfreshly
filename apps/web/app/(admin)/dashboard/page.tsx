import ChatContainer from '@/components/chat/ChatContainer';
import { BreadcrumbsConsumer } from '@/consumers/breadcrumbsConsumer';
import { Breadcrumb } from '@/types/breadcrumbs';
import { UserService } from '@/services/user.service';
import { prisma } from '@repo/database';
import { LinkedAccount } from '@/types/linkedAccounts';
import PerformanceDashboard from '@/components/dashboard/PerformanceDashboard';

const breadCrumbs: Breadcrumb[] = [
  {
    label: 'Dashboard',
    link: '/dashboard',
  },
];

export default async function Page() {
  const user = await UserService.getCurrentUser();

  if (!user) {
    throw new Error('User not found');
  }

  const linkedAccounts = (await prisma.linkedAccount.findMany({
    where: {
      userId: user.id,
    },
    select: {
      accountName: true,
      accessToken: true,
      adAccounts: {
        select: {
          accountId: true,
          accountName: true,
        },
      },
    },
  })) as LinkedAccount[];

  return (
    <div className="pb-6 space-y-8">
      <BreadcrumbsConsumer breadcrumbs={breadCrumbs} />
      <PerformanceDashboard />
    </div>
  );
}
