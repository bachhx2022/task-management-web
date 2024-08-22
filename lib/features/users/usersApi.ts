import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type CreateUserRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

export type CreateUserResponse = {
  status: string;
  message: string;
  data: {
    id: string;
  };
};

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/users",
  }),
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    register: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: ({ email, password, confirmPassword, firstName, lastName }) => ({
        url: "/",
        method: "POST",
        body: {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
        },
      }),
    }),
  }),
});

export const { useRegisterMutation } = usersApi;
