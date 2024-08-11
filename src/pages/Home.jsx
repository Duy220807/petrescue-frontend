import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Spin, Alert, Layout, Select, Pagination, Typography } from 'antd';
import { useProducts } from '../hooks/useProducts';
import ProductCategories from '../components/ProductCategories';
import './Home.scss';
import banner from '../assets/banner.png';
import banner2 from '../assets/banner2.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Sider, Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
};

function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
        <div className="custom-prev-arrow" onClick={onClick}>
            <LeftOutlined />
        </div>
    );
}

function CustomNextArrow(props) {
    const { onClick } = props;
    return (
        <div className="custom-next-arrow" onClick={onClick}>
            <RightOutlined />
        </div>
    );
}

export const exchangeRate = 23500;

function Home() {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(8); // Hiển thị 5 sản phẩm mỗi trang
    const { products, loading, error } = useProducts(); // Không cần pageSize và page ở đây
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState('default');
    const baseURL = "http://localhost:8090";

    const convertToVND = (priceUSD) => {
        return (priceUSD * exchangeRate).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        }).replace('VND', '');
    };

    const handleBuyNow = (id) => {
        alert(`Product ${id} added to cart!`);
    };

    const handleSortChange = (value) => {
        setSortOrder(value);
    };

    const handlePageChange = (page) => {
        setPage(page);
    };

    const sortedProducts = [...products].sort((a, b) => {
        switch (sortOrder) {
            case 'priceAsc':
                return a.price - b.price;
            case 'priceDesc':
                return b.price - a.price;
            case 'nameAsc':
                return a.name.localeCompare(b.name);
            case 'nameDesc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    // Calculate paginated products
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + pageSize);
    const totalItems = sortedProducts.length;

    if (loading) {
        return <div className="loading-container"><Spin size="large" /></div>;
    }

    if (error) {
        return <div className="loading-container"><Alert message={error} type="error" /></div>;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout style={{ padding: '0 24px', minHeight: 280 }}>
                <div className="banner-slider">
                    <Slider {...sliderSettings}>
                        <div className="banner-slide">
                            <img src={banner} alt="Banner 1" />
                        </div>
                        <div className="banner-slide">
                            <img src={banner2} alt="Banner 2" />
                        </div>
                    </Slider>
                </div>
                <Layout style={{ padding: '0', minHeight: 280 }}>
                    <Layout style={{ padding: '0 24px', minHeight: 280 }}>
                        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
                            <div className="home-container">
                                <Layout>
                                    <Sider width={200} theme='light' style={{ paddingTop: 25 }}>
                                        <ProductCategories
                                            onSelectCategory={setSelectedCategory}
                                        />
                                    </Sider>
                                    <Layout style={{ padding: '0 24px', minHeight: 280 }}>
                                        <Content style={{ padding: 24, margin: 0 }}>
                                            <Title level={3}>Danh Mục Sản Phẩm</Title>
                                            <div className="category-intro">
                                                <p>Khám phá các danh mục sản phẩm của chúng tôi để tìm kiếm những sản phẩm phù hợp nhất với nhu cầu của bạn. Chúng tôi cung cấp nhiều loại sản phẩm khác nhau từ đồ dùng cho thú cưng đến các món đồ gia dụng chất lượng cao.</p>
                                            </div>
                                            <div className="sort-bar">
                                                <Select defaultValue="default" onChange={handleSortChange} style={{ width: 200 }}>
                                                    <Option value="default">Sort by</Option>
                                                    <Option value="priceAsc">Price (Low to High)</Option>
                                                    <Option value="priceDesc">Price (High to Low)</Option>
                                                    <Option value="nameAsc">Name (A to Z)</Option>
                                                    <Option value="nameDesc">Name (Z to A)</Option>
                                                </Select>
                                            </div>
                                            <Row gutter={24}>
                                                {paginatedProducts
                                                    .filter(product => !selectedCategory || product.categoryId === selectedCategory)
                                                    .map(product => (
                                                        <Col span={6} key={product.id} style={{ marginBottom: '20px' }}>
                                                            <Link to={`/product/${product.id}`} className="product-link">
                                                                <Card
                                                                    className="product-card"
                                                                    cover={
                                                                        <div className="product-image-container">
                                                                            <img alt={product.name} src={`${baseURL}/${product.imageUrl}`} className="product-image" />
                                                                            <div className="buy-now-overlay">
                                                                                <Button size='large' type="primary" onClick={() => handleBuyNow(product.id)}>
                                                                                    Buy Now
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                >
                                                                    <Meta
                                                                        title={<div className="product-name">{product.name}</div>}
                                                                        description={<span className="price-highlight"> {convertToVND(product.price)}VND</span>}
                                                                    />
                                                                </Card>
                                                            </Link>
                                                        </Col>
                                                    ))}
                                            </Row>
                                            <Pagination
                                                current={page}
                                                pageSize={pageSize}
                                                total={totalItems}
                                                onChange={handlePageChange}
                                                showSizeChanger={false}
                                                style={{ textAlign: 'center', marginTop: 20 }}
                                            />
                                        </Content>
                                    </Layout>
                                </Layout>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Home;
