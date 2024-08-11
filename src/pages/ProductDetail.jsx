// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Typography, Spin, Alert, InputNumber, Divider, Breadcrumb } from 'antd';
import { fetchProductById } from '../api/productApi';
import './ProductDetail.scss';
import { exchangeRate } from './Home';

const { Title, Paragraph } = Typography;

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const baseURL = "http://localhost:8090";

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await fetchProductById(id);
                setProduct(data.data);
            } catch (error) {
                setError('Failed to load product details. Please try again later.');
                console.error('Failed to load product details', error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const convertToVND = (priceUSD) => {
        return (priceUSD * exchangeRate).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code', // Loại bỏ ký tự ₫ và chỉ hiển thị mã tiền tệ
        }).replace('VND', ''); // Loại bỏ mã tiền tệ, chỉ giữ lại giá
    };

    const handleAddToCart = () => {
        alert(`Added ${quantity} item(s) to cart!`);
    };

    const handleBuyNow = () => {
        alert(`Purchased ${quantity} item(s)!`);
    };

    if (loading) {
        return <div className="loading-container"><Spin size="large" /></div>;
    }

    if (error) {
        return <div className="error-container"><Alert message={error} type="error" /></div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-detail-container">
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Products</Breadcrumb.Item>
                <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Card
                style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', borderRadius: '16px' }}
                cover={
                    <div className="product-content">
                        <div className="product-image" style={{ border: 'none' }}>
                            <img alt={product.name} src={`${baseURL}/${product.imageUrl}`} />
                        </div>
                        <div className="product-info">
                            <Title level={2}>{product.name}</Title>
                            <span className='price-highlight' level={3}>{convertToVND(product.price)}VND</span>
                            <Paragraph className="product-description">{product.description}</Paragraph>
                            <Divider />
                            <div className="quantity-container">
                                <InputNumber
                                    size='large'
                                    min={1}
                                    value={quantity}
                                    onChange={setQuantity}
                                    className="quantity-input"
                                />
                                <Button type="default" size="large" onClick={handleAddToCart} className="add-to-cart-button">
                                    Add to Cart
                                </Button>
                            </div>
                            <Button type="primary" size="large" onClick={handleBuyNow} className="buy-now-button">
                                Buy Now
                            </Button>
                        </div>
                    </div>
                }
            />
        </div>
    );
}

export default ProductDetail;
