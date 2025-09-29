'use client';

import { Typography, Alert, Box } from '@mui/material';

const CreatingModulesPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Creating Modules
      </Typography>

      <Alert severity="info">
        <strong>Creating Modules:</strong> Guide for creating new modules in the system.
      </Alert>
    </Box>
  );
};

export default CreatingModulesPage;
