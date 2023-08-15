import { MicroCms } from '@/libs/microCms/microCms';
import { Article } from '@/libs/microCms/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/app/api/types/types';
import { StatusCodes } from 'http-status-codes';
import { MicroCMSListResponse } from 'microcms-js-sdk';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;
  if (!q || Array.isArray(q)) {
    const response: ApiResponse<Record<string, never>> = {
      message: 'invalid request',
    };
    return res.status(StatusCodes.BAD_REQUEST).json(response);
  }

  const query = q.replaceAll(' ', ',');
  const cms = new MicroCms();
  cms.searchArticle(query).then((result: MicroCMSListResponse<Article>) => {
    const response: ApiResponse<MicroCMSListResponse<Article>> = {
      result,
      message: '',
    };
    res.status(StatusCodes.OK).json(response);
  });
}
