'use client';

import { Typography, Alert, Box } from '@mui/material';

const NavigationTestPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Navigation Test
      </Typography>

      <Alert severity="info">
        <strong>Navigation Test:</strong> Navigation component testing utilities.
      </Alert>
    </Box>
  );
};

export default NavigationTestPage;
