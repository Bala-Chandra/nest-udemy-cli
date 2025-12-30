export interface Message {
  id: number;
  content: string;
}

export type MessagesMap = Record<number, Message>;
