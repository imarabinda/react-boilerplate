import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../types/user";

const initialState = {
  isLoggedIn: false as boolean,
  userData: null as Nullable<UserData>,
  accessToken: "" as Nullable<string>,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
      state.isLoggedIn = Boolean(payload);
    },
    logoutUser: () => {
      return initialState;
    },
  },
});

export const { setUserData, logoutUser, setAccessToken } = userSlice.actions;

export default userSlice;
