import React from "react";
import { NavLink } from "react-router-dom";
import "./SearchUserCard.css";

const SearchUserCard = ({ user }) => {
  return (
    <NavLink to={`/other/profile/${user.userData?._id}`} className="search-user-card">
      <img
        src={user.avatarUrl}
        alt={user.displayName}
        className="user-avatar"
      />
      <div className="user-info">
        <h4 className="display-name">{user.displayName}</h4>
        <p className="username">@{user.userData?.username}</p>
      </div>
      
    </NavLink>
  );
};

export default SearchUserCard;
