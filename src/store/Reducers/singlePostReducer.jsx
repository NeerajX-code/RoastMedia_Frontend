import { createSlice } from "@reduxjs/toolkit";
import { asyncSinglePost } from '../Actions/singlePostAction'

const initialState = {
    singlePostLoading: false,
    error: null,
    singlePostDetails: [],
};

const singlePostSlice = createSlice({
    name: "singlePost",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncSinglePost.pending, (state) => {
                state.singlePostLoading = true;
                state.error = null;
            })
            .addCase(asyncSinglePost.fulfilled, (state, action) => {
                state.singlePostLoading = false;
                state.singlePostDetails.unshift(action.payload);
            })
            .addCase(asyncSinglePost.rejected, (state, action) => {
                state.singlePostLoading = false;
                state.error = action.payload;
            });
    },
});

export default singlePostSlice.reducer;
