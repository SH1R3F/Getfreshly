'use client';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@repo/ui/components/button';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export function UserIcon() {
  return (
    <div className="h-8 pt-[2px] flex items-center">
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Chat"
              labelIcon={<LayoutDashboard size="16" className="stroke-2" />}
              href="/chat"
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button className="cursor-pointer" variant="ghost">
            Sign In
          </Button>
        </Link>
      </SignedOut>
    </div>
  );
}
