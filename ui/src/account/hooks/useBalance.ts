import axios from 'axios';
import { useQuery } from 'react-query';

import { getTokens } from '../../auth/getTokens';

export interface Balance {
    currency: string;
    available: number;
    current: number;
    overdraft: number;
}

const getBalance = async (tokenId: number, id: string): Promise<Balance> => {
    const token = getTokens()[tokenId];
    const { data } = await axios.post(`/api/balance/${id}`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return data.results[0];
}

export default function useBalance(tokenId: string, accountId: string) {
    return useQuery<Balance, Error>(['balance', tokenId, accountId], () => getBalance(Number(tokenId), accountId), {
        enabled: !!tokenId || !!accountId
    });
}