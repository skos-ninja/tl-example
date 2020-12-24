import React from 'react';
import { Result, Button, Spin } from 'antd';
import { useHistory } from 'react-router-dom';

import { useToken } from '../auth/useToken';

export function BankCallback() {
    const history = useHistory();
    const error = useToken();

    const redirectToAddAccount = () => {
        history.push('/add-account');
    };

    if (error) {
        return (
            <Result
                status="error"
                title="Failed to connect to bank"
                subTitle={error}
                extra={[
                <Button type="primary" key="console" onClick={() => redirectToAddAccount}>
                    Try Again
                </Button>
                ]}
            >
            </Result>
        )
    }

    return (
        <Spin />
    )
}