import React from 'react';
import { Tabs } from 'antd';

import { Transactions } from '../transactions';
import { DirectDebits } from '../direct-debits';
import { StandingOrders } from '../standing-orders';
import { Account } from '../banks/hooks/useBanks';
import useProvider from '../auth/useProvider';

const { TabPane } = Tabs;

interface Props {
    tokenId: string;
    account: Account;
}

function hasScope(scopes: string[], scope: string): boolean {
    return !!scopes.find(s => s === scope);
}

export function AccountTabs({ tokenId, account }: Props) {
    const provider = useProvider(account.provider.provider_id);
    let scopes: string[] = [];
    if (provider.data?.scopes) {
        scopes = provider.data?.scopes;
    }

    return (
        <Tabs defaultActiveKey="transactions">
            {hasScope(scopes, "transactions") &&
                <TabPane tab="Transactions" key="transactions">
                    <Transactions tokenId={tokenId} accountId={account.account_id} />
                </TabPane>
            }

            {hasScope(scopes, "direct_debits") &&
                <TabPane tab="Direct Debits" key="direct-debits">
                    <DirectDebits tokenId={tokenId} accountId={account.account_id} />
                </TabPane>
            }

            {hasScope(scopes, "standing_orders") &&
                <TabPane tab="Standing Orders" key="standing-orders">
                    <StandingOrders tokenId={tokenId} accountId={account.account_id} />
                </TabPane>
            }

            {hasScope(scopes, "cards") &&
                <TabPane tab="Cards" key="cards">
                    <Transactions tokenId={tokenId} accountId={account.account_id} />
                </TabPane>
            }
        </Tabs>
    )
}

export default AccountTabs;