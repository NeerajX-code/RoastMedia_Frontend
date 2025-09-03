import React, { useEffect, useState } from "react";
import "./Profile.css";
import { getUserPosts, getUserProfile } from "../../store/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Ellipsis, EllipsisVertical, LogOut, SquarePen, X } from "lucide-react";
import Loading from "../../components/Loader/Loading";
import { useNavigate } from "react-router-dom";
import ErrorCard from "../../components/ErrorCard/ErrorCard";
import UserPostCard from "../../components/UserPostCard/UserPostCard";
import { asyncLogoutUser } from "../../store/Actions/authActions";
import { clearUser } from "../../store/Reducers/userReducer";
import { getHomePosts } from "../../store/Actions/HomePostActions";

const Profile = () => {
  const { user, posts, profileLoading, profileError, postsLoading, successMessage } =
    useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!user && !successMessage) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user, successMessage]);

  useEffect(() => {
    if (user && !successMessage) {
      setTimeout(() => {
        dispatch(getUserPosts(user?.userId?._id));
      }, 500);
    }
  }, [user, successMessage, dispatch]);

  const handleEditProfile = () => {
    navigate("/Edit-user-profile");
  };

  const handleLogout = () => {
    dispatch(asyncLogoutUser())
      .then(() => {
        dispatch(clearUser());
        dispatch(getHomePosts());
        navigate("/login");
      })
      .finally(() => setShowConfirm(false));
  };

  const handleBackBtn = () => {
    navigate(-1);
  };

  if (profileLoading) {
    return <Loading />
  }

  return (
    <div className="profile">
      <div className="profile__nav">
        <div className="profile__back-btn">
          <ArrowLeft size={30} onClick={handleBackBtn} />
        </div>

        <h2 className="profile__username">{user?.displayName}</h2>

        <span className="dots" onClick={toggleMenu}>
          {!showMenu && <EllipsisVertical />}
          {showMenu && <X className="profile__close-btn" />}
        </span>

        {showMenu && (
          <div className="profile__menu">
            <span onClick={handleEditProfile} className="profile__edit">
              <SquarePen className="profile__edit-btn" />
              Edit
            </span>
            <button onClick={() => setShowConfirm(true)}> <LogOut /> Logout</button>
          </div>
        )}

        {showConfirm && (
          <div style={{
            position: 'absolute',
            top: '60px',
            right: '12px',
            background: 'rgba(32,32,32,0.95)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '10px',
            padding: '12px',
            minWidth: '220px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
          }}>
            <div style={{ marginBottom: '10px', fontWeight: 600 }}>Logout?</div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowConfirm(false)} style={{
                background: 'transparent',
                color: '#d1d5db',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '6px 10px',
                cursor: 'pointer'
              }}>No</button>
              <button onClick={handleLogout} style={{
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 10px',
                cursor: 'pointer'
              }}>Yes</button>
            </div>
          </div>
        )}
      </div>

      {profileError && (
        <ErrorCard
          message={profileError}
          action={() => dispatch(getUserPosts(user._id))}
          loading={profileLoading}
        />
      )}

      <div className="info_wrapper">
        <div className="profile__info">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${user?.avatarUrl})` }}
          ></div>

          <div className="user_info">
            <p className="profile__name">{user?.displayName}</p>
            <p className="profile__role">{user?.userId?.username}</p>
            <p className="profile__joined">Joined 2021</p>
          </div>
        </div>

        <div className="profile__stats">
          <div className="stat">
            <p className="stat__number">{user?.followersCount}</p>
            <p className="stat__label" onClick={() => navigate(`/profile/${user?.userId?._id}/followers`)} style={{ cursor: "pointer" }}>Followers</p>
          </div>

          <div className="stat">
            <p className="stat__number">{user?.followingCount}</p>
            <p className="stat__label" onClick={() => navigate(`/profile/${user?.userId?._id}/following`)} style={{ cursor: "pointer" }}>Following</p>
          </div>
        </div>

        <p className="profile__bio">{user?.bio}</p>

        <div className="profile__tabs">
          <a href="#" className="active">
            Posts
          </a>
        </div>

        {postsLoading ? (
          <div className="profile__loading-text">
            <p>Posts Fetching...</p>
          </div>
        ) : posts?.length > 0 ? (
          <div className="profile__posts">
            {posts.map((post, i) => (
              <UserPostCard key={i} post={post} />
            ))}
          </div>
        ) : (
          <p className="profile__no-posts">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
