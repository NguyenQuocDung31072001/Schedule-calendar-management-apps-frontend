import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  token: ""
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.data.email;
      state.token = action.payload.data.token
    },
    update: (state, action) => {
      state.email = action.payload.data.email;
      state.token = action.payload.data.token
    },
    logout: (state, _) => {
      state.email = "";
      state.token = ""

    },
  },
});
export const { login, update, logout } = accountSlice.actions;

export default accountSlice.reducer;
