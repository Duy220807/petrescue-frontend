// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Input, Badge, Button } from 'antd';
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import CartModal from './CartModal'; // Import CartModal
import './Header.scss'; // Cập nhật tên SCSS nếu cần

const { Header } = Layout;
const { Search } = Input;

function AppHeader({ hideHeader }) {
    const [isCartVisible, setCartVisible] = React.useState(false);

    const showCart = () => setCartVisible(true);
    const hideCart = () => setCartVisible(false);

    if (hideHeader) return null; // Không hiển thị header khi hideHeader là true

    return (
        <>
            <Header className="site-layout-background">
                <div className="logo">
                    <Link to="/">PetRescue</Link>
                </div>
                <div className="header-content">
                    <Search
                        placeholder="Tìm kiếm"
                        enterButton
                        size="large"
                        className="search-bar"
                        prefix={<SearchOutlined />}
                    />
                    <div className="header-icons">
                        <Badge count={5} className="cart-icon">
                            <ShoppingCartOutlined
                                style={{ fontSize: '24px', color: '#fff' }}
                                onClick={showCart}
                                aria-label="Giỏ hàng"
                            />
                        </Badge>
                    </div>
                    <Link to="/adopt">
                        <Button type="link" className="nav-link">Adopt</Button>
                    </Link>
                    <Link to="/posts">
                        <Button type="link" className="nav-link">Posts</Button>
                    </Link>
                    <Link to="/login">
                        <Button type="link" className="login-link2">Login</Button>
                    </Link>
                    <Link to="/sign-up">
                        <Button type="link" className="sign-up-link">Sign Up</Button>
                    </Link>
                </div>
            </Header>
            <CartModal visible={isCartVisible} onClose={hideCart} />
        </>
    );
}

export default AppHeader;
