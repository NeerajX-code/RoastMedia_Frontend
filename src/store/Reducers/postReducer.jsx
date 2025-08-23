import { createSlice } from "@reduxjs/toolkit";
import { asyncPostCreate } from '../Actions/postActions'
import Cookies from "js-cookie";

const initialState = {
    loading: false,
    error: null,
    newPost: [],
    token: Cookies.get("token") || null,
};

const createPostSlice = createSlice({
    name: "newPost",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncPostCreate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(asyncPostCreate.fulfilled, (state, action) => {
                state.loading = false;
                state.newPost.unshift(action.payload.post);
            })
            .addCase(asyncPostCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default createPostSlice.reducer;
