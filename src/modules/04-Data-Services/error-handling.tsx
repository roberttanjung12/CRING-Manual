'use client';

import { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import { Icon } from '@iconify/react';
import CodeBlock from '@/documentation/components/CodeBlock';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`error-handling-tabpanel-${index}`}
      aria-labelledby={`error-handling-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const ErrorHandlingPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          Error Handling
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
          Strategi comprehensive untuk menangani errors, validation, dan exception handling
        </Typography>
      </Box>

      <Alert severity="warning">
        <strong>Defensive Programming:</strong> CRING! Partner mengimplementasikan multi-layer error handling untuk
        memastikan aplikasi tetap stabil dan user experience yang baik dalam segala kondisi.
      </Alert>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="error handling tabs">
            <Tab label="Global Error Handling" />
            <Tab label="Form Validation" />
            <Tab label="API Error Handling" />
            <Tab label="Error Boundaries" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🌐 Axios Interceptors
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                  Global interceptors untuk menangani HTTP errors secara konsisten
                </Typography>

                <CodeBlock
                  language="typescript"
                  title="configs/axios.ts - Global Error Interceptor"
                  code={`import axios from 'axios';
import { showError } from '@/utility/jung-alert';
import { clearAuthData, getValidAccessToken } from '@/utility/local-storage';

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = getValidAccessToken();
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      const { status, data } = response;

      switch (status) {
        case 401:
          // Unauthorized - clear auth data dan redirect ke login
          clearAuthData();
          window.location.href = '/auth/login';
          showError('Session expired. Please login again.');
          break;

        case 403:
          // Forbidden - akses ditolak
          showError('Access denied. You don\\'t have permission to perform this action.');
          break;

        case 404:
          // Not Found
          showError('Requested resource not found.');
          break;

        case 422:
          // Validation Error
          if (data.errors) {
            Object.values(data.errors).flat().forEach((message: string) => {
              showError(message);
            });
          } else {
            showError(data.message || 'Validation error occurred.');
          }
          break;

        case 429:
          // Too Many Requests
          showError('Too many requests. Please try again later.');
          break;

        case 500:
          // Server Error
          showError('Server error occurred. Please try again later.');
          break;

        default:
          showError(data.message || 'An unexpected error occurred.');
      }
    } else if (error.request) {
      // Network error
      showError('Network error. Please check your internet connection.');
    } else {
      // Other errors
      showError('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🚨 Custom Error Classes
                </Typography>

                <CodeBlock
                  language="typescript"
                  title="types/errors.ts - Custom Error Types"
                  code={`export class APIError extends Error {
  status: number;
  code: string;
  details?: any;

  constructor(message: string, status: number, code: string, details?: any) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends Error {
  errors: Record<string, string[]>;

  constructor(message: string, errors: Record<string, string[]>) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network connection failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

// Error factory
export const createError = (error: any): Error => {
  if (error.response) {
    const { status, data } = error.response;
    
    if (status === 422 && data.errors) {
      return new ValidationError(data.message || 'Validation failed', data.errors);
    }
    
    return new APIError(
      data.message || 'API Error',
      status,
      data.code || 'UNKNOWN_ERROR',
      data
    );
  } else if (error.request) {
    return new NetworkError();
  }
  
  return new Error(error.message || 'Unknown error occurred');
};`}
                />
              </CardContent>
            </Card>
          </Stack>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  📝 Zod Schema Validation
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                  Menggunakan Zod untuk type-safe validation dengan pesan error yang user-friendly
                </Typography>

                <CodeBlock
                  language="typescript"
                  title="validation/merchantSchema.ts"
                  code={`import { z } from 'zod';

// Custom error messages untuk bahasa Indonesia
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.expected === 'string') {
        return { message: 'Field ini wajib diisi' };
      }
      break;
    case z.ZodIssueCode.too_small:
      if (issue.type === 'string') {
        return { message: \`Minimal \${issue.minimum} karakter\` };
      }
      break;
    case z.ZodIssueCode.too_big:
      if (issue.type === 'string') {
        return { message: \`Maksimal \${issue.maximum} karakter\` };
      }
      break;
    case z.ZodIssueCode.invalid_string:
      if (issue.validation === 'email') {
        return { message: 'Format email tidak valid' };
      }
      if (issue.validation === 'url') {
        return { message: 'Format URL tidak valid' };
      }
      break;
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export const merchantSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama merchant wajib diisi')
    .min(3, 'Nama merchant minimal 3 karakter')
    .max(100, 'Nama merchant maksimal 100 karakter'),
  
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid'),
  
  phone: z
    .string()
    .min(1, 'Nomor telepon wajib diisi')
    .regex(/^[0-9+()-\\s]+$/, 'Format nomor telepon tidak valid')
    .min(10, 'Nomor telepon minimal 10 digit'),
  
  address: z
    .string()
    .min(1, 'Alamat wajib diisi')
    .min(10, 'Alamat minimal 10 karakter')
    .max(500, 'Alamat maksimal 500 karakter'),
  
  businessType: z
    .string()
    .min(1, 'Jenis bisnis wajib dipilih'),
  
  status: z.enum(['active', 'inactive', 'pending'], {
    errorMap: () => ({ message: 'Status tidak valid' })
  }),
  
  // Nested object validation
  contact: z.object({
    name: z.string().min(1, 'Nama kontak wajib diisi'),
    position: z.string().min(1, 'Jabatan kontak wajib diisi'),
    email: z.string().email('Format email kontak tidak valid'),
    phone: z.string().min(10, 'Nomor telepon kontak minimal 10 digit')
  }).optional(),
  
  // Array validation
  documents: z
    .array(z.object({
      type: z.string(),
      url: z.string().url('Format URL dokumen tidak valid'),
      verified: z.boolean()
    }))
    .min(1, 'Minimal 1 dokumen wajib diupload')
});

export type MerchantFormData = z.infer<typeof merchantSchema>;

// Validation function
export const validateMerchant = (data: unknown) => {
  return merchantSchema.safeParse(data);
};`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🎣 Form Validation Hook
                </Typography>

                <CodeBlock
                  language="typescript"
                  title="hooks/useMerchantForm.ts"
                  code={`import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { merchantSchema, type MerchantFormData } from '../validation/merchantSchema';
import { merchantService } from '../services/merchantService';
import { showSuccess, showError } from '@/utility/jung-alert';

export const useMerchantForm = (merchant?: Merchant) => {
  const form = useForm<MerchantFormData>({
    resolver: zodResolver(merchantSchema),
    mode: 'onChange',
    defaultValues: merchant || {
      name: '',
      email: '',
      phone: '',
      address: '',
      businessType: '',
      status: 'pending'
    }
  });

  const { handleSubmit, setError, clearErrors, formState: { isSubmitting } } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      clearErrors(); // Clear previous errors
      
      if (merchant?.id) {
        await merchantService.update(merchant.id, data);
        showSuccess('Merchant berhasil diupdate');
      } else {
        await merchantService.create(data);
        showSuccess('Merchant berhasil dibuat');
      }
      
      return true;
    } catch (error: any) {
      // Handle validation errors dari server
      if (error instanceof ValidationError) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          setError(field as keyof MerchantFormData, {
            type: 'server',
            message: messages[0]
          });
        });
      } else {
        showError(error.message || 'Gagal menyimpan merchant');
      }
      
      return false;
    }
  });

  return {
    form,
    onSubmit,
    isSubmitting
  };
};`}
                />
              </CardContent>
            </Card>
          </Stack>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🔄 Service Layer Error Handling
                </Typography>

                <CodeBlock
                  language="typescript"
                  title="Enhanced service with error handling"
                  code={`import { onGet, onPost } from '@/services';
import { createError, APIError, ValidationError, NetworkError } from '@/types/errors';
import { showError } from '@/utility/jung-alert';

// Service functions with error handling
const onGetMerchants = async (params?: MerchantListParams) => {
  try {
    const response = await onGet<MerchantListParams, MerchantListResponse>('/merchants', { params });
    return response.data;
  } catch (error) {
    const customError = createError(error);
    
    // Log untuk debugging
      console.error('MerchantService.getAll error:', customError);
      
      // Handle specific error types
      if (customError instanceof NetworkError) {
        showError('Koneksi bermasalah. Silakan periksa internet Anda.');
      } else if (customError instanceof APIError) {
        if (customError.status === 404) {
          return { data: [], total: 0, page: 1, limit: 10 }; // Return empty data
        }
        showError(\`Error: \${customError.message}\`);
      }
      
      throw customError;
    }
  }

  async create(data: CreateMerchantRequest) {
    try {
      const response = await this.post<Merchant>(data);
      return response.data;
    } catch (error) {
      const customError = createError(error);
      
      if (customError instanceof ValidationError) {
        // Validation errors akan di-handle oleh form
        throw customError;
      } else if (customError instanceof APIError) {
        if (customError.status === 409) {
          showError('Merchant dengan email ini sudah terdaftar');
        } else {
          showError('Gagal membuat merchant baru');
        }
      }
      
      throw customError;
    }
  }

  async delete(id: string) {
    try {
      await this.delete<void>(\`/\${id}\`);
      return true;
    } catch (error) {
      const customError = createError(error);
      
      if (customError instanceof APIError) {
        if (customError.status === 409) {
          showError('Merchant tidak dapat dihapus karena masih memiliki transaksi aktif');
        } else if (customError.status === 404) {
          showError('Merchant tidak ditemukan');
        } else {
          showError('Gagal menghapus merchant');
        }
      }
      
      throw customError;
    }
  }
}

export const merchantService = new MerchantService();`}
                />
              </CardContent>
            </Card>
          </Stack>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🛡️ React Error Boundaries
                </Typography>

                <CodeBlock
                  language="typescript"
                  title="components/ErrorBoundary.tsx"
                  code={`import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button, Box, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Report to error tracking service
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Icon 
            icon="alert-triangle" 
            style={{ fontSize: '4rem', color: '#ff6b35', marginBottom: '1rem' }} 
          />
          <Typography variant="h5" sx={{ mb: 2 }}>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => window.location.reload()}
            startIcon={<Icon icon="refresh" />}
          >
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🎯 Usage in App
                </Typography>

                <CodeBlock
                  language="typescript"
                  title="app/layout.tsx - Global Error Boundary"
                  code={`import ErrorBoundary from '@/components/ErrorBoundary';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary
          onError={(error, errorInfo) => {
            // Report to monitoring service
            console.error('Global error:', error, errorInfo);
          }}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

// Feature-level error boundary
const MerchantPage = () => {
  return (
    <ErrorBoundary
      fallback={
        <Alert severity="error">
          Failed to load merchant data. Please try again.
        </Alert>
      }
    >
      <MerchantList />
    </ErrorBoundary>
  );
};`}
                />
              </CardContent>
            </Card>
          </Stack>
        </TabPanel>
      </Box>

      {/* Best Practices */}
      <Paper sx={{ p: 3, bgcolor: 'background.default' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          📋 Error Handling Checklist
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Icon icon="check-circle" style={{ color: '#4caf50' }} />
            </ListItemIcon>
            <ListItemText primary="Implement global error interceptors untuk consistency" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Icon icon="check-circle" style={{ color: '#4caf50' }} />
            </ListItemIcon>
            <ListItemText primary="Use Zod schema validation dengan custom error messages" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Icon icon="check-circle" style={{ color: '#4caf50' }} />
            </ListItemIcon>
            <ListItemText primary="Handle network errors dengan user-friendly messages" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Icon icon="check-circle" style={{ color: '#4caf50' }} />
            </ListItemIcon>
            <ListItemText primary="Implement Error Boundaries untuk component-level errors" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Icon icon="check-circle" style={{ color: '#4caf50' }} />
            </ListItemIcon>
            <ListItemText primary="Log errors untuk debugging dan monitoring" />
          </ListItem>
        </List>
      </Paper>

      <Alert severity="info">
        <strong>Robust Error Handling:</strong> Dengan implementasi yang comprehensive ini, aplikasi akan tetap stabil
        dan memberikan user experience yang baik bahkan ketika terjadi error.
      </Alert>
    </Stack>
  );
};

export default ErrorHandlingPage;
