import { MicroCmsResponse } from "@/libs/microCms/types";

export type ApiResponse<T> = {
  result?: T;
  message: string;
};
