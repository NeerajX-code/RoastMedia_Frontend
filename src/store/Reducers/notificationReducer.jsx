import { createSlice } from "@reduxjs/toolkit";
import { fetchNotifications, markAllRead, fetchUnreadCount } from "../Actions/notificationActions";

const initialState = {
  items: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        // Keep list rendered to prevent scroll jump; show lightweight inline loading if needed
        state.loading = state.items.length === 0; 
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false; state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(markAllRead.fulfilled, (state) => {
        state.items = state.items.map(n => ({ ...n, read: true }));
        state.unreadCount = 0;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload ?? 0;
      })
  }
});

export default notificationSlice.reducer;
