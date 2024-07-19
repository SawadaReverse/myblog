import { Box, Typography, Link } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import ja from 'dayjs/locale/ja';
import { MicroCMSArticle } from '@/libs/microCms/types';

dayjs.locale(ja);
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
  article: MicroCMSArticle;
};

export default function ArticleDescription({ article }: Props) {
  return (
    <>
      <Box>
        <Link href={`/articles/${article.id}`} underline="none" color="inherit">
          <Typography variant="h5">{article.title}</Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {dayjs(article.publishedAt)
              .tz('Asia/Tokyo')
              .format('YYYY/MM/DD HH:mm:ss') ?? article.publishedAt}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ my: 2 }}>
            {article.description}
          </Typography>
        </Link>
      </Box>
    </>
  );
}
