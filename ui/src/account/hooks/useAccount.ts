import useBanks, { Account } from '../../banks/hooks/useBanks';

export default function useAccount(accountId: string) {
    const { isLoading, error, data } = useBanks();
    let bank: Account | undefined = undefined;

    if (data) {
        bank = data.flat().find(bank => bank.account_id === accountId);
    }
    
    if (!bank && !isLoading) {
        return {
            isLoading,
            error: new Error('Account not found'),
            data: undefined
        };
    }

    return { isLoading, error, data: bank };
}