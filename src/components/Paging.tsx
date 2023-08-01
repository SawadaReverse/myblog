import { Box, Pagination } from "@mui/material";
import { useRouter } from "next/router";

type Props = {
  totalCount: number;
  currentPage: number;
};

export default function Paging(props: Props) {
  const router = useRouter();
  const onChangePagination = (_: React.ChangeEvent<unknown>, value: number) =>
    router.push(`/?page=${value}`);
  return (
    <>
      <Box sx={{ justifyContent: "center", display: "flex" }}>
        <Pagination
          count={props.totalCount / 10}
          defaultPage={props.currentPage}
          onChange={onChangePagination}
        />
      </Box>
    </>
  );
}
