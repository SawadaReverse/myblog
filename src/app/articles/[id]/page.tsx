'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Box, CircularProgress } from '@mui/material';
import ArticleDescription from '@/components/ArticleDescription';
import 'highlight.js/styles/github-dark.css';
import useSWR from 'swr';
import { ApiResponse } from '@/app/api/types/types';
import { fetcher } from '@/libs/swr/fetcher';
import { Article } from '@/libs/microCms/types';

export default function ArticlePage({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useSWR<ApiResponse<Article>>(
    `/api/articles/${params.id}`,
    fetcher,
  );
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
      <ArticleDescription article={data.result} />

      <Box>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {data.result.body}
        </ReactMarkdown>
      </Box>
    </>
  );
}
