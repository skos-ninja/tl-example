import axios from 'axios';
import { useQuery } from 'react-query';

interface TokenResponse {
    access_token: string;
}

const getToken = async (code: string): Promise<TokenResponse> => {
    if (!code) {
        throw new Error('Code missing');
    }

    const { data } = await axios.post('/api/exchange', {
        code: code,
    });
    return data;
}

export default function useCallback(code: string) {
    return useQuery<TokenResponse, Error>(["add-bank-callback", code], () => getToken(code), {
        enabled: !!code,
    });
}