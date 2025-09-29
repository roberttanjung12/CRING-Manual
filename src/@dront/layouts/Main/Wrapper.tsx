'use client';

import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from '@/store/hooks';
import type { ApplicationState } from '@/store/store';

const MainLayoutWrapper = ({ children }: { children: ReactNode }) => {
  const { sidebar } = useSelector((state: ApplicationState) => state.appearance);

  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexGrow={1}
      flexDirection="column"
      zIndex={1}
      width="100%"
      bgcolor="transparent"
      sx={{ ...(sidebar.isCollapse && { [theme.breakpoints.up('lg')]: { ml: `${76}px` } }), overflowX: 'hidden' }}
    >
      <>{children}</>
    </Box>
  );
};

export default MainLayoutWrapper;
