import { Box } from '@mui/material';
import ArticleDescription from '@/components/ArticleDescription';
import 'highlight.js/styles/github-dark.css';
import { apiFetch } from '@/libs/api-fetcher/fetcher';
import { Article } from '@/app/api/types/types';
import MarkdownParser from '@/components/MarkdownParser';

type Props = {
  params: { id: string };
};

export default async function ArticlePage(props: Props) {
  const res = await apiFetch(`/api/articles/${props.params.id}`);
  if (!res.ok) {
    console.dir(res, { depth: null });
    throw new Error('failed to fetch articles');
  }

  const data = (await res.json()) as Article;
  return (
    <>
      <ArticleDescription article={data} />

      <Box>
        <MarkdownParser>{data.body}</MarkdownParser>
      </Box>
    </>
  );
}
