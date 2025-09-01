import React, { useEffect } from "react";
import "./NotificationPage.css";
import { Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, fetchUnreadCount, markAllRead } from "../../store/Actions/notificationActions";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector(s => s.NotificationReducer);
  const me = useSelector(s => s.userReducer.user);

  useEffect(() => {
    dispatch(fetchNotifications());
    dispatch(fetchUnreadCount());
    // mark as read when open
    dispatch(markAllRead());
  }, [dispatch]);

  const goToActor = (actorId) => {
    if (!actorId) return;
    const myId = me?.userId?._id;
    if (myId && actorId === myId) {
      navigate("/Profile");
    } else {
      navigate(`/other/profile/${actorId}`);
    }
  };

  const goToPost = (postId) => {
    if (!postId) return;
    navigate(`/Single-post/${postId}`);
  };

  const goToComments = (postId) => {
    if (!postId) return;
    navigate(`/Comments/${postId}`);
  };

  const renderList = (items) =>
    items.map((item, i) => (
      <div
        className="notification-item"
        key={i}
        role="button"
        onClick={() => goToPost(item?.post?._id)}
      >
        <div
          className="avatar"
          onClick={(e) => { e.stopPropagation(); goToActor(item?.actor?._id); }}
          style={{ backgroundImage: `url(https://api.dicebear.com/7.x/initials/svg?seed=${item?.actor?.username || 'U'})` }}
        ></div>
        <div className="content">
          <p className="text">
            <strong
              className="actor"
              onClick={(e) => { e.stopPropagation(); goToActor(item?.actor?._id); }}
            >
              @{item?.actor?.username}
            </strong>
            {" "}
            {item.type === 'like' ? 'liked your post' : 'commented on your post'}
            {item.type === 'comment' && item?.comment?.comment && (
              <>
                : <span className="comment-text">{item.comment.comment}</span>
              </>
            )}
          </p>
          <p className="time">{new Date(item.createdAt).toLocaleString()}</p>
        </div>
    {item?.post?.image && (
          <div
            className="thumb"
            aria-label="post thumbnail"
      onClick={(e) => { e.stopPropagation(); item?.type === 'comment' ? goToComments(item?.post?._id) : goToPost(item?.post?._id); }}
            style={{ backgroundImage: `url(${item.post.image})` }}
          />
        )}
      </div>
    ));

  return (
    <div className="notification-page">
      <div className="header">
        <h2>Notifications</h2>
        <button className="settings-btn">
        <Settings />
        </button>
      </div>
      {loading ? (
        <p style={{ padding: 16 }}>Loading...</p>
      ) : items?.length ? (
        renderList(items)
      ) : (
        <p style={{ padding: 16 }}>No notifications yet.</p>
      )}
    </div>
  );
};

export default NotificationPage;
