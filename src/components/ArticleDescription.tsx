"use client";

import { Article } from "@/libs/microCms/types";
import { Box, Typography, Link } from "@mui/material";
import TagArray from "./TagArray";

type Props = {
  article: Article;
};

export default function ArticleDescription(props: Props) {
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
            {props.article.publishedAt}
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
