import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@repo/database';
import { AccountInfo } from '@/types/linkedAccounts';
import { FacebookTokenService } from '@/services/server/connectors/facebook-token.service';
import { FacebookDataService } from '@/services/server/connectors/facebook-data.service';

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
    const { accessToken, expiresIn } =
      await FacebookTokenService.exchangeCodeForToken(code);

    // Fetch ad accounts information
    const accountInfo: AccountInfo =
      await FacebookDataService.getAccountInfo(accessToken);
    const adAccounts = await FacebookDataService.getAdAccounts(accessToken);

    // Store the access token and account info in the database
    const linkedAccount = await prisma.linkedAccount.upsert({
      where: {
        userId_accountId: {
          userId: user.id,
          accountId: accountInfo.id,
        },
      },
      create: {
        userId: user.id,
        accountType: 'facebook',
        accessToken,
        accountId: accountInfo.id,
        accountName: accountInfo.name,
        expiresAt: new Date(Date.now() + expiresIn * 1000),
      },
      update: {
        accessToken,
        expiresAt: new Date(Date.now() + expiresIn * 1000),
      },
    });

    if (adAccounts && adAccounts.length > 0) {
      await prisma.adAccount.deleteMany({
        where: {
          linkedAccountId: linkedAccount.id,
        },
      });

      await prisma.adAccount.createMany({
        data: adAccounts.map((adAccount: { id: string; name: string }) => ({
          userId: user.id,
          linkedAccountId: linkedAccount.id,
          accountId: adAccount.id,
          accountName: adAccount.name,
        })),
      });
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings/linked-accounts`,
    );
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings/linked-accounts?error=1`,
    );
  }
}
