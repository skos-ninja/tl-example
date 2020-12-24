import React, { useEffect } from 'react';

import useRedirect from '../auth/useRedirect';
import { Loader } from '../Loader';


export function BankRedirect() {
    const { data } = useRedirect();

    useEffect(() => {
        if (data?.uri) {
            window.location.replace(data.uri);
        }
    }, [data]);

    return (
        <Loader />
    )
}