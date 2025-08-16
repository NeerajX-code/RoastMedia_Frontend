import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Reducers/userReducer'
import authSlice from './Reducers/authReducer'
import searchSlice from './Reducers/searchReducer'

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    authReducer: authSlice,
    searchReducer: searchSlice,
  },
})