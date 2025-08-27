import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./UserPostCard.css";

const UserPostCard = ({ post }) => {
    const navigate = useNavigate()

    return (
        <div className="user-post-card" >
            <div className="post-image" onClick={() => {
                navigate(`/Single-post/${post._id}`)
            }}>
                <img src={post.image} alt="post" />
            </div>

            {/* <div className="post-caption">
                <p>{post.caption}</p>
            </div> */}

            <div className="post-footer">
                <span>
                    <i className="fa-slab fa-regular fa-heart"></i>
                    {""} {post.likesCount}
                </span>

                <span>
                    <i className="fa-regular fa-comment"></i>
                    {""}  {post.commentCount}
                </span>
                
                <span>
                    <i className="ri-share-forward-line"></i>
                    {""} {post.shareCount}
                </span>

                <span>
                    <i className="fa-regular fa-bookmark"></i>
                    {""} {post.saveCount}
                </span>
            </div>
        </div>
    );
};

export default UserPostCard;
