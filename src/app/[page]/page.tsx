import ArticleDescription from '@/components/ArticleDescription';
import Paging from '@/components/Paging';
import { ARTICLE_PER_PAGE } from '@/libs/constants/constants';
import { makeMetadata } from '@/libs/metadataMaker/metadataMaker';
import { getAllArticleIDs, getArticleList } from '@/libs/microCms/microCms';
import { MicroCMSArticle } from '@/libs/microCms/types';
import { Box, Divider } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import { MicroCMSListResponse } from 'microcms-js-sdk';

export const generateStaticParams = async () => {
  let data: string[];
  try {
    data = await getAllArticleIDs();
  } catch (e) {
    console.error(e);
    const code =
      e && typeof e === 'object' && 'code' in e
        ? e.code
        : StatusCodes.INTERNAL_SERVER_ERROR;
    throw {
      code,
      message: `failed to fetch article`,
    };
  }

  const pages = Math.ceil(data.length / ARTICLE_PER_PAGE);
  return Array.from({ length: pages }, (_, i) => i + 1).map((page) => ({
    page: String(page),
  }));
};

type Props = {
  params: { page: string };
};

export const generateMetadata = async ({ params: { page } }: Props) => {
  return makeMetadata({
    title: `トップページ`,
    description: 'ひまなときにかきます。',
    type: 'website',
    url: `/${page}`,
  });
};

export default async function Page({ params: { page } }: Props) {
  const pageNum = Number(page);

  let data: MicroCMSListResponse<MicroCMSArticle>;
  try {
    data = await getArticleList({
      limit: ARTICLE_PER_PAGE,
      offset: (pageNum - 1) * ARTICLE_PER_PAGE,
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

      <Paging
        totalCount={data.totalCount}
        currentPage={pageNum}
        currentPath="/"
      />
    </>
  );
}
