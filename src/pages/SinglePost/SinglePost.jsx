import { useNavigate, useParams } from "react-router-dom";
import "./SinglePost.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSinglePost, asyncSingleToggleLike, asyncSingleShare, asyncSingleToggleSave } from "../../store/Actions/singlePostAction";
import { Bookmark, Forward, Heart, MessageCircle } from 'lucide-react'
import { getOtherUserPosts, getOtherUserProfile } from "../../store/Actions/otherProfileActions";

export default function SinglePostPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { singlePostDetails } = useSelector(state => state.PostDetailsReducer)

  console.log(singlePostDetails[0]);

  const singlePost = singlePostDetails[0];

  useEffect(() => {
    if (id) dispatch(asyncSinglePost(id))
  }, [dispatch, id])


  return (
    <div className="single-post">
      <header className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
            viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
          </svg>
        </button>
        <h2 className="title">Post</h2>
      </header>

      <div className="profile-content">
        <div className="image-wrapper">
          <img
            src={singlePost?.image}
            alt="post"
            className="post-img"
          />
        </div>

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
            </div>
          </div>
        </div>
      </div>

       <div className="actions">
          <button onClick={() => dispatch(asyncSingleToggleLike(singlePost?._id))} aria-pressed={singlePost?.isLiked}>
            <Heart color={singlePost?.isLiked ? "#e0245e" : "currentColor"} />
            <span>{singlePost?.likesCount || 0}</span>
          </button>

          <button onClick={() => navigate(`/Comments/${singlePost?._id}`)}>
            <MessageCircle />
            <span>{singlePost?.commentCount || 0}</span>
          </button>

          <button onClick={() => dispatch(asyncSingleShare(singlePost?._id))}>
            <Forward />
            <span>{singlePost?.shareCount || 0}</span>
          </button>

          <button onClick={() => dispatch(asyncSingleToggleSave(singlePost?._id))} aria-pressed={singlePost?.saved}>
            <Bookmark fill={singlePost?.saved ? "currentColor" : "none"} />
          </button>
        </div>
    </div>
  );
}