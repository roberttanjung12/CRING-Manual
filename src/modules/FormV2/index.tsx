'use client';

import { Typography, Alert, Box } from '@mui/material';

const FormV2Page = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Form V2
      </Typography>

      <Alert severity="info">
        <strong>Form V2:</strong> Version 2 of form components and patterns.
      </Alert>
    </Box>
  );
};

export default FormV2Page;
