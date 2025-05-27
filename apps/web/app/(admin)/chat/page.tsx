import { currentUser as clerkCurrentUser } from '@clerk/nextjs/server';
import ChatContainer from '@/components/chat/ChatContainer';
import { BreadcrumbsConsumer } from '@/consumers/breadcrumbsConsumer';
import { Breadcrumb } from '@/types/breadcrumbs';
import { prisma } from '@repo/database';

const breadCrumbs: Breadcrumb[] = [
  {
    label: 'Chat',
    link: '/chat',
  },
];

export default async function Page() {
  const user = await clerkCurrentUser();
  const currentUser = {
    name: user?.firstName ?? undefined,
    image: user?.imageUrl ?? undefined,
  };

  // Fetch Facebook ad accounts for the current user
  const facebookAuth = user
    ? await prisma.facebookAuth.findFirst({
        where: { userId: user.id },
        include: {
          adAccounts: true,
        },
      })
    : null;

  return (
    <div className="pb-6 h-[calc(100vh-156px)]">
      <BreadcrumbsConsumer breadcrumbs={breadCrumbs} />
      <ChatContainer
        currentUser={currentUser}
        adAccounts={facebookAuth?.adAccounts ?? []}
      />
    </div>
  );
}
