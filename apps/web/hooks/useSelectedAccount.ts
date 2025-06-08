import { SelectedAccount } from '@/types/chat';
import { useLocalStorage } from './useLocalStorage';

export function useSelectedAccount() {
  const [selectedAccount, setSelectedAccount] =
    useLocalStorage<SelectedAccount | null>('selected-ad-account', null);

  return {
    selectedAccount,
    setSelectedAccount,
    hasSelectedAccount: selectedAccount !== null,
    getAccountInfo: () =>
      selectedAccount
        ? {
            accountId: selectedAccount.accountId,
            accountName: selectedAccount.accountName,
            accessToken: selectedAccount.accessToken,
          }
        : null,
  };
}
