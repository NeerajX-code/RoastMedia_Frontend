import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Reducers/userReducer'

export const store = configureStore({
  reducer: {
    userReducer: userSlice
  },
})