import { createSlice } from '@reduxjs/toolkit'
import { asyncRegisterUser, getUserProfile } from '../Actions/userActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
  profileLoading: false,
  registerLoading: false,
  successMessage: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loaduser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------------------------
      // Get Profile Thunk
      // ---------------------------

      .addCase(getUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload;
      })

      // ---------------------------
      // Register Thunk
      // ---------------------------
      
      .addCase(asyncRegisterUser.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
        state.successMessage = null; // reset
      })

      .addCase(asyncRegisterUser.fulfilled, (state) => {
        state.registerLoading = false;
        state.successMessage = "User registered successfully!";
      })

      .addCase(asyncRegisterUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.payload;
      });
  }
})


export const { loaduser } = userSlice.actions

export default userSlice.reducer