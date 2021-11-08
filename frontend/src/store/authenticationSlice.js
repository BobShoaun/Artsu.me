import { createSlice } from "@reduxjs/toolkit";
import { users } from "../users.json";

const initialState = {
  jwt: "",
  user: {},
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      const { username } = payload;
      // console.log(payload);
      state.user = users.find(user => user.username === username);
      state.jwt = "iamajwttoken";
    },
    logout: state => {
      state.jwt = "";
      state.user = {};
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
