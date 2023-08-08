"use client";

import { Box, Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  totalCount: number;
  currentPage: number;
};

export default function Paging(props: Props) {
  const router = useRouter();
  const onChangePagination = (_: React.ChangeEvent<unknown>, value: number) =>
    value === 1 ? router.push("/") : router.push(`/?page=${value}`);
  return (
    <>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <Pagination
          count={props.totalCount / 10}
          page={props.currentPage}
          onChange={onChangePagination}
        />
      </Box>
    </>
  );
}
