import { createSlice } from '@reduxjs/toolkit'
import { asyncHomePostToggleLike, getHomePosts } from '../Actions/HomePostActions';;

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
            .addCase(asyncHomePostToggleLike.pending, (state, action) => {
                // optimistic update
                const postId = action.meta.arg;
                const post = state.posts.find(p => p._id === postId);
                if (post) {
                    post.isLiked = !post.isLiked;
                    post.likesCount += post.isLiked ? 1 : -1;
                }
            })
            .addCase(asyncHomePostToggleLike.fulfilled, (state, action) => {
                const { postId, likesCount, isLiked } = action.payload;
                const post = state.posts.find(p => p._id === postId);
                if (post) {
                    // 👇 Final sync with backend
                    post.isLiked = isLiked;
                    post.likesCount = likesCount;
                }
            })
            .addCase(asyncHomePostToggleLike.rejected, (state, action) => {
                const postId = action.meta.arg;
                const post = state.posts.find(p => p._id === postId);
                if (post) {
                    // 👇 Rollback if request failed
                    post.isLiked = !post.isLiked;
                    post.likesCount += post.isLiked ? 1 : -1;
                }
                state.error = action.payload;
            });

    }
})


export default HomePostSlice.reducer;