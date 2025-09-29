'use client';

import type { ReactNode } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { TableOfContents } from '@/documentation/components/NavigationGuide';

interface DocumentationLayoutProps {
  children: ReactNode;
  showTableOfContents?: boolean;
  tableOfContentsData?: Array<{
    id: string;
    title: string;
    level?: number;
  }>;
}

const DocumentationLayout = ({
  children,
  showTableOfContents = true,
  tableOfContentsData = []
}: DocumentationLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          width: '100%',
          py: 4
        }}
      >
        <Container maxWidth="xl" sx={{ pr: { xs: 2, lg: 0 } }}>
          <Grid container spacing={4}>
            {/* Content - Now always takes full width since TOC is fixed */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  p: 4,
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  minHeight: 'calc(100vh - 100px)',
                  // Add right margin to prevent overlap with fixed TOC
                  // TOC width (280px) + right positioning (24px) + extra space (32px) = 336px total
                  mr: showTableOfContents && tableOfContentsData.length > 0 ? { xs: 0, lg: '336px' } : 0,
                  maxWidth:
                    showTableOfContents && tableOfContentsData.length > 0
                      ? { xs: '100%', lg: 'calc(100% - 336px)' }
                      : '100%'
                }}
              >
                {children}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Fixed Table of Contents */}
      {showTableOfContents && tableOfContentsData.length > 0 && <TableOfContents sections={tableOfContentsData} />}
    </Box>
  );
};

interface DocumentationPageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  breadcrumbs?: Array<{
    title: string;
    href?: string;
  }>;
  tableOfContents?: Array<{
    id: string;
    title: string;
    level?: number;
  }>;
  navigation?: {
    previous?: {
      title: string;
      href: string;
    };
    next?: {
      title: string;
      href: string;
    };
  };
}

const DocumentationPageLayout = ({
  children,
  title,
  description,
  breadcrumbs = [],
  tableOfContents = [],
  navigation
}: DocumentationPageLayoutProps) => {
  return (
    <DocumentationLayout showTableOfContents={tableOfContents.length > 0} tableOfContentsData={tableOfContents}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && <Box sx={{ mb: 2 }}>{/* Breadcrumbs component will be implemented here */}</Box>}

        {/* Title */}
        <Box sx={{ mb: 2 }}>
          <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 700, color: '#1976d2' }}>{title}</h1>
        </Box>

        {/* Description */}
        {description && (
          <Box sx={{ mb: 3 }}>
            <p style={{ margin: 0, fontSize: '1.125rem', color: '#666', lineHeight: 1.6 }}>{description}</p>
          </Box>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ '& > *:last-child': { mb: 0 } }}>{children}</Box>

      {/* Navigation */}
      {navigation && <Box sx={{ mt: 6 }}>{/* Navigation component will be implemented here */}</Box>}
    </DocumentationLayout>
  );
};

export { DocumentationLayout, DocumentationPageLayout };
