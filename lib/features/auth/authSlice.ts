import { setCookie, deleteCookie } from "cookies-next";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authAPI";
import {} from "cookies-next";
import { LoginResponse } from "./dtos";

const initialState: Partial<LoginResponse> = {};

const setAuthCookie = (token: string, name: string) => {
  const toBase64 = Buffer.from(token).toString("base64");

  setCookie(name, toBase64, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      deleteCookie("accessToken");
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (_state, { payload }) => {
        setAuthCookie(payload.data.accessToken, "accessToken");
        return payload;
      }
    );
  },
});

export const { logout } = authSlice.actions;
