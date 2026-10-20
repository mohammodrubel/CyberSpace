import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { DecodedUser } from "@/lib/jwt_decode";
import type { RootState } from "@/redux/store";

interface AuthState {
  user: DecodedUser | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: DecodedUser; token?: string | null }>) {
      state.user = action.payload.user;
      state.token = action.payload.token ?? null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const useAuthToken = (): string | null =>
  useSelector((state: RootState) => state.auth.token);

export const useAuthUser = (): DecodedUser | null =>
  useSelector((state: RootState) => state.auth.user);
