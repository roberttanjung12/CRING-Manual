'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Typography, Alert, AlertTitle, Stack, Button } from '@mui/material';

/**
 * Comprehensive Components and Utilities Guide
 *
 * This guide provides detailed information about all available components, utilities,
 * and patterns used in the CRING application based on actual implementation patterns
 * found in the production codebase.
 */

const ComponentsAndUtilities: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Components and Utilities Guide (Legacy)
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        This comprehensive guide covers all available components, utilities, hooks, and patterns used in the CRING
        application. Examples are based on actual production implementations from the references folder.
      </Alert>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <AlertTitle>⚠️ Legacy Documentation</AlertTitle>
        <Typography variant="body2" sx={{ mb: 1 }}>
          This is legacy documentation. For updated and comprehensive documentation, please visit the new modular
          documentation:
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mt: 2 }}>
          <Button component={Link} href="/documentation/components" variant="contained" color="primary" size="small">
            📋 Components Overview
          </Button>
          <Button
            component={Link}
            href="/documentation/utilities/utility-functions"
            variant="contained"
            color="secondary"
            size="small"
          >
            🔧 Utility Functions
          </Button>
          <Button
            component={Link}
            href="/documentation/utilities/custom-hooks"
            variant="outlined"
            color="info"
            size="small"
          >
            🪝 Custom Hooks
          </Button>
        </Stack>
      </Alert>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <AlertTitle>Priority Components - Wajib Digunakan</AlertTitle>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Komponen-komponen berikut adalah prioritas utama dan harus digunakan dalam development:
        </Typography>
        <ul>
          <li>
            <strong>references/components/(data-display)/TableCRING</strong> - Komponen tabel utama dengan filtering &
            pagination
          </li>
          <li>
            <strong>Zod TypeScript validation</strong> - Menggantikan Yup untuk form validation
          </li>
          <li>
            <strong>references/context patterns</strong> - Context providers yang sudah established
          </li>
        </ul>
      </Alert>

      {/* Quick Navigation to Detailed Documentation */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <AlertTitle>📚 Detailed Documentation Pages</AlertTitle>
        <Typography variant="body2" sx={{ mb: 2 }}>
          For in-depth guides, check out these individual component and utility documentation pages:
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            🏆 Priority Components:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Button
              component={Link}
              href="/documentation/components/table-cring"
              variant="contained"
              size="small"
              color="primary"
            >
              TableCRING Guide
            </Button>
            <Button
              component={Link}
              href="/documentation/components/zod-validation"
              variant="contained"
              size="small"
              color="warning"
            >
              Zod Validation Guide
            </Button>
            <Button component={Link} href="/documentation/components/context-providers" variant="outlined" size="small">
              Context Providers
            </Button>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            🔧 Utility Functions:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Button
              component={Link}
              href="/documentation/utilities/custom-hooks"
              variant="outlined"
              size="small"
              color="info"
            >
              Custom Hooks
            </Button>
            <Button
              component={Link}
              href="/documentation/utilities/helper-functions"
              variant="outlined"
              size="small"
              color="success"
            >
              Helper Functions
            </Button>
          </Stack>
        </Box>
      </Alert>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🔄 Migration Notice
      </Typography>

      <Typography variant="body1" paragraph>
        This legacy documentation has been split into comprehensive modular documentation. Please use the new
        documentation structure for better organization and easier navigation:
      </Typography>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            📋 Component Documentation
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            All form, modal, navigation, and element components are now documented in separate modules
          </Typography>
          <Button component={Link} href="/documentation/components" variant="outlined" size="small">
            View Components Overview
          </Button>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            🔧 Utility Documentation
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Helper functions, custom hooks, and utility patterns are documented separately
          </Typography>
          <Button component={Link} href="/documentation/utilities/utility-functions" variant="outlined" size="small">
            View Utilities
          </Button>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            🏆 Priority Components
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            TableCRING, Zod validation, and context providers have dedicated documentation
          </Typography>
          <Button component={Link} href="/documentation/components/table-cring" variant="outlined" size="small">
            View TableCRING Docs
          </Button>
        </Box>
      </Stack>

      <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center', mt: 4, color: 'text.secondary' }}>
        This legacy guide is maintained for reference purposes. Please use the new modular documentation for current
        development.
      </Typography>
    </Box>
  );
};

export default ComponentsAndUtilities;
