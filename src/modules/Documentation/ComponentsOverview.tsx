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

const ComponentsOverview: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Components and Utilities Guide
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        This comprehensive guide covers all available components, utilities, hooks, and patterns used in the CRING
        application. Examples are based on actual production implementations and follow the updated creating-features
        pattern.
      </Alert>

      <Alert severity="success" sx={{ mb: 3 }}>
        <AlertTitle>🎯 Updated Architecture</AlertTitle>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Components dan patterns telah diupdate mengikuti P2PMerchant/Withdrawal architecture dari creating-features
          guide:
        </Typography>
        <ul>
          <li>
            <strong>TableCRING dengan Custom Hooks</strong> - URL-based state management dan SWR data fetching
          </li>
          <li>
            <strong>Structured Module Pattern</strong> - type.ts, hook.ts, column.ts, services/, dan index.tsx
          </li>
          <li>
            <strong>Consistent Filtering & Export</strong> - DownloadButton dan BlockerProviderButtonMask integration
          </li>
        </ul>
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
            🏆 Priority Components & Guides:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Button
              component={Link}
              href="/workflow/creating-features"
              variant="contained"
              size="small"
              color="success"
            >
              📋 Creating Features Guide
            </Button>
            <Button component={Link} href="/tools/code-generator" variant="contained" size="small" color="info">
              🛠️ Code Generator
            </Button>
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

      <Typography variant="body1" sx={{ mt: 3, fontStyle: 'italic' }}>
        This guide covers the essential components and patterns used in the CRING application. All examples are based on
        actual production code and follow the established architecture patterns.
      </Typography>
    </Box>
  );
};

export default ComponentsOverview;
