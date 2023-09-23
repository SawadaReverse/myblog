'use client';

import { Box, Typography, Link } from '@mui/material';
import TagArray from './TagArray';
import { Article } from '@/app/api/types/types';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

type Props = {
  article: Article;
};

export default function ArticleDescription(props: Props) {
  dayjs.locale('ja');
  return (
    <>
      <Box>
        <Link
          href={`/articles/${props.article.id}`}
          underline="none"
          color="inherit"
        >
          <Typography variant="h5">{props.article.title}</Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {dayjs(props.article.publishedAt).format('YYYY/MM/DD HH:mm:ss') ??
              props.article.publishedAt}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ my: 2 }}>
            {props.article.description}
          </Typography>
        </Link>

        <TagArray tags={props.article.tags} />
      </Box>
    </>
  );
}
