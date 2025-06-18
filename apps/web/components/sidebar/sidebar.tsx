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

const data = {
  navMain: [
    {
      title: 'Performance',
      url: '#',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      items: [
        {
          title: 'Linked Accounts',
          url: '/settings/linked-accounts',
        },
      ],
    },
  ],
};

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
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((itm) => (
                  <SidebarMenuItem key={itm.title}>
                    <SidebarMenuButton asChild isActive={pathname === itm.url}>
                      <Link href={itm.url}>{itm.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
