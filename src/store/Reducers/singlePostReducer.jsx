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
        updateSinglePostLike(state, action) {
            const { postId, likesCount, isLiked } = action.payload;
            if (state.singlePostDetails[0] && state.singlePostDetails[0]._id === postId) {
                state.singlePostDetails[0].likesCount = likesCount;
                state.singlePostDetails[0].isLiked = isLiked;
            }
        },
        updateSinglePostCommentCount(state, action) {
            const { id, commentCount } = action.payload;
            if (state.singlePostDetails[0] && state.singlePostDetails[0]._id === id) {
                state.singlePostDetails[0].commentCount = commentCount;
            }
        },
        updateSinglePostShareCount(state, action) {
            const { id, shareCount } = action.payload;
            if (state.singlePostDetails[0] && state.singlePostDetails[0]._id === id) {
                state.singlePostDetails[0].shareCount = shareCount;
            }
        },
        updateSinglePostSaved(state, action) {
            const { id, saved } = action.payload;
            if (state.singlePostDetails[0] && state.singlePostDetails[0]._id === id) {
                state.singlePostDetails[0].saved = saved;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncSinglePost.pending, (state) => {
                state.singlePostLoading = true;
                state.error = null;
            })
            .addCase(asyncSinglePost.fulfilled, (state, action) => {
                state.singlePostLoading = false;
                // keep a single current post instance
                state.singlePostDetails = [action.payload];
            })
            .addCase(asyncSinglePost.rejected, (state, action) => {
                state.singlePostLoading = false;
                state.error = action.payload;
            });
    },
});

export const { updateSinglePostLike, updateSinglePostCommentCount, updateSinglePostShareCount, updateSinglePostSaved } = singlePostSlice.actions;
export default singlePostSlice.reducer;
