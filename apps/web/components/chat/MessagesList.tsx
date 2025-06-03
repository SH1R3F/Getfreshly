import { ChatBubble } from '@repo/ui/components/chat-bubble';
import { ScrollToBottom } from './scroll-to-bottom';
import { Message, CurrentUser } from '@/types/chat';

interface MessagesListProps {
  messages: Message[];
  currentUser: CurrentUser;
}

export function MessagesList({ messages, currentUser }: MessagesListProps) {
  return (
    <div className="p-4 pb-24 flex flex-col gap-4 max-h-full overflow-y-scroll">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          role={message.role}
          message={message.content}
          userName={message.role === 'user' ? currentUser.name : undefined}
          userImage={message.role === 'user' ? currentUser.image : undefined}
          isLoading={message.isLoading}
        />
      ))}
      <ScrollToBottom deps={[messages]} />
    </div>
  );
}
