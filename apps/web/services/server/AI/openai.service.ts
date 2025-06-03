import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';

export class OpenAIChatService {
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(
        'OpenAI API key is required. Set OPENAI_API_KEY environment variable or pass apiKey in config.',
      );
    }

    this.client = new OpenAI({ apiKey, timeout: 30000, maxRetries: 2 });
  }

  async *streamChat(
    messages: ChatCompletionMessageParam[],
  ): AsyncGenerator<string, void, unknown> {
    try {
      const stream = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1024,

        // Added for performance!
        stream_options: { include_usage: false },
        top_p: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          yield content;
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
