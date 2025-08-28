import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.config";
import { setAuthentication, setAuthInitialized } from "../Reducers/authReducer";

export const getUserProfile = createAsyncThunk(
     "user/getUserProfile",
     async (_, { dispatch, rejectWithValue }) => {
          try {
               const { data } = await axios.get("/api/user/profile");
               dispatch(setAuthentication());
               dispatch(setAuthInitialized(true));
               return data.userProfile;
          } catch (error) {
               dispatch(setAuthInitialized(true));
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


export const getUserPosts = createAsyncThunk(
     "/user/getUserPosts",
     async (id, { rejectWithValue }) => {
          try {
               console.log(id);
               const { data } = await axios.get(`/api/post/get/posts/user/${id}`);
               return data.posts;
          } catch (error) {
               return rejectWithValue(error.response?.data?.message || error.message || "Failed to load Posts.");
          }
     }
)