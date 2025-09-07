// ChatPage.jsx
import React, { useEffect, useState } from "react";
import socket from "../../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ChatPage.css";


export default function ChatPage() {
  const { otherId } = useParams();
  const { user } = useSelector((s) => s.userReducer);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [online, setOnline] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    if (!socket || !otherId) return;

    socket.emit("joinConversation", { otherId });

    const onConversationMessages = ({ conversationId, messages }) => {
      setConversationId(conversationId);
      setMessages(messages || []);
    };
    const onNewMessage = (msg) => setMessages((prev) => [...prev, msg]);
    const onIsOtherOnline = ({ isOnline }) => setOnline(!!isOnline);
    const onUserOnline = ({ userId }) => { if (userId === otherId) setOnline(true); };
    const onUserOffline = ({ userId }) => { if (userId === otherId) setOnline(false); };

    socket.on("conversationMessages", onConversationMessages);
    socket.on("newMessage", onNewMessage);
    socket.on("isOtherOnline", onIsOtherOnline);
    socket.on("userOnline", onUserOnline);
    socket.on("userOffline", onUserOffline);

    return () => {
      socket.off("conversationMessages", onConversationMessages);
      socket.off("newMessage", onNewMessage);
      socket.off("isOtherOnline", onIsOtherOnline);
      socket.off("userOnline", onUserOnline);
      socket.off("userOffline", onUserOffline);
    };
  }, [otherId]);



  // TODO: Fetch other user info (avatar, name) from your API if not already in Redux

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    socket.emit("sendMessage", { text: input });
    setInput("");
  };
useEffect(() => {
  if (conversationId && messages && messages.length > 0) {
    socket.emit("seenMessages", conversationId);
  }
}, [conversationId, messages]);

// Optionally listen for messagesSeen to update UI (e.g., for status indicators)
useEffect(() => {
  const onMessagesSeen = ({ userId: seenBy, conversationId: seenConvId }) => {
    // Optionally update message statuses in UI if you want to show "seen" indicators
    // For now, just log for debug
    // console.log(`Messages seen by ${seenBy} in conversation ${seenConvId}`);
  };
  socket.on("messagesSeen", onMessagesSeen);
  return () => {
    socket.off("messagesSeen", onMessagesSeen);
  };
}, []);
  return (
    <div className="ig-chat-page">
      <div className="ig-chat-header">
        <div className="ig-chat-avatar">
          {/* Replace with actual avatar */}
          <img src={otherUser?.avatarUrl || "/default-avatar.png"} alt="avatar" />
          <span className={online ? "ig-online" : "ig-offline"}></span>
        </div>
        <div className="ig-chat-userinfo">
          <div className="ig-chat-username">{otherUser?.displayName || `User ${otherId?.slice(0, 6)}`}</div>
          <div className="ig-chat-status">{online ? "Active now" : "Offline"}</div>
        </div>
      </div>
      <div className="ig-chat-messages">
        {messages.map((msg, i) => (
          <div
            key={msg._id || i}
            className={`ig-chat-bubble ${msg.sender === user?.userId?._id ? "ig-outgoing" : "ig-incoming"}`}
          >
            {msg.content || (msg.mediaUrl ? <em>Media</em> : null)}
          </div>
        ))}
      </div>
      <div className="ig-chat-inputbar">
        <input
          type="text"
          placeholder="Message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="ig-send-btn">Send</button>
      </div>
    </div>
  );
}