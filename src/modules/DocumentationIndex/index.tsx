'use client';

import { Typography, Alert, Box } from '@mui/material';

const DocumentationIndexPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Documentation Index
      </Typography>

      <Alert severity="info">
        <strong>Index Page:</strong> This is the documentation index page.
      </Alert>
    </Box>
  );
};

export default DocumentationIndexPage;
