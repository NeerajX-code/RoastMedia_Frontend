import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ConversationsPage.css";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import socket from '../../utils/socket'

export default function ConversationsPage() {

  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);

  const { user } = useSelector((s) => s.userReducer);


  useEffect(() => {
    socket.emit("getConversations", {});

    socket.on("conversationsList", (data) => {
      setConversations(data.conversations);
    });

    socket.on("updatedConversation", (data) => {
      setConversations((prevConvs) =>
        prevConvs.map((conv) =>
          conv._id.toString() === data._id.toString()
            ? { ...conv, unreadCounts: data.unreadCounts, lastMessage: data.lastMessage }
            : conv
        )
      );
    })

    return () => {
      socket.off("conversationsList");
      socket.off("updatedConversation");
    }
  }, []);

  return (
    <div className="conversations-page">
      <div className="conversations-header">
        <ArrowLeft className="arrow-left" size={32} style={{
          cursor: 'pointer'
        }} onClick={() => navigate(-1)} />
        <h2>Chats</h2>
      </div>

      {conversations.length === 0 && <div className="no-conversations">No conversations yet.</div>}

      {conversations.length > 0 && <div className="conversations-list">

        {conversations.map((conv) => {
          const other = conv.participants.find(
            (u) => String(u._id) !== String(user?.userId?._id)
          );


          return (
            <div
              className="conversation-item"
              key={conv._id}
              onClick={() => navigate(`/chat/${conv?.otherParticipantId}`)}
            >
              <img
                src={conv?.otherParticipantData?.avatarUrl || "/default-avatar.png"}
                alt={conv?.otherParticipantData?.displayName || "User"}
                className="conversation-avatar"
              />
              <div className="conversation-info">
                <div className="conversation-name">
                  {conv?.otherParticipantData?.displayName || "User"}
                </div>

                <div className="conversation-lastmsg">
                  {conv.lastMessage || <em>No messages yet</em>}
                </div>
              </div>

              <div className="unreadCounts">
                {conv.unreadCounts[String(user.userId._id)] > 0 &&
                  <div className="unread-badge" style={{
                    color: 'white', backgroundColor: 'red'
                  }}>{conv.unreadCounts[String(user.userId._id)]}</div>
                }
              </div>
            </div>
          );
        })}

      </div>
      }
    </div>
  );
}
