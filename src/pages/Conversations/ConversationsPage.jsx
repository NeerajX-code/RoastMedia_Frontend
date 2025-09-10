import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ConversationsPage.css";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import socket from '../../utils/socket'

export default function ConversationsPage() {

  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [flag, setFlag] = useState(false)

  const { user } = useSelector((s) => s.userReducer);


  useEffect(() => {
    socket.emit("getConversations", {});

    socket.on("conversationsList", (data) => {
      setConversations(data.conversations);
      setFlag(true)
    });

    socket.on("messagesSeen" , ({ conversationId, userId }) => {
      setConversations((prevConvs) =>
        prevConvs.map((conv) =>
          conv._id === conversationId
            ? { ...conv, unreadCounts: { ...conv.unreadCounts, [userId]: 0 } }
            : conv
        )
      );
    });

    console.log("conversations", conversations);
  }, []);

  return (
    <div className="conversations-page">
      <div className="conversations-header">
        <ArrowLeft size={32} style={{
          cursor: 'pointer'
        }} onClick={() => navigate(-1)} />
        <h2>Chats</h2>
      </div>

      <div className="conversations-list">
        {conversations.length === 0 && <div>No conversations yet.</div>}

        {conversations.map((conv) => {
          // Find the other user (not me)
          const other = conv.participants.find(
            (u) => String(u._id) !== String(user?.userId?._id)
          );

          console.log(conv.unreadCounts[user.userId._id]);


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
    </div>
  );
}
