import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";
import { setQuery } from "../Reducers/searchReducer";


export const asyncGetUsers = createAsyncThunk(
    "search/asyncGetUsers",
    async (query, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/user/find?query=${query}`);
            dispatch(setQuery(query));
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "Unable to Fetch.");
        }
    }
);