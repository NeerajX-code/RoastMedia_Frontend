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


export const asyncRegisterUser = createAsyncThunk(
     "user/asyncRegisterUser",
     async (formData, { rejectWithValue }) => {
          try {
               await axios.post("/api/auth/register", formData);
          } catch (error) {
               console.log(error);
               return rejectWithValue(error.response?.data?.message || "Registration failed");
          }
     }
);
