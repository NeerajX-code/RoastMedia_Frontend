import React, { useState } from "react";
import "./Profile.css";
import { getUserPosts, getUserProfile } from "../../store/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ArrowLeft, SquarePen } from "lucide-react";
import Loading from "../../components/Loader/Loading";
import EditUserDetails from "../EditUserDetails/EditUserDetails";
import { useNavigate } from "react-router-dom";
import ErrorCard from "../../components/ErrorCard/ErrorCard";

const Profile = () => {
  const { user, posts, profileLoading, profileError, postsLoading, successMessage, postsError } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    // load profile if not present
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    // once user is available, fetch posts
    if (user?._id && !successMessage) {
      dispatch(getUserPosts(user._id));
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
    <div className="profile" style={{ position: 'relative' }}>
      <div className="profile__nav">
        <div className="profile__back-btn">
          <ArrowLeft size={30} onClick={handleBackBtn} />
        </div>

        <h2 className="profile__username">{user?.displayName}</h2>

        <SquarePen className="profile__edit-btn" onClick={handleEditProfile} />
      </div>

      {profileError && <ErrorCard message={profileError} action={() => dispatch(getUserPosts(user._id))} loading={profileLoading} />}

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
