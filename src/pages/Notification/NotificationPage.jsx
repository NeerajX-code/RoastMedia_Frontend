import React, { useEffect } from "react";
import "./NotificationPage.css";
import { MoveLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, fetchUnreadCount, markAllRead } from "../../store/Actions/notificationActions";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector(s => s.NotificationReducer);
  const me = useSelector(s => s.userReducer.user);

  const formatDate = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    const dd = String(d.getDate()).padStart(2, '0');
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    const mon = months[d.getMonth()] || "";
    return `${dd} ${mon}`;
  };

  const formatTime = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12; // 0 => 12
    return `${h}:${m} ${ampm}`;
  };

  useEffect(() => {
    const refresh = async () => {
      await dispatch(fetchNotifications());
      // If the notifications page is visible/active, mark all read so the red dot clears
      if (document.visibilityState === 'visible') {
        await dispatch(markAllRead());
      }
      await dispatch(fetchUnreadCount());
    };

    // initial load
    refresh();

    // periodic refresh
    const id = setInterval(refresh, 10000);
    const onFocus = () => { refresh(); };
    const onVisibility = () => { if (document.visibilityState === 'visible') refresh(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearInterval(id);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
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
    items.map((item) => (
      <div
        className="notification-item"
        key={item?._id || `${item?.actor?._id}-${item?.post?._id}-${item?.type}-${item?.createdAt}`}
        role="button"
        onClick={() => item?.type === 'comment' ? goToComments(item?.post?._id) : goToPost(item?.post?._id)}
      >
        <div
          className="avatar"
          onClick={(e) => { e.stopPropagation(); goToActor(item?.actor?._id); }}
          style={{ backgroundImage: `url(${item?.actorProfile?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${item?.actor?.username || 'U'}`})` }}
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
          <p className="time">{formatDate(item.createdAt)} · {formatTime(item.createdAt)}</p>
          {/* {item?.post?.caption && (
            <p className="post-snippet">
              {item.post.caption.length > 80 ? `${item.post.caption.slice(0, 80)}…` : item.post.caption}
            </p>
          )} */}
        </div>
        
        {item?.post?.image && (
          <div
            className="thumb"
            aria-label="post thumbnail"
            onClick={(e) => { e.stopPropagation(); item?.type === 'comment' ? goToComments(item?.post?._id) : goToPost(item?.post?._id); }}
            style={{ 
              backgroundImage: `url(${item?.post?.image})`,
               width: '50px',
               height: '50px',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
          }}
          />
        )}
      </div>
    ));

  return (
    <div className="notification-page">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-btn" aria-label="Go back" style={{
          background: "none",
          border: "none",
          color: "white",
          outline: "none",
          cursor: "pointer",
        }}>
          <i className="ri-arrow-left-line" style={{
            fontSize: "24px",
            color: "white"
          }}></i>
        </button>

        <h2>Notifications</h2>
      </div>

      {/* Keep list mounted to avoid scroll jumps; show small inline refresher */}
      {items?.length ? (
        <>
          {renderList(items)}
          {loading && <p style={{ padding: 8, opacity: 0.7, fontSize: 12 }}>Refreshing…</p>}
        </>
      ) : loading ? (
        <p style={{ padding: 16 }}>Loading...</p>
      ) : (
        <div className="notifications-empty">
          <div className="empty-emoji" aria-hidden>🔔</div>
          <h3>You're all caught up</h3>
          <p>Likes and comments will show up here.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
