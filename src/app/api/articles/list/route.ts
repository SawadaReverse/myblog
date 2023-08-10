import { MicroCms } from "@/libs/microCms/microCms";
import { Article, MicroCmsResponse } from "@/libs/microCms/types";
import { ApiResponse } from "@/app/api/types/types";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = params.get("page");
  if (!page || Number.isNaN(parseInt(page))) {
    const response: ApiResponse<{}> = {
      message: "invalid request",
    };
    return new Response(JSON.stringify(response), {
      status: StatusCodes.BAD_REQUEST,
    });
  }
  const cms = new MicroCms();
  return cms
    .getArticleList(parseInt(page))
    .then((result: MicroCmsResponse<Article[]>) => {
      const response: ApiResponse<MicroCmsResponse<Article[]>> = {
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
