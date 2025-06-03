import { Message, StreamChunkData } from '@/types/chat';

export class ChatService {
  static async fetchMessages(): Promise<{ messages: Message[] }> {
    const response = await fetch('/api/chat');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch messages');
    }

    return data;
  }

  static async sendMessage(
    content: string,
    onChunk: (messageId: string, chunk: string) => void,
  ): Promise<void> {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: content }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    await this.processStreamingResponse(response, onChunk);
  }

  private static async processStreamingResponse(
    response: Response,
    onChunk: (messageId: string, chunk: string) => void,
  ): Promise<void> {
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No reader available');

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;

          try {
            const { chunk: textChunk, messageId } = JSON.parse(
              data,
            ) as StreamChunkData;
            onChunk(messageId, textChunk);
          } catch (error) {
            console.error('Error parsing SSE message:', error);
          }
        }
      }
    }
  }
}
