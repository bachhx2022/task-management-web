import { PaginationResponse } from "@/lib/dtos";

export type SearchTasksRequest = {
  query?: string;
  isCompleted?: boolean;
};

export type SearchTaskItem = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SearchTasksResponse = PaginationResponse<SearchTaskItem>;
