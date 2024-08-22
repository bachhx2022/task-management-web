import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginResponse } from "./dtos";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse,
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
