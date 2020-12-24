import axios from 'axios';
import { useQuery } from 'react-query';

import { getTokens } from '../../auth/getTokens';

export interface Account {
    account_id: string;
    account_type: string;
    display_name: string;
    currency: string;
    account_number: {
        iban: string;
        number: string;
        sort_code: string;
        swift_bic: string;
    };
    provider: {
        provider_id: string;
    }
}

const getBanks = async (): Promise<Account[][]> => {
    const tokens = getTokens();

    const promises = tokens.map(async (token) => {
        const { data } = await axios.post("/api/accounts", null, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        return data.results;
    });

    return await Promise.all(promises);
}

export default function useBanks() {
    return useQuery<Account[][], Error>("banks", getBanks);
}