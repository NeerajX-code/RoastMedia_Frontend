import { createSlice } from "@reduxjs/toolkit";
import { asyncGetUsers } from "../Actions/searchActions";

const initialState = {
    query: "",
    results: [],
    loading: false,
    error: null,
    message: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        clearSearch: (state) => {
            state.query = "";
            state.results = [];
            state.message = "";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(asyncGetUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload?.users || [];
                state.message = action.payload?.message || "";
            })
            .addCase(asyncGetUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
