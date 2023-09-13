import { Article, GetArticleListQuery, Tag } from '@/app/api/types/types';
import { ListResponse } from '@/app/api/types/types';
import ArticleDescription from '@/components/ArticleDescription';
import Paging from '@/components/Paging';
import { apiFetch } from '@/libs/api-fetcher/fetcher';
import { Box, Divider } from '@mui/material';
import PageTitle from '@/components/PageTitle';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { id: string };
};

export default async function TagPage(props: Props) {
  const { id } = props.params;
  const pageParam = props.searchParams['page'];
  let page: number;
  if (!pageParam || Array.isArray(pageParam) || isNaN(parseInt(pageParam))) {
    page = 1;
  } else {
    page = parseInt(pageParam);
  }

  const tagRes = await apiFetch(`/api/tags/${id}?page=${page}`);
  if (!tagRes.ok) {
    throw new Error('failed to fetch tag');
  }

  let tag: Tag = {
    id: '',
    name: '',
  };
  try {
    tag = (await tagRes.json()) as Tag;
  } catch (e) {
    throw new Error('failed to parse tag');
  }

  const body: GetArticleListQuery = {
    limit: 10,
    offset: (page - 1) * 10,
    fields: ['id', 'title', 'description', 'publishedAt', 'tags'],
    orders: '-publishedAt',
    tag: id,
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
      <PageTitle>{`タグ: ${tag.name}`}</PageTitle>
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
