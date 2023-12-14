import { Box, PaperProps, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function Actionbar({
  children,
  sx,
  ...rest
}: PropsWithChildren<PaperProps>) {
  const theme = useTheme();
  const mergedSx: PaperProps['sx'] = {
    p: 4,
    backgroundColor: theme.palette.background.default,
    ...sx,
  };
  return (
    <Box sx={mergedSx} {...rest}>
      {children}
    </Box>
  );
}
