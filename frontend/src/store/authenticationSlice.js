import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("access-token") || "",
  user: JSON.parse(localStorage.getItem("user")) || null,
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
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: state => {
      state.accessToken = "";
      state.user = null;
      localStorage.removeItem("access-token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
