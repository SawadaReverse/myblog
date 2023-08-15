"use client";

import { ApiResponse } from "@/app/api/types/types";
import { Article } from "@/libs/microCms/types";
import { fetcher } from "@/libs/swr/fetcher";
import { Box, CircularProgress, Divider } from "@mui/material";
import { MicroCMSListResponse } from "microcms-js-sdk";
import useSWR from "swr";
import ArticleDescription from "./ArticleDescription";
import Paging from "./Paging";

export default function ArticleList(url: string, page: number) {
  const { data, error, isLoading } = useSWR<
    ApiResponse<MicroCMSListResponse<Article>>,
    Error
  >(`/api/articles/list?page=${page}`, fetcher);
  if (isLoading || !data || !data.result)
    return (
      <>
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      </>
    );
  if (!!error) {
    throw new Error(error.message);
  }
  if (!!data.message) {
    throw new Error(data.message);
  }
  return (
    <>
      {data.result.contents.map((article) => (
        <Box key={article.id} sx={{ mb: 5 }}>
          <ArticleDescription article={article} />
          <Divider sx={{ my: 3 }} />
        </Box>
      ))}

      <Paging totalCount={data.result.totalCount} currentPage={page} />
    </>
  );
}
