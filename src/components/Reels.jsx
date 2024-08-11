import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { HeartOutlined } from '@ant-design/icons'; // Import biểu tượng yêu thích
import ReelDetailModal from './ReelDetailModal'; // Import thành phần mới
import './Reels.scss';
import reel1 from '../assets/reel1.jpg';
import reel2 from '../assets/reel2.jpg';
import reel3 from '../assets/reel3.jpg';
import reel4 from '../assets/reel4.jpg';
import reel5 from '../assets/reel5.jpg';

export const reelsData = [
    { id: 1, src: reel1, title: 'Reel 1', liked: false },
    { id: 2, src: reel2, title: 'Reel 2', liked: false },
    { id: 3, src: reel3, title: 'Reel 3', liked: false },
    { id: 4, src: reel4, title: 'Reel 4', liked: false },
    { id: 5, src: reel5, title: 'Reel 5', liked: false },
    // Thêm nhiều hình ảnh hơn nếu cần
];

const Reels = () => {
    const [loading, setLoading] = useState(true);
    const [reels, setReels] = useState([]);
    const [selectedReel, setSelectedReel] = useState(null);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Giả lập việc load dữ liệu
        setTimeout(() => {
            setReels(reelsData);
            setLoading(false);
        }, 1000);
    }, []);

    const handleCardClick = (reel) => {
        setSelectedReel(reel);
        setComments({
            ...comments,
            [reel.id]: comments[reel.id] || []
        });
    };

    const handleModalCancel = () => {
        setSelectedReel(null);
        setNewComment('');
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments({
                ...comments,
                [selectedReel.id]: [...(comments[selectedReel.id] || []), newComment]
            });
            setNewComment('');
        }
    };

    const handleLikeClick = (e, id) => {
        e.stopPropagation(); // Ngăn sự kiện click tràn từ icon ra ngoài
        setReels(reels.map(reel =>
            reel.id === id ? { ...reel, liked: !reel.liked } : reel
        ));
    };

    return (
        <div className="reels-container">
            {loading ? (
                <div className="reels-loading">
                    <Spin size="large" />
                </div>
            ) : (
                <div className="reels-gallery">
                    {reels.map((reel) => (
                        <Card
                            key={reel.id}
                            cover={
                                <div className="reels-image-wrapper" onClick={() => handleCardClick(reel)}>
                                    <img
                                        className="reels-image"
                                        alt={`Reel ${reel.id}`}
                                        src={reel.src}
                                    />
                                    <div className="reels-overlay">
                                        <h3>{reel.title}</h3>
                                        <HeartOutlined
                                            className={`like-icon ${reel.liked ? 'liked' : ''}`}
                                            onClick={(e) => handleLikeClick(e, reel.id)}
                                        />
                                    </div>
                                </div>
                            }
                            style={{ height: 470 }}
                        />
                    ))}
                </div>
            )}
            {selectedReel && (
                <ReelDetailModal
                    visible={!!selectedReel}
                    reel={selectedReel}
                    comments={comments}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleAddComment={handleAddComment}
                    handleCancel={handleModalCancel}
                />
            )}
        </div>
    );
};

export default Reels;
