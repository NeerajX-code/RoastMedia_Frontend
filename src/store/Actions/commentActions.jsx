import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";

export const asyncGetComments = createAsyncThunk(
    "comment/asyncGetComments",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/post/comments/${id}`,);
            console.log(data);
            return data.comments;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "Unable to Fetch.");
        }
    }
);


export const asyncPostComment = createAsyncThunk(
    "comment/asyncPostComment",
    async ({ id, comment }, { rejectWithValue }) => {
        console.log(id, comment);
        try {
            const { data } = await axios.post(`/api/post/comment/${id}`, { comment });
            console.log(data);
            return data.comment[0];
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "Unable to Fetch.");
        }
    }
);


export const asyncEditComment = createAsyncThunk(
    "comment/asyncEditComment",
    async ({ postId, commentId, newComment }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                `/api/post/comment/${postId}/${commentId}`,
                { comment: newComment }
            );
            console.log(data);
            return data.comment; // edited comment object
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "Unable to edit comment.");
        }
    }
);


export const asyncDeleteComment = createAsyncThunk(
    "comment/asyncDeleteComment",
    async ({ postId, commentId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/post/comment/${postId}/${commentId}`);
            console.log(data);
            return commentId; // just return the deleted commentId
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "Unable to delete comment.");
        }
    }
);