import { AppUser } from '@/types/user';
import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@repo/database';

export class UserService {
  static async requireAuth() {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('Unauthorized');
    }
    return userId;
  }

  static async getCurrentUser(): Promise<AppUser | null> {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return null;
    }

    return {
      id: clerkUser.id,
      name: clerkUser.firstName ?? undefined,
      image: clerkUser.imageUrl ?? undefined,
    };
  }

  static async getAccountInfo(
    userId: string,
  ): Promise<Record<string, string> | {}> {
    const facebookAuth = await prisma.facebookAuth.findFirst({
      where: { userId },
      select: { account_id: true, account_name: true },
    });

    return facebookAuth || {};
  }

  static async getFacebookAccessToken(
    userId: string,
  ): Promise<string | undefined> {
    const facebookAuth = await prisma.facebookAuth.findUnique({
      where: { userId },
      select: { accessToken: true },
    });

    return facebookAuth?.accessToken ?? undefined;
  }
}
