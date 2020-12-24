import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';

import { Banks } from '../banks';

const { Sider } = Layout;
const { Item } = Menu;

function Sidebar() {
    const history = useHistory();
    const keys = history.location.pathname.split('/').reverse();
    let openKeys = keys;
    if (history.location.pathname === '/') {
        openKeys = ["banks"]
    }

    return (
        <Sider width={400} >
            <div className="logo" />
            <Menu
                onClick={(e) => {
                    const path = `/${e.keyPath.reverse().join("/")}`;
                    history.push(path);
                }}
                defaultOpenKeys={openKeys}
                defaultSelectedKeys={keys}
                mode="inline"
            >
                <Item key="add-account">
                    Add Account
                </Item>
                <Menu.Divider/>
                <Banks key="banks" />
            </Menu>
        </Sider>
    )
}

export default Sidebar;