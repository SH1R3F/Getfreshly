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

  constructor(accessToken?: string) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(
        'OpenAI API key is required. Set OPENAI_API_KEY environment variable or pass apiKey in config.',
      );
    }

    this.client = new OpenAI({ apiKey, timeout: 30000, maxRetries: 2 });
    this.tools = facebookToolsExecution(accessToken);
  }

  async *streamChat(
    messages: ChatCompletionMessageParam[],
  ): AsyncGenerator<string, void, unknown> {
    try {
      const stream = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        tools: facebookToolDefinition as ChatCompletionTool[],
        stream: true,
        temperature: 0.7,
        max_tokens: 1024,
        stream_options: { include_usage: false },
        top_p: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      let toolCallId: string | undefined;
      let toolName: string | undefined;
      let toolArguments: string | undefined;

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        const toolCalls = chunk.choices[0]?.delta?.tool_calls?.[0];

        if (content) {
          yield content;
        }

        // Collect tool call information
        if (toolCalls) {
          if (toolCalls.id) toolCallId = toolCalls.id;
          if (toolCalls.function?.name) toolName = toolCalls.function.name;
          if (toolCalls.function?.arguments)
            toolArguments = toolCalls.function.arguments;
        }
      }

      // If we collected a complete tool call, handle it
      if (toolCallId && toolName) {
        const toolCall = this.tools[toolName];
        const result = await toolCall?.(toolArguments);

        // Create a new message array with the tool response
        const updatedMessages: ChatCompletionMessageParam[] = [
          ...messages,
          {
            role: 'assistant',
            content: null,
            tool_calls: [
              {
                id: toolCallId,
                type: 'function',
                function: {
                  name: toolName,
                  arguments: toolArguments || '{}',
                },
              },
            ],
          },
          {
            role: 'tool',
            content: JSON.stringify(result),
            tool_call_id: toolCallId,
          },
        ];

        yield* this.streamChat(updatedMessages);
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
