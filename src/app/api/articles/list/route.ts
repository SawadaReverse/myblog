import { MicroCms } from "@/libs/microCms/microCms";
import { Article, GetArticleListParams } from "@/libs/microCms/types";
import { ApiResponse } from "@/app/api/types/types";
import { StatusCodes } from "http-status-codes";
import { NextRequest } from "next/server";
import { MicroCMSListResponse } from "microcms-js-sdk";

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

  const query: GetArticleListParams = {
    // TODO: 定数化
    limit: 10,
    fields: ["id", "title", "description", "publishedAt", "tags"],
  };
  if (parseInt(page) - 1 > 0) {
    // TODO: 定数化
    query.offset = 10 * (parseInt(page) - 1);
  }

  const cms = new MicroCms();
  return cms
    .getArticleList(query)
    .then((result: MicroCMSListResponse<Article>) => {
      const response: ApiResponse<MicroCMSListResponse<Article>> = {
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
