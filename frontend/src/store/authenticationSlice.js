import { createSlice } from "@reduxjs/toolkit";
import { users } from "../users.json";

const initialState = {
  accessToken: "",
  user: null,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      const { user, accessToken } = payload;

      state.user = user;
      state.accessToken = accessToken;
      localStorage.setItem("access-token", accessToken);
    },
    logout: state => {
      state.accessToken = "";
      state.user = {};
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
