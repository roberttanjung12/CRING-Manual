'use client';

import { Typography, Alert, Box } from '@mui/material';

const TableV2Page = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Table V2
      </Typography>

      <Alert severity="info">
        <strong>Table V2:</strong> Advanced table component with enhanced features.
      </Alert>
    </Box>
  );
};

export default TableV2Page;
