import { createSlice } from "@reduxjs/toolkit";
import { asyncRegisterUser, asyncLoginUser, asyncLogoutUser } from "../Actions/authActions";
import { isAnyOf } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    successMessage: null,
    isAuthenticated:false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncLogoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(asyncLogoutUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
            })
            .addCase(asyncLogoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
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
                    state.isAuthenticated = true
                    state.successMessage =
                        action.type === asyncRegisterUser.fulfilled.type
                            ? "User registered successfully!"
                            : "User logged in successfully!";
                }
            )

            // Rejected for both
            .addMatcher(
                isAnyOf(asyncRegisterUser.rejected, asyncLoginUser.rejected),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
    },
});

export const { setToken, clearError } = authSlice.actions;

export default authSlice.reducer;
