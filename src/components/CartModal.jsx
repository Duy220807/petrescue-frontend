// src/components/CartModal.jsx
import React, { useState } from 'react';
import { Modal, Button, List, Typography, Divider, InputNumber, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './CartModal.scss';

const { Title } = Typography;

const CartModal = ({ visible, onClose }) => {
    const [cart, setCart] = useState([
        { id: 1, name: 'Product 1', price: 100, quantity: 1 },
        { id: 2, name: 'Product 2', price: 200, quantity: 2 },
    ]);


    const handleQuantityChange = (id, value) => {
        setCart(cart.map(item => item.id === id ? { ...item, quantity: value } : item));
    };

    const handleRemove = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Modal
            title="Shopping Cart"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={600}
            className="cart-modal"
        >
            <List
                dataSource={cart}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <InputNumber
                                min={1}
                                value={item.quantity}
                                onChange={(value) => handleQuantityChange(item.id, value)}
                            />,
                            <Button
                                icon={<DeleteOutlined />}
                                type="text"
                                onClick={() => handleRemove(item.id)}
                                className="cart-item-remove"
                            >
                                Remove
                            </Button>
                        ]}
                    >
                        <List.Item.Meta
                            title={item.name}
                            description={`$${item.price}`}
                        />
                    </List.Item>
                )}
            />
            <Divider />
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Title level={4}>Total: ${calculateTotal()}</Title>
                <Button type="primary" block>
                    Proceed to Checkout
                </Button>
            </Space>
        </Modal>
    );
};

export default CartModal;
