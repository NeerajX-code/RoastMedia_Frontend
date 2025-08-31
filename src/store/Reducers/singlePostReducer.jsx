import { createSlice } from "@reduxjs/toolkit";
import { asyncSinglePost } from '../Actions/singlePostAction'

const initialState = {
    singlePostLoading: false,
    error: null,
    singlePostDetails: {},
};

const singlePostSlice = createSlice({
    name: "singlePost",
    initialState,
    reducers: {
        updateSinglePostLike(state, action) {
            const { postId, likesCount, isLiked } = action.payload;
            console.log(action.payload);

            if (state.singlePostDetails && state.singlePostDetails.post._id === postId) {
                state.singlePostDetails.post.likesCount = likesCount;
                state.singlePostDetails.post.isLiked = isLiked;
            }
        },
        updateSinglePostCommentCount(state, action) {
            const { id, commentCount } = action.payload;
            if (state.singlePostDetails.post && state.singlePostDetails.post._id === id) {
                state.singlePostDetails.post.commentCount = commentCount;
            }
        },
        updateSinglePostShareCount(state, action) {
            const { id, shareCount } = action.payload;
            if (state.singlePostDetails.post && state.singlePostDetails.post._id === id) {
                state.singlePostDetails.post.shareCount = shareCount;
            }
        },
        updateSinglePostSaved(state, action) {
            const { id, isSaved } = action.payload;
            if (state.singlePostDetails.post && state.singlePostDetails.post._id === id) {
                state.singlePostDetails.post.isSaved = isSaved;
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
                state.singlePostDetails = { ...action.payload };
            })
            .addCase(asyncSinglePost.rejected, (state, action) => {
                state.singlePostLoading = false;
                state.error = action.payload;
            });
    },
});

export const { updateSinglePostLike, updateSinglePostCommentCount, updateSinglePostShareCount, updateSinglePostSaved } = singlePostSlice.actions;
export default singlePostSlice.reducer;
