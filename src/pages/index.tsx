import { Box, Divider } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { MicroCms } from "@/libs/microCms/microCms";
import { Article } from "@/libs/microCms/types";
import ArticleDescription from "@/components/ArticleDescription";
import Paging from "@/components/Paging";

type Props = {
  content: Article[];
  totalCount: number;
  pageNumber: number;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let { page } = context.query;
  if (!page || Array.isArray(page)) page = "1";

  let pageNumber = parseInt(page);
  if (isNaN(pageNumber)) {
    pageNumber = 1;
  }

  const cms = new MicroCms();
  const articles = await cms.getArticleList(pageNumber);

  const props: Props = {
    content: articles.contents,
    totalCount: articles.totalCount,
    pageNumber,
  };
  return {
    props,
  };
}

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      {props.content.map((article) => (
        <Box key={article.id} sx={{ mb: 5 }}>
          <ArticleDescription article={article} />
          <Divider sx={{ my: 3 }} />
        </Box>
      ))}

      <Paging totalCount={props.totalCount} currentPage={props.pageNumber} />
    </>
  );
}
