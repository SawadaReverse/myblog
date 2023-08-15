"use client";

import { ApiResponse } from "@/app/api/types/types";
import ArticleDescription from "@/components/ArticleDescription";
import Paging from "@/components/Paging";
import { Article } from "@/libs/microCms/types";
import { fetcher } from "@/libs/swr/fetcher";
import { Box, CircularProgress, Divider } from "@mui/material";
import { MicroCMSListResponse } from "microcms-js-sdk";
import useSWR from "swr";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { id: string };
};

export default function TagPage(props: Props) {
  const { id } = props.params;

  const pageParam = props.searchParams["page"];
  const page =
    pageParam && !Array.isArray(pageParam) && !Number.isNaN(parseInt(pageParam))
      ? parseInt(pageParam)
      : 1;

  const { data, error, isLoading } = useSWR<
    ApiResponse<MicroCMSListResponse<Article>>,
    Error
  >(`/api/articles/tagged/${id}?page=${page}`, fetcher);
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
