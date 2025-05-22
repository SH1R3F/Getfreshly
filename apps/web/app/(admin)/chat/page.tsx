import { currentUser as clerkCurrentUser } from '@clerk/nextjs/server';
import ChatContainer from '@/components/chat/ChatContainer';
import { BreadcrumbsConsumer } from '@/consumers/breadcrumbsConsumer';
import { Breadcrumb } from '@/types/breadcrumbs';

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

  return (
    <div className="pb-6 h-[calc(100vh-156px)]">
      <BreadcrumbsConsumer breadcrumbs={breadCrumbs} />
      <ChatContainer currentUser={currentUser} />
    </div>
  );
}
