'use client';

import React from 'react';
import { Typography } from '@mui/material';

type PageTitleProps = {
  children: string;
};

export default function PageTitle(props: PageTitleProps) {
  return (
    <>
      <Typography variant="h4" component="h2" sx={{ mb: 5 }}>
        {props.children}
      </Typography>
    </>
  );
}
