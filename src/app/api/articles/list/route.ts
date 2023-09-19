import { MicroCms } from '@/libs/microCms/microCms';
import { MicroCMSArticle } from '@/libs/microCms/types';
import { StatusCodes } from 'http-status-codes';
import { NextRequest } from 'next/server';
import { MicroCMSListResponse, MicroCMSQueries } from 'microcms-js-sdk';
import {
  Article,
  ErrorResponse,
  GetArticleListQuery,
  ListResponse,
} from '../../types/types';

export async function POST(request: NextRequest) {
  let reqBody: GetArticleListQuery;
  try {
    reqBody = await request.json();
  } catch (error) {
    const response: ErrorResponse = {
      message: 'invalid request body',
      code: StatusCodes.BAD_REQUEST,
    };

    return new Response(JSON.stringify(response), {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const params: MicroCMSQueries = {};
  if (reqBody.offset) params.offset = reqBody.offset;
  if (reqBody.limit) params.limit = reqBody.limit;
  if (reqBody.orders) params.orders = reqBody.orders;
  if (reqBody.fields) params.fields = reqBody.fields;
  if (reqBody.tag) params.filters = `tags[contains]${reqBody.tag}`;

  const cms = new MicroCms();
  return cms
    .getArticleList(params)
    .then((result: MicroCMSListResponse<MicroCMSArticle>) => {
      const response: ListResponse<Article> = {
        contents: result.contents,
        totalCount: result.totalCount,
      };
      return new Response(JSON.stringify(response));
    })
    .catch((e) => {
      const response: ErrorResponse = {
        code: e.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
        message: e.message ?? `failed to fetch article list`,
      };

      return new Response(JSON.stringify(response), {
        status: e.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
      });
    });
}
