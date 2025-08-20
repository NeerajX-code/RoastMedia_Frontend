import React, { useState } from "react";
import "./Profile.css";
import { getUserPosts, getUserProfile } from "../../store/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ArrowLeft, SquarePen } from "lucide-react";
import Loading from "../../components/Loader/Loading";
import EditUserDetails from "../EditUserDetails/EditUserDetails";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, posts, profileLoading, postsLoading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(async () => {
    if (!user) {
      await dispatch(getUserProfile());

      if (user) {

        setTimeout(() => {
          dispatch(getUserPosts(user?.userId?._id));
        }, 500);
      }

      //  https://roastmedia-backend.onrender.com/api/post/get/posts/user/undefined 
    }


    if (user) {
      console.log(user);
    }
  }, [dispatch, user]);


  if (profileLoading) return (
    <Loading />
  )

  const handleEditProfile = () => {
    navigate("/Edit-user-profile");
  };

  const handleBackBtn = () => {
    navigate("/");
  };

  return (
    <div className="profile">
      <div className="profile__nav">
        <div className="profile__back-btn">
          <ArrowLeft size={30} onClick={handleBackBtn} />
        </div>

        <h2 className="profile__username">{user?.displayName}</h2>

        <SquarePen className="profile__edit-btn" onClick={handleEditProfile} />
      </div>

      <div className="info_wrapper">
        <div className="profile__info">
          <div className="profile__avatar" style={{ backgroundImage: `url(${user?.avatarUrl})` }}></div>

          <div className="user_info">
            <p className="profile__name">{user?.displayName}</p>
            <p className="profile__role">{user?.userId?.username}</p>
            <p className="profile__joined">Joined 2021</p>
          </div>
        </div>

        <div className="profile__stats">
          <div className="stat">
            <p className="stat__number">{user?.
              followersCount} </p>
            <p className="stat__label">Followers</p>
          </div>
          <div className="stat">
            <p className="stat__number">{user?.followingCount}</p>
            <p className="stat__label">Following</p>
          </div>
        </div>

        <p className="profile__bio">
          {user?.bio}
        </p>

        <div className="profile__tabs">
          <a href="#" className="active">Posts</a>
        </div>

        {postsLoading ? (
          <div style={{ flex: "1", padding: "4rem 1rem", textAlign: "center" }}>
            <p>Posts Fetching...</p>
          </div>
        ) : posts?.length > 0 ? (
          <div className="profile__posts">
            {posts.map((post, i) => (
              <UserPostCard key={i} post={post} />
            ))}
          </div>
        ) : (
          <p style={{ width: "100%", padding: "4rem 1rem", textAlign: "center" }}>No posts yet.</p>
        )}
      </div>

    </div>
  );
};

export default Profile;
