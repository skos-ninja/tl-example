import React from 'react';
import { PageHeader, Button, Row, Statistic, Result, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { Loader } from '../Loader';
import { AccountTabs } from './AccountTabs';
import { removeToken } from '../auth/removeToken';
import { getCurrency } from '../Currency';
import useAccount from './hooks/useAccount';
import useBalance from './hooks/useBalance';

export function AccountDetails() {
    const { tokenId, accountId } = useParams<{ tokenId: string, accountId: string }>();
    const history = useHistory();
    const account = useAccount(accountId);
    const balance = useBalance(tokenId, accountId);
    const queryClient = useQueryClient();

    const removeAccount = () => {
        Modal.confirm({
            title: 'Do you want to remove this account?',
            icon: <ExclamationCircleOutlined />,
            content: account.data?.provider.provider_id,
            onOk() {
              removeToken(queryClient, Number(tokenId));
              history.push('/');
            },
          });
    };

    if (balance.isLoading || account.isLoading) {
        return (
            <Loader />
        )
    }

    
    if (balance.error || account.error) {
        return (
            <Result
                status="error"
                title="Failed to contact bank"
                subTitle={balance.error?.message || account.error?.message}
            />
        )
    }
    
    if (!balance.data || !account.data) {
        return (
            <div>
                No Data
            </div>
        )
    }

    return (
        <div>
            <PageHeader
                onBack={() => window.history.back()}
                title={account.data.display_name}
                subTitle={account.data.account_type}
                extra={[
                    <Button key="remove" danger onClick={() => {
                        removeAccount();
                    }}>Remove Account</Button>
                ]}
            />

            <Row>
                <Statistic
                    title="Available Balance"
                    prefix={getCurrency(balance.data.currency)}
                    value={Number(balance.data.available).toFixed(2)}
                    style={{
                        margin: '0 32px',
                    }}
                />
                <Statistic
                    title="Current Balance"
                    prefix={getCurrency(balance.data.currency)}
                    value={Number(balance.data.current).toFixed(2)}
                    style={{
                        margin: '0 32px',
                    }}
                />
                <Statistic
                    title="Overdraft"
                    prefix={getCurrency(balance.data.currency)}
                    value={Number(balance.data.overdraft).toFixed(2)}
                    style={{
                        margin: '0 32px'
                    }}
                />
            </Row>

            {account.data &&
                <AccountTabs tokenId={tokenId} account={account.data} />
            }
        </div>
    )
}