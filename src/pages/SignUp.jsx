// src/pages/SignUp.jsx
import React from 'react';
import { Form, Input, Button, Typography, Layout } from 'antd';
import { Link } from 'react-router-dom';
import './SignUp.scss';

const { Title } = Typography;
const { Content } = Layout;

function SignUp() {
    const onFinish = (values) => {
        console.log('Success:', values);
        // Thực hiện logic đăng ký ở đây
    };

    return (
        <Layout className="signup-layout">
            <Content className="signup-content">
                <div className="signup-form-container">
                    <Title level={2} className="signup-title">Đăng ký</Title>
                    <Form
                        name="signup"
                        className="signup-form"
                        onFinish={onFinish}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                        >
                            <Input placeholder="Tên đăng nhập" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                        >
                            <Input.Password placeholder="Mật khẩu" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="signup-button">
                                Đăng ký
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Link to="/login" className="login-link">
                                Đã có tài khoản? Đăng nhập
                            </Link>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
}

export default SignUp;
