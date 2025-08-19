import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";

export const getHomePosts = createAsyncThunk(
     "HomePost/getHomePosts",
     async (_, { rejectWithValue }) => {
          try {
               const { data } = await axios.get("/api/post/get/random");
               console.log(data);
               return data.posts;
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || "Failed to load profile");
          }
     }
);