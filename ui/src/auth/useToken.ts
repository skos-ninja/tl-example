import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import useTLCallback from './useCallback';
import { setTokens } from './setTokens';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function useQueryData() {
    // Fetch code and scope from query
    const query = useQuery();
    const [state, setState] = useState<{ code: string, scope: string[], error: string }>({ code: '', scope: [], error: '' });
    useEffect(() => {
        const code = query.get('code') || '';
        const scope = query.get('scope')?.split(" ") || [];
        const error = query.get('error') || '';

        setState({ code, scope, error });
    }, [query]);

    return state;
}

export function useToken() {
    const history = useHistory();
    const queryClient = useQueryClient();
    const { code, error: err } = useQueryData();

    // Fetch the access_token from the callback
    const { error, data } = useTLCallback(code);
    useEffect(() => {
        if (data?.access_token) {
            setTokens(data.access_token);
            history.push("/");
            queryClient.refetchQueries("banks");
        }
    }, [data?.access_token, history, queryClient]);

    if (err) {
        return err;
    }

    return error?.message;
}