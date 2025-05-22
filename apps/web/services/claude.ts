import Anthropic from '@anthropic-ai/sdk';

if (!process.env.CLAUDE_API_KEY) {
  throw new Error('CLAUDE_API_KEY is not set');
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export async function sendMessageToClaude(content: string) {
  const messages = [];
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: content,
      },
    ],
  });

  for (const message of response.content) {
    if (message.type === 'text') {
      messages.push(message.text);
    } else if (message.type === 'tool_use') {
      // TODO: Handle tool use
    }
  }

  return messages;
}

export const claudeService = {
  sendMessage: sendMessageToClaude,
};
