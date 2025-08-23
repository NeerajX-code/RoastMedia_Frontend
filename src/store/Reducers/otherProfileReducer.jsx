import { createSlice } from '@reduxjs/toolkit';
import { getOtherUserProfile, getOtherUserPosts } from '../Actions/otherProfileActions';

const initialState = {
  user: null,
  posts: [],
  profileLoading: false,
  postsLoading: false,
  profileError: null,
  postsError: null,
  successMessage: null
};

export const otherUserSlice = createSlice({
  name: 'otherUser',
  initialState,
  reducers: {
    clearOtherProfileData(state) {
      state.user = null;
      state.posts = [];
      state.profileError = null;
      state.postsError = null;
    },
    clearProfileError(state) {
      state.profileError = null;
    },
    clearPostsError(state) {
      state.postsError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Profile
      .addCase(getOtherUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(getOtherUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
      })
      .addCase(getOtherUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      })

      // Posts
      .addCase(getOtherUserPosts.pending, (state) => {
        state.postsLoading = true;
        state.postsError = null;
      })
      .addCase(getOtherUserPosts.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.posts = action.payload;
        state.successMessage = "Posts Fetch Successfully."
      })
      .addCase(getOtherUserPosts.rejected, (state, action) => {
        state.postsLoading = false;
        state.postsError = action.payload;
      });
  },
});

export const { clearOtherProfileData, clearProfileError, clearPostsError } = otherUserSlice.actions;

export default otherUserSlice.reducer;
