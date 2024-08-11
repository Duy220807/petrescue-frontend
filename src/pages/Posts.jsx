import React from 'react';
import './Posts.scss';
import Reels, { reelsData } from '../components/Reels';
import CreatePost from '../components/CreatePost';

const Posts = () => {
    return (
        <div className="posts-container">
            <div className="header-container">
                <h2>Futures</h2>
                <CreatePost className="create-post" />
            </div>
            <Reels />
            <div className="posts-list-container">
                <h2 className="posts-list-title">Danh Sách Bài Đăng</h2>
                <div className="posts-list">
                    {reelsData.map(post => (
                        <div key={post.id} className="post-item">
                            <img src={post.src} alt={post.title} className="post-image" />
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts;
