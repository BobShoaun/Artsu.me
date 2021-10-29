import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: "",
  user: {},
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      const { username, password } = payload;
      state.jwt = "iamajwttoken";
    },
    logout: state => {
      state.jwt = "";
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
