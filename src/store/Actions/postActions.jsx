import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";


export const asyncGenerateCaption = createAsyncThunk(
    "caption/asyncGenerateCaption",
    async (formdata, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/post/generateCaption', formdata);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "Unable to Fetch.");
        }
    }
);