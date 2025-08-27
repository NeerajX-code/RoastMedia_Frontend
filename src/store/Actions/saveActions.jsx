import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config"; // tumhara axios instance with baseURL, credentials
import { toggleSave, updateLikeCount, updateShareCount } from "../Reducers/HomePostReducer";

export const asyncToggleSave = createAsyncThunk(
    "save/asyncToggleSave",
    async (postId, { dispatch, rejectWithValue }) => {
        try {
            console.log(postId);
            const { data } = await axios.post(`/api/post/save/${postId}`);
            console.log(data);
            dispatch(toggleSave({ id: postId, saved: data.saved }))
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "Save failed");
        }
    }
);

export const asyncGetSavedPosts = createAsyncThunk(
    "save/asyncGetSavedPosts",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/post/my-saves");
            console.log(data);
            return  data.savedPosts;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "Failed to fetch saved posts");
        }
    }
);

export const asyncSavePostToggleLike = createAsyncThunk(
    "save/asyncSavePostToggleLike",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            console.log(id);
            const { data } = await axios.patch(`/api/post/like/${id}`);
            dispatch(updateLikeCount({ postId: id, ...data }))
            console.log({ postId: id, ...data });
            return { postId: id, ...data };
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "Something went wrong.");
        }
    }
)

export const asyncUpdateShareCountSavedPost = createAsyncThunk(
    "home/asyncUpdateShareCount",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`api/post/${id}/share`,);
            dispatch(updateShareCount({ id, shareCount: data.shareCount }));
            dispatch(updateSavePostShareCount({ id, shareCount: data.shareCount }))
        } catch (error) {
            return rejectWithValue(data.message || "Something went wrong.")
        }
    }
);