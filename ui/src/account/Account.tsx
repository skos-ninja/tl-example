import React from 'react';
import { Menu } from 'antd';

import { Account } from '../banks/hooks/useBanks';

interface Props {
    account: Account
}

function AccountComponent({ account, ...rest }: Props) {
    return (
        <Menu.Item key={account.account_id} {...rest}>
            <p>{account.display_name} - {account.account_type}</p>
        </Menu.Item>
    );
}

export default AccountComponent;