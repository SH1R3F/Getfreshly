import { BreadcrumbsConsumer } from '@/consumers/breadcrumbsConsumer';
import { Breadcrumb } from '@/types/breadcrumbs';
import { Button } from '@repo/ui/components/button';
import { SendIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@repo/ui/components/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';
import { ChatBubble } from '@repo/ui/components/chat-bubble';
import { currentUser as clerkCurrentUser } from '@clerk/nextjs/server';
import { ScrollToBottom } from '@/components/chat/scroll-to-bottom';

const breadCrumbs: Breadcrumb[] = [
  {
    label: 'Chat',
    link: '/chat',
  },
];

type Message = {
  id: string;
  content: string;
  variant: 'user' | 'assistant';
};

const messages: Message[] = [
  {
    id: '1',
    content: 'Hi! I need help with setting up my new project.',
    variant: 'user',
  },
  {
    id: '2',
    content:
      "I'd be happy to help you set up your project. What kind of project are you working on?",
    variant: 'assistant',
  },
  {
    id: '3',
    content:
      "It's a Next.js project with TypeScript. I want to add authentication and a database.",
    variant: 'user',
  },
  {
    id: '4',
    content:
      "Great choice! For authentication, I'd recommend using Clerk or NextAuth.js. For the database, Prisma with PostgreSQL would be a solid option. Would you like me to guide you through setting up either of these?",
    variant: 'assistant',
  },
  {
    id: '5',
    content: "Yes, please! Let's start with Clerk authentication.",
    variant: 'user',
  },
  {
    id: '6',
    content:
      "First, you'll need to install the Clerk SDK. Run 'npm install @clerk/nextjs' in your project directory. Would you like me to show you the next steps?",
    variant: 'assistant',
  },
  {
    id: '7',
    content: "Done! What's next?",
    variant: 'user',
  },
  {
    id: '8',
    content:
      "Now you'll need to add your Clerk API keys to your .env.local file. Have you created an account on Clerk's website yet?",
    variant: 'assistant',
  },
  {
    id: '9',
    content: 'Yes, I have an account. Where do I find the API keys?',
    variant: 'user',
  },
  {
    id: '10',
    content:
      "You can find your API keys in the Clerk Dashboard under API Keys. You'll need both NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY. Would you like me to show you how to set up the ClerkProvider in your app?",
    variant: 'assistant',
  },
  {
    id: '11',
    content: 'Yes, please show me the ClerkProvider setup!',
    variant: 'user',
  },
  {
    id: '12',
    content:
      "In your app's root layout.tsx, wrap your application with ClerkProvider:\n\nimport { ClerkProvider } from '@clerk/nextjs';\n\nexport default function RootLayout({ children }) {\n  return (\n    <ClerkProvider>\n      {children}\n    </ClerkProvider>\n  );\n}",
    variant: 'assistant',
  },
  {
    id: '13',
    content:
      'That makes sense. How do I protect routes that require authentication?',
    variant: 'user',
  },
  {
    id: '14',
    content:
      "You can use Clerk's middleware to protect routes. Create a middleware.ts file in your project root:\n\nimport { authMiddleware } from '@clerk/nextjs';\nexport default authMiddleware({\n  publicRoutes: ['/'], // Add public routes here\n});",
    variant: 'assistant',
  },
  {
    id: '15',
    content: 'Perfect! Now what about adding sign-in and sign-up pages?',
    variant: 'user',
  },
  {
    id: '16',
    content:
      "Clerk provides pre-built components for authentication. Create two new files:\n\napp/sign-in/[[...sign-in]]/page.tsx\napp/sign-up/[[...sign-up]]/page.tsx\n\nIn each, import and use the respective component:\n\nimport { SignIn } from '@clerk/nextjs';\nexport default function Page() {\n  return <SignIn />;\n}",
    variant: 'assistant',
  },
  {
    id: '17',
    content: 'Great! Can I customize the look of these pages?',
    variant: 'user',
  },
  {
    id: '18',
    content:
      'Yes! Clerk offers several ways to customize the appearance:\n1. Using the appearance prop on ClerkProvider\n2. Using CSS variables\n3. Creating custom flows with useSignIn/useSignUp hooks\n\nWhich method would you like to explore?',
    variant: 'assistant',
  },
  {
    id: '19',
    content: "Let's start with the appearance prop. How do I use it?",
    variant: 'user',
  },
  {
    id: '20',
    content:
      "You can customize the appearance by passing an object to ClerkProvider:\n\n<ClerkProvider appearance={{\n  elements: {\n    formButtonPrimary: 'bg-primary text-white',\n    card: 'rounded-xl shadow-lg',\n  },\n  variables: {\n    colorPrimary: '#0070f3',\n  },\n}}>\n  {children}\n</ClerkProvider>\n\nWould you like to see more customization options?",
    variant: 'assistant',
  },
];

export function ModelSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-fit items-center justify-between gap-2 rounded-md bg-transparent px-3 py-1 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50">
        <span>Ad account: Mahmoud Shiref</span>
        <ChevronDownIcon className="size-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Account: Mahmoud Shiref 1</DropdownMenuItem>
          <DropdownMenuItem>Account: Mahmoud Shiref 2</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Connect different account</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default async function Page() {
  const user = await clerkCurrentUser();
  const currentUser = {
    name: user?.firstName ?? undefined,
    image: user?.imageUrl ?? undefined,
  };

  return (
    <div className="pb-6 h-[calc(100vh-156px)]">
      <BreadcrumbsConsumer breadcrumbs={breadCrumbs} />
      <div className="p-4 pb-24 flex flex-col gap-4 max-h-full overflow-y-scroll">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            variant={message.variant}
            message={message.content}
            userName={message.variant === 'user' ? currentUser.name : undefined}
            userImage={
              message.variant === 'user' ? currentUser.image : undefined
            }
          />
        ))}
        <ScrollToBottom />
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t overflow-hidden rounded-b-lg bg-background">
        <textarea
          name="message"
          id="message"
          className="w-full h-24 resize-none outline-0 p-4"
          placeholder="Type your message here..."
        ></textarea>
        <div className="absolute bottom-0 right-0 p-4 flex gap-2 items-center">
          <ModelSelector />
          <Button variant="outline" size="sm">
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
