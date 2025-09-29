'use client';

import { Typography, Alert, Box } from '@mui/material';

const ProjectStructureOverviewPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Project Structure Overview
      </Typography>

      <Alert severity="info">
        <strong>Project Structure Overview:</strong> Complete overview of project structure and organization.
      </Alert>
    </Box>
  );
};

export default ProjectStructureOverviewPage;
