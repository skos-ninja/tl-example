import axios from 'axios';
import { useQuery } from 'react-query';

import { getTokens } from '../../auth/getTokens';

export interface Transaction {
    transaction_id: string;
    timestamp: string;
    description: string;
    transaction_type: string;
    transaction_category: string;
    transaction_classification: string[];
    merchant_name: string;
    amount: number;
    currency: string;
    meta: {
        [key: string]: string;
    };
    running_balance: {
        amount: number;
        currency: string;
    }
}

const getTransactions = async (tokenId: number, accountId: string): Promise<Transaction[]> => {
    const token = getTokens()[tokenId];
    const { data } = await axios.post(`/api/transactions/${accountId}`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return data.results;
}

export default function useTransactions(tokenId: string, accountId: string) {
    return useQuery<Transaction[], Error>(["transactions", tokenId, accountId], () => getTransactions(Number(tokenId), accountId), {
        enabled: !!tokenId || !!accountId
    });
}