import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, ShopOutlined, FileTextOutlined, CaretRightOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const AdminDashboard = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        <Link to="/admin/users">User Management</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ShopOutlined />}>
                        <Link to="/admin/products">Product Management</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FileTextOutlined />}>
                        <Link to="/admin/posts">Post Management</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<CaretRightOutlined />}>
                        <Link to="/admin/pets">Pet Management</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px', minHeight: 280 }}>
                <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
                    <h1>Welcome to Admin Dashboard</h1>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
