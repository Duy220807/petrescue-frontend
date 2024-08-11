// src/pages/About.jsx
import React from 'react';
import { Typography, Space } from 'antd';

const { Title, Paragraph } = Typography;

function About() {
    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>About Us</Title>
            <Paragraph>
                Welcome to our pet food shop! We offer a wide range of high-quality food for your beloved pets. Our mission is to provide the best nutrition for pets of all kinds, ensuring they live a healthy and happy life.
            </Paragraph>
            <Paragraph>
                Our team is passionate about pets and dedicated to sourcing only the finest ingredients for our products. Thank you for choosing us to be a part of your pet's life.
            </Paragraph>
            <Space>
                <Title level={4}>Contact Us</Title>
                <Paragraph>Email: contact@petfoodshop.com</Paragraph>
                <Paragraph>Phone: +123 456 7890</Paragraph>
            </Space>
        </div>
    );
}

export default About;
