import { createSlice } from "@reduxjs/toolkit";
import { asyncGetComments, asyncPostComment, asyncEditComment, asyncDeleteComment } from "../Actions/commentActions";

const initialState = {
    comments: [],
    loading: false,
    commentError: null,
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        clearComment: (state) => {
            state.comments = [];
            state.commentError = null;
        },
        clearError: (state) => {
            state.commentError = null;
        },

        deleteComment: (state, action) => {
            const id = action.payload;
            state.comments = state.comments.filter((c) => c._id !== id);
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetComments.pending, (state) => {
                state.loading = true;
                state.commentError = null;
            })
            .addCase(asyncGetComments.fulfilled, (state, action) => {
                state.loading = false;
            // Ensure newest-first ordering
            state.comments = [...(action.payload || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            })
            .addCase(asyncGetComments.rejected, (state, action) => {
                state.loading = false;
                state.commentError = action.payload;
            })
            .addCase(asyncPostComment.pending, (state) => {
                state.loading = true;
                state.commentError = null;
            })
            .addCase(asyncPostComment.fulfilled, (state, action) => {
                state.loading = false;
                        // New comment should appear at the top (newest-first)
                        if (action.payload) {
                            state.comments.unshift(action.payload);
                        }
            })
            .addCase(asyncPostComment.rejected, (state, action) => {
                state.loading = false;
                state.commentError = action.payload;
            })
            .addCase(asyncEditComment.pending, (state) => {
                state.loading = true;
                state.commentError = null;
            })
            .addCase(asyncEditComment.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                const idx = state.comments.findIndex((c) => c._id === updated._id);
                if (idx !== -1) state.comments[idx] = updated;
            })
            .addCase(asyncEditComment.rejected, (state, action) => {
                state.loading = false;
                state.commentError = action.payload; // rejectWithValue se aaya error message
            })

            // Delete Comment
            .addCase(asyncDeleteComment.pending, (state) => {
                state.loading = true;
                state.commentError = null;
            })
            .addCase(asyncDeleteComment.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = action.payload;
                state.comments = state.comments.filter((c) => c._id !== deletedId);
            })
            .addCase(asyncDeleteComment.rejected, (state, action) => {
                state.loading = false;
                state.commentError = action.payload;
            });
    },
});

export const { clearComment, clearError, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;


