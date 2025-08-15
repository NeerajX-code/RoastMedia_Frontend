import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";

export const getUserProfile = createAsyncThunk(
     "user/getUserProfile",
     async (_, { rejectWithValue }) => {
          try {
               const { data } = await axios.get("/api/user/profile");
               return data.userProfile;
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || "Failed to load profile");
          }
     }
);
