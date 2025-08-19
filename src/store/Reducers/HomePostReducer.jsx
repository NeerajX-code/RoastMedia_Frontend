import { createSlice } from '@reduxjs/toolkit'
import { getHomePosts } from '../Actions/HomePostActions';

const initialState = {
    posts: [],
    loading: false,
    error: null,
}

export const HomePostSlice = createSlice({
    name: 'HomePost',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHomePosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHomePosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getHomePosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default HomePostSlice.reducer;