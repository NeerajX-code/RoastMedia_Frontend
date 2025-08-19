import { createSlice } from '@reduxjs/toolkit'
import { getUserProfile, updateUserDetails } from '../Actions/userActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
  updateSuccess: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {

    // Get User Profile

    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // Update User Details

      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.updateSuccess = "Profile updated successfully!";
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
})

export default userSlice.reducer;