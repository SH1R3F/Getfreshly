import { AppUser } from '@/types/user';
import { auth, currentUser } from '@clerk/nextjs/server';

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
}
