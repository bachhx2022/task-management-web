import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetWeatherDetailsResponse } from "./dtos/get-details.dtos";
import { getValidAuthTokens } from "@/lib/utils/cookies";
import { headers } from "next/headers";

const getHeader = () =>
  new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getValidAuthTokens().accessToken}`,
  });
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/weather",

  }),
  endpoints: (builder) => ({
    getWeatherDetails: builder.query<GetWeatherDetailsResponse, string>({
      query: (city) => ({
        url: `/?city=${city}`,
        method: "GET",
        headers: getHeader(),
      }),
    }),
   
  }),
});

export const { useGetWeatherDetailsQuery } = weatherApi;
