import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Reducers/userReducer'
import authSlice from './Reducers/authReducer'
import searchSlice from './Reducers/searchReducer'
import HomePostSlice from './Reducers/HomePostReducer'
import OtherProfileSlice from "./Reducers/otherProfileReducer";
import CaptionSlice from "./Reducers/captionReducer";
import newPostSlice from './Reducers/postReducer'

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    authReducer: authSlice,
    searchReducer: searchSlice,
    HomePostReducer: HomePostSlice,
    OtherProfileReducer: OtherProfileSlice,
    CaptionReducer: CaptionSlice,
    PostReducer: newPostSlice
  },
})