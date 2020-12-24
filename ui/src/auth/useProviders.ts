import axios from 'axios';
import { useQuery } from 'react-query';

export interface Provider {
    provider_id: string;
    display_name: string;
    country: string;
    logo_url: string;
    scopes: string[];
}

const getProviders = async (): Promise<Provider[]> => {
    const { data } = await axios.post('/api/providers');
    return data;
}

export default function useProviders() {
    return useQuery<Provider[], Error>(['providers'], getProviders);
}