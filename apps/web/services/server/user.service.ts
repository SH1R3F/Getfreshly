import { FacebookAdAccount } from '@/types/chat';
import { AppUser, UserWithFacebookAuth } from '@/types/user';
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

  static async getUserWithFacebookAuth(
    userId: string,
  ): Promise<UserWithFacebookAuth | null> {
    const user = await this.getCurrentUser();
    if (!user) return null;

    const facebookAuth = await prisma.facebookAuth.findFirst({
      where: { userId },
      include: {
        adAccounts: true,
      },
    });

    return {
      ...user,
      facebookAuth,
    };
  }

  static async getAdAccountsForUser(
    userId: string,
  ): Promise<FacebookAdAccount[]> {
    const facebookAuth = await prisma.facebookAuth.findFirst({
      where: { userId },
      include: {
        adAccounts: true,
      },
    });

    return facebookAuth?.adAccounts ?? [];
  }
}
