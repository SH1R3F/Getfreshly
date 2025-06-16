import { UserService } from '@/services/user.service';
import { ApiErrorHandler } from '@/utils/error-handler';
import { ApiUtils } from '@/utils/api.utils';
import { prisma } from '@repo/database';

export async function POST(request: Request) {
  try {
    const userId = await UserService.requireAuth();
    const { title } = await request.json();

    const chat = await prisma.chat.create({
      data: {
        title,
        userId,
      },
    });

    return ApiUtils.createResponse({ chat });
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
}

export async function GET() {
  try {
    const userId = await UserService.requireAuth();
    const chats = await prisma.chat.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return ApiUtils.createResponse({ chats });
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
}
