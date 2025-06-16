import { prisma } from '@repo/database';
import { UserService } from '@/services/user.service';
import Link from 'next/link';
import {
  SidebarMenuItem,
  SidebarMenuButton,
} from '@repo/ui/components/sidebar';
import { redirect } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@repo/ui/components/button';
import { revalidatePath } from 'next/cache';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/components/alert-dialog';

async function deleteChat(chatId: string) {
  'use server';

  const user = await UserService.getCurrentUser();
  if (!user) {
    throw new Error('Not authenticated');
  }

  // Verify the chat belongs to the user
  const chat = await prisma.chat.findFirst({
    where: {
      id: chatId,
      userId: user.id,
    },
  });

  if (!chat) {
    throw new Error('Chat not found');
  }

  await prisma.chat.delete({
    where: {
      id: chatId,
    },
  });

  revalidatePath('/chat');
}

export async function RecentChats() {
  const user = await UserService.getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const chats = await prisma.chat.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take:10,
  });

  if (chats.length === 0) {
    return (
      <div className="p-2 text-sm text-muted-foreground">No recent chats</div>
    );
  }

  return (
    <>
      {chats.map((chat) => (
        <SidebarMenuItem
          key={chat.id}
          className="group/item flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <SidebarMenuButton asChild>
            <Link
              href={`/chat/${chat.id}`}
              className="flex-1 text-ellipsis overflow-hidden whitespace-nowrap text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {chat.title || 'New Chat'}
            </Link>
          </SidebarMenuButton>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover/item:opacity-100 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your chat.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <form action={deleteChat.bind(null, chat.id)}>
                  <AlertDialogAction type="submit">Delete</AlertDialogAction>
                </form>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SidebarMenuItem>
      ))}
    </>
  );
}
