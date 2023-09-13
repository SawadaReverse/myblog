import { MicroCms } from '@/libs/microCms/microCms';
import { MicroCMSArticle } from '@/libs/microCms/types';
import { NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { Article, ErrorResponse } from '../../types/types';

export async function GET(_: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const cms = new MicroCms();
  return cms
    .getArticle(id)
    .then((result: MicroCMSArticle) => {
      const response: Article = {
        ...result,
      };
      return new Response(JSON.stringify(response));
    })
    .catch((e) => {
      const response: ErrorResponse = {
        message: e.message ?? 'internal server error',
        code: e.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
      };

      return new Response(JSON.stringify(response), {
        status: e.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
      });
    });
}
