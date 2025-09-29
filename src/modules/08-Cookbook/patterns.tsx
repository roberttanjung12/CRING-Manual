'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const PatternsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Design Patterns Overview' },
    { id: 'data-fetching', title: 'Data Fetching Patterns' },
    { id: 'state-management', title: 'State Management' },
    { id: 'error-handling', title: 'Error Handling' }
  ];

  return (
    <DocumentationPageLayout
      title="Design Patterns & Best Practices"
      description="Proven patterns dan architecture solutions untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Integrations',
          href: '/advanced/integrations'
        },
        next: {
          title: 'UI Recipes',
          href: '/cookbook/ui-recipes'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Design Patterns & Architecture
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Collection of proven design patterns dan architecture solutions untuk CRING! Partner development, updated
          untuk mengikuti pattern terbaru dari creating-features guide dan P2PMerchant/Withdrawal architecture.
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>🔗 Related Guide:</strong> Pattern ini terintegrasi dengan{' '}
          <strong>/workflow/creating-features</strong> guide. Referensi P2PMerchant/Withdrawal pattern untuk
          implementasi lengkap TableCRING dengan custom hooks dan SWR.
        </Alert>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="Architecture" color="primary" variant="outlined" />
          <Chip label="Best Practices" color="secondary" variant="outlined" />
          <Chip label="React Patterns" color="info" variant="outlined" />
        </Stack>
      </section>

      <section id="data-fetching">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Data Fetching Patterns
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Custom Hook with SWR (P2PMerchant/Withdrawal Pattern)
            </Typography>
            <CodeBlock
              language="typescript"
              title="src/hooks/useDataManagement.ts"
              code={`'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';
import qs from 'qs';
import useSWR from 'swr';
import { useBlockerContext } from '@/context/BlockerProvider';
import useFilter from '@/hooks/useFilter';
import onEncrypt from '@/utility/aes';
import type { DataParams, DataRow, UseDataManagement } from './type';
import getDataItems, { type GetDataParams } from './services/getDataItems';

/**
 * Custom hook untuk data management dengan SWR
 * Mengikuti pattern P2PMerchant/Withdrawal
 */
const useDataManagement = (): UseDataManagement => {
  const { isLocked } = useBlockerContext();
  const searchParams = useSearchParams();
  
  // Parse URL params
  const params: DataParams = qs.parse(searchParams.toString());
  
  // Transform URL params to API payload
  const payload = useMemo(() => {
    const defaultParams: GetDataParams = {
      limit: 10,
      offset: 0,
      isMasking: onEncrypt(isLocked)
    };
    
    // Map URL params to API params
    if (params?.limit) defaultParams.limit = Number(params.limit);
    if (params?.page) defaultParams.offset = (Number(params.page) - 1) * defaultParams.limit;
    if (params?.search) defaultParams.search = params.search;
    if (params?.status) defaultParams.status = params.status;
    
    return defaultParams;
  }, [isLocked, params]);
  
  // Fetch data with SWR
  const { isLoading, data, mutate } = useSWR(
    \`/data-items?\${qs.stringify({ ...payload, isMasking: isLocked })}\`,
    () => getDataItems(payload)
  );
  
  // Pagination and filtering
  const { pagination, onFilterGo } = useFilter<DataParams>({
    path: '/data-management',
    status: data?.status,
    headers: {
      'pagination-page': data?.headers?.['pagination-page'],
      'pagination-rows': data?.headers?.['pagination-rows']
    },
    page: params?.page
  });
  
  // Transform API data to table rows
  const list = useMemo<DataRow[]>(() => {
    if (data?.status !== 200 || !Array.isArray(data?.data)) return [];
    
    return data.data.map(item => ({
      id: item.id,
      name: item.name,
      email: item.email,
      registrationDate: [
        moment(item.registrationDate).format('DD/MM/YYYY'),
        moment(item.registrationDate).format('HH:mm:ss')
      ],
      status: {
        id: item.status.toLowerCase(),
        label: item.status,
        color: item.status === 'ACTIVE' ? 'success' : 'error'
      } as any
    }));
  }, [data]);
  
  return {
    isLoading,
    params,
    payload,
    pagination,
    list,
    mutate,
    onFilterGo
  };
};

export default useDataManagement;

// Usage dalam component:
const DataManagementComponent: React.FC = () => {
  const { isLoading, list, params, pagination, onFilterGo } = useDataManagement();

  return (
    <TableCRING
      isLoading={isLoading}
      columns={DataManagementColumn}
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
  );
};`}
            />
            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>✅ Best Practice:</strong> Pattern ini mengikuti architecture P2PMerchant/Withdrawal dengan
              URL-based state management, SWR caching, dan data transformation yang konsisten.
            </Alert>
          </CardContent>
        </Card>
      </section>

      <section id="state-management">
        <Typography variant="h5" mt={4} sx={{ mb: 2 }}>
          State Management Patterns
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Form State Management Hook
            </Typography>
            <CodeBlock
              language="typescript"
              title="src/hooks/useFormState.ts"
              code={`import { useState, useCallback } from 'react';

interface FormField<T = any> {
  value: T;
  error: string | null;
  touched: boolean;
}

type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

export function useFormState<T extends Record<string, any>>(
  initialValues: T
) {
  const [formState, setFormState] = useState<FormState<T>>(() => {
    const state: any = {};
    Object.keys(initialValues).forEach(key => {
      state[key] = {
        value: initialValues[key],
        error: null,
        touched: false,
      };
    });
    return state;
  });

  const setValue = useCallback((fieldName: keyof T, value: any) => {
    setFormState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        touched: true,
      },
    }));
  }, []);

  const setError = useCallback((fieldName: keyof T, error: string | null) => {
    setFormState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        error,
      },
    }));
  }, []);

  const resetForm = useCallback(() => {
    const state: any = {};
    Object.keys(initialValues).forEach(key => {
      state[key] = {
        value: initialValues[key],
        error: null,
        touched: false,
      };
    });
    setFormState(state);
  }, [initialValues]);

  const getValues = useCallback(() => {
    const values: any = {};
    Object.keys(formState).forEach(key => {
      values[key] = formState[key].value;
    });
    return values as T;
  }, [formState]);

  const isValid = Object.values(formState).every(field => !field.error);

  return {
    formState,
    setValue,
    setError,
    resetForm,
    getValues,
    isValid,
  };
}`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="error-handling">
        <Typography variant="h5" mt={4} sx={{ mb: 2 }}>
          Error Handling Patterns
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Error Boundary Component
            </Typography>
            <CodeBlock
              language="typescript"
              title="src/components/ErrorBoundary.tsx"
              code={`import React, { Component, ReactNode } from 'react';
import { Alert, Button, Box, Typography } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps, 
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              An unexpected error occurred. Please try again.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<RefreshIcon />}
              onClick={this.handleRetry}
            >
              Try Again
            </Button>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Usage Example:
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <MerchantManagement />
    </ErrorBoundary>
  );
};`}
            />
          </CardContent>
        </Card>

        <Alert severity="success" sx={{ mt: 3 }}>
          <strong>Design Patterns Ready!</strong> Implementasikan patterns ini untuk meningkatkan maintainability
          aplikasi.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default PatternsPage;
