import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  otpVerifyToken: null,
  changePasswordToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedUser(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;
    },
    updatePasswordChangeToken: (state, action) => {
      state.changePasswordToken = action.payload.changePasswordToken;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    updateOtpVerifyToken(state, action) {
      state.token = action.payload.token;
    },
    logoutUser(state) {
      state.token = null;
      state.user = null;
      state.changePasswordToken = null;
    },
  },
});

export const {
  loggedUser,
  updateUser,
  logoutUser,
  updateToken,
  updateOtpVerifyToken,
  updatePasswordChangeToken,
} = authSlice.actions;

export default authSlice.reducer;
