import axios from 'axios';
import { useQuery } from 'react-query';

import { getTokens } from '../../auth/getTokens';

export interface StandingOrder {
    frequency: string;
    status: number;
    timestamp: string;
    currency: string;
    meta: {
        [key: string]: string;
    }

    next_payment_date: string;
    next_payment_amount: number;

    first_payment_date: string;
    first_payment_amount: number;

    final_payment_date: string;
    final_payment_amount: string;

    reference: string;
    payee: string
}

const getStandingOrders = async (tokenId: number, id: string): Promise<StandingOrder[]> => {
    const token = getTokens()[tokenId];
    const { data } = await axios.post(`/api/standing_orders/${id}`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return data.results;
}

export default function useStandingOrders(tokenId: string, accountId: string) {
    return useQuery<StandingOrder[], Error>(['standing_orders', tokenId, accountId], () => getStandingOrders(Number(tokenId), accountId), {
        enabled: !!tokenId || !!accountId
    });
}