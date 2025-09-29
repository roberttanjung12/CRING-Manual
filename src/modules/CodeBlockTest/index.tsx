'use client';

import { Typography, Alert, Box } from '@mui/material';

const CodeBlockTestPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        CodeBlock Test
      </Typography>

      <Alert severity="info">
        <strong>Test Page:</strong> This page is for testing CodeBlock component functionality.
      </Alert>
    </Box>
  );
};

export default CodeBlockTestPage;
