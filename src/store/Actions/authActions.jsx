import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";

export const asyncRegisterUser = createAsyncThunk(
    "auth/asyncRegisterUser",
    async (formData, { rejectWithValue }) => {
        try {
            await axios.post("/api/auth/register", formData);
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
            await axios.post("/api/auth/login", formData);
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "login failed");
        }
    }
);
