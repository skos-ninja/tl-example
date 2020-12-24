import axios from 'axios';
import { useQuery } from 'react-query';

interface redirectURI {
    uri: string;
}

const getRedirect = async (): Promise<redirectURI> => {
    const { data } = await axios.post("/api/redirect");
    return data;
}

export default function useRedirect() {
    return useQuery<redirectURI, Error>(['add-bank-redirect'], getRedirect);
}