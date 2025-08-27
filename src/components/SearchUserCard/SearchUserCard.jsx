import React from "react";
import { NavLink } from "react-router-dom";
import "./SearchUserCard.css";
import { useDispatch, useSelector } from "react-redux";
import { followUser as followUserAction, unfollowUser as unfollowUserAction } from "../../store/Actions/followActions";

const SearchUserCard = ({ user }) => {
  if (!user) return null;

  const { userData, avatarUrl, displayName } = user;
  const dispatch = useDispatch();
  const authUser = useSelector((s) => s.userReducer.user);
  const isSelf = authUser?.userId?._id === userData?._id;
  const isFollowing = useSelector((s) => s.FollowReducer.isFollowingMap[userData?._id]);

  const targetHref = isSelf ? "/Profile" : `/other/profile/${userData?._id}`;

  return (
    <NavLink
      to={targetHref}
      className="search-user-card"
    >
      <img
        src={avatarUrl}
        alt={displayName || "User Avatar"}
        className="user-avatar"
      />
      <div className="user-info">
        <h4 className="display-name">{displayName}</h4>
        <p className="username">@{userData?.username}</p>
      </div>
      {!isSelf && (
        <div className="follow-action" onClick={(e) => e.preventDefault()}>
          {isFollowing ? (
            <button className="btn btn-secondary" onClick={() => dispatch(unfollowUserAction(userData?._id))}>Unfollow</button>
          ) : (
            <button className="btn btn-primary" onClick={() => dispatch(followUserAction(userData?._id))}>Follow</button>
          )}
        </div>
      )}
    </NavLink>
  );
};

export default SearchUserCard;

