import { createSlice } from "@reduxjs/toolkit";

export const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState: {
    status: false,
    user: null,
  },
  reducers: {
    loginUserReducer: (state, action) => {
      state.status = true;
      state.user = action.payload;
    },
    logoutUserReducer: (state) => {
      state.status = false;
      state.user = null;
    },
  },
});

export const { loginUserReducer, logoutUserReducer } =
  AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
