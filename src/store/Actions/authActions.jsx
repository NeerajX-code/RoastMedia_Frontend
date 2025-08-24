import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";
import { getHomePosts } from "./HomePostActions";

export const asyncRegisterUser = createAsyncThunk(
    "auth/asyncRegisterUser",
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/auth/register", formData);
            dispatch(getHomePosts());
            return data.token;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

export const asyncLoginUser = createAsyncThunk(
    "auth/asyncLoginUser",
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/auth/login", formData);
            dispatch(getHomePosts());
            return data.token;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "login failed");
        }
    }
);

export const asyncLogoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await axios.post("/api/auth/logout");
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);
