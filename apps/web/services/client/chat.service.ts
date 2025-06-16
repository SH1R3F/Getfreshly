import { Message, StreamChunkData, SelectedAccount } from '@/types/chat';

export class ChatService {
  static async fetchMessages(chatId: string): Promise<{ messages: Message[] }> {
    const response = await fetch(`/api/chats/${chatId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch messages');
    }

    return data;
  }

  //looook here
  static async sendMessage(
    chatId: string,
    content: string,
    onChunk: (chunk: string) => void,
    selectedAccount?: SelectedAccount | null,
  ): Promise<void> {
    const requestBody: {
      chatId: string;
      message: string;
      adAccountId?: string;
      accessToken?: string;
    } = {
      message: content,
      chatId: chatId,
    };

    // Include selected account data if available
    if (selectedAccount) {
      requestBody.adAccountId = selectedAccount.accountId;
      requestBody.accessToken = selectedAccount.accessToken;
    }

    const response = await fetch(`/api/chats/${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    await this.processStreamingResponse(response, onChunk);
  }

  private static async processStreamingResponse(
    response: Response,
    onChunk: (chunk: string) => void,
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
            const { chunk: textChunk } = JSON.parse(data) as StreamChunkData;
            onChunk(textChunk);
          } catch (error) {
            console.error('Error parsing SSE message:', error);
          }
        }
      }
    }
  }
}
