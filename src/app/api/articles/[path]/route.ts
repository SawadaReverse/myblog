import { MicroCms } from "@/libs/microCms/microCms";
import { Article } from "@/libs/microCms/types";
import { NextRequest } from "next/server";
import { ApiResponse } from "../../types/types";
import { StatusCodes } from "http-status-codes";

export async function GET(
  request: NextRequest,
  context: { params: { path: string } }
) {
  const { path } = context.params;

  const cms = new MicroCms();
  return cms
    .getArticle(path)
    .then((result: Article) => {
      const response: ApiResponse<Article> = {
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
