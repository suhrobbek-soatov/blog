import { configureStore } from "@reduxjs/toolkit";
// reducers
import authReducer from "../slice/auth";
import articleReducer from "../slice/article";

export default configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});
