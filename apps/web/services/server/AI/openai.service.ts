import OpenAI from 'openai';
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from 'openai/resources/chat/completions.mjs';
import { facebookToolDefinition } from './facebook-tools.definition';
import { facebookToolsExecution } from './facebook-tools.execution';

export class OpenAIChatService {
  private client: OpenAI;
  private tools: Record<string, (args: any) => any>;
  private instructions: string = '';

  constructor(accessToken?: string, adAccountId?: string) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(
        'OpenAI API key is required. Set OPENAI_API_KEY environment variable or pass apiKey in config.',
      );
    }

    this.client = new OpenAI({ apiKey, timeout: 30000, maxRetries: 2 });
    this.tools = facebookToolsExecution(accessToken);
    this.instructions = `You're a marketer expert. Help user perform the best marketing actions, you'll provide a very specific plan for the user based on information you'll get through tools. Use the following act_id as ad account id: ${adAccountId} if user didn't provide another one in the message. If you got an error that access token is not provided ask user to make sure they selected an account or try to re-link them`;
  }

  async *streamChat(
    messages: ChatCompletionMessageParam[],
  ): AsyncGenerator<string, void, unknown> {
    try {
      const stream = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'developer',
            content: this.instructions,
          },
          ...messages,
        ],
        tools: facebookToolDefinition as ChatCompletionTool[],
        stream: true,
        temperature: 0.7,
        max_tokens: 1024,
        stream_options: { include_usage: false },
        top_p: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      let currentTool: any = null;

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        const toolCall = chunk.choices[0]?.delta?.tool_calls?.[0];

        if (content) {
          yield content;
        }

        // First tool call chunk
        if (toolCall && toolCall.index === 0 && toolCall.id) {
          currentTool = {
            id: toolCall.id,
            name: toolCall.function?.name || '',
            arguments: toolCall.function?.arguments || '',
          };
        } else if (
          toolCall &&
          toolCall.index === 0 &&
          currentTool &&
          toolCall.function?.arguments
        ) {
          // Accumulate tool arguments
          currentTool.arguments += toolCall.function.arguments;
        }

        // Message finished
        if (
          (chunk.choices[0]?.finish_reason === 'stop' ||
            chunk.choices[0]?.finish_reason === 'tool_calls') &&
          currentTool
        ) {
          yield '\n\n🔧 Using tools...\n';
          yield `\n Calling tool: ${currentTool.name} With arguments: ${currentTool.arguments}\n`;

          const toolCall = this.tools[currentTool.name];
          const args = JSON.parse(currentTool.arguments || '{}');
          const result = await toolCall?.(args);

          // yield `\n Result: ${JSON.stringify(result)}\n`;

          // Create a new message array with the tool response
          const updatedMessages: ChatCompletionMessageParam[] = [
            ...messages,
            {
              role: 'assistant',
              content: null,
              tool_calls: [
                {
                  id: currentTool.id,
                  type: 'function',
                  function: {
                    name: currentTool.name,
                    arguments: currentTool.arguments || '{}',
                  },
                },
              ],
            },
            {
              role: 'tool',
              content: JSON.stringify(result),
              tool_call_id: currentTool.id,
            },
          ];

          yield* this.streamChat(updatedMessages);
        }
      }
    } catch (error) {
      yield this.getErrorMessage(error);
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      if (error.message.includes('rate_limit')) {
        return 'I am currently experiencing high demand. Please try again in a moment.';
      }
      if (error.message.includes('quota')) {
        return 'API quota exceeded. Please contact support.';
      }
      if (error.message.includes('invalid_api_key')) {
        return 'API configuration error. Please contact support.';
      }
    }
    return 'I encountered an error processing your request. Please try again.';
  }
}
