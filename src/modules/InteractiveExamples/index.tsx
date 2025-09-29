'use client';

import React from 'react';
import { Typography, Alert, Box, Stack, Chip } from '@mui/material';
import { Icon } from '@iconify/react';
import {
  ButtonPlaygroundExample,
  TableCRINGPlaygroundExample,
  ZodFormPlaygroundExample,
  ModalPlaygroundExample,
  FormPlaygroundExample,
  NavigationPlaygroundExample
} from '@/components/ComponentPlayground/examples';

/**
 * Interactive Examples Page
 *
 * Halaman showcase untuk component playground dengan interactive examples
 * yang memungkinkan user bereksperimen dengan props dan melihat generated code
 */
const InteractiveExamplesPage: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Icon icon="game-icons:juggler" width={32} height={32} />
          <Typography variant="h3" component="h1" fontWeight={700}>
            Interactive Component Playground
          </Typography>
          <Chip label="BETA" size="small" color="warning" variant="filled" />
        </Stack>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Eksperimen dengan components CRING secara real-time, ubah props, dan lihat generated code
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>🎯 Interactive Learning:</strong> Gunakan playground di bawah untuk memahami cara kerja setiap
          komponen. Ubah properties, lihat preview real-time, dan copy generated code untuk digunakan dalam project
          Anda.
        </Alert>

        <Alert severity="info">
          <strong>💡 Pro Tips:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Gunakan tab "Preview" untuk melihat hasil real-time</li>
            <li>Tab "Props" untuk mengubah properties komponennya</li>
            <li>Tab "Code" untuk copy-paste generated code</li>
            <li>Load "Examples" untuk melihat konfigurasi yang umum digunakan</li>
          </ul>
        </Alert>
      </Box>

      {/* Priority Components */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          🏆 Priority Components
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Komponen-komponen wajib yang harus dikuasai untuk development di CRING
        </Typography>

        {/* TableCRING Playground */}
        <Box sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Icon icon="table" width={24} height={24} />
            <Typography variant="h5" component="h3" fontWeight={600}>
              TableCRING - Priority #1
            </Typography>
            <Chip label="Most Used" size="small" color="primary" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Komponen tabel utama dengan filtering, pagination, dan data display. Wajib digunakan untuk semua kebutuhan
            display data tabular.
          </Typography>

          <TableCRINGPlaygroundExample />
        </Box>

        {/* Zod Validation Playground */}
        <Box sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Icon icon="shield-check" width={24} height={24} />
            <Typography variant="h5" component="h3" fontWeight={600}>
              Zod Validation - Priority #2
            </Typography>
            <Chip label="Required" size="small" color="warning" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            TypeScript-first validation dengan Zod schema. Menggantikan Yup untuk semua form validation. Provides better
            type safety dan development experience.
          </Typography>

          <ZodFormPlaygroundExample />
        </Box>
      </Box>

      {/* UI Components */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          🎨 UI Components
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Basic UI components dengan Material-UI customization
        </Typography>

        {/* Button Playground */}
        <Box sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Icon icon="cursor-pointer" width={24} height={24} />
            <Typography variant="h5" component="h3" fontWeight={600}>
              Button Components
            </Typography>
            <Chip label="Basic" size="small" color="info" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Standard button component dengan berbagai variant, size, dan color options. Foundation untuk semua
            button-based interactions.
          </Typography>

          <ButtonPlaygroundExample />
        </Box>
      </Box>

      {/* Advanced Components */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          🎛️ Advanced Components
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Complex UI components untuk advanced interactions
        </Typography>

        {/* Modal Playground */}
        <Box sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Icon icon="window" width={24} height={24} />
            <Typography variant="h5" component="h3" fontWeight={600}>
              Modal/Dialog Components
            </Typography>
            <Chip label="Interactive" size="small" color="success" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Modal dan dialog components dengan berbagai ukuran, animasi, dan behavior options. Essential untuk
            confirmations, forms, dan detailed views.
          </Typography>

          <ModalPlaygroundExample />
        </Box>

        {/* Form Layout Playground */}
        <Box sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Icon icon="form" width={24} height={24} />
            <Typography variant="h5" component="h3" fontWeight={600}>
              Form Layout Components
            </Typography>
            <Chip label="Essential" size="small" color="primary" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Flexible form layouts dengan berbagai arrangement options. Supports vertical, horizontal, dan inline layouts
            dengan validation patterns.
          </Typography>

          <FormPlaygroundExample />
        </Box>

        {/* Navigation Playground */}
        <Box sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Icon icon="navigation" width={24} height={24} />
            <Typography variant="h5" component="h3" fontWeight={600}>
              Navigation Components
            </Typography>
            <Chip label="System" size="small" color="info" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Komponen navigasi termasuk sidebar, breadcrumbs, stepper, dan header navigation. Critical untuk user
            experience dan information architecture.
          </Typography>

          <NavigationPlaygroundExample />
        </Box>
      </Box>

      {/* Coming Soon */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          🚧 Coming Soon
        </Typography>

        <Alert severity="info">
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Additional playground expansions:</strong>
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 1 }}>
            <Chip label="Chart Components" variant="outlined" />
            <Chip label="File Upload Components" variant="outlined" />
            <Chip label="Context Providers" variant="outlined" />
            <Chip label="Custom Hooks" variant="outlined" />
            <Chip label="API Integration" variant="outlined" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Playground untuk komponen-komponen ini akan tersedia dalam update berikutnya.
          </Typography>
        </Alert>
      </Box>

      {/* Feedback */}
      <Box sx={{ mb: 4 }}>
        <Alert severity="warning">
          <Typography variant="body1">
            <strong>📝 Feedback & Suggestions:</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Interactive playground ini masih dalam tahap BETA. Jika Anda menemukan bug atau memiliki saran untuk
            improvement, silakan laporkan kepada tim development untuk perbaikan dan enhancement.
          </Typography>
        </Alert>
      </Box>
    </Box>
  );
};

export default InteractiveExamplesPage;
