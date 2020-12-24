import { queryClient } from '../client';
import { getTokens } from './getTokens';

export function setTokens(token: string) {
    const tokens = getTokens();

    // Don't add an existing token
    if (tokens.includes(token)) {
        return;
    }

    tokens.push(token);
    localStorage.setItem("tokens", JSON.stringify(tokens));

    // Remove the banks from our queries to call again.
    queryClient.invalidateQueries("banks");
}