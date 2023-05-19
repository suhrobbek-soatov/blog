import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/auth";

export default configureStore({
  reducer: { auth: authReducer },
  devTools: import.meta.NODE_ENV !== "production",
});
