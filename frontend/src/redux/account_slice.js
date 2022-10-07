import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    email: "",
    password: ""
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        update: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        logout: (state, _) => {
            state.username = "";
            state.email = "";
            state.password = "";
        },
    },
});
export const { login, update, logout } = accountSlice.actions;

export default accountSlice.reducer;
