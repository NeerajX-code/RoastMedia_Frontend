import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";
import { updateShareCount } from "../Reducers/HomePostReducer";
import { updateSavePostLikeCount, updateSavePostShareCount } from "../Reducers/saveReducer";

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
     async (id, { dispatch, rejectWithValue }) => {
          try {
               const { data } = await axios.patch(`/api/post/like/${id}`);
               dispatch(updateSavePostLikeCount({ postId: id, ...data }))
               return { postId: id, ...data };
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || "Something went wrong.");
          }
     }
);

export const asyncUpdateShareCount = createAsyncThunk(
     "home/asyncUpdateShareCount",
     async (id, { dispatch, rejectWithValue }) => {
          try {
               const { data } = await axios.patch(`api/post/${id}/share`,);
               dispatch(updateShareCount({ id, shareCount: data.shareCount }));
               dispatch(updateSavePostShareCount({ id, shareCount: data.shareCount }));
               console.log(data);
          } catch (error) {
               return rejectWithValue(data.message || "Something went wrong.")
          }
     }
);

export const asyncHomePostToggleSave = createAsyncThunk(
     "save/toggleSave",
     async ({ postId }, { rejectWithValue }) => {
          try {
               const { data } = await axios.post("/api/save/toggle", { postId });
               return { ...data, postId }; // send postId for reducer logic
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || "Save failed");
          }
     }
);

export const asyncGetSavedPosts = createAsyncThunk(
     "save/getSavedPosts",
     async (_, { rejectWithValue }) => {
          try {
               const { data } = await axios.get("/api/save/my-saves");
               return data;
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || "Failed to fetch saved posts");
          }
     }
);
