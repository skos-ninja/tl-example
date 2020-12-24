import React from 'react';
import { Table, Result } from 'antd';

import useDirectDebits, { DirectDebit } from './hooks/useDirectDebits';
import { getCurrency } from '../Currency';

interface Props {
    tokenId: string;
    accountId: string;
}

const columns = [
    {
        title: 'Id',
        dataIndex: 'direct_debit_id',
        key: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: 'Last Taken',
        dataIndex: 'previous_payment_timestamp',
        key: 'last_taken',
        render: (timestamp: any) => {
            if (!timestamp) {
                return 'N/A';
            }

            return new Date(timestamp).toLocaleDateString();
        }
    },
    {
        title: 'Last Amount',
        dataIndex: '',
        key: 'last_amount',
        render: (_: any, dd: DirectDebit) => {
            if (!dd.previous_payment_amount) {
                return 'N/A';
            }

            return `${getCurrency(dd.currency)}${dd.previous_payment_amount}`
        }
    }
];

export function DirectDebits({ accountId, tokenId }: Props) {
    const { isLoading, error, data } = useDirectDebits(tokenId, accountId);

    if (error) {
        return (
            <Result
                status="error"
                title="Failed to load direct debits"
                subTitle={error.message}
            />
        )
    }

    return (
        <Table
            loading={isLoading}
            dataSource={data}
            columns={columns}
        />
    )
}