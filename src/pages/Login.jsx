// src/pages/Login.jsx
import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.scss'; // Cập nhật tên SCSS nếu cần

const { Title } = Typography;

function Login() {
    const [error, setError] = useState(null);

    const handleFinish = (values) => {
        // Giả lập gọi API đăng nhập
        // Thay đổi giá trị error nếu có lỗi
        console.log('Login values:', values);
        setError(null);

        // Xử lý logic đăng nhập ở đây
        // Ví dụ: Gọi API và xử lý kết quả
        // Nếu đăng nhập thất bại, gọi setError('Message') để hiển thị thông báo lỗi
    };

    return (
        <div className="login-container">
            <Title level={2}>Đăng Nhập</Title>
            {error && <Alert message={error} type="error" style={{ marginBottom: '16px' }} />}
            <Form
                name="login"
                onFinish={handleFinish}
                initialValues={{ remember: true }}
                className="login-form"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Đăng Nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
