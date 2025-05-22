import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Get Freshly',
  description: 'Sign in to unlock the full potential of Get Freshly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
