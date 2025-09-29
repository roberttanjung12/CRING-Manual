'use client';

import React from 'react';
import { Box, Typography, Divider, Alert, Stack } from '@mui/material';
import PageID from '@/@dront/components/PageID';
import CodeBlock from '@/documentation/components/CodeBlock';

/**
 * Service Layer Architecture Guide
 *
 * This guide explains the service layer patterns used in CRING application,
 * based on actual production implementations found in the codebase.
 */

const ServiceLayerGuide: React.FC = () => {
  return (
    <PageID title="Service Layer Architecture Guide">
      <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Service Layer Architecture Guide
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          This guide covers the service layer patterns used in CRING application, including typed HTTP functions, error
          handling, authentication, and best practices based on actual production implementations.
        </Alert>

        {/* Core HTTP Functions */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
          Core HTTP Functions
        </Typography>

        <Typography variant="body1" paragraph>
          The service layer is built around four main HTTP functions that provide type safety, automatic authentication,
          error handling, and consistent response formatting.
        </Typography>

        <CodeBlock
          title="Core Service Functions"
          description="Typed HTTP functions with authentication and error handling"
          language="typescript"
          code={`// services/index.ts - Core HTTP functions
import type { Params } from '@/types/param';

// Standard response format
interface APIResponse<T = any> {
  status: number;
  data: T;
  headers: Record<string, any>;
  message?: string;
}

/**
 * Generic GET function for fetching data
 * @param endpoint - API endpoint path
 * @param options - Request options including parameters
 * @returns Promise with typed response data
 */
export const onGet = <TParams = any, TResponse = any>(
  endpoint: string,
  options?: { params?: TParams }
): Promise<APIResponse<TResponse>> => {
  // Automatic authentication via headers
  // Request/response transformation
  // Error handling and logging
  // Session management
};

/**
 * Generic POST function for creating resources
 * @param endpoint - API endpoint path  
 * @param data - Request body data
 * @param options - Additional request options
 * @returns Promise with typed response data
 */
export const onPost = <TParams = any, TData = any, TResponse = any>(
  endpoint: string,
  data: TData,
  options?: { params?: TParams }
): Promise<APIResponse<TResponse>> => {
  // Content-Type: application/json
  // Request validation
  // Authentication headers
  // Response transformation
};

/**
 * Generic PATCH function for partial updates
 * @param endpoint - API endpoint path
 * @param data - Partial update data
 * @param options - Additional request options  
 * @returns Promise with typed response data
 */
export const onPatch = <TParams = any, TData = any, TResponse = any>(
  endpoint: string,
  data: TData,
  options?: { params?: TParams }
): Promise<APIResponse<TResponse>> => {
  // Handles partial resource updates
  // Optimistic UI updates support
  // Conflict resolution
};

/**
 * Generic DELETE function for removing resources
 * @param endpoint - API endpoint path
 * @param options - Additional request options
 * @returns Promise with typed response data
 */
export const onDelete = <TParams = any, TResponse = any>(
  endpoint: string,
  options?: { params?: TParams }
): Promise<APIResponse<TResponse>> => {
  // Resource deletion
  // Cascade handling
  // Cache invalidation
};`}
        />

        {/* Feature-Specific Services */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Feature-Specific Service Implementation
        </Typography>

        <Typography variant="body1" paragraph>
          Feature services are built using the core HTTP functions with proper TypeScript interfaces. This example is
          based on the actual ManageQRIS implementation.
        </Typography>

        <CodeBlock
          title="QRIS Service Implementation"
          description="Real implementation from ManageQRISV2 module"
          language="typescript"
          code={`// services/getQRIS.ts - List and filtering
import { onGet } from '@/services';
import type { Params } from '@/types/param';

type GetQRISStaticType = 'QRIS Dinamis' | 'QRIS Stiker (Statis)';
type GetQRISStaticTypeFilter = 'QRIS Dinamis' | 'QRIS Stiker';
type GetQRISStaticStatus = 'Gagal' | 'Dibayar' | 'Belum Dibayar' | 'Kadaluwarsa';

interface GetQRISParams extends Params {
  type?: GetQRISStaticTypeFilter;
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

// Main service function with proper typing
const onGetQRIS = (params?: GetQRISParams) => 
  onGet<GetQRISParams, GetQRIS[]>('/product/qr', { params });

export type { GetQRISStaticType, GetQRISStaticTypeFilter, GetQRISStaticStatus, GetQRISParams, GetQRIS };
export default onGetQRIS;`}
        />

        <CodeBlock
          title="Individual Resource Service"
          description="Service for fetching single QRIS transaction details"
          language="typescript"
          code={`// services/getOneQRISHistory.ts - Individual resource
import { onGet } from '@/services';

interface QRISDetail {
  id: string;
  type: string;
  partnerReferenceNo: string;
  idTransaction: string;
  merchantId: string;
  bankCode: string;
  status: string;
  bankName: string;
  createdDate: string;
  paymentDate: string;
  customerPAN: string;
  customerName: string;
  mdr: number;
  amount: number;
  hasCallbackSent: boolean;
  // Additional callback fields
  accountType: string;
  terminalId: string;
  issuerName: string;
  merchantPAN: string;
  referenceId: string;
  currency: string;
  latestTransactionStatus: string;
  originalReferenceNo: string;
  transactionStatusDesc: string;
}

const onGetOneQRISHistory = (id: string) =>
  onGet<void, QRISDetail>(\`/product/qr/\${id}\`);

export type { QRISDetail };
export default onGetOneQRISHistory;`}
        />

        <CodeBlock
          title="Create/Update Service Functions"
          description="Services for data modification operations"
          language="typescript"
          code={`// services/addQRISDynamic.ts - Create operation
import { onPost } from '@/services';

interface CreateQRISData {
  type: 'QRIS Dinamis';
  merchantId: string;
  amount: number;
  description?: string;
  expiryDate?: Date;
  bankCode: string;
}

interface CreateQRISResponse {
  id: string;
  partnerReferenceNo: string;
  qrCode: string;
  expiryDate: Date;
  status: string;
}

const onAddQRISDynamic = (data: CreateQRISData) =>
  onPost<void, CreateQRISData, CreateQRISResponse>('/product/qr/dynamic', data);

// services/addQRISStatus.ts - Update operation  
interface UpdateStatusData {
  status: 'active' | 'inactive' | 'expired';
  reason?: string;
}

const onUpdateQRISStatus = (id: string, data: UpdateStatusData) =>
  onPatch<void, UpdateStatusData, { success: boolean }>(\`/product/qr/\${id}/status\`, data);

// services/addQRISSendCallback.ts - Action operation
interface SendCallbackData {
  callbackUrl: string;
  secretKey: string;
}

const onSendQRISCallback = (id: string, data: SendCallbackData) =>
  onPost<void, SendCallbackData, { sent: boolean; timestamp: Date }>(\`/product/qr/\${id}/callback\`, data);

export { onAddQRISDynamic, onUpdateQRISStatus, onSendQRISCallback };`}
        />

        {/* Integration with Custom Hooks */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Integration with Custom Hooks
        </Typography>

        <Typography variant="body1" paragraph>
          Services integrate seamlessly with SWR-powered custom hooks for data fetching, caching, and state management.
          This example shows the actual useManageQrisDetail hook.
        </Typography>

        <CodeBlock
          title="Service Integration with SWR Hook"
          description="Real implementation from ManageQRISV2 hooks"
          language="typescript"
          code={`// hooks/useDetail.tsx - Service integration with SWR
import { useMemo, useState } from 'react';
import { Chip } from '@mui/material';
import useSWR from 'swr';
import { useAuthenticationProvider } from '@/context/AuthenticationProvider';
import setIfEmpty from '@/utility/set-if-empty';
import onGetOneQRISHistory from '../services/getOneQRISHistory';
import setManageQRISStatus from '../utils/setStatus';

const useManageQrisDetail = () => {
  const { actor } = useAuthenticationProvider();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

  const isCall = useMemo<boolean>(() => !!(isOpen && id), [id, isOpen]);

  // SWR integration with service function
  const { isLoading, data, mutate } = useSWR(
    isCall && \`/manage-qris/\${id}\`,
    () => onGetOneQRISHistory(id)
  );

  // Transform API data for UI display
  const list = useMemo(() => {
    const items: Array<{
      key: string;
      label: string;
      value: any;
      config: { type: 'text' | 'currency' | 'date' | 'custom' };
      side?: 'left' | 'right';
      isHidden?: boolean;
    }> = [];

    if (data?.status && data?.data) {
      const newData = data.data;
      const { label, color } = setManageQRISStatus(newData?.status);

      items.push({
        key: 'type',
        label: 'Tipe QRIS',
        value: setIfEmpty(newData?.type),
        config: { type: 'text' }
      });

      items.push({
        key: 'amount',
        label: 'Nominal Transaksi',
        value: setIfEmpty(newData?.amount),
        config: { type: 'currency' },
        side: 'right'
      });

      items.push({
        key: 'merchant',
        label: 'Nama Merchant',
        value: setIfEmpty(newData?.merchantName),
        config: { type: 'text' },
        isHidden: actor === 'Merchant' // Role-based visibility
      });

      items.push({
        key: 'status',
        label: 'Status',
        value: <Chip label={label} color={color} />,
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
    mutate, // For manual revalidation
    onOpen,
    onClose
  };
};

export default useManageQrisDetail;`}
        />

        {/* Error Handling */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Error Handling and Best Practices
        </Typography>

        <CodeBlock
          title="Service Usage with Error Handling"
          description="Proper error handling in components and hooks"
          language="typescript"
          code={`// Component usage with error handling
import { useState } from 'react';
import { toast } from 'react-toastify';
import { onAddQRISDynamic, onUpdateQRISStatus } from '../services';
import type { CreateQRISData } from '../services/addQRISDynamic';

const QRISManagementComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateQRIS = async (formData: CreateQRISData) => {
    setIsLoading(true);
    
    try {
      const response = await onAddQRISDynamic(formData);
      
      if (response.status === 200) {
        toast.success('QRIS berhasil dibuat');
        // Handle success (redirect, refresh, etc.)
        return response.data;
      }
    } catch (error: any) {
      // Service layer automatically handles common errors
      // Component handles specific business logic errors
      if (error.response?.status === 422) {
        toast.error('Data tidak valid, silakan periksa kembali');
      } else if (error.response?.status === 409) {
        toast.error('QRIS dengan merchant ini sudah ada');
      } else {
        toast.error('Gagal membuat QRIS, silakan coba lagi');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'active' | 'inactive') => {
    try {
      const response = await onUpdateQRISStatus(id, { status });
      
      if (response.status === 200) {
        toast.success('Status berhasil diperbarui');
        // Trigger data revalidation
        mutate(); // From SWR hook
      }
    } catch (error) {
      toast.error('Gagal memperbarui status');
    }
  };

  return (
    // Component JSX
  );
};`}
        />

        {/* Service Organization */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Service File Organization
        </Typography>

        <CodeBlock
          title="Recommended Service Structure"
          description="File organization based on ManageQRIS module structure"
          language="text"
          code={`src/modules/[FeatureName]/services/
├── index.ts                    # Export all services
├── get[Resource].ts           # GET operations (list, search, filter)
├── getOne[Resource]History.ts # GET single resource
├── add[Resource].ts           # POST operations (create)
├── add[Resource]Status.ts     # PATCH operations (update status)
├── add[Resource]Action.ts     # POST operations (actions)
└── get[Resource]Export.ts     # GET operations (exports, reports)

Example from ManageQRISV2:
├── index.ts
├── getQRIS.ts                 # List QR codes with filtering
├── getOneQRISHistory.ts       # Get single QR code details  
├── addQRISDynamic.ts          # Create dynamic QRIS
├── addQRISStatus.ts           # Update QRIS status
├── addQRISSendCallback.ts     # Send callback action
└── getQRISSticker.ts          # Get sticker QR codes

Each service file:
1. Imports core HTTP functions (onGet, onPost, etc.)
2. Defines TypeScript interfaces for params and responses
3. Exports typed service functions
4. Exports types for use in hooks and components`}
        />

        {/* Key Benefits */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Key Benefits
        </Typography>

        <Stack spacing={2}>
          <Alert severity="success">
            <strong>Type Safety:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Full TypeScript support with generic functions</li>
              <li>Compile-time parameter and response validation</li>
              <li>IDE autocompletion and error detection</li>
              <li>Refactoring safety across the application</li>
            </ul>
          </Alert>

          <Alert severity="info">
            <strong>Consistency:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Standardized error handling across all API calls</li>
              <li>Uniform authentication and authorization</li>
              <li>Consistent response formatting and transformation</li>
              <li>Reusable patterns across different features</li>
            </ul>
          </Alert>

          <Alert severity="warning">
            <strong>Maintainability:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Single point of change for API endpoints</li>
              <li>Easy to add logging, caching, and monitoring</li>
              <li>Simplified testing with mock implementations</li>
              <li>Clear separation between data layer and UI components</li>
            </ul>
          </Alert>
        </Stack>

        {/* Migration Guide */}
        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Migration from Other Patterns
        </Typography>

        <CodeBlock
          title="Converting from Axios Direct Usage"
          description="How to migrate from direct Axios calls to service layer"
          language="typescript"
          code={`// Before: Direct Axios usage
import axios from 'axios';

const fetchMerchants = async (params) => {
  try {
    const response = await axios.get('/api/merchants', { 
      params,
      headers: { Authorization: \`Bearer \${token}\` }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// After: Service layer pattern
import { onGet } from '@/services';

interface MerchantParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive';
}

interface Merchant {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const onGetMerchants = (params?: MerchantParams) =>
  onGet<MerchantParams, Merchant[]>('/merchants', { params });

// Usage remains simple but with full type safety
const { data, isLoading } = useSWR('/merchants', () => 
  onGetMerchants({ page: 1, limit: 10, status: 'active' })
);`}
        />

        <Typography variant="body1" sx={{ mt: 3, fontStyle: 'italic' }}>
          This service layer architecture provides a robust foundation for API interactions while maintaining type
          safety, consistency, and developer experience. Follow the patterns established in ManageQRIS and other
          production modules for best results.
        </Typography>
      </Box>
    </PageID>
  );
};

export default ServiceLayerGuide;
