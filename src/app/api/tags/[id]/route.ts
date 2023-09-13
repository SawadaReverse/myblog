import { MicroCms } from '@/libs/microCms/microCms';
import { NextRequest } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../../types/types';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  const params = request.nextUrl.searchParams;
  const page = params.get('page');
  if (!page || Number.isNaN(parseInt(page))) {
    const response: ErrorResponse = {
      code: StatusCodes.BAD_REQUEST,
      message: 'invalid request',
    };
    return new Response(JSON.stringify(response), {
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const cms = new MicroCms();
  return cms
    .getTag(id)
    .then((result) => {
      return new Response(JSON.stringify(result), {
        status: StatusCodes.OK,
      });
    })
    .catch((e) => {
      const response: ErrorResponse = {
        code: e.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
        message: e.message ?? 'internal server error',
      };

      return new Response(JSON.stringify(response), {
        status: e.code ?? StatusCodes.INTERNAL_SERVER_ERROR,
      });
    });
}
