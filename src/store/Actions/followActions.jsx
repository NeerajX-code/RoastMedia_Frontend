import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";

export const followUser = createAsyncThunk(
  "follow/followUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/user/${userId}/follow`);
      return { userId, message: data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to follow");
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/user/${userId}/unfollow`);
      return { userId, message: data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to unfollow");
    }
  }
);

export const fetchFollowers = createAsyncThunk(
  "follow/fetchFollowers",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/user/${userId}/followers`);
      return data.followers;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch followers");
    }
  }
);

export const fetchFollowing = createAsyncThunk(
  "follow/fetchFollowing",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/user/${userId}/following`);
      return data.following;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch following");
    }
  }
);

export const checkIsFollowing = createAsyncThunk(
  "follow/checkIsFollowing",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/user/${userId}/is-following`);
      return { userId, isFollowing: data.isFollowing };
    } catch (error) {
      return rejectWithValue(false);
    }
  }
);
