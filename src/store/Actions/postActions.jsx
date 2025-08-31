import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";
import { deleteHomePost } from "../Reducers/HomePostReducer";
import { deleteSavedPost } from "../Reducers/saveReducer";
import { deleteUserPost } from '../Reducers/userReducer'

export const asyncGenerateCaption = createAsyncThunk(
    "caption/asyncGenerateCaption",
    async (formdata, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/post/generateCaption", formdata);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(
                error.response?.data?.message || "Unable to Fetch."
            );
        }
    }
);

export const asyncPostCreate = createAsyncThunk(
    "post/asyncPostCreate",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/post/", formData);
            console.log(data);
            return data
        } catch (error) {
            console.log(error);
            return rejectWithValue(
                error.response?.data?.message || "Unable to Fetch."
            );
        }
    }
);

export const asyncDeletePost = (id) => async (dispatch) => {
    try {
        const { data } = await axios.delete(`/api/post/delete-post/${id}`);
        console.log(data);

        dispatch(deleteHomePost(id));
        dispatch(deleteSavedPost(id));
        dispatch(deleteUserPost(id));

    } catch (error) {
        console.log(error);
    }
};
