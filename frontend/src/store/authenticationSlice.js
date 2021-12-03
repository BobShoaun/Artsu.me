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
      // console.log(payload);
      // state.user = users.find(user => user.username === username);
      state.user = user;
      state.accessToken = "iamajwttoken";
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
