import { createSlice } from "@reduxjs/toolkit";
import { asyncRegisterUser, asyncLoginUser } from "../Actions/authActions";
import { isAnyOf } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    successMessage: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Pending for both register and login
            .addMatcher(
                isAnyOf(asyncRegisterUser.pending, asyncLoginUser.pending),
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.successMessage = null;
                }
            )

            // Fulfilled for both
            .addMatcher(
                isAnyOf(asyncRegisterUser.fulfilled, asyncLoginUser.fulfilled),
                (state, action) => {
                    state.loading = false;
                    state.successMessage =
                        action.type === asyncRegisterUser.fulfilled.type
                            ? "User registered successfully!"
                            : "User logged in successfully!";
                    if (action.payload?.user) {
                        state.user = action.payload.user;
                    }
                }
            )

            // Rejected for both
            .addMatcher(
                isAnyOf(asyncRegisterUser.rejected, asyncLoginUser.rejected),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export default authSlice.reducer;
