import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__logo">
          <img src="/logo.svg" alt="Logo" />
        </div>

        <div className="sidebar__menu">
          <NavLink to="/" className="menu-item">
            <span className="icon">🏠</span>
            <span className="label">Home</span>
          </NavLink>
          <NavLink to="/explore" className="menu-item">
            <span className="icon">🔍</span>
            <span className="label">Explore</span>
          </NavLink>
          <NavLink to="/notifications" className="menu-item">
            <span className="icon">🔔</span>
            <span className="label">Notifications</span>
          </NavLink>
          <NavLink to="/messages" className="menu-item">
            <span className="icon">✉️</span>
            <span className="label">Messages</span>
          </NavLink>
          <NavLink to="/profile" className="menu-item">
            <span className="icon">👤</span>
            <span className="label">Profile</span>
          </NavLink>
        </div>
      </div>

      <button className="sidebar__post-btn">Post</button>

      <div className="sidebar__profile">
        <img src="/profile.jpg" alt="Profile" className="profile-img" />
        <div className="profile-info">
          <strong>Neeraj Rathore</strong>
          <span>@Neeraj047975225</span>
        </div>
        <span className="dots">⋯</span>
      </div>
    </nav>
  );
}
