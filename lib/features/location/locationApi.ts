import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetLocationDetailsResponse } from "./dtos/get-details.dtos";
import { getValidAuthTokens } from "@/lib/utils/cookies";

const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getValidAuthTokens().accessToken}`,
});

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://ip-api.com",
    headers,
  }),
  endpoints: (builder) => ({
    getLocationDetails: builder.query<GetLocationDetailsResponse, void>({
      query: () => `/json`,
    }),
  }),
});

export const { useGetLocationDetailsQuery } = locationApi;
