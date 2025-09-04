import { useNavigate, useParams } from "react-router-dom";
import "./SinglePost.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSinglePost, asyncSingleToggleLike, asyncSingleShare, asyncSingleToggleSave } from "../../store/Actions/singlePostAction";
import { Bookmark, Forward, Heart, MessageCircle } from 'lucide-react'
import { getOtherUserPosts, getOtherUserProfile } from "../../store/Actions/otherProfileActions";
import { asyncDeletePost } from "../../store/Actions/postActions";
import Loading from "../../components/Loader/Loading";
import { useToast } from "../../components/Toast/useToast";

export default function SinglePostPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { singlePostDetails, singlePostLoading } = useSelector(state => state.PostDetailsReducer)

  const authUser = useSelector(state => state.userReducer.user)
  const { toast } = useToast();

  const singlePost = singlePostDetails?.post;

  useEffect(() => {
    if (id) dispatch(asyncSinglePost(id))
  }, [dispatch, id])

  const isOwner = authUser?.userId?._id && singlePost?.userData?.userId
    ? authUser?.userId._id === singlePost?.userData?.userId
    : false;

  const postDeleteHandler = async () => {
    try {
      await dispatch(asyncDeletePost(id));
      toast.success("Post deleted");
      navigate("/Profile");
    } catch (err) {
      toast.error(err?.message || "Not authorized to delete this post");
    }
  }

  if (singlePostLoading) {
    return <Loading />
  }

  return (
    <div className="single-post">
      <header className="header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
            viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
          </svg>
        </button>
        {isOwner && (
          <button className="delete_post" onClick={postDeleteHandler}>Delete Post</button>
        )}
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
        <button onClick={() => {
          if (!authUser) {
            toast.error("Please login to like posts.");
            return;
          }
          dispatch(asyncSingleToggleLike(singlePost?._id));
        }} aria-pressed={singlePost?.isLiked}>
          <Heart fill={singlePost?.isLiked ? "#e0245e" : "none"} stroke={singlePost?.isLiked ? "#e0245e" : "currentColor"} />
          <span>{singlePost?.likesCount || 0}</span>
        </button>

        <button onClick={() => {
          if (!authUser) {
            toast.error("Please login to comment.");
            return;
          }
          navigate(`/Comments/${singlePost?._id}`);
        }}>
          <MessageCircle />
          <span>{singlePost?.commentCount || 0}</span>
        </button>

        <button onClick={async () => {
          dispatch(asyncSingleShare(singlePost?._id));

          const text = `${window.location.origin}/Single-post/${singlePost?._id}`;
          const html = `
                            <a href="${text}" target="_blank">
                           i <strong>Check this Post!</strong><br/>
                            <img src={${singlePost.image}} width="200"/>
                            <p>{${singlePost.caption.replace(/[*"]+/g, "")}}</p>
                            </a>`;

          try {
            await navigator.clipboard.write([
              new ClipboardItem({
                "text/plain": new Blob([text], { type: "text/plain" }),
                "text/html": new Blob([html], { type: "text/html" }),
              }),
            ]);
            alert("Rich content copied to clipboard!");
          } catch (err) {
            console.error("Failed:", err);
          }
        }}>
          <Forward />
          <span>{singlePost?.shareCount || 0}</span>
        </button>

        <button onClick={() => {
          if (!authUser) {
            toast.error("Please login to save posts.");
            return;
          }
          dispatch(asyncSingleToggleSave(singlePost?._id));
        }} aria-pressed={singlePost?.isSaved}>
          <Bookmark fill={singlePost?.isSaved ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
}