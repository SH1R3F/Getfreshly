import { StreamChunkData } from '@/types/chat';

export class StreamingService {
  private writer: WritableStreamDefaultWriter;
  private encoder: TextEncoder;

  constructor(writer: WritableStreamDefaultWriter) {
    this.writer = writer;
    this.encoder = new TextEncoder();
  }

  async writeChunk(chunk: string, messageId: string): Promise<void> {
    const data: StreamChunkData = { chunk, messageId };
    const formattedData = `data: ${JSON.stringify(data)}\n\n`;
    await this.writer.write(this.encoder.encode(formattedData));
  }

  async writeError(error: string): Promise<void> {
    const errorData = `data: ${JSON.stringify({ error })}\n\n`;
    await this.writer.write(this.encoder.encode(errorData));
  }

  async writeDone(): Promise<void> {
    const doneData = `data: [DONE]\n\n`;
    await this.writer.write(this.encoder.encode(doneData));
  }

  async close(): Promise<void> {
    await this.writer.close();
  }

  static createStream(): {
    stream: TransformStream;
    writer: WritableStreamDefaultWriter;
  } {
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    return { stream, writer };
  }
}
