import { MicroCms } from "@/libs/microCms/microCms";
import { Tag } from "@/libs/microCms/types";
import { NextRequest } from "next/server";
import { ApiResponse } from "../../types/types";
import { StatusCodes } from "http-status-codes";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const cms = new MicroCms();
  return cms
    .getTag(id)
    .then((result) => {
      const response: ApiResponse<Tag> = {
        result,
        message: "",
      };

      return new Response(JSON.stringify(response));
    })
    .catch((e) => {
      const response: ApiResponse<{}> = {
        message: e.message ?? "internal server error",
      };

      return new Response(JSON.stringify(response), {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    });
}
