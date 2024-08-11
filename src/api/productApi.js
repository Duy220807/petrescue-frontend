// src/api/productApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/api';

export const fetchProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
};

// src/api/productApi.js
export const fetchCategories = async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`); // Cập nhật endpoint API
    return response.data;
};

