import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const client = new Client(
  {
    name: 'getfreshly-mcp-client',
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

export async function getTools() {
  const transport = new StreamableHTTPClientTransport(
    new URL(`${process.env.NEXT_PUBLIC_APP_URL}/mcp`),
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

export async function executeToolCall(toolCall: any, accessToken: string) {
  console.log('Executing tool call:', toolCall);
  return await client.callTool({
    name: toolCall.name,
    arguments: {
      ...toolCall.input,
      accessToken: accessToken,
    },
  });
}
