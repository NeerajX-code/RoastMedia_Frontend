import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openChatWithUser, sendMessage, apiMarkSeen, clearChat } from "../../store/Actions/chatActions";
import { chatSlice } from "../../store/Reducers/chatReducer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios.config.jsx";
import { Smile, Image, Heart, MoreVertical, Send, X } from "lucide-react";
import "emoji-picker-element";
import "./Messenger.css";
// import { getSocket } from "../../utils/socket";

export default function Messenger() {
    const dispatch = useDispatch();
    const { byId, active } = useSelector((s) => s.ChatReducer);
    const { setRouteUser } = chatSlice.actions;
    const me = useSelector((s) => s.userReducer?.user);
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const { id: otherUserId } = useParams();

    const messagesEndRef = useRef(null);
    const threadRef = useRef(null);
    const emojiPanelRef = useRef(null);
    const pickerRef = useRef(null);
    const fileInputRef = useRef(null);
    const menuRef = useRef(null);
    const menuButtonRef = useRef(null);

    const myUserId = useMemo(() => me?.userId?._id || me?.userId || me?._id || null, [me]);
    const [showEmoji, setShowEmoji] = useState(false);
    const [atBottom, setAtBottom] = useState(false);
    const [hasMeasuredBottom, setHasMeasuredBottom] = useState(false);
    const [pageVisible, setPageVisible] = useState(typeof document !== "undefined" ? document.visibilityState === "visible" : true);
    const [showMenu, setShowMenu] = useState(false);

    const [pendingFile, setPendingFile] = useState(null);
    const [pendingUrl, setPendingUrl] = useState("");
    const [pendingType, setPendingType] = useState("");
    const [sendingPreview, setSendingPreview] = useState(false);

    const [other, setOther] = useState(null);

    // Compute whether to render the current thread based on route vs active state
    const showThread = useMemo(() => (
        Boolean(active?.userId && String(active.userId) === String(otherUserId) && active?.conversationId)
    ), [active?.userId, active?.conversationId, otherUserId]);
    const thread = showThread ? (byId[active.conversationId]?.messages || []) : [];

    // Socket listeners are initialized globally in App.jsx to avoid duplicates

    useEffect(() => {
        if (!otherUserId) return;
        if (myUserId && String(otherUserId) === String(myUserId)) {
            navigate("/messages", { replace: true });
            return;
        }
        // update route token to help guard against stale responses
        dispatch(setRouteUser(otherUserId));
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
        return () => {
            ignore = true;
        };
    }, [otherUserId]);

    useEffect(() => {
        if (!showThread) return;
        const t = setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
            }
        }, 0);
        return () => clearTimeout(t);
    }, [showThread, active.conversationId]);

    useEffect(() => {
        if (!showThread) return;
        if (atBottom && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [showThread, byId, active, atBottom]);

    useEffect(() => {
        if (!showThread) return;
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
    }, [showThread, active.conversationId]);

    useEffect(() => {
        const onVis = () => setPageVisible(document.visibilityState === "visible");
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    useEffect(() => {
        if (!showThread || !active.conversationId || !pageVisible || !atBottom) return;
        if (!hasMeasuredBottom) return;
        const msgs = byId[active.conversationId]?.messages || [];
        const unseenIds = msgs
            .filter((m) => String(m.receiver) === String(myUserId) && !m.seenAt)
            .map((m) => m._id);
        if (unseenIds.length) {
            dispatch(apiMarkSeen({ conversationId: active.conversationId, messageIds: unseenIds }));
        }
    }, [showThread, active.conversationId, pageVisible, atBottom, hasMeasuredBottom, byId, myUserId, dispatch]);

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

    // close header menu on outside click
    useEffect(() => {
        if (!showMenu) return;
        const onDocClick = (e) => {
            const menuEl = menuRef.current;
            const btnEl = menuButtonRef.current;
            const target = e.target;
            if (menuEl && menuEl.contains(target)) return; // clicks inside menu
            if (btnEl && btnEl.contains(target)) return;   // clicks on the toggle button
            setShowMenu(false);
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [showMenu]);

    useEffect(() => {
        if (!showEmoji || !pickerRef.current) return;
        const onEmoji = (e) => {
            const emoji = e?.detail?.unicode || e?.detail?.emoji?.unicode || "";
            if (emoji) setInput((t) => t + emoji);
        };
        pickerRef.current.addEventListener("emoji-click", onEmoji);
        return () => pickerRef.current && pickerRef.current.removeEventListener("emoji-click", onEmoji);
    }, [showEmoji]);

    // Only render/act on the thread if the active reducer state matches the route's userId
    // moved earlier to avoid TDZ

    // socket not needed here; listeners are initialized via Redux action

    return (
        <>
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
                        <button
                            ref={menuButtonRef}
                            type="button"
                            className={`icon-btn hdr-more ${showMenu ? 'open' : ''}`}
                            aria-expanded={showMenu}
                            onClick={() => setShowMenu((v) => !v)}
                            title={showMenu ? 'Close menu' : 'More'}
                        >
                            {showMenu ? <X size={18} /> : <MoreVertical size={20} />}
                        </button>
                    </div>
                </header>
                <section className="dm-main">
                    {showThread ? (
                        <>
                            <div className="dm-thread" ref={threadRef}>
                                {thread.map((m) => {
                                    const isMine = String(m.sender) === String(myUserId);
                                    return (
                                        <div key={m._id} className={isMine ? "msg me" : "msg other"}>
                                            {!isMine && <img className="msg-avatar" src={other?.avatarUrl || "https://via.placeholder.com/28"} alt="" />}
                                            <div className={isMine ? "bubble bubble-me" : "bubble bubble-other"}>
                                                {m.mediaUrl ? (
                                                    m.mediaType?.startsWith("image/") ? (
                                                        <a href={m.mediaUrl} target="_blank" rel="noreferrer">
                                                            <img className="media" src={m.mediaUrl} alt="attachment" />
                                                        </a>
                                                    ) : m.mediaType?.startsWith("audio/") ? (
                                                        <audio src={m.mediaUrl} controls style={{ width: 220 }} />
                                                    ) : m.mediaType?.startsWith("video/") ? (
                                                        <>
                                                            <video className="media" src={m.mediaUrl} controls />
                                                            <a href={m.mediaUrl} target="_blank" rel="noreferrer" className="open-link">
                                                                Open
                                                            </a>
                                                        </>
                                                    ) : (
                                                        <a href={m.mediaUrl} target="_blank" rel="noreferrer" className="open-link">
                                                            Attachment
                                                        </a>
                                                    )
                                                ) : null}
                                                {m.text ? <p className="text">{m.text}</p> : null}
                                                <span className="meta">
                                                    {new Date(m.createdAt).toLocaleTimeString().slice(0, 5)}
                                                    {isMine && (m.seenAt ? <span style={{ color: "#4ea3f1", marginLeft: 6 }}>✓✓</span> : m.deliveredAt ? <span style={{ opacity: 0.85, marginLeft: 6 }}>✓✓</span> : <span style={{ opacity: 0.6, marginLeft: 6 }}>✓</span>)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            {pendingUrl && (
                                <div className="dm-preview">
                                    <div className="preview-left">
                                        {pendingType.startsWith("image/") ? (
                                            <img className="preview-media" src={pendingUrl} alt="preview" />
                                        ) : (
                                            <video className="preview-media" src={pendingUrl} controls />
                                        )}
                                    </div>
                                    <div className="preview-actions">
                                        <button
                                            type="button"
                                            className="icon-btn btn-cancel"
                                            disabled={sendingPreview}
                                            onClick={() => {
                                                if (sendingPreview) return;
                                                if (pendingUrl) URL.revokeObjectURL(pendingUrl);
                                                setPendingUrl("");
                                                setPendingFile(null);
                                                setPendingType("");
                                                if (fileInputRef.current) fileInputRef.current.value = "";
                                            }}
                                        >
                                            <X size={16} />
                                            <span>Cancel</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="send-btn btn-send"
                                            title="Send"
                                            aria-label="Send"
                                            disabled={sendingPreview}
                                            onClick={async () => {
                                                if (!pendingFile || sendingPreview) return;
                                                const receiverId = active?.userId || otherUserId;
                                                if (!receiverId) return;
                                                setSendingPreview(true);
                                                try {
                                                    const form = new FormData();
                                                    form.append("file", pendingFile);
                                                    const { data } = await axios.post("/api/chat/upload", form, { headers: { "Content-Type": "multipart/form-data" } });
                                                    await dispatch(
                                                        sendMessage({ to: receiverId, text: "", mediaUrl: data.url, mediaType: pendingFile.type })
                                                    );
                                                    // small UX: scroll to bottom after send
                                                    setTimeout(() => {
                                                        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
                                                    }, 50);
                                                } finally {
                                                    if (pendingUrl) URL.revokeObjectURL(pendingUrl);
                                                    setPendingUrl("");
                                                    setPendingFile(null);
                                                    setPendingType("");
                                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                                    setSendingPreview(false);
                                                }
                                            }}
                                        >
                                            {sendingPreview ? (
                                                <span className="spinner" aria-hidden="true"></span>
                                            ) : (
                                                <Send size={18} />
                                            )}
                                            <span>{sendingPreview ? "Sending" : "Send"}</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            <form
                                className="dm-input"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (input.trim()) {
                                        dispatch(sendMessage({ to: active.userId, text: input.trim() }));
                                        setInput("");
                                        setShowEmoji(false);
                                    }
                                }}
                            >
                                <div className="left-icons">
                                    <button type="button" className="icon-btn" onClick={() => setShowEmoji((v) => !v)}>
                                        <Smile size={22} />
                                    </button>
                                </div>
                                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message..." />
                                <div className="right-icons">
                                    <button type="button" className="icon-btn" title="Send image/video" onClick={() => fileInputRef.current?.click()}>
                                        <Image size={22} />
                                    </button>
                                    <button
                                        type="button"
                                        className="icon-btn"
                                        title="Like"
                                        onClick={() => dispatch(sendMessage({ to: active.userId, text: "❤" }))}
                                    >
                                        <Heart size={22} />
                                    </button>
                                    <button type="submit" className="send-btn" title="Send" aria-label="Send">
                                        <Send size={18} />
                                    </button>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*,video/*"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (!f) return;
                                        if (!(f.type.startsWith("image/") || f.type.startsWith("video/"))) {
                                            e.target.value = "";
                                            return;
                                        }
                                        try {
                                            const url = URL.createObjectURL(f);
                                            setPendingFile(f);
                                            setPendingUrl(url);
                                            setPendingType(f.type);
                                        } catch {
                                            e.target.value = "";
                                        }
                                    }}
                                />
                            </form>

                            {showEmoji && (
                                <div className="emoji-panel" ref={emojiPanelRef}>
                                    <emoji-picker ref={pickerRef} class="emoji-picker" set="native" theme="dark" skin-tones="false"></emoji-picker>
                                </div>
                            )}

                            {showMenu && (
                                <div ref={menuRef} className="menu-popover">
                                    <button
                                        type="button"
                                        className="menu-item"
                                        onClick={() => {
                                            const myId = myUserId;
                                            const targetId = other?.id;
                                            if (targetId && myId && String(targetId) === String(myId)) {
                                                navigate("/Profile");
                                            } else if (targetId) {
                                                navigate(`/other/profile/${targetId}`);
                                            }
                                            setShowMenu(false);
                                        }}
                                    >
                                        View profile
                                    </button>
                                    <button
                                        type="button"
                                        className="menu-item"
                                        onClick={async () => {
                                            const convoId = active.conversationId;
                                            if (!convoId) return;
                                            try {
                                                await dispatch(clearChat(convoId));
                                            } finally {
                                                setShowMenu(false);
                                            }
                                        }}
                                    >
                                        Clear chat
                                    </button>
                                    <button
                                        type="button"
                                        className="menu-item danger"
                                        onClick={async () => {
                                            const convoId = active.conversationId;
                                            if (!convoId) return;
                                            try {
                                                await axios.delete(`/api/chat/${convoId}`);
                                                navigate("/messages");
                                            } finally {
                                                setShowMenu(false);
                                            }
                                        }}
                                    >
                                        Delete chat
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="msgr-empty">Select a chat</div>
                    )}
                </section>
            </div>
        </>
    );
}

