import { QueryClient } from 'react-query';

import { getTokens } from './getTokens';

export function removeToken(queryClient: QueryClient, tokenId: number) {
    const tokens = getTokens();

    if (tokenId > -1) {
        tokens.splice(tokenId, 1);
        localStorage.setItem("tokens", JSON.stringify(tokens));

        // Remove the banks from our queries to call again.
        queryClient.refetchQueries("banks");
    }
}