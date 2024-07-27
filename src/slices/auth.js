import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../lib";

const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUserStart: state => {
      state.isLoading = true;
    },
    authUserSuccess: (state, action) => {
      state.loggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
      storage.local.set("token", action.payload.token);
    },
    authUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    authUserLogout: state => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

export const { authUserStart, authUserSuccess, authUserFailure, authUserLogout } =
  authSlice.actions;
export default authSlice.reducer;
