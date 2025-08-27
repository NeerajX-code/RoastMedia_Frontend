import { createSlice } from "@reduxjs/toolkit";
import { followUser, unfollowUser, fetchFollowers, fetchFollowing, checkIsFollowing } from "../Actions/followActions";

const initialState = {
  followers: [],
  following: [],
  isFollowingMap: {}, // map of userId -> boolean
  loading: false,
  error: null,
  message: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    clearFollowState(state) {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(followUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.isFollowingMap[action.payload.userId] = true;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unfollowUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.isFollowingMap[action.payload.userId] = false;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFollowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFollowing.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowing.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkIsFollowing.fulfilled, (state, action) => {
        state.isFollowingMap[action.payload.userId] = action.payload.isFollowing;
      });
  },
});

export const { clearFollowState } = followSlice.actions;
export default followSlice.reducer;
