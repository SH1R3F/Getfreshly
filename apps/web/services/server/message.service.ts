import { prisma } from '@repo/database';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

export interface CreateMessageData {
  content: string;
  userId: string;
  role: 'user' | 'assistant';
  isLoading?: boolean;
}

export class MessageService {
  static async createMessage(data: CreateMessageData) {
    return await prisma.message.create({
      data,
    });
  }

  static async getUserChatHistory(
    userId: string,
  ): Promise<ChatCompletionMessageParam[]> {
    const messages = await prisma.message.findMany({
      where: {
        userId,
        content: { not: '' },
      },
      orderBy: { createdAt: 'asc' },
      select: {
        role: true,
        content: true,
      },
    });

    return messages as ChatCompletionMessageParam[];
  }

  static async getUserMessages(userId: string) {
    return await prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  static async updateMessage(
    messageId: string,
    data: Partial<CreateMessageData>,
  ) {
    return await prisma.message.update({
      where: { id: messageId },
      data,
    });
  }

  static async storeMessages(
    userId: string,
    messages: ChatCompletionMessageParam[],
  ) {
    for (const message of messages) {
      await this.createMessage({
        ...message,
        userId,
      } as CreateMessageData);
    }
  }
}
