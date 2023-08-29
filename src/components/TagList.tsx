import { MicroCms } from '@/libs/microCms/microCms';
import { Box, Typography } from '@mui/material';
import TagArray from './TagArray';

const getTags = async () => {
  'use server';

  const cms = new MicroCms();
  return await cms.getTagLists();
};

export default async function TagList() {
  const tags = await getTags();

  return (
    <>
      <Box>
        <Typography variant="h5" component="h2">
          タグ
        </Typography>
        <Box sx={{ my: 2 }}>
          <TagArray tags={tags.contents} />
        </Box>
      </Box>
    </>
  );
}
