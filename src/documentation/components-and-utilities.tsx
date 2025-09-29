'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Typography, Divider, Alert, AlertTitle, Stack, Button } from '@mui/material';
import PageID from '@/@dront/components/PageID';
import CodeBlock from '@/documentation/components/CodeBlock';

/**
 * Comprehensive Components and Utilities Guide
 *
 * This guide provides detailed information about all available components, utilities,
 * and patterns used in the CRING application based on actual implementation patterns
 * found in the production codebase.
 */

const ComponentsAndUtilities: React.FC = () => {
  return (
    <PageID title="Components and Utilities Guide">
      <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Components and Utilities Guide
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          This comprehensive guide covers all available components, utilities, hooks, and patterns used in the CRING
          application. Examples are based on actual production implementations from the references folder.
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
              <Button
                component={Link}
                href="/documentation/components/context-providers"
                variant="outlined"
                size="small"
              >
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

        {/* Table Components */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Data Display Components - Priority #1
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
          TableCRING Component (references/components/(data-display)/TableCRING)
        </Typography>

        <Typography variant="body1" paragraph>
          The primary table component for displaying data with built-in filtering, pagination, and loading states.
          Implementasi actual dari references/components/(data-display)/TableCRING yang sudah digunakan di production.
        </Typography>

        <CodeBlock
          title="TableCRING Implementation (Based on P2PMerchant/Withdrawal)"
          language="tsx"
          code={`import TableCRING from '@/components/(data-display)/TableCRING';
import type { TableCRINGColumnProps } from '@/components/(data-display)/TableCRING/type';

// Column definition dengan filters
const withdrawalColumns: TableCRINGColumnProps[] = [
  {
    name: 'id',
    label: 'ID Transaksi',
    cell: { sx: { whiteSpace: 'pre' } },
    ability: { copy: true },
    filters: [
      {
        type: 'text',
        name: 'id',
        query: 'id'
      }
    ]
  },
  {
    join: 'client',
    name: 'clientName',
    label: 'Nama P2P Merchant',
    ability: { sx: { fontWeight: 700 } },
    filters: [
      {
        type: 'text',
        name: 'clientName',
        query: 'clientName',
        label: 'Nama P2P Merchant'
      }
    ]
  },
  {
    name: 'date',
    label: 'Tanggal',
    head: { align: 'center' },
    cell: { sx: { whiteSpace: 'pre' } },
    filters: [
      { 
        type: 'date', 
        name: 'date', 
        query: 'transactionDate', 
        date: { maxDate: new Date() } 
      }
    ]
  },
  {
    name: 'status',
    label: 'Status',
    head: { align: 'center' },
    filters: [
      {
        type: 'select',
        name: 'status',
        query: 'status',
        options: [
          { value: '', text: 'Semua' },
          { value: 'PENDING', text: 'Pending' },
          { value: 'COMPLETED', text: 'Berhasil' },
          { value: 'FAILED', text: 'Gagal' }
        ]
      }
    ]
  },
  {
    label: 'Nominal',
    name: 'amount',
    head: { align: 'right' },
    cell: { sx: { whiteSpace: 'pre' } },
    ability: { currency: 'Rp' }
  }
];

// Component usage
const WithdrawalTable = () => {
  const { isLoading, params, payload, pagination, list, onFilterGo } = useWithdrawal();

  return (
    <Box>
      <TableCRING
        isLoading={isLoading}
        columns={withdrawalColumns}
        data={list}
        params={params}
        pagination={{
          limit: pagination.limit,
          rows: pagination.rows,
          total: pagination.total,
          current: pagination.page
        }}
        onFilter={onFilterGo}
      />
    </Box>
  );
};`}
        />

        <Typography variant="body1" paragraph sx={{ mt: 3 }}>
          Key features dari TableCRING implementation di atas:
        </Typography>

        <ul>
          <li>
            <strong>Column Filters</strong>: Text, select, date, autocomplete filters dengan query parameter mapping
          </li>
          <li>
            <strong>Column Joining</strong>: Menggunakan property 'join' untuk mengelompokkan kolom terkait
          </li>
          <li>
            <strong>Styling & Abilities</strong>: Copy functionality, currency formatting, text styling
          </li>
          <li>
            <strong>Pagination</strong>: Built-in pagination dengan limit, total, dan current page
          </li>
        </ul>

        <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
          Available Filter Types in TableCRING
        </Typography>

        <Typography variant="body1" paragraph>
          TableCRING mendukung berbagai jenis filter yang dapat dikonfigurasi pada setiap kolom:
        </Typography>

        <CodeBlock
          title="Filter Types Configuration"
          language="typescript"
          code={`// Available filter types in TableCRING columns
interface FilterConfig {
  id: string;
  type: 
    | 'text'                      // Simple text input
    | 'select'                    // Dropdown select
    | 'autocomplete'              // Autocomplete with static options
    | 'autocomplete-merchant'     // Merchant-specific autocomplete
    | 'autocomplete-async'        // Async autocomplete with API
    | 'autocomplete-async-v2'     // Enhanced async autocomplete
    | 'date-range';               // Date range picker
  
  label: string | React.ReactElement;
  query: string;                  // Query parameter name
  opt?: Array<{value: string, label: string}>; // Options for select/autocomplete
  config?: object;                // Additional configuration
  autocomplete?: {                // Configuration for async autocomplete
    service: {
      endpoint: string;
      keyword: string[];
      params: object;
    };
    shapes: Array<{
      field: string;
      from: string;
    }>;
  };
  resets?: string[];              // Fields to reset when this filter changes
  required?: string[];            // Required fields for this filter
  params?: string[];              // Additional parameters
  initValue?: string | number | object; // Initial value
}

// Example with async autocomplete
const merchantFilter = {
  id: 'merchantId',
  type: 'autocomplete-async',
  label: 'Select Merchant',
  query: 'merchantId',
  autocomplete: {
    service: {
      endpoint: '/merchants/search',
      keyword: ['name', 'id'],
      params: { limit: 10 }
    },
    shapes: [
      { field: 'merchantId', from: 'id' },
      { field: 'merchantName', from: 'name' }
    ]
  }
};`}
        />

        {/* Custom Hooks */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Custom Hooks
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
          Data Fetching Hooks with SWR
        </Typography>

        <Typography variant="body1" paragraph>
          Custom hooks that integrate with SWR for data fetching, caching, and state management. These hooks follow a
          consistent pattern and provide optimistic updates.
        </Typography>

        <CodeBlock
          title="Data Fetching Hook with SWR"
          language="tsx"
          code={`import useSWR from 'swr';
import { useState, useMemo } from 'react';
import { onGet } from '@/services';

// Example: QRIS data fetching hook
interface UseGetQRISParams {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  merchantName?: string;
  fromCreate?: string;
  toCreate?: string;
}

interface QRISData {
  type: string;
  id: string;
  partnerReferenceNo: string;
  merchantName: string;
  bankName: string;
  amount: number;
  status: string;
  createdDate: Date;
  paymentDate: Date;
}

const useGetQRIS = (params: UseGetQRISParams = {}) => {
  const [filter, setFilter] = useState({
    page: params.page || 1,
    limit: params.limit || 10,
    total: 0,
    rows: 0
  });

  // Create cache key based on parameters
  const cacheKey = useMemo(() => 
    Object.keys(params).length > 0 ? 
    \`/product/qr?\${new URLSearchParams(params as any).toString()}\` : 
    null, 
    [params]
  );

  const { data, error, isLoading, mutate } = useSWR(
    cacheKey,
    () => onGet<UseGetQRISParams, QRISData[]>('/product/qr', { params })
  );

  // Update pagination info when data changes
  useMemo(() => {
    if (data?.headers) {
      setFilter(prev => ({
        ...prev,
        total: parseInt(data.headers['x-total-count'] || '0'),
        rows: data.data?.length || 0
      }));
    }
  }, [data]);

  return {
    data: data?.data,
    error,
    isLoading,
    filter,
    mutate,
    refresh: () => mutate()
  };
};`}
        />

        <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
          Detail Management Hook
        </Typography>

        <Typography variant="body1" paragraph>
          Pattern for managing detail views, modals, and forms with proper state management.
        </Typography>

        <CodeBlock
          title="Detail Management Hook Pattern"
          language="tsx"
          code={`import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { useAuthenticationProvider } from '@/context/AuthenticationProvider';

interface DetailItem {
  key: string;
  label: string;
  value: any;
  config: {
    type: 'text' | 'currency' | 'date' | 'custom';
  };
  side?: 'left' | 'right';
  isHidden?: boolean;
}

const useManageQrisDetail = () => {
  const { actor } = useAuthenticationProvider();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

  const isCall = useMemo<boolean>(() => !!(isOpen && id), [id, isOpen]);

  const { isLoading, data, mutate } = useSWR(
    isCall && \`/manage-qris/\${id}\`,
    () => onGetOneQRISHistory(id)
  );

  // Transform raw data into display format
  const list = useMemo(() => {
    const items: DetailItem[] = [];

    if (data?.status && data?.data) {
      const newData = data.data;

      items.push({
        key: 'type',
        label: 'QRIS Type',
        value: newData.type || '-',
        config: { type: 'text' }
      });

      items.push({
        key: 'amount',
        label: 'Amount',
        value: newData.amount,
        config: { type: 'currency' },
        side: 'right'
      });

      items.push({
        key: 'merchant',
        label: 'Merchant Name',
        value: newData.merchantName || '-',
        config: { type: 'text' },
        isHidden: actor === 'Merchant' // Conditional rendering
      });

      items.push({
        key: 'status',
        label: 'Status',
        value: <Chip label={newData.status} color="primary" />,
        config: { type: 'custom' },
        side: 'right'
      });
    }

    return items;
  }, [data, actor]);

  const onOpen = ({ id }: { id: string }) => {
    setId(id);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setId('');
  };

  return {
    isLoading,
    isOpen,
    list,
    data: data?.data,
    mutate,
    onOpen,
    onClose
  };
};`}
        />

        {/* Service Layer */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Service Layer
        </Typography>

        <Typography variant="body1" paragraph>
          The service layer provides typed HTTP methods with automatic authentication, error handling, and session
          management.
        </Typography>

        <CodeBlock
          title="Service Layer Implementation"
          language="tsx"
          code={`import { onGet, onPost, onPatch, onDelete } from '@/services';

// Service functions with proper typing
const onGetQRIS = (params?: GetQRISParams) => 
  onGet<GetQRISParams, GetQRIS[]>('/product/qr', { params });

const onGetOneQRISHistory = (id: string) =>
  onGet<void, QRISDetail>(\`/product/qr/\${id}\`);

const onAddQRISDynamic = (data: CreateQRISData) =>
  onPost<void, CreateQRISData, { id: string }>('/product/qr/dynamic', data);

const onUpdateQRISStatus = (id: string, data: UpdateStatusData) =>
  onPatch<void, UpdateStatusData, { success: boolean }>(\`/product/qr/\${id}/status\`, data);

// Usage with error handling
const handleCreateQRIS = async (formData: CreateQRISData) => {
  try {
    const response = await onAddQRISDynamic(formData);
    
    if (response.status === 200) {
      // Success handling
      toast.success('QRIS created successfully');
      mutate(); // Refresh data
    }
  } catch (error) {
    // Error is automatically handled by the service layer
    console.error('Failed to create QRIS:', error);
  }
};`}
        />

        {/* Context and Providers */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Context and State Management
        </Typography>

        <Typography variant="body1" paragraph>
          Context providers for managing global state and sharing data between components.
        </Typography>

        <CodeBlock
          title="Context Provider Pattern"
          language="tsx"
          code={`import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define context type
interface ManageQRISContextType {
  selectedItems: string[];
  filters: Record<string, any>;
  setSelectedItems: (items: string[]) => void;
  setFilters: (filters: Record<string, any>) => void;
  clearSelection: () => void;
}

// Create context
const ManageQRISContext = createContext<ManageQRISContextType | undefined>(undefined);

// Provider component
export const ManageQRISProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const clearSelection = () => setSelectedItems([]);

  const value = {
    selectedItems,
    filters,
    setSelectedItems,
    setFilters,
    clearSelection
  };

  return (
    <ManageQRISContext.Provider value={value}>
      {children}
    </ManageQRISContext.Provider>
  );
};

// Custom hook for using context
export const useManageQRIS = (): ManageQRISContextType => {
  const context = useContext(ManageQRISContext);
  
  if (context === undefined) {
    throw new Error('useManageQRIS must be used within a ManageQRISProvider');
  }
  
  return context;
};

// Usage in component
const QRISManagementPage: React.FC = () => {
  return (
    <ManageQRISProvider>
      <TableCRING />
      <QRISActions />
    </ManageQRISProvider>
  );
};`}
        />

        {/* Modal and Dialog Components */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Modal and Dialog Components
        </Typography>

        <CodeBlock
          title="Modal Detail Implementation"
          language="tsx"
          code={`import ModalDetail from '@/components/Modal/Detail';

// Detail modal usage
const QRISDetail: React.FC = () => {
  const { isOpen, list, onClose } = useManageQrisDetail();

  return (
    <ModalDetail
      open={isOpen}
      title="QRIS Transaction Details"
      onClose={onClose}
      maxWidth="md"
    >
      <Stack spacing={2}>
        {list.map((item) => {
          if (item.isHidden) return null;

          return (
            <Box
              key={item.key}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" color="text.secondary">
                {item.label}:
              </Typography>
              <Box textAlign={item.side === 'right' ? 'right' : 'left'}>
                {item.config.type === 'currency' ? (
                  <Typography variant="body2" fontWeight="medium">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR'
                    }).format(item.value)}
                  </Typography>
                ) : item.config.type === 'custom' ? (
                  item.value
                ) : (
                  <Typography variant="body2">{item.value}</Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Stack>
    </ModalDetail>
  );
};`}
        />

        {/* Form Components and Validation */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Form Components and Validation - Priority #2
        </Typography>

        <Typography variant="body1" paragraph>
          Form validation menggunakan Zod TypeScript dengan React Hook Form integration. Contoh implementasi berdasarkan
          ManageQRISV2/Dynamic yang sudah digunakan di production.
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <AlertTitle>Penting: Gunakan Zod, Bukan Yup!</AlertTitle>
          <Typography variant="body2">
            Semua form validation harus menggunakan Zod TypeScript. Yup sudah deprecated dan tidak boleh digunakan lagi.
          </Typography>
        </Alert>

        <CodeBlock
          title="Zod Schema with Complex Validation (ManageQRISV2/Dynamic Pattern)"
          language="typescript"
          code={`import { z } from 'zod';
import localteToNumber from '@/utility/locale-to-number';

// Complex validation with custom refinement
const maxAmount = ({ method, amount, tipAmount }: { 
  method: string; 
  amount: string; 
  tipAmount?: string 
}) => {
  if (method === '01') return true;

  const parseAmount = localteToNumber(amount);
  const parseTipAmount = localteToNumber(tipAmount || '0');

  if (method === '03') {
    const tipPercentage = parseTipAmount / 100;
    const calculatedTip = parseAmount * tipPercentage;
    return parseAmount + calculatedTip <= 10_000_000;
  }

  return parseAmount + parseTipAmount <= 10_000_000;
};

const qrisFormSchema = z
  .object({
    provider: z.object({
      value: z.string().min(1, 'Kolom ini wajib diisi!'),
      text: z.string().min(1, 'Kolom ini wajib diisi!')
    }),
    amount: z
      .string()
      .min(1, 'Kolom ini wajib diisi!')
      .refine(val => localteToNumber(val) >= 1, 'Minimal Nominal Transaksi adalah Rp 1!'),
    description: z.string().max(255, 'Maksimal 255 karakter!').optional(),
    tip: z.boolean(),
    method: z.enum(['01', '02', '03']),
    tipAmount: z
      .string()
      .refine(val => localteToNumber(val) > 0, 'Jumlah tip harus lebih dari 0!')
      .optional(),
    terminalId: z.string().max(6, 'Maksimal 6 karakter!').optional()
  })
  .refine(({ method, tipAmount }) => method !== '01' && tipAmount, {
    path: ['tipAmount'],
    message: 'Kolom ini wajib diisi!'
  })
  .refine(maxAmount, {
    path: ['amount'],
    message: 'Total amount + tip tidak boleh lebih dari Rp 10.000.000!'
  })
  .refine(maxAmount, {
    path: ['tipAmount'],
    message: 'Total amount + tip tidak boleh lebih dari Rp 10.000.000!'
  });

// Type inference
type QRISFormValues = z.infer<typeof qrisFormSchema>;`}
        />

        <CodeBlock
          title="React Hook Form Implementation"
          language="tsx"
          code={`import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { qrisFormSchema, type QRISFormValues } from './schema';

const useQRISForm = () => {
  const method = useForm<QRISFormValues>({
    mode: 'all',
    resolver: zodResolver(qrisFormSchema),
    defaultValues: {
      provider: { value: '', text: '' },
      amount: '',
      description: '',
      tip: false,
      method: '01',
      tipAmount: '',
      terminalId: ''
    }
  });

  const { setError, reset } = method;

  const onSubmit = async (values: QRISFormValues) => {
    try {
      // Transform data for API
      const payload = {
        acquirerName: values.provider.text,
        amount: String(localteToNumber(values.amount)),
        additionalInfo: values.description || '',
        tipType: values.method,
        tipValue: ['02', '03'].includes(values.method) 
          ? String(localteToNumber(values.tipAmount || '0')) 
          : '0',
        terminalId: values.terminalId || ''
      };

      await submitQRIS(payload);
      reset();
    } catch (error) {
      setError('root', { 
        type: 'onChange', 
        message: error.message 
      });
    }
  };

  return { method, onSubmit };
};
      description: ''
    }
  });

  const onSubmit = async (data: QRISFormData) => {
    try {
      await onAddQRISDynamic(data);
      toast.success('QRIS created successfully');
      reset();
    } catch (error) {
      toast.error('Failed to create QRIS');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          {...register('merchantId')}
          label="Merchant ID"
          error={!!errors.merchantId}
          helperText={errors.merchantId?.message}
          fullWidth
        />

        <TextField
          {...register('amount', { valueAsNumber: true })}
          label="Amount"
          type="number"
          error={!!errors.amount}
          helperText={errors.amount?.message}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">IDR</InputAdornment>
          }}
        />

        <TextField
          {...register('description')}
          label="Description (Optional)"
          multiline
          rows={3}
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? 'Creating...' : 'Create QRIS'}
        </Button>
      </Stack>
    </form>
  );
};`}
        />

        {/* Utility Functions */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Utility Functions
        </Typography>

        <CodeBlock
          title="Utility Functions Collection"
          language="tsx"
          code={`// Utility functions commonly used throughout the application

// Set value if empty/null/undefined
const setIfEmpty = <T>(value: T, fallback: T = '-' as T): T => {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  return value;
};

// Format currency
const formatCurrency = (amount: number, currency = 'IDR'): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format date
const formatDate = (date: Date | string, format = 'DD/MM/YYYY HH:mm:ss'): string => {
  return moment(date).format(format);
};

// Status color mapping
const getStatusColor = (status: string): 'success' | 'error' | 'warning' | 'info' => {
  const statusMap: Record<string, 'success' | 'error' | 'warning' | 'info'> = {
    'Dibayar': 'success',
    'Berhasil': 'success',
    'Gagal': 'error',
    'Belum Dibayar': 'warning',
    'Menunggu': 'info',
    'Kadaluwarsa': 'error'
  };

  return statusMap[status] || 'info';
};

// Debounce function for search inputs
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};`}
        />

        {/* Best Practices */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Best Practices and Patterns
        </Typography>

        <Stack spacing={2}>
          <Alert severity="success">
            <strong>Recommended Patterns:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Use TableCRING for all data display needs instead of custom table implementations</li>
              <li>Implement context providers for feature-specific state management</li>
              <li>Use custom hooks for data fetching with SWR integration</li>
              <li>Apply Zod validation for all form inputs and API responses</li>
              <li>Follow the service layer pattern with typed generic functions</li>
            </ul>
          </Alert>

          <Alert severity="warning">
            <strong>Avoid These Patterns:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Using Yup for validation (use Zod instead)</li>
              <li>Creating custom table components (use TableCRING)</li>
              <li>Direct API calls in components (use service layer)</li>
              <li>Prop drilling for complex state (use context providers)</li>
              <li>Untyped service functions (always provide generic types)</li>
            </ul>
          </Alert>

          <Alert severity="info">
            <strong>File Organization:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>
                <code>/hooks/</code> - Custom hooks for data management
              </li>
              <li>
                <code>/services/</code> - API service functions
              </li>
              <li>
                <code>/components/</code> - Reusable UI components
              </li>
              <li>
                <code>/context/</code> - Context providers for state management
              </li>
              <li>
                <code>/types/</code> - TypeScript type definitions
              </li>
              <li>
                <code>/utility/</code> - Helper functions and utilities
              </li>
            </ul>
          </Alert>
        </Stack>

        {/* Architecture Pattern */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Complete Feature Architecture Example
        </Typography>

        <CodeBlock
          title="Complete Feature Architecture"
          language="tsx"
          code={`// Complete feature implementation following CRING patterns
// File: src/modules/ManageQRIS/index.tsx

import React from 'react';
import { ManageQRISProvider } from './context/ManageQRISProvider';
import TableCRING from '@/components/(data-display)/TableCRING';
import QRISDetail from './components/Detail';
import QRISActions from './components/Actions';

const ManageQRIS: React.FC = () => {
  return (
    <ManageQRISProvider>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Manage QRIS
        </Typography>
        
        <QRISActions />
        <TableCRING />
        <QRISDetail />
      </Box>
    </ManageQRISProvider>
  );
};

export default ManageQRIS;

// This pattern provides:
// 1. Context-based state management
// 2. Separation of concerns
// 3. Reusable components
// 4. Proper data flow
// 5. Consistent error handling
// 6. Type safety throughout`}
        />

        <Typography variant="body1" sx={{ mt: 3, fontStyle: 'italic' }}>
          This guide covers the essential components and patterns used in the CRING application. All examples are based
          on actual production code and follow the established architecture patterns.
        </Typography>
      </Box>
    </PageID>
  );
};

export default ComponentsAndUtilities;
