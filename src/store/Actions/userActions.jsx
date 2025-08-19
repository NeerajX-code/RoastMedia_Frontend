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

export const updateUserDetails = createAsyncThunk(
     "user/updateUserDetails",
     async (formData, { rejectWithValue }) => {
          try {
               const { data } = await axios.patch("/api/user/update-profile", formData);
               return data.profile;

          } catch (error) {
               return rejectWithValue(error.response?.data?.message || "Failed to update profile");
          }
     }
);