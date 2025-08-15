import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { Bell, Ellipsis, EllipsisVertical, Home, Search, UserRound } from "lucide-react";

export default function Sidebar() {

  const navigate = useNavigate();
  
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
          <NavLink to="/Profile" className="menu-item">
            <span className="icon"><UserRound /></span>
            <span className="label">Profile</span>
          </NavLink>
        </div>
      </div>

      <button onClick={() => navigate("/Post")} className="sidebar_post-btn">Post</button>

      <div className="sidebar__profile">
        <img src="/profile.jpg" alt="Profile" className="profile-img" />
        <div className="profile-info">
          <strong>Neeraj Rathore</strong>
          <span>@Neeraj047975225</span>
        </div>
        <span className="dots"><Ellipsis /></span>
      </div>
    </nav>
  );
}
