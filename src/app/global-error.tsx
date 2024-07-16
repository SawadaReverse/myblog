'use client';

import { Box } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import Image from 'next/image';
import Link from 'next/link';

export default function Error({ error }: { error: unknown }) {
  const code =
    error && typeof error === 'object' && 'code' in error
      ? error.code
      : StatusCodes.INTERNAL_SERVER_ERROR;
  error && typeof error === 'object' && 'message' in error
    ? console.error(error.message)
    : console.error(error);
  return (
    <Box mx="auto">
      <Image src={`https://http.cat/${code}`} alt={`status code: ${code}`} />

      <Link href="/">トップへ戻る</Link>
    </Box>
  );
}
