import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';


const ProductManagement = () => {
    const { data: products, loading, error } = useFetchData('http://localhost:8090/api/products');

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products: {error.message}</p>;


    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        { title: 'Category', dataIndex: 'category', key: 'category' },
        {
            title: 'Actions', key: 'actions', render: (_, record) => (
                <span>
                    <Button type="link">
                        <Link to={`/products/${record.id}`}>Edit</Link>
                    </Button>
                    <Button type="link" danger>Delete</Button>
                </span>
            )
        },
    ];

    return (
        <div>
            <h2>Product Management</h2>
            <Button type="primary" style={{ marginBottom: '16px' }}>Add Product</Button>
            <Table columns={columns} dataSource={products} rowKey="id" />
        </div>
    );
};

export default ProductManagement;
