import { Box, Divider } from '@mui/material';
import ArticleDescription from '@/components/ArticleDescription';
import Paging from '@/components/Paging';
import { apiFetch } from '@/libs/api-fetcher/fetcher';
import { Article, GetArticleListQuery, ListResponse } from './api/types/types';
import { ARTICLE_PER_PAGE } from '@/libs/constants/constants';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home(props: Props) {
  const pageParam = props.searchParams['page'];
  const page =
    pageParam && !Array.isArray(pageParam) && !Number.isNaN(parseInt(pageParam))
      ? parseInt(pageParam)
      : 1;

  const body: GetArticleListQuery = {
    limit: ARTICLE_PER_PAGE,
    offset: (page - 1) * ARTICLE_PER_PAGE,
    fields: ['id', 'title', 'description', 'publishedAt', 'tags'],
    orders: '-publishedAt',
  };

  const res = await apiFetch(`/api/articles/list?page=${page}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error('failed to fetch articles');
  }

  const data = (await res.json()) as ListResponse<Article>;
  return (
    <>
      {data.contents.map((article) => (
        <Box key={article.id} sx={{ mb: 5 }}>
          <ArticleDescription article={article} />
          <Divider sx={{ my: 3 }} />
        </Box>
      ))}

      <Paging totalCount={data.totalCount} />
    </>
  );
}
