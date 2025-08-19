import React from "react";
import { NavLink } from "react-router-dom";
import "./UserPostCard.css";

const UserPostCard = ({ post }) => {
    return (
        <div className="user-post-card">
            <div className="post-image">
                <img src={post.image} alt="post" />
            </div>

            {/* 🔹 Caption */}
            <div className="post-caption">
                <p>{post.caption}</p>
            </div>

            {/* 🔹 Footer Info */}
            <div className="post-footer">
                <span>❤️ {post.likesCount}</span>
                <span>💬 {post.commentCount}</span>
                <span>💾 {post.saveCount}</span>
                <span>🔗 {post.shareCount}</span>
            </div>
        </div>
    );
};

export default UserPostCard;
