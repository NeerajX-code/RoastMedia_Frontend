import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";

export const asyncRegisterUser = createAsyncThunk(
    "auth/asyncRegisterUser",
    async (formData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/auth/register", formData);
            console.log(data);
            return data.token;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

export const asyncLoginUser = createAsyncThunk(
    "auth/asyncLoginUser",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/auth/login", formData);
            console.log(data);
            return data.token;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "login failed");
        }
    }
);
