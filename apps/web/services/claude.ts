import Anthropic from '@anthropic-ai/sdk';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages.mjs';
import { prisma } from '@repo/database';
import { executeToolCall, getTools } from './mcp-client';

export default async function* chatWithClaude(messages: MessageParam[]): any {
  if (!process.env.CLAUDE_API_KEY) {
    throw new Error('CLAUDE_API_KEY is not set');
  }

  const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
  const tools = await getTools();

  let fullResponse = '';
  let toolCalls: any[] = [];
  let currentToolCall: any = null;

  try {
    const stream = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages,
      stream: true,
      tools,
    });

    for await (const chunk of stream) {
      console.log('each chunk', JSON.stringify(chunk, null, 2));
      // Handle regular text
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        fullResponse += chunk.delta.text;
        yield chunk.delta.text; // Send to UI immediately
      }

      // Handle tool call start
      else if (
        chunk.type === 'content_block_start' &&
        chunk.content_block.type === 'tool_use'
      ) {
        currentToolCall = {
          id: chunk.content_block.id,
          name: chunk.content_block.name,
          input: '',
        };
      }

      // Accumulate tool parameters
      else if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'input_json_delta'
      ) {
        if (currentToolCall) {
          currentToolCall.input += chunk.delta.partial_json;
        }
      }

      // Tool call completed
      else if (chunk.type === 'content_block_stop') {
        if (currentToolCall) {
          try {
            console.log('content block stop', currentToolCall);
            currentToolCall.input = JSON.parse(
              currentToolCall.input === '' ? '{}' : currentToolCall.input,
            );
            currentToolCall.input.account_id = 'act_282520622926541';
            toolCalls.push(currentToolCall);
            currentToolCall = null;
          } catch (e) {
            console.error('Error parsing tool input:', e);
          }
        }
      }

      // Message finished
      else if (chunk.type === 'message_stop') {
        // If there are tool calls, execute them
        if (toolCalls.length > 0) {
          yield '\n\n🔧 Using tools...\n';

          for (const toolCall of toolCalls) {
            const result = await executeToolCall(toolCall);

            // Add tool result to messages
            messages.push({
              role: 'assistant',
              content: [
                { type: 'text', text: fullResponse },
                {
                  type: 'tool_use',
                  id: toolCall.id,
                  name: toolCall.name,
                  input: toolCall.input,
                },
              ],
            });

            messages.push({
              role: 'user',
              content: [
                {
                  type: 'tool_result',
                  tool_use_id: toolCall.id,
                  content: JSON.stringify(result),
                },
              ],
            });
          }

          // Call Claude again with tool results
          yield* chatWithClaude(messages); // Recursive call
          return;
        }
      }
    }
  } catch (e) {
    console.error('Error in chatWithClaude', e);
    yield 'Error in chatWithClaude';
  }
}
