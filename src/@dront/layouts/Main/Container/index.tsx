'use client';

import type { ReactNode } from 'react';
import { Box, Container, useMediaQuery, type Theme } from '@mui/material';
import { useSelector } from '@/store/hooks';
import type { ApplicationState } from '@/store/store';

const MainContainer = ({ children }: { children: ReactNode }) => {
  const { isContainerFull } = useSelector((state: ApplicationState) => state.appearance);

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

  return (
    <Container maxWidth="xl" sx={{ maxWidth: isContainerFull ? '100% !important' : undefined, pt: 5 }}>
      <Box minHeight="calc(100vh - 170px)" px={lgUp ? 3 : 1}>
        {children}
      </Box>
    </Container>
  );
};

export default MainContainer;
