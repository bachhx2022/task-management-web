import { ResponseDto } from "@/lib/dtos";

export type LoginResponse = ResponseDto<{
  accessToken: string;
  refreshToken: string;
}>;
