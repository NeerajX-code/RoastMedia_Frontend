import React from "react";
import { NavLink } from "react-router-dom";
import "./SearchUserCard.css";

const SearchUserCard = ({ user }) => {
  if (!user) return null;

  const { userData, avatarUrl, displayName } = user;

  return (
    <NavLink
      to={`/other/profile/${userData?._id}`}
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
    </NavLink>
  );
};

export default SearchUserCard;

