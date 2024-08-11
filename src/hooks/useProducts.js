// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/productApi';

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                // Đặt độ trễ cho hiển thị Spin
                const timer = setTimeout(() => setShowSpinner(true), 300); // 300ms delay
                const data = await fetchProducts();
                setProducts(data.data);
                clearTimeout(timer); // Xóa timer khi dữ liệu đã được tải
            } catch (error) {
                setError('Failed to load products. Please try again later.');
                console.error('Failed to load products', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error, showSpinner };
};
