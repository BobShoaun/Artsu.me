import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authenticationSlice";

const store = configureStore({
  reducer: {
    authentication,
  },
});

export default store;
