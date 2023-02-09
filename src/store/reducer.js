import { combineReducers } from "redux";
import commentsSlice from "./slices/comments";
import articleSlice from './slices/articles'
import messagesSlice from './slices/message'
import loaderSlice from './slices/loader'
import blogInfoSlice from "./slices/blogInfo";
import adminInfoSlice from "./slices/adminInfo"

const allReducers = combineReducers({
  comments : commentsSlice,
  articles : articleSlice,
  messages : messagesSlice ,
  loader : loaderSlice,
  blogInfo : blogInfoSlice,
  adminInfo : adminInfoSlice
});

export default allReducers