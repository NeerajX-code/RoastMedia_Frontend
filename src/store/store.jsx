import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Reducers/userReducer'
import authSlice from './Reducers/authReducer'
import searchSlice from './Reducers/searchReducer'
import HomePostSlice from './Reducers/HomePostReducer'
import OtherProfileSlice from "./Reducers/otherProfileReducer";
import CaptionSlice from "./Reducers/captionReducer";
import newPostSlice from './Reducers/postReducer'
import singlePostSlice from '../store/Reducers/singlePostReducer'
import commentSlice from './Reducers/commentReducer'
import SaveSlice from "./Reducers/saveReducer"

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    authReducer: authSlice,
    searchReducer: searchSlice,
    HomePostReducer: HomePostSlice,
    OtherProfileReducer: OtherProfileSlice,
    CaptionReducer: CaptionSlice,
    PostReducer: newPostSlice,
    SaveReducer: SaveSlice,
    PostDetailsReducer: singlePostSlice,
    CommentsReducer: commentSlice
  },
})