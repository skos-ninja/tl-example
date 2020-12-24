import React from 'react';
import { Result, Table } from 'antd';
import { SortOrder } from 'antd/lib/table/interface';

import { TransactionComponent } from './Transaction';
import { getCurrency } from '../Currency';
import useTransactions, { Transaction } from './hooks/useTransactions';

interface Props {
    tokenId: string;
    accountId: string;
}

const asc: SortOrder = 'ascend';
const dsc: SortOrder = 'descend';

const columns = [
    {
        title: 'Id',
        dataIndex: 'key',
        key: 'id'
    },
    {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: (value: any) => <p>{new Date(value).toLocaleDateString()}</p>,
        sorter: (a: any, b: any, sortOrder?: SortOrder) => {
            const aDate = new Date(a);
            const bDate = new Date(b);

            if (sortOrder === asc) {
                return bDate.getTime() - aDate.getTime();
            } else if (sortOrder === dsc) {
                return aDate.getTime() - bDate.getTime();
            }
            
            return 0;
        },
        sortDirections: [dsc, asc],
        defaultSortOrder: dsc
    },
    {
        title: 'Description',
        dataIndex: '',
        key: 'description',
        render: (_: any, transaction: Transaction) => {
            let name = transaction.merchant_name;

            if (!name) {
                name = transaction.description;
            }

            return (
                <div>
                {name}
                {transaction.transaction_classification.map(classification =>
                    <div style={{
                        fontSize: '9pt'
                    }}>
                        {classification}
                    </div>
                )}
                </div>
            )
        }
    },
    {
      title: 'Category',
      dataIndex: ['transaction_category'],
      key: 'category',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_: any, transaction: Transaction) => <p>{getCurrency(transaction.currency)} {Number(transaction.amount).toFixed(2)}</p>
    },
];

export function Transactions({ tokenId, accountId }: Props) {
    const { isLoading, error, data } = useTransactions(tokenId, accountId);

    if (error) {
        return (
            <Result
                status="error"
                title="Failed to load transactions"
                subTitle={error.message}
            />
        )
    }

    // Add a key to our transaction data
    let transactions: any[] = [];
    if (data) {
        transactions = data.map(d => {
            return {
                key: d.transaction_id,
                ...d
            };
        })
    }

    return (
        <Table
            loading={isLoading}
            dataSource={transactions}
            columns={columns}
            expandable={{
                expandedRowRender: record => <TransactionComponent transaction={record} />,
                rowExpandable: () => true
            }}
        />
    )
}