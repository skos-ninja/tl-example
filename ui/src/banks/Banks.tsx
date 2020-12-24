import React from 'react';
import { Menu, notification } from 'antd';

import useBanks from './hooks/useBanks';
import Bank from './Bank';

function Banks(props: any) {
    const { error, data } = useBanks();
    const banks = data || [];

    if (error) {
        notification.error({
            key: "banks",
            message: "Error fetching banks",
            description: error.message
        });
    }

    return (
        <Menu.SubMenu title="Banks" key="banks" {...props}>
            {banks.map((b, i) => {
                return (
                    <Bank key={i} accounts={b} />
                )
            })}
        </Menu.SubMenu>
    )
}

export default Banks;