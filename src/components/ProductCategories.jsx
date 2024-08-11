import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { fetchCategories } from '../api/productApi'; // Cập nhật API tương ứng
import './ProductCategories.scss';  // Nhập tệp SCSS

const ProductCategories = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data.data);
            } catch (error) {
                console.error('Failed to load categories', error);
            }
        };

        loadCategories();
    }, []);

    return (
        <Menu
            mode="inline"
            className="category-menu"  // Áp dụng lớp SCSS
            onClick={e => onCategorySelect(e.key)}
        >
            {categories.map(category => (
                <Menu.Item key={category.id}>
                    {category.name}
                </Menu.Item>
            ))}
        </Menu>
    );
};

export default ProductCategories;
