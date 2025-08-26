import { createSlice } from "@reduxjs/toolkit";
import { asyncToggleSave, asyncGetSavedPosts, asyncSavePostToggleLike } from "../Actions/saveActions";

const saveSlice = createSlice({
    name: "save",
    initialState: {
        savedPosts: [],
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        updateSavePostLikeCount: (state, action) => {
            const { postId, likesCount, isLiked } = action.payload;
            const post = state.savedPosts.find(p => p.post._id === postId);
            if (post) {
                post.isLiked = isLiked;
                post.post.likesCount = likesCount;
            }
        },
        updateSavePostCommentsCount: (state, action) => {
            const { id, commentCount } = action.payload;
            const post = state.savedPosts.find((p) => p.post._id === id);
            if (post) {
                post.post.commentCount = commentCount;
                console.log("Updated Save Post:", post);
            }
        },
        updateSavePostShareCount: (state, action) => {
            const { id, shareCount } = action.payload;
            const post = state.savedPosts.find((p) => p.post._id === id);
            if (post) {
                post.post.shareCount = shareCount;
            }
        },
        clearSaveError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Toggle Save
            .addCase(asyncToggleSave.pending, (state) => {
                state.loading = true;
            })
            .addCase(asyncToggleSave.fulfilled, (state, action) => {
                state.loading = false;
                // If post saved → push, if unsaved → remove
                if (action.payload.saved) {
                    state.savedPosts.push(action.payload.save[0]);
                } else {
                    console.log(action.payload.saved);
                    const newSavedPosts = state.savedPosts.filter(
                        (p) => p.post._id !== action.meta.arg
                    );
                    state.savedPosts = newSavedPosts;
                }
            })
            .addCase(asyncToggleSave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Saved Posts
            .addCase(asyncGetSavedPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(asyncGetSavedPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.savedPosts = action.payload;
                state.message = "Save post fetch successfully."
            })
            .addCase(asyncGetSavedPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(asyncSavePostToggleLike.pending, (state, action) => {
                // optimistic update
                const postId = action.meta.arg;
                const post = state.savedPosts.find(p => p.post._id === postId);
                if (post) {
                    post.isLiked = !post.isLiked;
                    post.post.likesCount += post.isLiked ? 1 : -1;
                }
            })
            .addCase(asyncSavePostToggleLike.fulfilled, (state, action) => {
                const { postId, likesCount, isLiked } = action.payload;
                const post = state.savedPosts.find(p => p.post._id === postId);
                if (post) {
                    // 👇 Final sync with backend
                    post.isLiked = isLiked;
                    post.post.likesCount = likesCount;
                }
            })
            .addCase(asyncSavePostToggleLike.rejected, (state, action) => {
                const postId = action.meta.arg;
                const post = state.savedPosts.find(p => p.post._id === postId);
                if (post) {
                    // 👇 Rollback if request failed
                    post.isLiked = !post.isLiked;
                    post.post.likesCount += post.isLiked ? 1 : -1;
                }
                state.error = action.payload;
            });
    },
});

export const { updateSavePostLikeCount, updateSavePostCommentsCount, updateSavePostShareCount, clearSaveError } = saveSlice.actions;
export default saveSlice.reducer;
