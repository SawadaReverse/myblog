'use client';

import { ARTICLE_PER_PAGE } from '@/libs/constants/constants';
import { Box, Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';

type Props = {
  currentPage: number;
  currentPath: string;
  totalCount: number;
};

export default function Paging({
  currentPath,
  currentPage,
  totalCount,
}: Props) {
  const router = useRouter();
  const onChangePagination = (_: React.ChangeEvent<unknown>, value: number) => {
    value === 1
      ? router.push(`${currentPath}`)
      : router.push(`${currentPath}${value}`);
  };

  return (
    <Box sx={{ justifyContent: 'center', display: 'flex' }}>
      <Pagination
        count={Math.ceil(totalCount / ARTICLE_PER_PAGE)}
        page={currentPage}
        onChange={onChangePagination}
      />
    </Box>
  );
}
