import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";
import { updateLikeCount, updateShareCount } from "../Reducers/HomePostReducer";
import { loadSavedPosts, updateSavePostLikeCount, updateSavePostShareCount } from "../Reducers/saveReducer";
import { updateSinglePostLike, updateSinglePostShareCount, updateSinglePostSaved } from "../Reducers/singlePostReducer";

export const asyncSinglePost = createAsyncThunk(
    "singlePost/asyncSinglePost",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/post/get/single-post/${id}`);
            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(
                error.response?.data?.message || "Unable to Fetch."
            );
        }
    }
);

export const asyncSingleToggleLike = createAsyncThunk(
    "singlePostDetails/asyncSingleToggleLike",
    async (postId, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`/api/post/like/${postId}`);
            // Update everywhere
            dispatch(updateLikeCount({ postId, ...data }));
            dispatch(updateSavePostLikeCount({ postId, ...data }));
            dispatch(updateSinglePostLike({ postId, ...data }));
            console.log(data);
            
            return { postId, ...data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Like failed");
        }
    }
);

export const asyncSingleShare = createAsyncThunk(
    "singlePost/share",
    async (postId, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.patch(`/api/post/${postId}/share`);
            dispatch(updateShareCount({ id: postId, shareCount: data.shareCount }));
            dispatch(updateSavePostShareCount({ id: postId, shareCount: data.shareCount }));
            dispatch(updateSinglePostShareCount({ id: postId, shareCount: data.shareCount }));
            return { id: postId, shareCount: data.shareCount };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Share failed");
        }
    }
);

export const asyncSingleToggleSave = createAsyncThunk(
    "singlePostDetails/asyncSingleToggleSave",
    async (postId, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/post/save/${postId}`);
            dispatch(updateSinglePostSaved({ id: postId, isSaved: data.saved }));
            dispatch(loadSavedPosts(data?.save?.[0])); // Add to saved posts if saved
            console.log(data);

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Save failed");
        }
    }
);
