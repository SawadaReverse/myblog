import { ApiResponse } from '@/app/api/types/types';
import { MicroCms } from '@/libs/microCms/microCms';
import { Article, GetArticleListParams } from '@/libs/microCms/types';
import { StatusCodes } from 'http-status-codes';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: { path: string } },
) {
  const { path } = context.params;
  const params = request.nextUrl.searchParams;
  const page = params.get('page');
  if (!page || Number.isNaN(parseInt(page))) {
    const response: ApiResponse<Record<string, never>> = {
      message: 'invalid request',
    };
    return new Response(JSON.stringify(response), {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const query: GetArticleListParams = {
    tag: path,
    limit: 10,
    fields: ['title', 'description', 'publishedAt', 'tags'],
  };
  if (parseInt(page) > 1) {
    // TODO: 定数化
    query.offset = 10 * parseInt(page);
  }

  const cms = new MicroCms();
  return cms
    .getArticleList(query)
    .then((result: MicroCMSListResponse<Article>) => {
      const response: ApiResponse<MicroCMSListResponse<Article>> = {
        result,
        message: '',
      };

      return new Response(JSON.stringify(response));
    })
    .catch((e) => {
      const response: ApiResponse<Record<string, never>> = {
        message: e.message ?? 'internal server error',
      };

      return new Response(JSON.stringify(response), {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    });
}
