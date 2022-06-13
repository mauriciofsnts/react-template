import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticationParams } from "core/entities";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {},
  reducers: {
    onAuth(state, action: PayloadAction<AuthenticationParams>) {},
    onAuthLoad(state, action) {
      return { ...state, authLoad: action.payload };
    },
    onAuthSuccess(state, action) {
      return { ...state, auth: action.payload, authError: undefined };
    },
    onAuthError(state, action) {
      return { ...state, auth: undefined, authError: action.payload };
    },
  },
});

export const { onAuth, onAuthError, onAuthLoad, onAuthSuccess } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
