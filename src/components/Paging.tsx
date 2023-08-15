'use client';

import { Box, Pagination } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  totalCount: number;
};

export default function Paging(props: Props) {
  const path = usePathname();
  const router = useRouter();
  const onChangePagination = (_: React.ChangeEvent<unknown>, value: number) =>
    value === 1 ? router.push(path) : router.push(`${path}?page=${value}`);

  const param = useSearchParams();
  const pageParam = param.get('page');
  let page: number;
  if (!pageParam || isNaN(parseInt(pageParam))) {
    page = 1;
  } else {
    page = parseInt(pageParam);
  }

  return (
    <>
      <Box sx={{ justifyContent: 'center', display: 'flex' }}>
        <Pagination
          count={Math.ceil(props.totalCount / 10)}
          page={page}
          onChange={onChangePagination}
        />
      </Box>
    </>
  );
}
