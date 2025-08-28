import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initSocketListeners, openChatWithUser, sendMessage, apiMarkSeen, clearChat } from "../../store/Actions/chatActions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios.config.jsx";
import { Phone, Video, Smile, Image, Mic, Heart, MoreHorizontal } from "lucide-react";
import "emoji-picker-element";
import "./Messenger.css";

export default function Messenger() {
    const dispatch = useDispatch();
    const { byId, active } = useSelector((s) => s.ChatReducer);
        const me = useSelector((s) => s.userReducer?.user);
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);
    const threadRef = useRef(null);
    const emojiPanelRef = useRef(null);
    const pickerRef = useRef(null);
    const { id: otherUserId } = useParams();
    const [other, setOther] = useState(null);
        const myUserId = useMemo(() => me?.userId?._id || me?.userId || me?._id || null, [me]);
        const [showEmoji, setShowEmoji] = useState(false);
        const [atBottom, setAtBottom] = useState(false);
        const [hasMeasuredBottom, setHasMeasuredBottom] = useState(false);
        const [pageVisible, setPageVisible] = useState(typeof document !== "undefined" ? document.visibilityState === "visible" : true);
    const [showMenu, setShowMenu] = useState(false);
    const fileInputRef = useRef(null);
    const audioInputRef = useRef(null);

    useEffect(() => {
        dispatch(initSocketListeners());
    }, [dispatch]);

    useEffect(() => {
        if (!otherUserId) return;
        // Prevent self-DM: if route id equals my id, go back to conversations
        if (myUserId && String(otherUserId) === String(myUserId)) {
            navigate("/messages", { replace: true });
            return;
        }
        dispatch(openChatWithUser(otherUserId));
    }, [otherUserId, myUserId, dispatch, navigate]);

    useEffect(() => {
        let ignore = false;
            async function loadOther() {
            try {
                    const { data } = await axios.get(`/api/user/get/userProfile/${otherUserId}`);
                if (!ignore) {
                        const p = data?.profile || {};
                        const username = p?.userData?.username || "";
                        setOther({
                            id: p?.userId,
                            username,
                            displayName: p?.displayName || username,
                            avatarUrl: p?.avatarUrl,
                        });
                }
            } catch { }
        }
        if (otherUserId) loadOther();
        return () => { ignore = true; };
    }, [otherUserId]);

        // On active conversation change, jump to bottom instantly (no visible scrolling)
        useEffect(() => {
            if (!active.conversationId) return;
            const t = setTimeout(() => {
                if (messagesEndRef.current) {
                    messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
                }
            }, 0);
            return () => clearTimeout(t);
        }, [active.conversationId]);

        // Keep scrolled to bottom on new messages when already at bottom
        useEffect(() => {
            if (atBottom && messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
            }
        }, [byId, active, atBottom]);

        // Observe bottom sentinel to know if user is at the bottom of the thread
        useEffect(() => {
            if (!threadRef.current || !messagesEndRef.current) return;
            const observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                        setAtBottom(entry?.isIntersecting || false);
                        setHasMeasuredBottom(true);
                },
                { root: threadRef.current, threshold: 0.5 }
            );
            observer.observe(messagesEndRef.current);
            return () => observer.disconnect();
        }, [active.conversationId, threadRef.current, messagesEndRef.current]);

        // Track page/tab visibility
        useEffect(() => {
            const onVis = () => setPageVisible(document.visibilityState === "visible");
            document.addEventListener("visibilitychange", onVis);
            return () => document.removeEventListener("visibilitychange", onVis);
        }, []);

        // Only mark seen when: at bottom, page visible, and we have unseen incoming messages
        useEffect(() => {
            if (!active.conversationId || !pageVisible || !atBottom) return;
                if (!hasMeasuredBottom) return;
            const msgs = byId[active.conversationId]?.messages || [];
            const unseenIds = msgs
                .filter((m) => String(m.receiver) === String(myUserId) && !m.seenAt)
                .map((m) => m._id);
            if (unseenIds.length) {
                dispatch(apiMarkSeen({ conversationId: active.conversationId, messageIds: unseenIds }));
            }
            }, [active.conversationId, pageVisible, atBottom, hasMeasuredBottom, byId, myUserId, dispatch]);

        // Close emoji when clicking outside
        useEffect(() => {
            if (!showEmoji) return;
            const onDocClick = (e) => {
                if (emojiPanelRef.current && !emojiPanelRef.current.contains(e.target)) {
                    setShowEmoji(false);
                }
            };
            document.addEventListener("mousedown", onDocClick);
            return () => document.removeEventListener("mousedown", onDocClick);
        }, [showEmoji]);

        // Hook up emoji selection from web component
        useEffect(() => {
            if (!showEmoji || !pickerRef.current) return;
            const onEmoji = (e) => {
                const emoji = e?.detail?.unicode || e?.detail?.emoji?.unicode || "";
                if (emoji) setInput((t) => t + emoji);
            };
            pickerRef.current.addEventListener("emoji-click", onEmoji);
            return () => pickerRef.current && pickerRef.current.removeEventListener("emoji-click", onEmoji);
        }, [showEmoji]);

    const thread = byId[active.conversationId]?.messages || [];

    return (
        <div className="dm">
            <header className="dm-header">
                <div className="hdr-left">
                                <img className="hdr-avatar" src={other?.avatarUrl || "https://via.placeholder.com/36"} alt="avatar" />
                    <div className="hdr-meta">
                                    <div className="hdr-name">{other?.displayName || other?.username || "User"}</div>
                                    <div className="hdr-username">{other?.username ? `@${other.username}` : ""}</div>
                    </div>
                </div>
                <div className="hdr-actions">
                    <Phone size={20} />
                    <Video size={20} />
                    <button type="button" className="icon-btn" onClick={() => setShowMenu((v) => !v)} title="More"><MoreHorizontal size={20} /></button>
                </div>
            </header>
            <section className="dm-main">
                {active.conversationId ? (
                    <>
                        <div className="dm-thread" ref={threadRef}>
                                            {thread.map((m) => {
                                                const isMine = String(m.sender) === String(myUserId);
                                                return (
                                                <div key={m._id} className={isMine ? "msg me" : "msg other"}>
                                                    {!isMine && (
                                                            <img className="msg-avatar" src={other?.avatarUrl || "https://via.placeholder.com/28"} alt="" />
                                                        )}
                                                    <div className={isMine ? "bubble bubble-me" : "bubble bubble-other"}>
                                                            {m.mediaUrl ? (
                                                                m.mediaType?.startsWith("image/") ? (
                                                                    <img src={m.mediaUrl} alt="attachment" style={{ maxWidth: 240, borderRadius: 8 }} />
                                                                ) : m.mediaType?.startsWith("audio/") ? (
                                                                    <audio src={m.mediaUrl} controls style={{ width: 220 }} />
                                                                ) : (
                                                                    <a href={m.mediaUrl} target="_blank" rel="noreferrer" style={{ color: "#9cf" }}>Attachment</a>
                                                                )
                                                            ) : null}
                                                            {m.text ? <p className="text">{m.text}</p> : null}
                                                            <span className="meta">
                                                                {new Date(m.createdAt).toLocaleTimeString().slice(0,5)}
                                                                {isMine && (m.seenAt ? "  Seen" : (m.deliveredAt ? "  ✓✓" : "  ✓"))}
                                                            </span>
                                    </div>
                                </div>
                                            );})}
                            <div ref={messagesEndRef} />
                        </div>
                                    <form className="dm-input" onSubmit={(e) => { e.preventDefault(); if (input.trim()) { dispatch(sendMessage({ to: active.userId, text: input.trim() })); setInput(""); setShowEmoji(false); } }}>
                                        <div className="left-icons">
                                            <button type="button" className="icon-btn" onClick={() => setShowEmoji((v) => !v)}><Smile size={22} /></button>
                                        </div>
                            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message..." />
                            <div className="right-icons">
                                <button type="button" className="icon-btn" title="Record/Send audio" onClick={() => audioInputRef.current?.click()}><Mic size={22} /></button>
                                <button type="button" className="icon-btn" title="Send image/file" onClick={() => fileInputRef.current?.click()}><Image size={22} /></button>
                                <button type="button" className="icon-btn" title="Like" onClick={() => dispatch(sendMessage({ to: active.userId, text: "❤" }))}><Heart size={22} /></button>
                                <button type="submit" className="send-btn">Send</button>
                            </div>
                            <input ref={fileInputRef} type="file" accept="image/*,application/pdf,application/zip" style={{ display: "none" }} onChange={async (e) => {
                                const f = e.target.files?.[0];
                                if (!f) return;
                                const form = new FormData();
                                form.append("file", f);
                                try {
                                    const { data } = await axios.post("/api/chat/upload", form, { headers: { "Content-Type": "multipart/form-data" } });
                                    dispatch(sendMessage({ to: active.userId, text: "", mediaUrl: data.url, mediaType: data.mime }));
                                } finally {
                                    e.target.value = "";
                                }
                            }} />
                            <input ref={audioInputRef} type="file" accept="audio/*" style={{ display: "none" }} onChange={async (e) => {
                                const f = e.target.files?.[0];
                                if (!f) return;
                                const form = new FormData();
                                form.append("file", f);
                                try {
                                    const { data } = await axios.post("/api/chat/upload", form, { headers: { "Content-Type": "multipart/form-data" } });
                                    dispatch(sendMessage({ to: active.userId, text: "", mediaUrl: data.url, mediaType: data.mime }));
                                } finally {
                                    e.target.value = "";
                                }
                            }} />
                        </form>
                                    {showEmoji && (
                                        <div className="emoji-panel" ref={emojiPanelRef}>
                                            <emoji-picker ref={pickerRef} class="emoji-picker" set="native" theme="dark" skin-tones="false"></emoji-picker>
                                        </div>
                                    )}
                        {showMenu && (
                            <div style={{ position: "absolute", right: 12, top: 56, background: "#111", border: "1px solid #222", borderRadius: 8, padding: 8, display: "grid", gap: 6, zIndex: 6 }}>
                                <button type="button" className="icon-btn" onClick={() => {
                                    const myId = myUserId;
                                    const targetId = other?.id;
                                    if (targetId && myId && String(targetId) === String(myId)) {
                                        navigate("/Profile");
                                    } else if (targetId) {
                                        navigate(`/other/profile/${targetId}`);
                                    }
                                    setShowMenu(false);
                                }}>View profile</button>
                                <button type="button" className="icon-btn" onClick={async () => {
                                    const convoId = active.conversationId;
                                    if (!convoId) return;
                                    try {
                                        await dispatch(clearChat(convoId));
                                    } finally { setShowMenu(false); }
                                }}>Clear chat</button>
                                <button type="button" className="icon-btn" style={{ color: "#e11d48" }} onClick={async () => {
                                    const convoId = active.conversationId;
                                    if (!convoId) return;
                                    try {
                                        await axios.delete(`/api/chat/${convoId}`);
                                        navigate("/messages");
                                    } finally { setShowMenu(false); }
                                }}>Delete chat</button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="msgr-empty">Select a chat</div>
                )}
            </section>
        </div>
    );
}
