import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";

export const getOtherUserProfile = createAsyncThunk(
    "otherUser/getOtherUserProfile",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/user/get/userProfile/${id}`);
            return data.profile;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to load profile");
        }
    }
);

export const getOtherUserPosts = createAsyncThunk(
    "/otherUser/getOtherUserPosts",
    async (id, {rejectWithValue}) => {
        try {
            const { data } = await axios.get(`/api/post/get/posts/user/${id}`);
            return data.posts;
        } catch (error) {
           return rejectWithValue(error.response?.message || "Failed to load Posts.");
        }
    }
)