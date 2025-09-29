'use client';

import { Typography, Alert, Box } from '@mui/material';

const FundamentalsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Fundamentals
      </Typography>

      <Alert severity="info">
        <strong>Fundamentals:</strong> This page covers fundamental concepts.
      </Alert>
    </Box>
  );
};

export default FundamentalsPage;
