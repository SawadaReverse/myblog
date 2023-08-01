import { MicroCms } from "@/libs/microCms/microCms";
import { Box, Typography } from "@mui/material";
import TagArray from "./TagArray";

export default async function TagList() {
  const cms = new MicroCms();
  let result;
  try {
    const tags = await cms.getTags();
    result = (
      <>
        <TagArray tags={tags.contents} />
      </>
    );
  } catch (error) {
    result = (
      <>
        <Typography variant="body2" color="text.secondary" component="div">
          タグの取得に失敗しました。
        </Typography>
      </>
    );
    console.error(error);
  }

  return (
    <>
      <Box>
        <Typography variant="h5" component="h2">
          タグ
        </Typography>
        {result}
      </Box>
    </>
  );
}
