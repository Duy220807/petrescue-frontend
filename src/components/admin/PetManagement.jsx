import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import useFetchData from '../../hooks/useFetchData';

const PetManagement = () => {
    const { data: pets, loading, error } = useFetchData('http://localhost:8090/api/pets');

    if (loading) return <p>Loading pets...</p>;
    if (error) return <p>Error loading pets: {error.message}</p>;


    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        {
            title: 'Actions', key: 'actions', render: (_, record) => (
                <span>
                    <Button type="link">
                        <Link to={`/pets/${record.id}`}>Edit</Link>
                    </Button>
                    <Button type="link" danger>Delete</Button>
                </span>
            )
        },
    ];

    return (
        <div>
            <h2>Pet Management</h2>
            <Button type="primary" style={{ marginBottom: '16px' }}>Add Pet</Button>
            <Table columns={columns} dataSource={pets.content} rowKey="id" />
        </div>
    );
};

export default PetManagement;
