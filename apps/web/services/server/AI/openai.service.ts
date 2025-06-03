import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';

interface OpenAIChatConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export class OpenAIChatService {
  private client: OpenAI;
  private config: Required<Omit<OpenAIChatConfig, 'apiKey'>>;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error(
        'OpenAI API key is required. Set OPENAI_API_KEY environment variable or pass apiKey in config.',
      );
    }

    this.client = new OpenAI({ apiKey, timeout: 30000, maxRetries: 2 });

    this.config = {
      model: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 1024,
    };
  }

  async *streamChat(
    messages: ChatCompletionMessageParam[],
  ): AsyncGenerator<string, void, unknown> {
    try {
      const stream = await this.client.chat.completions.create({
        model: this.config.model,
        messages,
        stream: true,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,

        // Added for performance!
        // TODO: Remove unneeded
        stream_options: { include_usage: false }, // Skip usage stats for speed
        top_p: 0.9, // Focus sampling for faster generation
        frequency_penalty: 0, // No penalty calculations
        presence_penalty: 0, // No penalty calculations
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

  async validateConnection(): Promise<boolean> {
    try {
      await this.client.models.list();
      return true;
    } catch {
      return false;
    }
  }

  // Method to get available models
  async getAvailableModels(): Promise<string[]> {
    try {
      const models = await this.client.models.list();
      return models.data
        .filter((model) => model.id.includes('gpt'))
        .map((model) => model.id)
        .sort();
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  }

  // Update configuration
  updateConfig(newConfig: Partial<OpenAIChatConfig>): void {
    this.config = {
      ...this.config,
      ...newConfig,
    };
  }
}

export const defaultOpenAIChat = new OpenAIChatService();

// Convenience function that uses the default instance
export async function* chatWithOpenAI(
  accessToken: string, // Keep for future tools integration
  messages: ChatCompletionMessageParam[],
): AsyncGenerator<string, void, unknown> {
  yield* defaultOpenAIChat.streamChat(messages);
}
