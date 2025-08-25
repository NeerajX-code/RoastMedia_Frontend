import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";

export const getHomePosts = createAsyncThunk(
     "HomePost/getHomePosts",
     async (_, { rejectWithValue }) => {
          try {
               const { data } = await axios.get("/api/post/get/random");
               return data.posts;
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || "Failed to load Posts");
          }
     }
);

export const asyncHomePostToggleLike = createAsyncThunk(
     "HomePost/asyncHomePostToggleLike",
     async (id, { rejectWithValue }) => {
          try {
               const { data } = await axios.patch(`/api/post/like/${id}`);
               return { postId: id, ...data };
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || "Something went wrong.");
          }
     }
);
