import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateTaskRequest,
  SearchTasksRequest,
  SearchTasksResponse,
  SetCompleteTaskRequest,
  UpdateTaskRequest,
} from "./dtos";
import { IdResponse } from "@/lib/dtos";
import { GetTaskDetailsResponse } from "./dtos/get-details.dtos";
import { getValidAuthTokens } from "@/lib/utils/cookies";

const getHeader = () =>
  new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getValidAuthTokens().accessToken}`,
  });

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/tasks",
  }),
  endpoints: (builder) => ({
    searchTasks: builder.query<SearchTasksResponse, SearchTasksRequest>({
      query: ({ query, isCompleted }) => ({
        url: "/",
        method: "GET",
        params: {
          query,
          isCompleted,
        },
        headers: getHeader(),
      }),
    }),
    getTaskDetails: builder.query<GetTaskDetailsResponse, string>({
      query: (id) => `/${id}`,
    }),
    createTask: builder.mutation<IdResponse, CreateTaskRequest>({
      query: ({ title, description }) => ({
        url: "/",
        method: "POST",
        body: {
          title,
          description,
        },
        headers: getHeader(),
      }),
    }),
    updateTask: builder.mutation<IdResponse, UpdateTaskRequest>({
      query: ({ id, title, description }) => ({
        url: `/${id}`,
        method: "PUT",
        body: {
          title,
          description,
        },
        headers: getHeader(),
      }),
    }),
    setCompleteTask: builder.mutation<IdResponse, SetCompleteTaskRequest>({
      query: ({ id, isCompleted }) => ({
        url: `/${id}/status`,
        method: "PUT",
        body: {
          isCompleted,
        },
        headers: getHeader(),
      }),
    }),
    deleteTask: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: getHeader(),
      }),
    }),
  }),
});

export const {
  useSearchTasksQuery,
  useGetTaskDetailsQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useSetCompleteTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
