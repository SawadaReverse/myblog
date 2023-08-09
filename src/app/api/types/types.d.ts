import { MicroCmsResponse } from "@/libs/microCms/types";

export type ApiResponse<T> = {
  result?: MicroCmsResponse<T>;
  message?: string;
};
