import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [], // { _id, otherUser, otherProfile, lastMessage, lastMessageAt, unreadCount }
  byId: {}, // conversationId -> { messages: [] }
  active: { conversationId: null, userId: null },
  routeUserId: null, // track last route userId to avoid stale apply on re-entry
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations(state, action) {
      const list = Array.isArray(action.payload) ? action.payload.slice() : [];
      list.sort((a, b) => new Date(b.lastMessageAt || 0) - new Date(a.lastMessageAt || 0));
      state.conversations = list;
    },
    setUnreadCount(state, action) {
      const { conversationId, count } = action.payload;
      const convo = state.conversations.find((c) => String(c._id) === String(conversationId));
      if (convo) convo.unreadCount = count;
    },
    setMessages(state, action) {
      const { conversationId, messages } = action.payload;
      const uniq = [];
      const seen = new Set();
      for (const m of messages) {
        if (!seen.has(m._id)) {
          seen.add(m._id);
          uniq.push(m);
        }
      }
      uniq.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      state.byId[conversationId] = { messages: uniq };
    },
    upsertConversation(state, action) {
      const { conversationId, userId } = action.payload;
      const exists = state.conversations.find((c) => String(c._id) === String(conversationId));
      if (!exists) {
        state.conversations.unshift({
          _id: conversationId,
          otherUser: { _id: userId },
          otherProfile: {},
          lastMessage: "",
          lastMessageAt: new Date().toISOString(),
          unreadCount: 0,
        });
      }
      if (!state.byId[conversationId]) state.byId[conversationId] = { messages: [] };
    },
    setActive(state, action) {
      state.active = action.payload; // { conversationId, userId }
      const convo = state.conversations.find((c) => String(c._id) === String(action.payload.conversationId));
      if (convo) convo.unreadCount = 0;
    },
    setRouteUser(state, action) {
      state.routeUserId = action.payload || null;
    },
    addMessage(state, action) {
      const { conversationId, message } = action.payload;
      if (!state.byId[conversationId]) state.byId[conversationId] = { messages: [] };
      const arr = state.byId[conversationId].messages;
      const idx = arr.findIndex((m) => m._id === message._id);
      const isNew = idx === -1;
      if (isNew) {
        arr.push(message);
      } else {
        arr[idx] = { ...arr[idx], ...message };
      }
      const convo = state.conversations.find((c) => String(c._id) === String(conversationId));
      if (convo) {
        const hasContent = Boolean(message.createdAt || message.text || message.mediaUrl || message.mediaType);
        if (isNew && hasContent) {
          const label = message.text && message.text.length
            ? message.text
            : (message.mediaType?.startsWith("image/")
                ? "\ud83d\udcf7 Photo"
                : message.mediaType?.startsWith("audio/")
                  ? "\ud83c\udfa4 Audio"
                  : (message.mediaUrl ? "Attachment" : ""));
          convo.lastMessage = label;
          convo.lastMessageAt = message.createdAt || new Date().toISOString();
        }
        // increment unread if message from other in inactive chat
        const msgSender = message.sender && typeof message.sender === 'object' && message.sender._id ? message.sender._id : message.sender;
        const otherId = convo.otherUser?._id;
        const isIncoming = otherId && String(msgSender) === String(otherId);
        const isActive = String(state.active.conversationId) === String(conversationId);
        if (isIncoming && !isActive) convo.unreadCount = (convo.unreadCount || 0) + 1;
        if (isActive) convo.unreadCount = 0; // keep active chat unread clean

        // move this conversation to the top (most recent first)
        if (isNew && hasContent) {
          const index = state.conversations.findIndex((c) => String(c._id) === String(conversationId));
          if (index > 0) {
            const [moved] = state.conversations.splice(index, 1);
            state.conversations.unshift(moved);
          }
        }
      }
    },
    markSeen(state, action) {
      const { conversationId, messageIds } = action.payload;
      const thread = state.byId[conversationId];
      if (thread) {
        const ids = new Set(messageIds.map((i) => String(i)));
        thread.messages = thread.messages.map((m) => (ids.has(String(m._id)) ? { ...m, seenAt: new Date().toISOString() } : m));
      }
      const convo = state.conversations.find((c) => String(c._id) === String(conversationId));
      if (convo) convo.unreadCount = 0;
    },
    clearThread(state, action) {
      const { conversationId } = action.payload;
      if (!state.byId[conversationId]) state.byId[conversationId] = { messages: [] };
      state.byId[conversationId].messages = [];
      const convo = state.conversations.find((c) => String(c._id) === String(conversationId));
      if (convo) {
        convo.lastMessage = "";
        convo.unreadCount = 0;
      }
    },
  },
});

export default chatSlice.reducer;
