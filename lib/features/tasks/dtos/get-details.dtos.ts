import { ResponseDto } from "@/lib/dtos";

export type GetTaskDetailsResponse = ResponseDto<{
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}>;
