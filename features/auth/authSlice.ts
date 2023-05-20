import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  id: string;
  name: string;
  email: string;
  token: string;
}

const initialState: AuthState = {
  id: "",
  name: "",
  email: "",
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { id, name, email, token } }) => {
      state.id = id;
      state.name = name;
      state.email = email;
      state.token = token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
