import { getAdAccounts } from '@/services/meta';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@repo/database';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const appId = process.env.FACEBOOK_APP_ID;
    const appSecret = process.env.FACEBOOK_APP_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`;

    // Exchange code for access token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v22.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(
        redirectUri,
      )}&client_secret=${appSecret}&code=${code}`,
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error?.message || 'Failed to get access token');
    }

    const accessToken = tokenData.access_token;

    // Fetch ad accounts information
    const adAccounts = await getAdAccounts(accessToken);

    // Store the access token and ad accounts in the database
    await prisma.facebookAuth.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        accessToken,
        adAccounts: {
          create: adAccounts.map((account: Record<string, string>) => ({
            accountId: account.id,
            name: account.name,
          })),
        },
      },
      update: {
        accessToken,
        adAccounts: {
          deleteMany: {},
          create: adAccounts.map((account: Record<string, string>) => ({
            accountId: account.id,
            name: account.name,
          })),
        },
      },
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/chat`);
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/chat?error=${encodeURIComponent(
        (error as Error).message || 'Failed to authenticate with Facebook',
      )}`,
    );
  }
}
