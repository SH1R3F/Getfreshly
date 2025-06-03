export type MessageRole = 'user' | 'assistant';

export type Message = {
  id: string;
  content: string;
  role: MessageRole;
  isLoading?: boolean;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface MessagesListProps {
  messages: Message[];
  currentUser: CurrentUser;
}

export interface CurrentUser {
  name?: string;
  image?: string;
}

export interface FacebookAdAccount {
  id: string;
  accountId: string;
  name: string;
}

export interface StreamChunkData {
  chunk: string;
  messageId: string;
}
