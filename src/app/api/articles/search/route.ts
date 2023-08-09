import { MicroCms } from "@/libs/microCms/microCms";
import { MicroCmsResponse, Article } from "@/libs/microCms/types";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/app/api/types/types";
import { StatusCodes } from "http-status-codes";

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { q } = req.query;
  if (!q || Array.isArray(q)) {
    const response: ApiResponse<{}> = {
      message: "invalid request",
    };
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  const query = q.replaceAll(" ", ",");
  const cms = new MicroCms();
  cms.searchArticle(query).then((result: MicroCmsResponse<Article[]>) => {
    const response: ApiResponse<Article[]> = {
      result,
    };
    res.status(StatusCodes.OK).json(response);
  });
};

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getHandler(req, res);
  }
  const response: ApiResponse<{}> = {
    message: "invalid request",
  };
  return res.status(StatusCodes.BAD_REQUEST).json(response);
}
