'use client';

import { useEffect } from 'react';
import { Box } from '@mui/material';
import environment from '@/configurations/environment';
import { useMainLayout } from '@/context/MainLayoutProvider';
import type { PageIDProps } from './page-id-types';

const PageID = ({
  author,
  breadcrumbs,
  canonical,
  children,
  description,
  keywords,
  publisher,
  robots,
  title
}: PageIDProps) => {
  const { application } = environment;

  const { setBreadcrumbs } = useMainLayout();

  useEffect(() => {
    if (breadcrumbs) setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs, setBreadcrumbs]);

  return (
    <Box>
      <title>{title ?? application.name}</title>
      <meta name="description" content={description ?? application.description} />
      <meta name="author" content={author ?? application.author} />
      <meta name="keywords" content={keywords ?? application.keywords} />
      <meta name="publisher" content={publisher ?? application.publisher} />
      <meta name="robots" content={robots ?? application.robots} />
      <link rel="canonical" href={canonical ?? application.canonical} />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <>{children}</>
    </Box>
  );
};

export default PageID;
