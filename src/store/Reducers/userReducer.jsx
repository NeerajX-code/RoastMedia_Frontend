import { createSlice } from '@reduxjs/toolkit'
import { getUserProfile } from '../Actions/userActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

    // ---------------------------
    // // Register Thunk
    // // ---------------------------

    // .addCase(asyncRegisterUser.pending, (state) => {
    //   state.registerLoading = true;
    //   state.error = null;
    //   state.successMessage = null; // reset
    // })

    // .addCase(asyncRegisterUser.fulfilled, (state) => {
    //   state.registerLoading = false;
    //   state.successMessage = "User registered successfully!";
    // })

    // .addCase(asyncRegisterUser.rejected, (state, action) => {
    //   state.registerLoading = false;
    //   state.error = action.payload;
    // });
  }
})


export default userSlice.reducer;