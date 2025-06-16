'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@repo/ui/components/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  recentChatsContent: ReactNode;
}

export function AppSidebar({ recentChatsContent, ...props }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/new'}>
                  <Link href="/new">+ New Chat</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {recentChatsContent}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/settings/linked-accounts'}
                >
                  <Link href="/settings/linked-accounts">Linked Accounts</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
