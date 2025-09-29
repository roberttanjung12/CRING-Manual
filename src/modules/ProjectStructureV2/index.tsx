'use client';

import { Typography, Alert, Box } from '@mui/material';

const ProjectStructureV2Page = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Project Structure V2
      </Typography>

      <Alert severity="info">
        <strong>Project Structure V2:</strong> Updated project structure documentation.
      </Alert>
    </Box>
  );
};

export default ProjectStructureV2Page;
