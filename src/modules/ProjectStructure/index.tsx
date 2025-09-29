'use client';

import { Typography, Alert, Box } from '@mui/material';

const ProjectStructurePage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Project Structure
      </Typography>

      <Alert severity="info">
        <strong>Project Structure:</strong> Project structure documentation.
      </Alert>
    </Box>
  );
};

export default ProjectStructurePage;
