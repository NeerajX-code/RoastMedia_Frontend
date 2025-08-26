import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { Bell, Bookmark, Ellipsis, Home, Search, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearUser } from "../../store/Reducers/userReducer";
import { asyncLogoutUser } from "../../store/Actions/authActions";
import { getHomePosts } from "../../store/Actions/HomePostActions";

export default function Sidebar() {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(asyncLogoutUser())
    .then(() => {
      dispatch(clearUser());
      dispatch(getHomePosts());
      setShowMenu(false);
    });
  };

  return (
    <nav className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__logo">
          <img src="/logo.svg" alt="Logo" />
        </div>

        <div className="sidebar_menu">
          <NavLink to="/" className="menu-item">
            <span className="icon"><Home /></span>
            <span className="label">Home</span>
          </NavLink>
          <NavLink to="/Search" className="menu-item">
            <span className="icon"><Search /></span>
            <span className="label">Explore</span>
          </NavLink>
          <NavLink to="/Notification" className="menu-item">
            <span className="icon"><Bell /></span>
            <span className="label">Notifications</span>
          </NavLink>
          <NavLink to="/Save" className="menu-item"><span className="icon"><Bookmark /></span>
            <span className="label">My Saves</span></NavLink>
          <NavLink to="/Profile" className="menu-item">
            <span className="icon"><UserRound /></span>
            <span className="label">Profile</span>
          </NavLink>
        </div>
      </div>

      <button onClick={() => navigate("/Post")} className="sidebar_post-btn">Post</button>

      {user && (
        <div className="sidebar__profile">
          <img src={user?.avatarUrl} style={{ objectFit: "cover" }} alt="Profile" className="profile-img" />
          <div className="profile-info">
            <strong>{user?.displayName}</strong>
            <span>@{user?.userId?.username}</span>
          </div>
          <span className="dots" onClick={toggleMenu}><Ellipsis /></span>
          {showMenu && (
            <div className="logout_menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}

      {!user && (
        <div className="sideBar_auth">
          <button onClick={() => navigate("/Register")}>Register</button>
          <button onClick={() => navigate("/Login")}>Login</button>
        </div>
      )}
    </nav>
  );
}
