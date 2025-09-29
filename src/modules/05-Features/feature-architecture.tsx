'use client';

import {
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Icon } from '@iconify/react';
import CodeBlock from '@/documentation/components/CodeBlock';

const FeatureArchitecturePage = () => {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          Feature Architecture
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
          Panduan arsitektur dan pola pengembangan fitur dalam aplikasi CRING! Portal Partner
        </Typography>
      </Box>

      <Alert severity="info">
        <strong>Feature-First Architecture:</strong> Aplikasi CRING! Partner menggunakan pendekatan feature-based
        architecture dimana setiap fitur memiliki struktur yang konsisten dan modular.
      </Alert>

      {/* Feature Structure */}
      <section>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Struktur Fitur Standar
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📁 Organisasi Folder Fitur
            </Typography>

            <CodeBlock
              language="bash"
              title="Struktur folder untuk setiap fitur"
              code={`src/references/modules/[FeatureName]/
├── index.tsx                 # Main component & export
├── components/               # Feature-specific components
│   ├── Form.tsx             # Form components
│   ├── Table.tsx            # Table components
│   └── Modal.tsx            # Modal components
├── hooks/                   # Custom hooks for this feature
│   ├── useFeatureData.ts    # Data fetching hooks
│   └── useFeatureForm.ts    # Form handling hooks
├── services/                # API services
│   └── featureService.ts    # Service layer
├── types/                   # TypeScript types
│   └── index.ts             # Type definitions
├── utils/                   # Feature utilities
│   └── helpers.ts           # Helper functions
└── validation/              # Zod schemas
    └── schema.ts            # Validation schemas`}
            />
          </CardContent>
        </Card>
      </section>

      {/* Development Patterns */}
      <section>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Pola Pengembangan Standar
        </Typography>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔧 1. Service Layer Pattern
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Setiap fitur memiliki service layer yang mengelola komunikasi dengan API
              </Typography>

              <CodeBlock
                language="typescript"
                title="Feature Service Implementation"
                code={`// services/merchantService.ts
import { onGet, onPost, onPatch, onDelete } from '@/services';
import { Merchant, CreateMerchantRequest, UpdateMerchantRequest } from './types';

// Service functions with proper typing
const onGetMerchants = (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => onGet<typeof params, { data: Merchant[]; total: number }>('/merchants', { params });

const onGetMerchantById = (id: string) =>
  onGet<void, Merchant>(\`/merchants/\${id}\`);

const onCreateMerchant = (data: CreateMerchantRequest) =>
  onPost<void, CreateMerchantRequest, Merchant>('/merchants', data);

const onUpdateMerchant = (id: string, data: UpdateMerchantRequest) =>
  onPatch<void, UpdateMerchantRequest, Merchant>(\`/merchants/\${id}\`, data);

const onDeleteMerchant = (id: string) =>
  onDelete<void, void>(\`/merchants/\${id}\`);

const onUpdateMerchantStatus = (id: string, status: 'active' | 'inactive') =>
  onPatch<void, { status: string }, Merchant>(\`/merchants/\${id}/status\`, { status });

export {
  onGetMerchants,
  onGetMerchantById, 
  onCreateMerchant,
  onUpdateMerchant,
  onDeleteMerchant,
  onUpdateMerchantStatus
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📝 2. Form Handling Pattern
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Menggunakan React Hook Form dengan Zod validation untuk form handling
              </Typography>

              <CodeBlock
                language="typescript"
                title="Form Hook Implementation"
                code={`// hooks/useMerchantForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { merchantSchema, type MerchantFormData } from '../validation/schema';
import { onCreateMerchant, onUpdateMerchant } from '../services/merchantService';

export const useMerchantForm = (merchant?: Merchant) => {
  const form = useForm<MerchantFormData>({
    resolver: zodResolver(merchantSchema),
    defaultValues: merchant || {
      name: '',
      email: '',
      phone: '',
      address: '',
      businessType: '',
      status: 'pending'
    }
  });

  const onSubmit = async (data: MerchantFormData) => {
    try {
      if (merchant?.id) {
        await onUpdateMerchant(merchant.id, data);
        showSuccess('Merchant updated successfully');
      } else {
        await onCreateMerchant(data);
        showSuccess('Merchant created successfully');
      }
    } catch (error) {
      showError('Failed to save merchant');
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting
  };
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🗂️ 3. Table Component Pattern
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Menggunakan TableCRING component untuk menampilkan data dengan fitur filtering dan pagination
              </Typography>

              <CodeBlock
                language="typescript"
                title="Table Implementation"
                code={`// components/MerchantTable.tsx
import TableCRING from '@/components/(data-display)/TableCRING';
import { useMerchantData } from '../hooks/useMerchantData';

export const MerchantTable = () => {
  const { data, loading, params, setParams } = useMerchantData();

  const columns = [
    {
      key: 'name',
      label: 'Merchant Name',
      sortable: true,
      filterable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      filterable: true
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true,
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' }
      ]
    }
  ];

  const actions = [
    {
      label: 'View',
      icon: 'eye',
      onClick: (merchant) => handleView(merchant.id)
    },
    {
      label: 'Edit',
      icon: 'edit',
      onClick: (merchant) => handleEdit(merchant.id)
    },
    {
      label: 'Delete',
      icon: 'delete',
      onClick: (merchant) => handleDelete(merchant.id),
      color: 'error'
    }
  ];

  return (
    <TableCRING
      data={data}
      columns={columns}
      isLoading={loading}
      params={params}
      actions={actions}
      onFilter={setParams}
      pagination={{
        page: params.page,
        limit: params.limit,
        total: data.total
      }}
    />
  );
};`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Best Practices */}
      <section>
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Best Practices
        </Typography>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ✅ Development Guidelines
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Icon icon="check-circle" style={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Konsistensi Struktur"
                    secondary="Setiap fitur mengikuti struktur folder yang sama untuk mempermudah maintenance"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <Icon icon="check-circle" style={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Type Safety"
                    secondary="Gunakan TypeScript dengan strict mode dan definisikan types dengan jelas"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <Icon icon="check-circle" style={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Validation with Zod"
                    secondary="Semua form menggunakan Zod schema untuk client dan server-side validation"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <Icon icon="check-circle" style={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Error Handling"
                    secondary="Implementasi error handling yang konsisten di semua layer"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <Icon icon="check-circle" style={{ color: '#4caf50' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reusable Components"
                    secondary="Gunakan component library yang sudah ada sebelum membuat component baru"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Next Steps */}
      <Alert severity="success">
        <strong>Ready to Start!</strong> Dengan mengikuti pola arsitektur ini, pengembangan fitur baru akan menjadi
        lebih terstruktur dan maintainable. Check dokumentasi Components dan Data Services untuk detail implementasi.
      </Alert>
    </Stack>
  );
};

export default FeatureArchitecturePage;
