import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';

const UserManagement = () => {
    const { data: users, loading, error } = useFetchData('http://localhost:8090/api/users');

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error loading users: {error.message}</p>;


    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Actions', key: 'actions', render: (_, record) => (
                <span>
                    <Button type="link">
                        <Link to={`/users/${record.id}`}>Edit</Link>
                    </Button>
                    <Button type="link" danger>Delete</Button>
                </span>
            )
        },
    ];

    return (
        <div>
            <h2>User Management</h2>
            <Button type="primary" style={{ marginBottom: '16px' }}>Add User</Button>
            <Table columns={columns} dataSource={users} rowKey="id" />
        </div>
    );
};

export default UserManagement;
