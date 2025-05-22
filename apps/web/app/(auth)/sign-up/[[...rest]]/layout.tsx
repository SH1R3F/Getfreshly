import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Get Freshly',
  description: 'Sign up to unlock the full potential of Get Freshly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
