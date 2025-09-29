'use client';

import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import varCopyright from '@/variables/copyright';
import MainContainer from './Container';
import MainHeader from './Header';
import MainSidebar from './Sidebar';
import MainLayoutWrapper from './Wrapper';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="flex" minHeight="100vh" width="100%" color={({ palette }) => palette.common.black}>
      <MainSidebar />
      <MainLayoutWrapper>
        <MainHeader />
        <MainContainer>{children}</MainContainer>
        <Box component="footer" py={4} px={6} mt={10}>
          <Typography component="small">&copy; {varCopyright}</Typography>
        </Box>
      </MainLayoutWrapper>
    </Box>
  );
};

export default MainLayout;
