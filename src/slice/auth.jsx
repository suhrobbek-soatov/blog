import { createSlice } from "@reduxjs/toolkit";
import { setStorage } from "../utils/utils";

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
      setStorage("token", action.payload.token);
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

export const { authUserStart, authUserSuccess, authUserFailure, authUserLogout } = authSlice.actions;
export default authSlice.reducer;
