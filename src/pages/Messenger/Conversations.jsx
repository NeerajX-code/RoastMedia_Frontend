import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from "../../store/Actions/chatActions";
import { useNavigate } from "react-router-dom";
import "./Messenger.css";

export default function Conversations() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { conversations } = useSelector((s) => s.ChatReducer);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  return (
    <div className="msgr">
      <aside className="msgr-side" style={{ width: "100%" }}>
        <h3>Chats</h3>
        <ul>
          {conversations.map((c) => (
            <li key={c._id} onClick={() => navigate(`/messages/${c.otherUser._id}`)}>
              <img src={c.otherProfile?.avatarUrl} alt="" />
              <div>
                <div className="name">{c.otherProfile?.displayName || c.otherUser?.username}</div>
                <div className="last">{c.lastMessage}</div>
              </div>
              {c.unreadCount ? <span className="badge">{c.unreadCount}</span> : null}
            </li>
          ))}
          {!conversations.length && (
            <li>
              <div>No chats yet.</div>
            </li>
          )}
        </ul>
      </aside>
    </div>
  );
}
