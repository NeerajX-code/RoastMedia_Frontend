import React, { useEffect, useState } from "react";
import "./Profile.css";
import { getUserPosts, getUserProfile } from "../../store/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Ellipsis, EllipsisVertical, SquarePen } from "lucide-react";
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
  // Theme is now controlled globally from Navbar ThemeToggle

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    // load profile if not present
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

  // (removed) per global ThemeToggle

  if (profileLoading) return <Loading />;

  const handleEditProfile = () => {
    navigate("/Edit-user-profile");
  };

  const handleLogout = () => {
    console.log("clicked");

    dispatch(asyncLogoutUser())
      .then(() => {
        dispatch(clearUser());
        dispatch(getHomePosts());
        navigate("/login");
      });

  }

  const handleBackBtn = () => {
    navigate(-1);
  };

  // (removed) local theme list and picker

  return (
    <div className="profile">
      <div className="profile__nav">
        <div className="profile__back-btn">
          <ArrowLeft size={30} onClick={handleBackBtn} />
        </div>

        <h2 className="profile__username">{user?.displayName}</h2>

        <SquarePen className="profile__edit-btn" onClick={handleEditProfile} />

        {/* <EllipsisVertical onClick={logoutHandler} /> */}

        <span className="dots" onClick={toggleMenu}>
          <EllipsisVertical />
        </span>

        {showMenu && (
          <div className="logout_menu">
            <button onClick={handleLogout}>Logout</button>
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
