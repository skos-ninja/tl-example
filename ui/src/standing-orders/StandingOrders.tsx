import React from 'react';
import { Table, Result } from 'antd';

import useStandingOrders from './hooks/useStandingOrders';

interface Props {
    tokenId: string;
    accountId: string;
}

const columns = [
    {
        title: 'Frequency',
        dataIndex: 'key',
        key: 'frequency'
    }
];

export function StandingOrders({ accountId, tokenId }: Props) {
    const { isLoading, error, data } = useStandingOrders(tokenId, accountId);

    if (error) {
        return (
            <Result
                status="error"
                title="Failed to load standing orders"
                subTitle={error.message}
            />
        )
    }

    // Add a key to our standing order data
    let so: any[] = [];
    if (data) {
        so = data.map(d => {
            return {
                key: d.frequency,
                ...d
            };
        })
    }

    return (
        <Table
            loading={isLoading}
            dataSource={so}
            columns={columns}
        />
    )
}