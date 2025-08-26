import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";

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
