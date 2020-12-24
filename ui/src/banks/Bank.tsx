import React from 'react';
import { Menu } from 'antd';

import { Account } from './hooks/useBanks';
import AccountComponent from '../account/Account';
import useProvider from '../auth/useProvider';

interface Props {
    key: number;
    accounts: Account[];
}

function Bank({ key, accounts, ...rest }: Props) {
    const providerId = accounts[0].provider.provider_id;
    const provider = useProvider(providerId);

    let title = provider?.data?.display_name;
    if (!title) {
        title = "Loading"
    }

    return (
        <Menu.SubMenu 
            key={key}
            title={title}
            // icon={<img src={provider?.data?.logo_url} />}
            {...rest}
        >
            {accounts.map(a => {
                return (
                    <AccountComponent key={a.account_id} account={a} {...rest} />
                )
            })}
        </Menu.SubMenu>
    )
}

export default Bank;