import { z } from 'zod';

export const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(10000, 'Message too long'),
  adAccountId: z.string().optional(),
  accessToken: z.string().optional(),
});

export class ChatValidator {
  static validateMessage(data: unknown) {
    return chatMessageSchema.parse(data);
  }
}
