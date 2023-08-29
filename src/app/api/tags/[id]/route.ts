import { MicroCms } from '@/libs/microCms/microCms';
import { GetArticleListParams, Tag } from '@/libs/microCms/types';
import { NextRequest } from 'next/server';
import { ApiResponse, TagDetail } from '../../types/types';
import { StatusCodes } from 'http-status-codes';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const { id } = context.params;

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

  const cms = new MicroCms();
  let tag: Tag;
  let response: ApiResponse<TagDetail>;
  try {
    tag = await cms.getTag(id);
  } catch (e) {
    if (
      e instanceof Object &&
      'message' in e &&
      typeof e.message === 'string'
    ) {
      response = {
        message: e.message,
      };
    } else {
      response = {
        message: 'internal server error',
      };
    }

    return new Response(JSON.stringify(response), {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }

  const requestParams: GetArticleListParams = {
    // TODO: 定数化
    limit: 10,
    filters: `tags[contains]${tag.id}`,
  };
  if (parseInt(page) - 1 > 0) {
    // TODO: 定数化
    requestParams.offset = 10 * (parseInt(page) - 1);
  }
  return cms
    .getArticleList(requestParams)
    .then((articles) => {
      response = {
        result: {
          id: tag.id,
          name: tag.name,
          createdAt: tag.createdAt,
          updatedAt: tag.updatedAt,
          articles,
        },
        message: '',
      };

      return new Response(JSON.stringify(response), {
        status: StatusCodes.OK,
      });
    })
    .catch((e) => {
      response = {
        message: e.message ?? 'internal server error',
      };

      return new Response(JSON.stringify(response), {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    });
}
