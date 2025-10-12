import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;

            if(action.payload.token){
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            }
            state.isAuthenticated = true;
        },
        logout: (state) => {
            localStorage.removeItem("token");
            state = {
                user: null,
                token: null,
                isAuthenticated: false
            }
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;