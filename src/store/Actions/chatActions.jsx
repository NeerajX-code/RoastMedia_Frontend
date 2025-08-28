import axios from "../../utils/axios.config.jsx";
import { getSocket } from "../../utils/socket";
import { chatSlice } from "../Reducers/chatReducer";

const { setConversations, setActive, addMessage, upsertConversation, markSeen, setMessages, setUnreadCount, clearThread } = chatSlice.actions;

export const fetchConversations = () => async (dispatch) => {
  const { data } = await axios.get("/api/chat/conversations");
  dispatch(setConversations(data.conversations));
};

export const openChatWithUser = (userId) => async (dispatch, getState) => {
  const me = getState()?.userReducer?.user;
  const myId = me?.userId?._id || me?.userId || me?._id;
  if (myId && String(myId) === String(userId)) {
    // Prevent opening chat with self
    return;
  }
  const { data } = await axios.get(`/api/chat/with/${userId}`);
  dispatch(upsertConversation({ conversationId: data.conversationId, userId }));
  dispatch(setActive({ conversationId: data.conversationId, userId }));
  // preload history deduped into state and clear unread
  dispatch(setMessages({ conversationId: data.conversationId, messages: data.messages }));
  // kick socket flow to set delivered for pending messages
  try { getSocket().emit("chat:open", { conversationId: data.conversationId }); } catch {}
};

export const sendMessage = ({ to, text, mediaUrl, mediaType }) => async (dispatch, getState) => {
  const socket = getSocket();
  socket.emit("chat:send", { to, text, mediaUrl, mediaType });
};

export const initSocketListeners = () => (dispatch, getState) => {
  const socket = getSocket();
  socket.off("chat:message").on("chat:message", (msg) => {
    // Ensure a conversation list item exists for incoming messages
    try {
      const state = getState();
      const me = state?.userReducer?.user;
      const myId = me?.userId?._id || me?.userId || me?._id;
      const isIncoming = myId && String(msg.receiver) === String(myId);
      if (isIncoming) {
        const exists = state.ChatReducer?.conversations?.some((c) => c._id === msg.conversation);
        if (!exists) dispatch(upsertConversation({ conversationId: msg.conversation, userId: msg.sender }));
      }
    } catch {}
    dispatch(addMessage({ conversationId: msg.conversation, message: msg }));
  });
  socket.off("chat:delivered").on("chat:delivered", ({ conversationId, messageIds, deliveredAt }) => {
    // Mark delivered locally by faking a partial message update
    messageIds.forEach((id) => dispatch(addMessage({ conversationId, message: { _id: id, deliveredAt } })));
  });
  socket.off("chat:seen:ack").on("chat:seen:ack", ({ conversationId, messageIds }) => {
    dispatch(markSeen({ conversationId, messageIds }));
  });
  socket.off("chat:seen").on("chat:seen", ({ conversationId, messageIds }) => {
    dispatch(markSeen({ conversationId, messageIds }));
  });
};

export const apiMarkSeen = ({ conversationId, messageIds }) => async (dispatch) => {
  await axios.post("/api/chat/seen", { conversationId, messageIds });
  dispatch(markSeen({ conversationId, messageIds }));
  // also emit via socket so the sender gets real-time blue ticks without polling
  try { getSocket().emit("chat:seen", { conversationId, messageIds }); } catch {}
};

export const clearChat = (conversationId) => async (dispatch) => {
  await axios.delete(`/api/chat/${conversationId}/messages`);
  dispatch(clearThread({ conversationId }));
};
