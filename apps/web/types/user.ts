import { FacebookAdAccount } from '@repo/database';

export interface AppUser {
  id: string;
  name?: string;
  image?: string;
}

export interface UserWithFacebookAuth extends AppUser {
  facebookAuth?: {
    adAccounts: FacebookAdAccount[];
  } | null;
}
