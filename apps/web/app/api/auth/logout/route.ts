import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@repo/database';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete the Facebook auth record which will cascade delete ad accounts
    await prisma.facebookAuth.delete({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
