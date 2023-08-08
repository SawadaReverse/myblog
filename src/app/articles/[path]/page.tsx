import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { MicroCms } from "@/app/_libs/microCms/microCms";
import { Box } from "@mui/material";
import ArticleDescription from "@/app/_components/ArticleDescription";
import "highlight.js/styles/github-dark.css";

const getArticle = async (path: string) => {
  const cms = new MicroCms();
  return await cms.getArticle(path);
};

export default async function ArticlePage({
  params,
}: {
  params: { path: string };
}) {
  const article = await getArticle(params.path);
  return (
    <>
      <ArticleDescription article={article} />

      <Box>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {article.body}
        </ReactMarkdown>
      </Box>
    </>
  );
}
