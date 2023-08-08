import { Box, Divider } from "@mui/material";
import ArticleDescription from "@/app/_components/ArticleDescription";
import Paging from "@/app/_components/Paging";
import { MicroCms } from "@/app/_libs/microCms/microCms";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageParam = searchParams["page"];
  const page =
    !Array.isArray(pageParam) && !Number.isNaN(parseInt(pageParam))
      ? parseInt(pageParam)
      : 1;

  const cms = new MicroCms();
  const articleList = await cms.getArticleList(page);
  return (
    <>
      {articleList.contents.map((article) => (
        <Box key={article.id} sx={{ mb: 5 }}>
          <ArticleDescription article={article} />
          <Divider sx={{ my: 3 }} />
        </Box>
      ))}

      <Paging totalCount={articleList.totalCount} currentPage={page} />
    </>
  );
}
