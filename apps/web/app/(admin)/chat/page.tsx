import ChatContainer from '@/components/chat/ChatContainer';
import { BreadcrumbsConsumer } from '@/consumers/breadcrumbsConsumer';
import { Breadcrumb } from '@/types/breadcrumbs';
import { UserService } from '@/services/user.service';
import { redirect } from 'next/navigation';
import { FacebookAccount } from '@/types/chat';

const breadCrumbs: Breadcrumb[] = [
  {
    label: 'Chat',
    link: '/chat',
  },
];

export default async function Page() {
  const user = await UserService.getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const accountInfo = (await UserService.getAccountInfo(
    user.id,
  )) as FacebookAccount;

  return (
    <div className="pb-6 h-[calc(100vh-161px)]">
      <BreadcrumbsConsumer breadcrumbs={breadCrumbs} />
      <ChatContainer currentUser={user} accountInfo={accountInfo} />
    </div>
  );
}
