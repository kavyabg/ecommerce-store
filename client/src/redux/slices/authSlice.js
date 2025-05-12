import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  expiresAt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const fullUser = action.payload;
      state.user = fullUser;
      state.isAuthenticated = true;
      const twentyDaysInMs = 1000 * 60 * 60 * 24 * 20;
      state.expiresAt = Date.now() + twentyDaysInMs;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.expiresAt = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
