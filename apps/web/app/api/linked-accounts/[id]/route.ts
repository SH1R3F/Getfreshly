import { NextRequest } from 'next/server';
import { prisma } from '@repo/database';
import { UserService } from '@/services/user.service';
import { ApiUtils } from '@/utils/api.utils';
import { ApiErrorHandler } from '@/utils/error-handler';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const userId = await UserService.requireAuth();

    // Check if the linked account belongs to the authenticated user
    const linkedAccount = await prisma.linkedAccount.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!linkedAccount) {
      return ApiUtils.createErrorResponse('Account not found', 404);
    }

    // Delete the linked account
    await prisma.linkedAccount.delete({
      where: {
        id,
      },
    });

    return ApiUtils.createResponse({
      message: 'Account unlinked successfully',
    });
  } catch (error) {
    return ApiErrorHandler.handle(error);
  }
}
