// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { Layout, Typography, Form, Input, Button, Steps, message, Space } from 'antd';

const { Title } = Typography;
const { Step } = Steps;

const CheckoutPage = () => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();

    const next = () => {
        form
            .validateFields()
            .then(() => {
                setCurrent(current + 1);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const handleFinish = (values) => {
        // Xử lý thông tin thanh toán và gửi đến server ở đây
        message.success('Payment Successful!');
    };

    return (
        <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>
            <Layout.Content style={{ padding: '24px', margin: 0 }}>
                <Title level={2}>Checkout</Title>
                <Steps current={current} style={{ marginBottom: 24 }}>
                    <Step title="Personal Information" />
                    <Step title="Shipping Address" />
                    <Step title="Payment Method" />
                </Steps>
                <div className="steps-content">
                    {current === 0 && (
                        <Form
                            form={form}
                            name="personal-info"
                            layout="vertical"
                            onFinish={next}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Next
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                    {current === 1 && (
                        <Form
                            form={form}
                            name="shipping-address"
                            layout="vertical"
                            onFinish={next}
                        >
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: true, message: 'Please input your address!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[{ required: true, message: 'Please input your city!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Zip Code"
                                name="zip"
                                rules={[{ required: true, message: 'Please input your zip code!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button type="default" onClick={prev}>
                                        Back
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        Next
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    )}
                    {current === 2 && (
                        <Form
                            form={form}
                            name="payment-method"
                            layout="vertical"
                            onFinish={handleFinish}
                        >
                            <Form.Item
                                label="Card Number"
                                name="cardNumber"
                                rules={[{ required: true, message: 'Please input your card number!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Expiration Date"
                                name="expiryDate"
                                rules={[{ required: true, message: 'Please input your card expiration date!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="CVV"
                                name="cvv"
                                rules={[{ required: true, message: 'Please input your CVV!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button type="default" onClick={prev}>
                                        Back
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        Pay Now
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </Layout.Content>
        </Layout>
    );
};

export default CheckoutPage;
