import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';

const PostManagement = () => {
    const { data: posts, loading, error } = useFetchData('http://localhost:8090/api/posts');

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error loading posts: {error.message}</p>;
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Content', dataIndex: 'content', key: 'content' },
        { title: 'Author', dataIndex: 'author', key: 'author' },
        {
            title: 'Actions', key: 'actions', render: (_, record) => (
                <span>
                    <Button type="link">
                        <Link to={`/posts/${record.id}`}>Edit</Link>
                    </Button>
                    <Button type="link" danger>Delete</Button>
                </span>
            )
        },
    ];

    return (
        <div>
            <h2>Post Management</h2>
            <Button type="primary" style={{ marginBottom: '16px' }}>Add Post</Button>
            <Table columns={columns} dataSource={posts} rowKey="id" />
        </div>
    );
};

export default PostManagement;
