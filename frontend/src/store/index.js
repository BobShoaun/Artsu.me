import { configureStore } from "@reduxjs/toolkit";
import authentication from "./authenticationSlice";
import general from "./generalSlice";

const store = configureStore({
  reducer: {
    general,
    authentication,
  },
});

export default store;
