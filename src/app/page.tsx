'use client';

import { Box, CircularProgress, Divider } from '@mui/material';
import ArticleDescription from '@/components/ArticleDescription';
import Paging from '@/components/Paging';
import useSWR from 'swr';
import { ApiResponse } from './api/types/types';
import { Article } from '@/libs/microCms/types';
import { fetcher } from '@/libs/swr/fetcher';
import { MicroCMSListResponse } from 'microcms-js-sdk';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home(props: Props) {
  const pageParam = props.searchParams['page'];
  const page =
    pageParam && !Array.isArray(pageParam) && !Number.isNaN(parseInt(pageParam))
      ? parseInt(pageParam)
      : 1;

  const { data, error, isLoading } = useSWR<
    ApiResponse<MicroCMSListResponse<Article>>,
    Error
  >(`/api/articles/list?page=${page}`, fetcher);
  if (isLoading || !data || !data.result)
    return (
      <>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
        </Box>
      </>
    );
  if (error) {
    throw new Error(error.message);
  }
  if (data.message) {
    throw new Error(data.message);
  }
  return (
    <>
      {data.result.contents.map((article) => (
        <Box key={article.id} sx={{ mb: 5 }}>
          <ArticleDescription article={article} />
          <Divider sx={{ my: 3 }} />
        </Box>
      ))}

      <Paging totalCount={data.result.totalCount} />
    </>
  );
}
