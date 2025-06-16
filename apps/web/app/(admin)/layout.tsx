import { currentUser } from '@clerk/nextjs/server';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@repo/ui/components/sidebar';
import { redirect } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AppSidebar } from '@/components/sidebar';
import { RecentChats } from '@/components/chat/RecentChats';
import { Suspense } from 'react';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fallbackContent = (
    <div className="p-2 text-sm text-muted-foreground">Loading chats...</div>
  );

  const recentChatsContent = (
    <Suspense fallback={fallbackContent}>
      <RecentChats />
    </Suspense>
  );

  const user = await currentUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <SidebarProvider>
      <AppSidebar
        className="mt-[82px]"
        variant="inset"
        recentChatsContent={recentChatsContent}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Breadcrumbs />
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
