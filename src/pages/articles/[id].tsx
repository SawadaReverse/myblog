import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { MicroCms } from "@/libs/microCms/microCms";
import { Article } from "@/libs/microCms/types";
import { Box } from "@mui/material";
import ArticleDescription from "@/components/ArticleDescription";
import "highlight.js/styles/github.css";

type Props = {
  article: Article;
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  if (!id || Array.isArray(id)) {
    throw new Error("Invalid id");
  }

  const cms = new MicroCms();
  const article = await cms.getArticle(id);

  const props: Props = {
    article,
  };

  return {
    props,
  };
}

export default function ArticlePage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <>
      <ArticleDescription article={props.article} />

      <Box>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {props.article.body}
        </ReactMarkdown>
      </Box>
    </>
  );
}
