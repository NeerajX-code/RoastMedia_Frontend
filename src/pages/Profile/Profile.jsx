import React, { useEffect } from "react";
import "./Profile.css";
import { getUserPosts, getUserProfile } from "../../store/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, SquarePen } from "lucide-react";
import Loading from "../../components/Loader/Loading";
import { useNavigate } from "react-router-dom";
import ErrorCard from "../../components/ErrorCard/ErrorCard";
import UserPostCard from "../../components/UserPostCard/UserPostCard";

const Profile = () => {
  const { user, posts, profileLoading, profileError, postsLoading, successMessage } =
    useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // load profile if not present
    if (!user && !successMessage) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && !successMessage) {
      setTimeout(() => {
        dispatch(getUserPosts(user?.userId?._id));
      }, 500);
    }
  }, [user]);

  if (profileLoading) return <Loading />;

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
            <p className="stat__label">Followers</p>
          </div>
          <div className="stat">
            <p className="stat__number">{user?.followingCount}</p>
            <p className="stat__label">Following</p>
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
