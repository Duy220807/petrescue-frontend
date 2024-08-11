import React from 'react';
import { Modal, Input, Button, List } from 'antd';
import './ReelDetailModal.scss'

const ReelDetailModal = ({ visible, reel, comments, newComment, setNewComment, handleAddComment, handleCancel }) => {
    return (
        <Modal
            width={1000}
            visible={visible}
            footer={null}
            onCancel={handleCancel}
            title={`Reel ${reel?.id}`}
            className="reel-modal"
        >
            <div className="reel-content">
                <img
                    className="reel-detail-image"
                    alt={`Reel ${reel?.id}`}
                    src={reel?.src}
                />
                <div className="comments-section">
                    <List
                        header={<div>Bình luận</div>}
                        bordered
                        dataSource={comments[reel?.id] || []}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                        style={{
                            marginBottom: 10
                        }}
                    />
                    <Input.TextArea
                        rows={4}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Thêm bình luận..."
                    />
                    <Button
                        type="primary"
                        onClick={handleAddComment}
                        style={{ marginTop: '10px' }}
                    >
                        Thêm Bình Luận
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ReelDetailModal;
