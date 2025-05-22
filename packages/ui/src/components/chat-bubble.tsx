import * as React from 'react';
import { cn } from '@repo/ui/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const chatBubbleVariants = cva('rounded-lg p-4 max-w-[80%] text-sm', {
  variants: {
    variant: {
      user: 'bg-primary text-primary-foreground ml-auto',
      assistant: 'bg-muted text-muted-foreground mr-auto',
    },
  },
  defaultVariants: {
    variant: 'user',
  },
});

interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariants> {
  message: string;
  userImage?: string;
  userName?: string;
}

export function ChatBubble({
  className,
  variant,
  message,
  userImage,
  userName,
  ...props
}: ChatBubbleProps) {
  return (
    <div className="flex items-end gap-2 group">
      {variant === 'user' && (
        <div className="order-2 flex-shrink-0">
          <Avatar>
            <AvatarImage src={userImage} alt={userName || 'User'} />
            <AvatarFallback>{userName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </div>
      )}
      <div
        className={cn(chatBubbleVariants({ variant }), 'order-1', className)}
        {...props}
      >
        {message}
      </div>
    </div>
  );
}
