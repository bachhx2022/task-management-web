import { ErrorCode, ResponseStatus } from "../enums";

export type ResponseDto<T> = {
  status: ResponseStatus;
  errorCode?: ErrorCode;
  message?: string;
  data: T;
};
