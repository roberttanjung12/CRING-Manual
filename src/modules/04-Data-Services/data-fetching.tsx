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
  ListItemText
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
      id={`data-fetching-tabpanel-${index}`}
      aria-labelledby={`data-fetching-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const DataFetchingPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          Data Fetching
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
          Panduan lengkap data fetching patterns, custom hooks, dan best practices
        </Typography>
      </Box>

      <Alert severity="info">
        <strong>Modern Data Fetching:</strong> CRING! Partner menggunakan kombinasi service layer, custom hooks, dan SWR
        untuk data fetching yang optimal dengan caching dan revalidation.
      </Alert>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="data fetching tabs">
            <Tab label="Service Layer" />
            <Tab label="Custom Hooks" />
            <Tab label="SWR Integration" />
            <Tab label="Error Handling" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🔧 Core HTTP Functions
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                  Semua API calls menggunakan typed HTTP functions untuk konsistensi dan type safety
                </Typography>

                <CodeBlock
                  language="typescript"
                  title="Service Layer Functions"
                  description="Typed HTTP functions used throughout the application"
                  code={`// services/index.ts - Core HTTP functions
import type { Params } from '@/types/param';

// Generic GET function with typed parameters and response
export const onGet = <TParams = any, TResponse = any>(
  endpoint: string,
  options?: { params?: TParams }
): Promise<{ status: number; data: TResponse; headers: any }> => {
  // Implementation handles authentication, headers, and response transformation
};

// Generic POST function
export const onPost = <TParams = any, TData = any, TResponse = any>(
  endpoint: string,
  data: TData,
  options?: { params?: TParams }
): Promise<{ status: number; data: TResponse; headers: any }> => {
  // Implementation handles authentication and request formatting
};

// Generic PATCH function
export const onPatch = <TParams = any, TData = any, TResponse = any>(
  endpoint: string,
  data: TData,
  options?: { params?: TParams }
): Promise<{ status: number; data: TResponse; headers: any }> => {
  // Implementation handles partial updates
};

// Generic DELETE function
export const onDelete = <TParams = any, TResponse = any>(
  endpoint: string,
  options?: { params?: TParams }
): Promise<{ status: number; data: TResponse; headers: any }> => {
  // Implementation handles resource deletion
};`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  📊 Feature-Specific Service
                </Typography>

                <CodeBlock
                  language="typescript"
                  title="Feature-Specific Service Implementation"
                  description="Example based on ManageQRIS service pattern"
                  code={`// services/getQRIS.ts
import { onGet } from '@/services';
import type { Params } from '@/types/param';

type GetQRISStaticType = 'QRIS Dinamis' | 'QRIS Stiker (Statis)';
type GetQRISStaticStatus = 'Gagal' | 'Dibayar' | 'Belum Dibayar' | 'Kadaluwarsa';

interface GetQRISParams extends Params {
  type?: 'QRIS Dinamis' | 'QRIS Stiker';
  id?: string;
  partnerReferenceNo?: string;
  merchantName?: string;
  bankName?: string;
  fromCreate?: string;
  toCreate?: string;
  from?: string;
  to?: string;
  status?: GetQRISStaticStatus;
}

interface GetQRIS {
  type: GetQRISStaticType;
  id: string;
  partnerReferenceNo: string;
  merchantName: string;
  parentMerchantName: string;
  bankName: string;
  amount: number;
  status: GetQRISStaticStatus;
  createdDate: Date;
  paymentDate: Date;
}

// Service function with proper typing
const onGetQRIS = (params?: GetQRISParams) => 
  onGet<GetQRISParams, GetQRIS[]>('/product/qr', { params });

// Individual resource service
const onGetOneQRISHistory = (id: string) =>
  onGet<void, GetQRIS>(\`/product/qr/\${id}\`);

export type { GetQRISParams, GetQRIS };
export default onGetQRIS;`}
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
                  🎣 Custom Data Hooks
                </Typography>

                <CodeBlock
                  language="typescript"
                  title="hooks/useMerchantData.ts"
                  code={`import { useState, useEffect } from 'react';
import { merchantService, type MerchantListParams } from '@/services/merchantService';
import { showError } from '@/utility/jung-alert';

export const useMerchantData = (initialParams: MerchantListParams = {}) => {
  const [data, setData] = useState({ data: [], total: 0, page: 1, limit: 10 });
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<MerchantListParams>({
    page: 1,
    limit: 10,
    ...initialParams
  });

  const fetchData = async (newParams = params) => {
    setLoading(true);
    try {
      const response = await merchantService.getAll(newParams);
      setData(response.data);
    } catch (error) {
      showError('Failed to fetch merchants');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const updateParams = (newParams: Partial<MerchantListParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  const refresh = () => {
    fetchData();
  };

  return {
    data,
    loading,
    params,
    setParams: updateParams,
    refresh
  };
};`}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🔄 Mutation Hook
                </Typography>

                <CodeBlock
                  language="typescript"
                  title="hooks/useMerchantMutation.ts"
                  code={`import { useState } from 'react';
import { merchantService, type Merchant } from '@/services/merchantService';
import { showSuccess, showError } from '@/utility/jung-alert';

export const useMerchantMutation = () => {
  const [loading, setLoading] = useState(false);

  const createMerchant = async (data: Omit<Merchant, 'id' | 'createdAt'>) => {
    setLoading(true);
    try {
      await merchantService.create(data);
      showSuccess('Merchant created successfully');
      return true;
    } catch (error) {
      showError('Failed to create merchant');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateMerchant = async (id: string, data: Partial<Merchant>) => {
    setLoading(true);
    try {
      await merchantService.update(id, data);
      showSuccess('Merchant updated successfully');
      return true;
    } catch (error) {
      showError('Failed to update merchant');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteMerchant = async (id: string) => {
    setLoading(true);
    try {
      await merchantService.delete(id);
      showSuccess('Merchant deleted successfully');
      return true;
    } catch (error) {
      showError('Failed to delete merchant');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createMerchant,
    updateMerchant,
    deleteMerchant
  };
};`}
                />
              </CardContent>
            </Card>
          </Stack>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔄 SWR Integration
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Untuk data yang perlu real-time updates dan caching yang optimal
              </Typography>

              <CodeBlock
                language="typescript"
                title="hooks/useMerchantSWR.ts"
                code={`import useSWR from 'swr';
import { merchantService, type MerchantListParams } from '@/services/merchantService';

const createKey = (params: MerchantListParams) => 
  ['merchants', JSON.stringify(params)];

const fetcher = (params: MerchantListParams) => 
  merchantService.getAll(params).then(res => res.data);

export const useMerchantSWR = (params: MerchantListParams = {}) => {
  const { data, error, mutate, isValidating } = useSWR(
    createKey(params),
    () => fetcher(params),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 30000, // 30 seconds
      dedupingInterval: 5000   // 5 seconds
    }
  );

  return {
    data,
    loading: !error && !data,
    error,
    mutate,
    isValidating
  };
};

// Usage in component:
export const MerchantList = () => {
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const { data, loading, mutate } = useMerchantSWR(params);

  const handleRefresh = () => {
    mutate(); // Revalidate data
  };

  return (
    // Component JSX
  );
};`}
              />
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  🚨 Error Handling Strategy
                </Typography>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Icon icon="shield-check" style={{ color: '#4caf50' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Global Error Handling"
                      secondary="Axios interceptors menangani 401, 403, dan 500 errors secara otomatis"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Icon icon="alert-triangle" style={{ color: '#ff9800' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Component-Level Handling"
                      secondary="Error boundaries dan try-catch pada hooks untuk error lokal"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Icon icon="refresh-cw" style={{ color: '#2196f3' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Retry Logic"
                      secondary="Otomatis retry pada network errors dengan exponential backoff"
                    />
                  </ListItem>
                </List>

                <CodeBlock
                  language="typescript"
                  title="Error handling implementation"
                  code={`// hooks/useErrorHandler.ts
export const useErrorHandler = () => {
  const handleError = (error: any) => {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          showError(data.message || 'Bad request');
          break;
        case 401:
          // Handled by axios interceptor
          break;
        case 403:
          showError('Access denied');
          break;
        case 404:
          showError('Data not found');
          break;
        case 422:
          // Validation errors
          if (data.errors) {
            Object.values(data.errors).flat().forEach((msg: string) => {
              showError(msg);
            });
          }
          break;
        case 500:
          showError('Server error. Please try again later.');
          break;
        default:
          showError('Something went wrong');
      }
    } else if (error.request) {
      showError('Network error. Please check your connection.');
    } else {
      showError('An unexpected error occurred');
    }
  };

  return { handleError };
};`}
                />
              </CardContent>
            </Card>
          </Stack>
        </TabPanel>
      </Box>

      <Alert severity="success">
        <strong>Data Fetching Best Practices:</strong> Gunakan service layer untuk konsistensi, custom hooks untuk
        reusability, dan SWR untuk optimal caching. Selalu implement proper error handling!
      </Alert>
    </Stack>
  );
};

export default DataFetchingPage;
