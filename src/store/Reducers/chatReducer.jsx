import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [], // { _id, otherUser, otherProfile, lastMessage, lastMessageAt, unreadCount }
  byId: {}, // conversationId -> { messages: [] }
  active: { conversationId: null, userId: null },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    setUnreadCount(state, action) {
      const { conversationId, count } = action.payload;
      const convo = state.conversations.find((c) => c._id === conversationId);
      if (convo) convo.unreadCount = count;
    },
    setMessages(state, action) {
      const { conversationId, messages } = action.payload;
      const uniq = [];
      const seen = new Set();
      for (const m of messages) {
        if (!seen.has(m._id)) { seen.add(m._id); uniq.push(m); }
      }
      uniq.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      state.byId[conversationId] = { messages: uniq };
    },
    upsertConversation(state, action) {
      const { conversationId, userId } = action.payload;
      const exists = state.conversations.find((c) => c._id === conversationId);
      if (!exists) {
        state.conversations.unshift({ _id: conversationId, otherUser: { _id: userId }, otherProfile: {}, lastMessage: "", lastMessageAt: new Date().toISOString(), unreadCount: 0 });
      }
      if (!state.byId[conversationId]) state.byId[conversationId] = { messages: [] };
    },
    setActive(state, action) {
      state.active = action.payload; // { conversationId, userId }
    },
    addMessage(state, action) {
      const { conversationId, message } = action.payload;
      if (!state.byId[conversationId]) state.byId[conversationId] = { messages: [] };
      const arr = state.byId[conversationId].messages;
      const idx = arr.findIndex((m) => m._id === message._id);
      if (idx === -1) {
        arr.push(message);
      } else {
        arr[idx] = { ...arr[idx], ...message };
      }
      const convo = state.conversations.find((c) => c._id === conversationId);
        if (convo) {
          const label = message.text && message.text.length
            ? message.text
            : (message.mediaType?.startsWith("image/") ? "\ud83d\udcf7 Photo" : message.mediaType?.startsWith("audio/") ? "\ud83c\udfa4 Audio" : (message.mediaUrl ? "Attachment" : ""));
          convo.lastMessage = label;
          convo.lastMessageAt = message.createdAt || new Date().toISOString();
          // increment unread if message from other in inactive chat
          const msgSender = message.sender && typeof message.sender === 'object' && message.sender._id ? message.sender._id : message.sender;
          const otherId = convo.otherUser?._id;
          const isIncoming = otherId && String(msgSender) === String(otherId);
          const isActive = state.active.conversationId === conversationId;
          if (isIncoming && !isActive) convo.unreadCount = (convo.unreadCount || 0) + 1;
        }
    },
    markSeen(state, action) {
      const { conversationId, messageIds } = action.payload;
      const thread = state.byId[conversationId];
      if (thread) {
        thread.messages = thread.messages.map((m) => (messageIds.includes(m._id) ? { ...m, seenAt: new Date().toISOString() } : m));
      }
      const convo = state.conversations.find((c) => c._id === conversationId);
      if (convo) convo.unreadCount = 0;
    },
    clearThread(state, action) {
      const { conversationId } = action.payload;
      if (!state.byId[conversationId]) state.byId[conversationId] = { messages: [] };
      state.byId[conversationId].messages = [];
      const convo = state.conversations.find((c) => c._id === conversationId);
      if (convo) {
        convo.lastMessage = "";
        convo.unreadCount = 0;
      }
    },
  },
});

export default chatSlice.reducer;
