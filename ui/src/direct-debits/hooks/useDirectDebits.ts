import axios from 'axios';
import { useQuery } from 'react-query';

import { getTokens } from '../../auth/getTokens';

export interface DirectDebit {
    direct_debit_id: string;
    timestamp: string;
    name: string;
    status: string;

    previous_payment_timestamp: string;
    previous_payment_amount: number;

    currency: string;
    meta: {
        [key: string]: string;
    }
}

const getDirectDebits = async (tokenId: number, id: string): Promise<DirectDebit[]> => {
    const token = getTokens()[tokenId];
    const { data } = await axios.post(`/api/direct_debits/${id}`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return data.results;
}

export default function useDirectDebits(tokenId: string, accountId: string) {
    return useQuery<DirectDebit[], Error>(['direct_debits', tokenId, accountId], () => getDirectDebits(Number(tokenId), accountId), {
        enabled: !!tokenId || !!accountId
    });
}