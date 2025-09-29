'use client';

import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import NextTopLoader from 'nextjs-toploader';
import { SWRConfig } from 'swr';
import MainLayout from '@/@dront/layouts/Main';
import theme from '@/@dront/theme';
import MainLayoutProvider from '@/context/MainLayoutProvider';
import { Providers } from '@/store/providers';
import '../styles/globals.css';

export default function Wrapper({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Providers>
      <SWRConfig>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme('light')}>
            <CssBaseline />
            <NextTopLoader />
            <Box
              sx={{
                fontFamily: 'ProximaNova, Roboto, Arial, sans-serif',
                color: 'text.primary'
              }}
            >
              <MainLayoutProvider>
                <MainLayout>{children}</MainLayout>
              </MainLayoutProvider>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </SWRConfig>
    </Providers>
  );
}
