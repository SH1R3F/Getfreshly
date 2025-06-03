import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { prisma } from '@repo/database';
import { executeToolCall, getTools } from './mcp-client';

export default async function* chatWithOpenAI(
  accessToken: string,
  messages: ChatCompletionMessageParam[],
): any {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const tools = await getTools();

  let fullResponse = '';
  let toolCalls: any[] = [];
  let currentToolCall: any = null;

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      stream: true,
      temperature: 0.7,
      tools: tools.map((tool) => {
        // Create a modified schema that doesn't require accessToken
        const modifiedSchema = {
          ...tool.input_schema,
          required: (tool.input_schema.required || []).filter(
            (field) => field !== 'accessToken',
          ),
        };

        return {
          type: 'function',
          function: {
            name: tool.name,
            description: tool.description,
            parameters: modifiedSchema,
          },
        };
      }),
    });

    for await (const chunk of stream) {
      // Handle regular text
      if (chunk.choices[0]?.delta?.content) {
        const content = chunk.choices[0].delta.content;
        fullResponse += content;
        yield content; // Send to UI immediately
      }

      // Handle tool calls
      if (chunk.choices[0]?.delta?.tool_calls?.[0]) {
        const toolCall = chunk.choices[0].delta.tool_calls[0];
        console.log('toolCall', toolCall);

        if (toolCall.index === 0 && toolCall.id) {
          // Start of a new tool call
          currentToolCall = {
            id: toolCall.id,
            name: toolCall.function?.name || '',
            input: '',
            arguments: toolCall.function?.arguments || '',
          };
        } else if (currentToolCall && toolCall.function?.arguments) {
          // Accumulate tool arguments
          currentToolCall.arguments += toolCall.function.arguments;
        }
      }

      // Message finished
      if (
        chunk.choices[0]?.finish_reason === 'stop' ||
        chunk.choices[0]?.finish_reason === 'tool_calls'
      ) {
        if (currentToolCall) {
          try {
            console.log(
              'Final accumulated arguments:',
              currentToolCall.arguments,
            );
            currentToolCall.input = JSON.parse(
              currentToolCall.arguments || '{}',
            );
            currentToolCall.input = {
              ...currentToolCall.input,
              accessToken,
            };

            delete currentToolCall.arguments; // Clean up the temporary field
            toolCalls.push(currentToolCall);
            currentToolCall = null;
          } catch (e) {
            console.error('Error parsing tool input:', e);
            console.error('Raw arguments:', currentToolCall.arguments);
          }
        }

        // If there are tool calls, execute them
        if (toolCalls.length > 0) {
          yield '\n\n🔧 Using tools...\n';

          for (const toolCall of toolCalls) {
            const result = await executeToolCall(toolCall, accessToken);

            // Add tool result to messages
            messages.push({
              role: 'assistant',
              content: null,
              tool_calls: [
                {
                  id: toolCall.id,
                  type: 'function',
                  function: {
                    name: toolCall.name,
                    arguments: JSON.stringify(toolCall.input),
                  },
                },
              ],
            });

            messages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: JSON.stringify(result),
            });
          }

          // Call OpenAI again with tool results
          yield* chatWithOpenAI(accessToken, messages); // Recursive call
          return;
        }
      }
    }
  } catch (e) {
    console.error('Error in chatWithOpenAI:', e);
    yield 'Error in chatWithOpenAI';
  }
}
