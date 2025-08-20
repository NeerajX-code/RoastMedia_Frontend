import { createSlice } from '@reduxjs/toolkit'
import { getUserProfile, updateUserDetails, getUserPosts } from '../Actions/userActions';

const initialState = {
  user: null,
  profileLoading: false,
  postsLoading: false,
  profileError: null,
  postsError: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null
    }
  },
  extraReducers: (builder) => {

    // Get User Profile

    builder
      .addCase(getUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      })

      // Update User Details

      .addCase(updateUserDetails.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      })

      .addCase(getUserPosts.pending, (state) => {
        state.postsLoading = true;
        state.postsError = null;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.postsLoading = false;
        state.posts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.postsLoading = false;
        state.postsError = action.payload;
      })

  }
})

export const {clearUser} = userSlice.actions;

export default userSlice.reducer;