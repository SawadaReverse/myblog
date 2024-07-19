import ArticleDescription from '@/components/ArticleDescription';
import Paging from '@/components/Paging';
import { ARTICLE_PER_PAGE, METADATA } from '@/libs/constants/constants';
import { getAllArticleIDs, getArticleList } from '@/libs/microCms/microCms';
import { MicroCMSArticle } from '@/libs/microCms/types';
import { Box, Divider } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `トップページ${METADATA.TITLE_SUFFIX}`,
  description: 'ひまなときにかきます。',
  openGraph: {
    title: `トップページ`,
    description: 'ひまなときにかきます。',
    type: 'website',
    siteName: METADATA.SITE_NAME,
  },
  twitter: {
    title: `トップページ${METADATA.TITLE_SUFFIX}`,
    description: 'ひまなときにかきます。',
  },
};

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
