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

export interface FacebookAccount {
  account_id: string;
  account_name: string;
}

export interface StreamChunkData {
  chunk: string;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  accountInfo: FacebookAccount;
}

export interface ModelSelectorProps {
  isDisabled?: boolean;
  accountInfo: FacebookAccount;
}

export interface CreateMessageData {
  content: string;
  userId: string;
  role: 'user' | 'assistant';
  isLoading?: boolean;
}
