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
const client = new Client(
  {
    name: 'example-client',
    version: '1.0.0',
  },
  {
    capabilities: {
      prompts: {},
      resources: {},
      tools: {},
    },
  },
);

async function getTools() {
  const transport = new StreamableHTTPClientTransport(
    new URL(`http://localhost:3000/mcp`),
  );

  await client.connect(transport);

  const result = await client.listTools();
  const tools = result.tools.map((tool) => {
    return {
      name: tool.name,
      description: tool.description,
      input_schema: tool.inputSchema,
    };
  });

  console.log(
    'Connected to server with tools:',
    tools.map(({ name }) => name),
  );

  return tools;
}

export async function sendMessageToClaude(content: string, userId: string) {
  const tools = await getTools();

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

  // Get initial response from Claude
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages,
    tools,
  });
  const replies: string[] = [];

  console.log('initial response', response);

  // Handle tool use if needed
  if (response.stop_reason === 'tool_use') {
    // Save the assistant's tool use message
    messages.push({
      role: 'assistant',
      content: response.content,
    });

    // TODO: Handle nested stop reason
    // Handle each tool use
    for (const message of response.content) {
      if (message.type === 'text') {
        replies.push(message.text);
      } else if (message.type === 'tool_use') {
        const toolName = message.name;
        const toolArgs = message.input as { [x: string]: unknown } | undefined;

        // Call the tool and get result
        const result = await client.callTool({
          name: toolName,
          arguments: toolArgs,
        });

        // Add tool result to messages
        const toolResult = {
          role: 'user' as const,
          content: [
            {
              type: 'tool_result' as const,
              tool_use_id: message.id,
              content: result.content as string,
            },
          ],
        };

        console.log('tool result', toolResult, toolResult.content[0]?.content);
        // for (const content of toolResult.content) {
        //   for (const item of content.content) {
        //     if (item.type === 'text') {
        //       replies.push(item.text);
        //     }
        //   }
        // }

        messages.push(toolResult as MessageParam);

        // Get final response from Claude with tool result
        const finalResponse = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          messages,
          tools,
        });

        console.log('final response', finalResponse);

        // Save final response
        if (finalResponse.content[0]?.type === 'text') {
          replies.push(finalResponse.content[0].text);
        }
      }
    }
  } else {
    for (const message of response.content) {
      if (message.type === 'text') {
        replies.push(message.text);
      }
    }
  }

  return replies;
}

export const claudeService = {
  sendMessage: sendMessageToClaude,
};
