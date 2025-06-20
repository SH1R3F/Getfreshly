import { LoadingSpinner } from './LoadingSpinner';

interface WelcomeChatProps {
  isRedirecting?: boolean;
}

export function WelcomeChat({ isRedirecting }: WelcomeChatProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center px-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold mb-2">
          How can I assist you today?
        </h1>
        <p className="text-muted-foreground max-w-md">
          I&apos;m here to help you with any questions or tasks you have. Feel
          free to ask anything!
        </p>
        {isRedirecting && <LoadingSpinner />}
      </div>
    </div>
  );
}
