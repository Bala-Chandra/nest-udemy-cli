import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';
import type { Message, MessagesMap } from './types/messge.type';

@Injectable()
export class MessagesRepository {
  private readonly filePath = 'messages.json';

  private async readMessages(): Promise<MessagesMap> {
    try {
      const contents = await readFile(this.filePath, 'utf8');
      return JSON.parse(contents) as MessagesMap;
    } catch {
      return {};
    }
  }

  private async writeMessages(messages: MessagesMap): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(messages, null, 2));
  }

  async findOne(id: string): Promise<Message | null> {
    const messages = await this.readMessages();
    return messages[Number(id)] ?? null;
  }

  async findAll(): Promise<MessagesMap> {
    return this.readMessages();
  }

  async create(content: string): Promise<Message> {
    const messages = await this.readMessages();

    const id = Math.floor(Math.random() * 999);
    const message: Message = { id, content };

    messages[id] = message;

    await this.writeMessages(messages);
    return message;
  }
}
