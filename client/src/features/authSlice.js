import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = {
                username: action.payload.username
            };
            state.user.token = action.payload.token;
            state.isAuthenticated = true;

            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state = initialState;
            localStorage.removeItem('token');
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;