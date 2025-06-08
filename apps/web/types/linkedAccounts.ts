export interface LinkedAccount {
  id: string;
  userId: string;
  accountId: string;
  accountName: string;
  expiresAt: Date;
  adAccounts?: AdAccount[];
}

export interface AdAccount {
  id: string;
  accountId: string;
  accountName: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface LinkedAccountsResponse<T extends LinkedAccount> {
  accounts: T[];
  pagination: PaginationParams;
}

export interface AccountInfo {
  id: string;
  name: string;
}
