import { Box, Typography } from '@mui/material';
import TagArray from './TagArray';
import { apiFetch } from '@/libs/api-fetcher/fetcher';
import { ListResponse, Tag } from '@/app/api/types/types';

export default async function TagList() {
  const res = await apiFetch('/api/tags/list');
  if (!res.ok) {
    return (
      <>
        <Box>
          <Typography variant="h5" component="h2">
            タグ
          </Typography>
          <Box sx={{ my: 2 }}>
            <Typography>タグを取得できませんでした。</Typography>
          </Box>
        </Box>
      </>
    );
  }

  const data = (await res.json()) as ListResponse<Tag>;
  return (
    <>
      <Box>
        <Typography variant="h5" component="h2">
          タグ
        </Typography>
        <Box sx={{ my: 2 }}>
          <TagArray tags={data.contents} />
        </Box>
      </Box>
    </>
  );
}
