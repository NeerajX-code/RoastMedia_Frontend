import { useNavigate, useParams } from "react-router-dom";
import "./SinglePost.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSinglePost } from "../../store/Actions/singlePostAction";
import { Forward, Heart, MessageCircle } from 'lucide-react'
import { getOtherUserPosts, getOtherUserProfile } from "../../store/Actions/otherProfileActions";

export default function SinglePostPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { singlePostDetails } = useSelector(state => state.PostDetailsReducer)

  console.log(singlePostDetails[0]);

  const singlePost = singlePostDetails[0];

  useEffect(() => {
    dispatch(asyncSinglePost(id))
  }, [dispatch])


  return (
    <div className="single-post">
      {/* Header */}
      <header className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
            viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
          </svg>
        </button>
        <h2 className="title">Post</h2>
      </header>

      {/* Post Image */}
      <div className="post-body">
        <div className="image-wrapper">
          <img
            src={singlePost?.image}
            alt="post"
            className="post-img"
          />
        </div>
      </div>

      {/* Post Caption & User */}
      <div className="post-details">
        <p className="caption">{singlePost?.caption}</p>
        <div className="user-info">
          <img
            src={singlePost?.userData?.avatarUrl}
            alt="user"
            className="user-avatar"
          />
          <div>
            <h4 className="username">{singlePost?.userData?.displayName}</h4>
            {/* <p className="handle">@{singlePost?.userData?.handle}</p> */}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        <button><Heart /> <span>{singlePost?.likesCount || 0}</span></button>
        <button><MessageCircle /><span>{singlePost?.commentCou || 0}</span></button>
        <button><Forward /><span>{singlePost?.shareCount || 0}</span></button>
      </div>

      {/* Comment Box */}
      <div className="comment-box">
        <input
          type="text"
          placeholder="Add a comment..."
          className="comment-input"
        />
        <button className="send-btn">Send</button>
      </div>
    </div>
  );
}