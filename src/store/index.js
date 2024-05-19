import { configureStore } from "@reduxjs/toolkit";

import auth from "../slices/auth";
import article from "../slices/article";

export default configureStore({
  reducer: { auth, article },
  devTools: import.meta.env.NODE_ENV !== "production",
});
