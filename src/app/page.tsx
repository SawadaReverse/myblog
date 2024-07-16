import { Box, Divider } from '@mui/material';
import ArticleDescription from '@/components/ArticleDescription';
import Paging from '@/components/Paging';
import { ARTICLE_PER_PAGE } from '@/libs/constants/constants';
import { getArticleList } from '@/libs/microCms/microCms';
import { MicroCMSArticle } from '@/libs/microCms/types';
import { StatusCodes } from 'http-status-codes';
import { MicroCMSListResponse } from 'microcms-js-sdk';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home(props: Props) {
  const pageParam = props.searchParams['page'];
  const page =
    pageParam && !Array.isArray(pageParam) && !Number.isNaN(parseInt(pageParam))
      ? parseInt(pageParam)
      : 1;

  let data: MicroCMSListResponse<MicroCMSArticle> = {
    totalCount: 0,
    contents: [],
    limit: 0,
    offset: 0,
  };
  try {
    data = await getArticleList({
      limit: ARTICLE_PER_PAGE,
      offset: (page - 1) * ARTICLE_PER_PAGE,
      fields: 'id,title,description,publishedAt',
      orders: '-publishedAt',
    });
  } catch (e) {
    console.error(e);
    const code =
      e && typeof e === 'object' && 'code' in e
        ? e.code
        : StatusCodes.INTERNAL_SERVER_ERROR;
    throw {
      code,
      message: `failed to fetch article list`,
    };
  }

  return (
    <>
      {data?.contents.map((article) => (
        <Box key={article.id} sx={{ mb: 5 }}>
          <ArticleDescription article={article} />
          <Divider sx={{ my: 3 }} />
        </Box>
      ))}

      <Paging totalCount={data.totalCount} />
    </>
  );
}
