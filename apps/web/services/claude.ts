import Anthropic from '@anthropic-ai/sdk';
import { MessageParam } from '@anthropic-ai/sdk/resources/messages.mjs';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { prisma } from '@repo/database';

if (!process.env.CLAUDE_API_KEY) {
  throw new Error('CLAUDE_API_KEY is not set');
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});
const client = new Client({
  name: 'example-client',
  version: '1.0.0',
});

export async function* sendMessageToClaude(content: string, userId: string) {
  const messages = [
    {
      role: 'user',
      content,
    },
  ] as MessageParam[];
  // const messages = (
  //   await prisma.message.findMany({
  //     where: { userId },
  //     orderBy: { createdAt: 'asc' },
  //   })
  // ).map((msg) => ({
  //   role: msg.variant,
  //   content: msg.content,
  // })) as MessageParam[];

  // Get streaming response from Claude
  const stream = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages,
    stream: true,
  });

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      yield chunk.delta.text;
    }
  }
}

export const claudeService = {
  sendMessage: sendMessageToClaude,
};
