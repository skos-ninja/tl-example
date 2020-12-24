import React from 'react';
import { Descriptions } from 'antd';

import { Transaction } from './hooks/useTransactions';

interface Props {
    transaction: Transaction
}

export function TransactionComponent({ transaction }: Props) {
    const keys = Object.keys(transaction.meta)

    return (
        <>
            <Descriptions title="Transaction Info" bordered>
                <Descriptions.Item label="ID" span={2}>{transaction.transaction_id}</Descriptions.Item>
                <Descriptions.Item label="Timestamp" span={2}>{transaction.timestamp}</Descriptions.Item>
                <Descriptions.Item label="Type" span={2}>{transaction.transaction_type}</Descriptions.Item>
                <Descriptions.Item label="Category" span={2}>{transaction.transaction_category}</Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>{transaction.description}</Descriptions.Item>
                <Descriptions.Item label="Classification" span={2}>{transaction.transaction_classification.join(', ')}</Descriptions.Item>
                <Descriptions.Item label="Merchant Name" span={3}>{transaction.merchant_name}</Descriptions.Item>
                <Descriptions.Item label="Amount" span={2}>{Number(transaction.amount).toFixed(2)}</Descriptions.Item>
                <Descriptions.Item label="Currency" span={2}>{transaction.currency}</Descriptions.Item>
                
                {transaction.running_balance.currency && 
                <>
                    <Descriptions.Item label="Running Balance Amount">{Number(transaction.running_balance.amount).toFixed(2)}</Descriptions.Item>
                    <Descriptions.Item label="Running Balance Currency">{transaction.running_balance.currency}</Descriptions.Item>
                </>
                }

                
            </Descriptions>

            <Descriptions title="Meta" bordered>
                {keys.map(key =>
                    <Descriptions.Item label={key} span={2}>
                        {transaction.meta[key]}
                    </Descriptions.Item>
                )}
            </Descriptions>
        </>
    )
}

export default TransactionComponent;