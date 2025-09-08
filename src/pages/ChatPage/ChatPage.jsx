import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { Check, CheckCheck } from "lucide-react";
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


  function MessageBubble({ sender, text, status }) {
    return (
      <div className={`ig-chat-bubble ${String(sender) === "user"
        ? "ig-outgoing"
        : "ig-incoming"
        }`}>
        <span>{text}</span>
        {sender === "user" && (
          <span className="msg-status">
            {status === "sent" && <Check size={16} />}
            {status === "delivered" && <CheckCheck size={16} />}
            {status === "seen" && <CheckCheck size={16} style={{ color: "#0f37ead3" }} />}
          </span>
        )}
      </div>
    );
  }

  useEffect(() => {
    if (!socket || !otherId) return;

    console.log("Joining conversation with:", otherId);

    socket.emit("joinConversation", { otherId });

    const onConversationMessages = ({ conversationId, messages }) => {
      console.log("📂 Got conversation messages:", { conversationId, messages });
      setConversationId(conversationId);
      setMessages(messages || []);
    };

    const onNewMessage = (msg) => {
      console.log("✉️ New message:", msg);
      setMessages((prev) => [...prev, msg]);
    };

    const onIsOtherOnline = ({ isOnline }) => setOnline(!!isOnline);
    const onUserOnline = ({ userId }) => {
      if (String(userId) === String(otherId)) setOnline(true);
    };

    socket.on("conversationMessages", onConversationMessages);
    socket.on("newMessage", onNewMessage);
    socket.on("isOtherOnline", onIsOtherOnline);
    socket.on("userOnline", onUserOnline);

    return () => {
      socket.off("conversationMessages", onConversationMessages);
      socket.off("newMessage", onNewMessage);
      socket.off("isOtherOnline", onIsOtherOnline);
      socket.off("userOnline", onUserOnline);
    };
  }, [otherId]);

  // Send message
  const sendMessage = () => {
    if (!input.trim() || !socket || !conversationId) return;
    socket.emit("sendMessage", { conversationId, otherId, text: input });
    setInput("");
  };

  // Auto mark messages as seen
  useEffect(() => {
    if (!conversationId || !messages || messages.length === 0) return;

    const hasUnseenFromOther = messages.some(
      (m) =>
        String(m.sender) === String(otherId) && String(m.status) !== "seen"
    );

    if (hasUnseenFromOther) {
      // optional: debounce a little to avoid rapid repeat emits
      socket.emit("seenMessages", conversationId);
    }
  }, [conversationId, messages, otherId]);

  /* --- 2) Listen for messagesSeen and update messages safely --- */
  useEffect(() => {
    const onMessagesSeen = ({ userId: seenBy, conversationId: seenConvId }) => {
      console.log(`👀 Messages seen by ${seenBy} in conversation ${seenConvId}`);

      // mark messages whose receiver === seenBy as 'seen'
      setMessages((prev) =>
        prev.map((m) =>
          String(m.receiver) === String(seenBy) && m.status !== "seen"
            ? { ...m, status: "seen" }
            : m
        )
      );
    };

    const onUserOffline = ({ userId }) => {
      if (String(userId) === String(otherId)) setOnline(false);
      console.log("userId:", userId);
      console.log("otherId:",otherId);
      console.log(online);
    };

    socket.on("userOffline", onUserOffline);
    socket.on("messagesSeen", onMessagesSeen);
    socket.on("messagesDelivered", ({ conversationId, userId }) => {
      console.log(`✅ Messages delivered to ${userId} in conversation ${conversationId}`);
      if (String(userId) !== String(otherId)) return;
      setMessages((prev) =>
        prev.map((m) =>
          m.conversationId.toString() === conversationId && m.receiver.toString() === userId && String(m.status) == "sent" ? { ...m, status: "delivered" } : m
        )
      );
    });
    return () => {
      socket.off("messagesSeen", onMessagesSeen);
      socket.off("userOffline", onUserOffline);
      socket.off("messagesDelivered");
    };
  }, []); // this handler uses setMessages(prev => ...) so it's safe to keep [] deps

  return (
    <div className="ig-chat-page">
      <div className="ig-chat-header">
        <div className="ig-chat-avatar">
          <img src={otherUser?.avatarUrl || "/default-avatar.png"} alt="avatar" />
          <span className={online ? "ig-online" : "ig-offline"}></span>
        </div>
        <div className="ig-chat-userinfo">
          <div className="ig-chat-username">
            {otherUser?.displayName || `User ${otherId?.slice(0, 6)}`}
          </div>
          <div className="ig-chat-status">{online ? "Active now" : "Offline"}</div>
        </div>
      </div>

      <div className="ig-chat-messages">
        {messages.map((msg, i) => (
          <MessageBubble key={msg?._id || i} sender={String(msg?.sender) === String(user?.userId?._id) ? "user" : "other"} text={msg?.content || (msg?.mediaUrl ? "Media" : "")} status={msg?.status} />
        ))}
      </div>

      <div className="ig-chat-inputbar">
        <input
          type="text"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="ig-send-btn">
          Send
        </button>
      </div>
    </div>
  );
}
