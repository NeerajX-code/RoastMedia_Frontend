import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/notifications");
      return data.notifications;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch notifications");
    }
  }
);

export const markAllRead = createAsyncThunk(
  "notifications/markAllRead",
  async (_, { rejectWithValue }) => {
    try {
      await axios.patch("/api/notifications/read-all");
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to mark read");
    }
  }
);

export const fetchUnreadCount = createAsyncThunk(
  "notifications/unreadCount",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/notifications/unread-count");
      return data.count;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Failed to fetch unread count");
    }
  }
);
