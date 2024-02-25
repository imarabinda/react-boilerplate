import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  helloWorld: "" as string,
};

export const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    sayHello: (state, { payload }) => {
      state.helloWorld = payload;
    },
  },
});

export const { sayHello } = commonSlice.actions;

export default commonSlice;
