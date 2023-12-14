'use client';
import { Typography, TypographyProps } from '@mui/material';
import { PropsWithChildren } from 'react';

// There seems to be issues rendering Typography in server components
export function ClientTypography({
  children,
  ...props
}: PropsWithChildren<TypographyProps>) {
  return <Typography {...props}>{children}</Typography>;
}
