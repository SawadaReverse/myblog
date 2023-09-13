import { MicroCms } from '@/libs/microCms/microCms';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../../types/types';

export async function GET() {
  const cms = new MicroCms();

  return cms
    .getTagLists()
    .then((tags) => {
      return new Response(JSON.stringify(tags), {
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
