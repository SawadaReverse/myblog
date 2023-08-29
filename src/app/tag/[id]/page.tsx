'use client';

import { ApiResponse, TagDetail } from '@/app/api/types/types';
import ArticleDescription from '@/components/ArticleDescription';
import Paging from '@/components/Paging';
import { fetcher } from '@/libs/swr/fetcher';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { id: string };
};

export default function TagPage(props: Props) {
  const { id } = props.params;

  const param = useSearchParams();
  const pageParam = param.get('page');
  let page: number;
  if (!pageParam || isNaN(parseInt(pageParam))) {
    page = 1;
  } else {
    page = parseInt(pageParam);
  }

  const { data, error, isLoading } = useSWR<ApiResponse<TagDetail>, Error>(
    `/api/tags/${id}?page=${page}`,
    fetcher,
  );

  if (isLoading || !data || !data.result) {
    return (
      <>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      </>
    );
  }
  if (error) {
    throw new Error(error.message);
  }
  if (data.message) {
    throw new Error(data.message);
  }

  return (
    <>
      <Typography variant="h4" component="h2" sx={{ mb: 5 }}>
        {`タグ: ${data.result.name}`}
      </Typography>
      {data.result.articles.contents.map((article) => (
        <Box key={article.id} sx={{ mb: 5 }}>
          <ArticleDescription article={article} />
          <Divider sx={{ my: 3 }} />
        </Box>
      ))}

      <Paging totalCount={data.result.articles.totalCount} />
    </>
  );
}
