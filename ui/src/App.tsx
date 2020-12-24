import React from 'react';
import { Layout } from 'antd';

import { Routes } from './Routes';
import { Sidebar } from './sidebar';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
