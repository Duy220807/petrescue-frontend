import React, { useState } from 'react';
import { Modal, Button, Upload, Form, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './CreatePost.scss';

const CreatePost = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        // Giả lập việc upload
        setTimeout(() => {
            message.success('Bài post đã được tạo thành công!');
            setLoading(false);
            setIsModalOpen(false);
        }, 2000);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUploadChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} đã tải lên thành công.`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} tải lên thất bại.`);
        }
        setFileList(info.fileList);
    };

    return (
        <div className="create-post-container">
            <Button type="primary" onClick={showModal}>
                Tạo Bài Post
            </Button>
            <Modal
                title="Tạo Bài Post"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
            >
                <Form layout="vertical">
                    <Form.Item label="Tiêu đề">
                        <Input placeholder="Nhập tiêu đề bài post" />
                    </Form.Item>
                    <Form.Item label="Mô tả">
                        <Input.TextArea rows={4} placeholder="Nhập mô tả bài post" />
                    </Form.Item>
                    <Form.Item label="Tải lên hình ảnh">
                        <Upload
                            action="/upload"
                            listType="picture"
                            fileList={fileList}
                            onChange={handleUploadChange}
                        >
                            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CreatePost;
