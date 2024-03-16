import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action that gets dispatch on login/register
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
