import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPublic: true,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setIsPublic: (state, payload) => {
      state.isPublic = payload.isPublic;
    },
  },
});

export const { setIsPublic } = generalSlice.actions;
export default generalSlice.reducer;
