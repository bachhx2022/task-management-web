import { ResponseStatus } from "../enums";

export type PageableRequest = {
  page?: number;
  take?: number;
  sort?: string[];
};

export type PageMetaInfo = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PaginationResponseData<T> = {
  items: T[];
  meta: PageMetaInfo;
};

export type PaginationResponse<T> = {
  status: ResponseStatus;
  message: string;
  data: PaginationResponseData<T>;
};
