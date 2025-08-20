import { createSlice } from "@reduxjs/toolkit";
import { asyncGenerateCaption } from "../Actions/postActions";
import Cookies from "js-cookie";

const initialState = {
  loading: false,
  error: null,
  captions: [],
  token: Cookies.get("token") || null,
};

const captionSlice = createSlice({
  name: "caption",
  initialState,
  reducers: {
    clearCaption(state) {
      state.captions = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGenerateCaption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGenerateCaption.fulfilled, (state, action) => {
        state.loading = false;
        state.captions.push(action.payload);
      })
      .addCase(asyncGenerateCaption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearCaption} = captionSlice.actions;

export default captionSlice.reducer;
