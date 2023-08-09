import { Box, Divider } from "@mui/material";
import ArticleDescription from "@/components/ArticleDescription";
import Paging from "@/components/Paging";
import { MicroCms } from "@/libs/microCms/microCms";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home(props: Props) {
  const pageParam = props.searchParams["page"];
  const page =
    pageParam && !Array.isArray(pageParam) && !Number.isNaN(parseInt(pageParam))
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
