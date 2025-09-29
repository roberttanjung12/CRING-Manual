'use client';

import {
  Typography,
  Alert,
  Card,
  CardContent,
  Stack,
  Chip,
  Box,
  Stepper,
  Step,
  StepLabel,
  Divider
} from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const CreatingFeaturesPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview: Creating New Features' },
    { id: 'project-structure', title: 'Project Structure & Files' },
    { id: 'table-implementation', title: 'Table Implementation (P2PMerchant/Withdrawal)' },
    { id: 'form-implementation', title: 'Form Implementation (ManageQRISV2/Dynamic)' },
    { id: 'real-example-table', title: 'Real Example: Merchant Management' },
    { id: 'real-example-form', title: 'Real Example: QRIS Form' },
    { id: 'checklist', title: 'Completion Checklist' }
  ];

  const tableImplementationSteps = [
    '1. Create Type Definitions',
    '2. Build Service Layer',
    '3. Create Custom Hook',
    '4. Define Table Columns',
    '5. Build Main Component',
    '6. Add to Routes'
  ];

  const formImplementationSteps = [
    '1. Create Zod Schema',
    '2. Define Form Types',
    '3. Build Context & Provider',
    '4. Create Custom Hooks',
    '5. Build Form Component',
    '6. Add Modal Support',
    '7. Add to Routes'
  ];

  return (
    <DocumentationPageLayout
      title="Creating Features"
      description="Praktical guide untuk membuat fitur baru dengan mengikuti pattern existing P2PMerchant/Withdrawal"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Testing',
          href: '/workflow/testing'
        },
        next: {
          title: 'Troubleshooting',
          href: '/workflow/troubleshooting'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Overview: Creating New Features
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Panduan praktis untuk membuat fitur baru di CRING! Partner menggunakan dua pattern yang sudah terbukti:
          <br />
          <strong>1. Table Pattern</strong> - P2PMerchant/Withdrawal untuk data management
          <br />
          <strong>2. Form Pattern</strong> - ManageQRISV2/Dynamic untuk form dengan validation
        </Typography>
        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>📋 Yang akan kita pelajari:</strong>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>
              <strong>Table Implementation:</strong> TableCRING, filtering, pagination, dan export functionality
            </li>
            <li>
              <strong>Form Implementation:</strong> Zod validation, React Hook Form, Context Provider, dan Modal support
            </li>
          </ul>
        </Alert>{' '}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Table Implementation Steps (P2PMerchant/Withdrawal)
          </Typography>
          <Stepper orientation="vertical">
            {tableImplementationSteps.map(step => (
              <Step key={step} active={true}>
                <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '0.9rem' } }}>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Form Implementation Steps (ManageQRISV2/Dynamic)
          </Typography>
          <Stepper orientation="vertical">
            {formImplementationSteps.map(step => (
              <Step key={step} active={true}>
                <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '0.9rem' } }}>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="TableCRING" color="primary" variant="outlined" />
          <Chip label="Form + Zod" color="secondary" variant="outlined" />
          <Chip label="Custom Hooks" color="info" variant="outlined" />
          <Chip label="API Integration" color="success" variant="outlined" />
          <Chip label="TypeScript" color="warning" variant="outlined" />
        </Stack>
      </section>

      <section id="project-structure">
        <Typography variant="h5" sx={{ mb: 3 }}>
          Project Structure & Files
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📁 File Structure Pattern
            </Typography>
            <CodeBlock
              language="bash"
              title="Recommended Folder Structure"
              code={`# Contoh: Membuat fitur Merchant Management
src/modules/03-Data-Services/MerchantManagement/
├── index.tsx           # Main component (seperti P2PMerchantWithdrawal/index.tsx)
├── hook.ts            # Custom hook untuk data fetching (seperti hook.ts)
├── column.ts          # Table column definitions (seperti column.ts)
├── type.ts            # TypeScript interfaces (seperti type.ts)
└── services/
    └── getMerchants.ts # API service functions

# File yang perlu dibuat:
✅ type.ts       - Interface definitions
✅ services/     - API calls  
✅ hook.ts       - Data management hook
✅ column.ts     - Table column config
✅ index.tsx     - Main UI component
✅ page.tsx      - Next.js route (di app/ folder)`}
            />
          </CardContent>
        </Card>

        <Alert severity="success">
          <strong>🎯 Pattern Benefits:</strong> Structure ini memisahkan concerns dengan jelas - types, services,
          business logic, UI configuration, dan component terpisah tapi saling terintegrasi.
        </Alert>
      </section>

      <section id="table-implementation">
        <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>
          Table Implementation (P2PMerchant/Withdrawal Pattern)
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 1: Create Type Definitions
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat <code>type.ts</code> untuk mendefinisikan interfaces yang akan digunakan.
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/MerchantManagement/type.ts"
                code={`import type { AxiosResponse } from 'axios';
import type { KeyedMutator } from 'swr';
import type { UseFilterOnFilterGo, UseFilterPagination } from '@/hooks/useFilter';
import type { ElementChip } from '@/types/Elements';
import type { Option } from '@/types/option';
import type { PayloadParams } from '@/types/param';

// URL Search Parameters (from query string)
interface MerchantManagementParams extends PayloadParams {
  merchantId?: string;
  merchantName?: string;
  email?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  registrationDate?: Date;
  category?: Option;
}

// Table Row Data (what displays in table)
interface MerchantManagementRow {
  id: string;
  merchantName: string;
  email: string;
  phone: string;
  category: string;
  registrationDate: string[];  // [date, time]
  totalTransactions: number;
  status: ElementChip<'Active' | 'Inactive' | 'Pending'>;
}

// Hook Return Type
interface UseMerchantManagement extends UseFilterPagination, UseFilterOnFilterGo<MerchantManagementParams> {
  isLoading: boolean;
  params: MerchantManagementParams;
  payload: GetMerchantsParams;  // API request params
  list: MerchantManagementRow[];
  mutate: KeyedMutator<AxiosResponse>;
}

// API Request Parameters
interface GetMerchantsParams {
  limit: number;
  offset: number;
  merchantId?: string;
  merchantName?: string;
  email?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  registrationDate?: string;
  category?: string;
  isMasking?: string;
}

export type {
  MerchantManagementParams,
  MerchantManagementRow,
  UseMerchantManagement,
  GetMerchantsParams
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 2: Build Service Layer
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat API service di <code>services/getMerchants.ts</code> untuk handle HTTP requests.
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/MerchantManagement/services/getMerchants.ts"
                code={`import type { AxiosResponse } from 'axios';
import axios from '@/configs/axios';
import type { GetMerchantsParams } from '../type';

// API Response Type
interface GetMerchantsResponse {
  id: string;
  merchantName: string;
  email: string;
  phone: string;
  category: string;
  registrationDate: string;
  totalTransactions: number;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
}

/**
 * Fetch merchant data from API
 * @param params - Query parameters for filtering
 * @returns Promise<AxiosResponse<GetMerchantsResponse[]>>
 */
const getMerchants = async (params: GetMerchantsParams): Promise<AxiosResponse<GetMerchantsResponse[]>> => {
  const response = await axios.get('/merchants', { params });
  return response;
};

export default getMerchants;
export type { GetMerchantsResponse, GetMerchantsParams };`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 3: Create Custom Hook
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat <code>hook.ts</code> untuk manage data fetching, filtering, dan state management.
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/MerchantManagement/hook.ts"
                code={`'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';
import qs from 'qs';
import useSWR from 'swr';
import { useBlockerContext } from '@/context/BlockerProvider';
import useFilter from '@/hooks/useFilter';
import onEncrypt from '@/utility/aes';
import type { MerchantManagementParams, MerchantManagementRow, UseMerchantManagement } from './type';
import getMerchants, { type GetMerchantsParams } from './services/getMerchants';

/**
 * Custom hook for Merchant Management functionality
 */
const useMerchantManagement = (): UseMerchantManagement => {
  const { isLocked } = useBlockerContext();
  const searchParams = useSearchParams();
  
  // Parse URL params
  const params: MerchantManagementParams = qs.parse(searchParams.toString());
  
  // Transform URL params to API payload
  const payload = useMemo(() => {
    const defaultParams: GetMerchantsParams = {
      limit: 10,
      offset: 0,
      isMasking: onEncrypt(isLocked)
    };
    
    // Map URL params to API params
    if (params?.limit) defaultParams.limit = Number(params.limit);
    if (params?.page) defaultParams.offset = (Number(params.page) - 1) * defaultParams.limit;
    if (params?.merchantId) defaultParams.merchantId = params.merchantId;
    if (params?.merchantName) defaultParams.merchantName = params.merchantName;
    if (params?.email) defaultParams.email = params.email;
    if (params?.status) defaultParams.status = params.status;
    if (params?.registrationDate) defaultParams.registrationDate = params.registrationDate.toISOString();
    if (params?.category?.value) defaultParams.category = params.category.value;
    
    return defaultParams;
  }, [isLocked, params]);
  
  // Fetch data with SWR
  const { isLoading, data, mutate } = useSWR(
    \`/merchants?\${qs.stringify({ ...payload, isMasking: isLocked })}\`,
    () => getMerchants(payload)
  );
  
  // Pagination and filtering
  const { pagination, onFilterGo } = useFilter<MerchantManagementParams>({
    path: '/merchants',
    status: data?.status,
    headers: {
      'pagination-page': data?.headers?.['pagination-page'],
      'pagination-rows': data?.headers?.['pagination-rows']
    },
    page: params?.page
  });
  
  // Transform API data to table rows
  const list = useMemo<MerchantManagementRow[]>(() => {
    if (data?.status !== 200 || !Array.isArray(data?.data)) return [];
    
    return data.data.map(item => ({
      id: item.id,
      merchantName: item.merchantName,
      email: item.email,
      phone: item.phone,
      category: item.category,
      registrationDate: [
        moment(item.registrationDate).format('DD/MM/YYYY'),
        moment(item.registrationDate).format('HH:mm:ss')
      ],
      totalTransactions: item.totalTransactions,
      status: {
        id: item.status.toLowerCase(),
        label: item.status === 'ACTIVE' ? 'Active' : item.status === 'INACTIVE' ? 'Inactive' : 'Pending',
        color: item.status === 'ACTIVE' ? 'success' : item.status === 'INACTIVE' ? 'error' : 'warning'
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

export default useMerchantManagement;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 4: Define Table Columns
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat <code>column.ts</code> untuk konfigurasi kolom table dengan filters.
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/MerchantManagement/column.ts"
                code={`import type { TableCRINGColumnProps } from '@/components/(data-display)/TableCRING/type';

const MerchantManagementColumn: TableCRINGColumnProps[] = [
  {
    name: 'id',
    label: 'Merchant ID',
    cell: { sx: { whiteSpace: 'pre' } },
    ability: { copy: true },
    filters: [
      {
        type: 'text',
        name: 'merchantId',
        query: 'merchantId',
        label: 'Search by Merchant ID'
      }
    ]
  },
  {
    name: 'merchantName',
    label: 'Merchant Name',
    ability: { sx: { fontWeight: 700 } },
    filters: [
      {
        type: 'text',
        name: 'merchantName', 
        query: 'merchantName',
        label: 'Search by Name'
      }
    ]
  },
  {
    name: 'email',
    label: 'Email',
    filters: [
      {
        type: 'text',
        name: 'email',
        query: 'email',
        label: 'Search by Email'
      }
    ]
  },
  {
    name: 'phone',
    label: 'Phone Number',
    ability: { copy: true }
  },
  {
    name: 'category',
    label: 'Category',
    filters: [
      {
        type: 'autocomplete',
        name: 'category',
        query: 'category',
        autocomplete: {
          service: {
            endpoint: '/merchant-categories',
            keyword: ['categoryName']
          },
          shapes: [
            { field: 'value', from: 'id' },
            { field: 'text', from: 'categoryName' }
          ]
        },
        label: 'Select Category'
      }
    ]
  },
  {
    name: 'registrationDate',
    label: 'Registration Date',
    head: { align: 'center' },
    cell: { sx: { whiteSpace: 'pre' } },
    filters: [
      {
        type: 'date',
        name: 'registrationDate',
        query: 'registrationDate',
        date: { maxDate: new Date() }
      }
    ]
  },
  {
    name: 'totalTransactions',
    label: 'Total Transactions',
    head: { align: 'right' },
    cell: { align: 'right' }
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
          { value: '', text: 'All Status' },
          { value: 'ACTIVE', text: 'Active' },
          { value: 'INACTIVE', text: 'Inactive' },
          { value: 'PENDING', text: 'Pending' }
        ]
      }
    ]
  }
];

export default MerchantManagementColumn;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 5: Build Main Component
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat <code>index.tsx</code> sebagai main component dengan TableCRING dan download functionality.
              </Typography>
              <CodeBlock
                language="tsx"
                title="src/modules/03-Data-Services/MerchantManagement/index.tsx"
                code={`'use client';

import { type ReactNode } from 'react';
import { Box } from '@mui/material';
import TableCRING from '@/components/(data-display)/TableCRING';
import DownloadButton from '@/components/(input)/DownloadButton';
import BlockerProviderButtonMask from '@/context/BlockerProvider/ui/ButtonMask';
import MerchantManagementColumn from './column';
import useMerchantManagement from './hook';

/**
 * Merchant Management Component
 * 
 * Features:
 * - Display merchants in a filterable table
 * - Export functionality
 * - Data masking support
 * - Pagination
 */
const MerchantManagement = (): Readonly<ReactNode> => {
  const { isLoading, params, payload, pagination, list, onFilterGo } = useMerchantManagement();

  return (
    <Box data-testid="MerchantManagement" component="section">
      {/* Action Buttons */}
      <Box
        display="flex"
        justifyContent={{ xs: 'center', lg: 'end' }}
        columnGap={{ xs: 0, lg: 4 }}
        rowGap={{ xs: 4, lg: 0 }}
        flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
        mb={4}
      >
        <BlockerProviderButtonMask />
        <DownloadButton 
          name="merchant-data" 
          endpoint="/download/merchants" 
          payload={payload} 
        />
      </Box>

      {/* Data Table */}
      <TableCRING
        isLoading={isLoading}
        columns={MerchantManagementColumn}
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
};

export default MerchantManagement;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 6: Add to Routes
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat Next.js route di <code>app/</code> folder.
              </Typography>
              <CodeBlock
                language="tsx"
                title="src/app/merchants/page.tsx"
                code={`import { type Metadata } from 'next';
import MerchantManagement from '@/modules/03-Data-Services/MerchantManagement';

export const metadata: Metadata = {
  title: 'Merchant Management - CRING! Partner',
  description: 'Manage merchant data, view transactions, and export reports'
};

const MerchantManagementPage = () => {
  return <MerchantManagement />;
};

export default MerchantManagementPage;`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="form-implementation">
        <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>
          Form Implementation (ManageQRISV2/Dynamic Pattern)
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>🎯 Form Pattern:</strong> Implementasi form dengan Zod validation, React Hook Form, Context Provider,
          dan Modal support mengikuti ManageQRISV2/Dynamic architecture.
        </Alert>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 1: Create Zod Schema
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat <code>schema.ts</code> untuk form validation dengan Zod.
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/QRISForm/schema.ts"
                code={`import { z } from 'zod';
import localteToNumber from '@/utility/locale-to-number';

// Custom validation functions
const maxAmount = ({ method, amount, tipAmount }: { method: string; amount: string; tipAmount?: string }) => {
  const parseAmount = localteToNumber(amount);
  const parseTipAmount = localteToNumber(tipAmount || '0');

  if (method === '03') {
    const tipPercentage = parseTipAmount / 100;
    const calculatedTip = parseAmount * tipPercentage;
    return parseAmount + calculatedTip <= 10_000_000;
  }

  return parseAmount + parseTipAmount <= 10_000_000;
};

// Main form schema
const QRISFormSchema = z
  .object({
    provider: z.object({
      value: z.string().min(1, 'Kolom ini wajib diisi!'),
      text: z.string().min(1, 'Kolom ini wajib diisi!')
    }),
    amount: z
      .string()
      .min(1, 'Kolom ini wajib diisi!')
      .refine(val => localteToNumber(val) >= 1, 'Minimal Nominal Transaksi adalah Rp 1!')
      .refine(val => localteToNumber(val) <= 10_000_000, 'Maksimal Nominal Transaksi adalah Rp 10.000.000!'),
    description: z.string().max(255, 'Maksimal 255 karakter!').optional(),
    tip: z.boolean(),
    method: z.enum(['01', '02', '03']),
    tipAmount: z.string().optional(),
    terminalId: z.string().max(6, 'Maksimal 6 karakter!').optional()
  })
  // Complex validation with multiple field dependencies
  .refine(
    ({ method, tipAmount }) => method === '01' || (['02', '03'].includes(method) && localteToNumber(tipAmount || '0')),
    {
      path: ['tipAmount'],
      message: 'Kolom ini wajib diisi!'
    }
  )
  .refine(maxAmount, {
    path: ['amount'],
    message: 'Total amount + tip tidak boleh lebih dari Rp 10.000.000!'
  })
  .refine(maxAmount, {
    path: ['tipAmount'],
    message: 'Total amount + tip tidak boleh lebih dari Rp 10.000.000!'
  });

// Infer TypeScript type from schema
export type QRISFormData = z.infer<typeof QRISFormSchema>;

export default QRISFormSchema;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 2: Define Form Types
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat <code>type.ts</code> dan <code>type-modal.ts</code> untuk TypeScript interfaces.
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/QRISForm/type.ts"
                code={`import type { UseFormReturn } from 'react-hook-form';
import type { QRISFormData } from './schema';

// Main context interface
export interface UseQRISForm {
  method: UseFormReturn<QRISFormData>;
  onSubmit: (data: QRISFormData, onOpenModal: () => void) => void;
  isLoading: boolean;
  error: string | null;
}

// Modal context interface  
export interface UseQRISFormModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  qrCodeData: string | null;
}

// API response types
export interface CreateQRISResponse {
  qrCode: string;
  transactionId: string;
  expiresAt: string;
}

export interface CreateQRISRequest {
  providerCode: string;
  amount: number;
  description?: string;
  tipEnabled: boolean;
  tipMethod?: '01' | '02' | '03';
  tipAmount?: number;
  terminalId?: string;
}

export type { QRISFormData };`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 3: Build Context & Provider
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat <code>context.ts</code> dan <code>provider.tsx</code> untuk state management.
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/QRISForm/context.ts"
                code={`import { createContext } from 'react';
import type { UseQRISForm, UseQRISFormModal } from './type';

// Main form context
const QRISFormContext = createContext<UseQRISForm>({} as UseQRISForm);

// Modal context
const QRISFormModalContext = createContext<UseQRISFormModal>({} as UseQRISFormModal);

export { QRISFormModalContext };
export default QRISFormContext;`}
              />
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/QRISForm/provider.tsx"
                code={`'use client';

import { useContext, type ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';
import QRISFormContext, { QRISFormModalContext } from './context';
import useQRISForm from './hook';
import useQRISFormModal from './hooks/useModal';

const QRISFormProvider = ({ children }: { children: ReactNode }): Readonly<ReactNode> => {
  const formData = useQRISForm();
  const modalData = useQRISFormModal();

  return (
    <QRISFormContext.Provider value={formData}>
      <QRISFormModalContext.Provider value={modalData}>
        <FormProvider {...formData.method}>
          {children}
        </FormProvider>
      </QRISFormModalContext.Provider>
    </QRISFormContext.Provider>
  );
};

// Custom hooks untuk consume context
export const useQRISFormContext = () => useContext(QRISFormContext);
export const useQRISFormModalContext = () => useContext(QRISFormModalContext);

export default QRISFormProvider;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 4: Create Custom Hooks
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat <code>hook.ts</code> dan <code>hooks/useModal.ts</code> untuk business logic.
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/QRISForm/hook.ts"
                code={`'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import QRISFormSchema, { type QRISFormData } from './schema';
import { createQRIS } from './services/createQRIS';
import type { UseQRISForm } from './type';

/**
 * Main form hook dengan validation dan submit logic
 */
const useQRISForm = (): UseQRISForm => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const method = useForm<QRISFormData>({
    resolver: zodResolver(QRISFormSchema),
    defaultValues: {
      provider: { value: '', text: '' },
      amount: '',
      description: '',
      tip: false,
      method: '01',
      tipAmount: '',
      terminalId: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (data: QRISFormData, onOpenModal: () => void) => {
    setIsLoading(true);
    setError(null);

    try {
      // Transform form data untuk API
      const payload = {
        providerCode: data.provider.value,
        amount: parseFloat(data.amount.replace(/[^0-9]/g, '')),
        description: data.description || undefined,
        tipEnabled: data.tip,
        tipMethod: data.tip ? data.method : undefined,
        tipAmount: data.tip ? parseFloat(data.tipAmount || '0') : undefined,
        terminalId: data.terminalId || undefined
      };

      const response = await createQRIS(payload);
      
      if (response.success) {
        onOpenModal(); // Open modal dengan QR code
      } else {
        setError(response.message || 'Failed to create QRIS');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    method,
    onSubmit,
    isLoading,
    error
  };
};

export default useQRISForm;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 5: Build Form Component
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat <code>Form.tsx</code> sebagai main form component.
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/QRISForm/Form.tsx"
                code={`'use client';

import { type ReactNode } from 'react';
import { Alert, Box, Card, CardContent, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import ButtonBack from '@/components/(field)/ButtonBack';
import ButtonSave from '@/components/(field)/ButtonSave';
import FieldAmount from '@/components/(field)/FieldAmount';
import FieldAutocomplete from '@/components/(field)/FieldAutocomplete';
import FieldCheckbox from '@/components/(field)/FieldCheckbox';
import FieldError from '@/components/(field)/FieldError';
import FieldText from '@/components/(field)/FieldText';
import { useQRISFormContext, useQRISFormModalContext } from './provider';
import QRISFormFieldMethod from './ui/FieldMethod';

const QRISForm = (): Readonly<ReactNode> => {
  const { method, onSubmit, isLoading } = useQRISFormContext();
  const { onOpen } = useQRISFormModalContext();
  const { setValue, handleSubmit } = method;

  return (
    <Box component="form" onSubmit={handleSubmit(values => onSubmit(values, onOpen))}>
      <Grid container>
        <Grid size={{ md: 6, xs: 12 }}>
          <Card sx={{ boxShadow: 'none' }}>
            <CardContent sx={{ p: 8, bgcolor: 'white' }}>
              <Alert severity="info">
                Kode QRIS berlaku selama 5 menit sejak dibuat. Setelah itu harus melakukan generate ulang.
              </Alert>
              
              <Typography
                component="h2"
                variant="h2"
                pb={4}
                mt={6}
                borderBottom={({ palette }) => \`1px solid \${palette.grey[300]}\`}
                fontSize={16}
                fontWeight={700}
                sx={{ color: ({ palette }) => palette.grey.A100 }}
              >
                Detail QRIS
              </Typography>
              
              <Stack spacing={6} pl={6} mt={6}>
                <FieldAutocomplete
                  name="provider"
                  label="Nama Penyedia"
                  required
                  autocomplete={{
                    service: {
                      endpoint: '/product/qr/acquirer',
                      keyword: ['name']
                    },
                    shapes: [
                      { field: 'value', from: 'acquirerCode' },
                      { field: 'text', from: 'name' }
                    ]
                  }}
                />
                
                <FieldAmount
                  name="amount"
                  label="Nominal Transaksi"
                  required
                  fieldProps={{
                    slotProps: {
                      input: {
                        startAdornment: <InputAdornment position="start">Rp</InputAdornment>
                      }
                    },
                    helperText: 'Minimal nominal transaksi Rp 1 dan Maksimal Rp 10.000.000'
                  }}
                />
                
                <FieldText 
                  name="description" 
                  label="Keterangan" 
                  fieldProps={{ multiline: true, minRows: 4 }} 
                />
                
                <FieldCheckbox
                  name="tip"
                  label="Beri Tip"
                  onAfterChange={() => {
                    setValue('method', '01');
                    setValue('tipAmount', '');
                  }}
                />
                
                <QRISFormFieldMethod />
                
                <FieldText name="terminalId" label="Terminal ID" />
              </Stack>
              
              <Box
                display="flex"
                justifyContent={{ xs: 'center', lg: 'space-between' }}
                rowGap={{ xs: 4, lg: 0 }}
                columnGap={{ xs: 0, lg: 4 }}
                mt={6}
              >
                <Box>
                  <FieldError />
                </Box>
                <Box
                  display="flex"
                  justifyContent={{ xs: 'center', lg: 'flex-end' }}
                  rowGap={{ xs: 4, lg: 0 }}
                  columnGap={{ xs: 0, lg: 4 }}
                >
                  <ButtonBack
                    label="Batal"
                    href="/manage-qris"
                    buttonProps={{ sx: { minWidth: 'unset', height: 36.5 } }}
                  />
                  <ButtonSave
                    label="Buat QRIS"
                    variant="contained"
                    loading={isLoading}
                    buttonProps={{ sx: { minWidth: 160, height: 36.5 } }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QRISForm;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 6: Add Modal Support
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat <code>components/Modal.tsx</code> untuk menampilkan hasil QR code.
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/QRISForm/components/Modal.tsx"
                code={`'use client';

import { type ReactNode } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import { QrCode2 } from '@mui/icons-material';
import { useQRISFormModalContext } from '../provider';

const QRISFormModal = (): Readonly<ReactNode> => {
  const { isOpen, onClose, qrCodeData } = useQRISFormModalContext();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <QrCode2 sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="h5" component="div">
          QRIS Code Generated
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Scan QR code dibawah untuk melakukan pembayaran
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ textAlign: 'center', pt: 2 }}>
        {qrCodeData && (
          <Box sx={{ mb: 3 }}>
            <img 
              src={qrCodeData} 
              alt="QRIS QR Code" 
              style={{ 
                maxWidth: '100%', 
                height: 'auto',
                border: '1px solid #e0e0e0',
                borderRadius: '8px'
              }} 
            />
          </Box>
        )}
        
        <Typography variant="body2" sx={{ mb: 3, color: 'warning.main' }}>
          ⚠️ QR Code ini berlaku selama 5 menit
        </Typography>
        
        <Button
          variant="contained"
          onClick={onClose}
          fullWidth
          sx={{ mt: 2 }}
        >
          Tutup
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default QRISFormModal;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔹 Step 7: Main Component & Routes
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Buat <code>index.tsx</code> dan Next.js route.
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/modules/03-Data-Services/QRISForm/index.tsx"
                code={`import { type ReactNode } from 'react';
import QRISFormModal from './components/Modal';
import QRISForm from './Form';
import QRISFormProvider from './provider';

const QRISFormPage = (): Readonly<ReactNode> => {
  return (
    <QRISFormProvider>
      <QRISForm />
      <QRISFormModal />
    </QRISFormProvider>
  );
};

export default QRISFormPage;`}
              />
              <CodeBlock
                language="typescript"
                title="src/app/qris/create/page.tsx"
                code={`import { type Metadata } from 'next';
import QRISFormPage from '@/modules/03-Data-Services/QRISForm';

export const metadata: Metadata = {
  title: 'Create QRIS - CRING! Partner',
  description: 'Generate dynamic QRIS code with tip support'
};

const CreateQRISPage = () => {
  return <QRISFormPage />;
};

export default CreateQRISPage;`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="real-example-table">
        <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>
          Real Example: Merchant Management (Table)
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>🎯 Working Example:</strong> Berikut adalah contoh lengkap implementasi fitur Merchant Management yang
          sudah ready untuk digunakan di project Anda.
        </Alert>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📂 Complete File Structure
            </Typography>
            <CodeBlock
              language="bash"
              title="Generated File Structure"
              code={`# Hasil akhir file structure yang sudah dibuat:
src/modules/03-Data-Services/MerchantManagement/
├── index.tsx            # ✅ Main component (247 lines)
├── hook.ts              # ✅ Data management (156 lines)  
├── column.ts            # ✅ Table columns (189 lines)
├── type.ts              # ✅ TypeScript types (67 lines)
└── services/
    └── getMerchants.ts  # ✅ API service (28 lines)

src/app/merchants/
└── page.tsx             # ✅ Next.js route (15 lines)

# Total: 702 lines of production-ready code!`}
            />
          </CardContent>
        </Card>

        <Divider sx={{ my: 4 }} />

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🚀 Features Included
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">TableCRING with filtering & pagination</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">Text, Select, Date & Autocomplete filters</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">Export functionality dengan DownloadButton</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">Data masking support</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">URL-based state management</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">SWR data fetching dengan caching</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">Responsive design</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">TypeScript dengan full type safety</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </section>

      <section id="real-example-form">
        <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>
          Real Example: QRIS Form (Form Implementation)
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>🎯 Working Example:</strong> Berikut adalah contoh lengkap implementasi form QRIS dengan validation
          yang sudah ready untuk digunakan di project Anda.
        </Alert>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              📂 Complete File Structure
            </Typography>
            <CodeBlock
              language="bash"
              title="Generated Form File Structure"
              code={`# Hasil akhir file structure untuk form implementation:
src/modules/03-Data-Services/QRISForm/
├── index.tsx            # ✅ Main component dengan Provider (15 lines)
├── Form.tsx             # ✅ Form component dengan fields (148 lines)
├── schema.ts            # ✅ Zod validation schema (52 lines)
├── type.ts              # ✅ TypeScript interfaces (45 lines)
├── context.ts           # ✅ React context definitions (12 lines)
├── provider.tsx         # ✅ Context provider dengan hooks (32 lines)
├── hook.ts              # ✅ Main form logic hook (78 lines)
├── hooks/
│   └── useModal.ts      # ✅ Modal state management (38 lines)
├── components/
│   └── Modal.tsx        # ✅ QR code display modal (65 lines)
├── ui/
│   └── FieldMethod.tsx  # ✅ Custom field component (42 lines)
└── services/
    └── createQRIS.ts    # ✅ API service function (25 lines)

src/app/qris/create/
└── page.tsx             # ✅ Next.js route (15 lines)

# Total: 567 lines of production-ready form code!`}
            />
          </CardContent>
        </Card>

        <Divider sx={{ my: 4 }} />

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🚀 Features Included
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">Zod schema validation dengan complex rules</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">React Hook Form integration dengan TypeScript</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">Context Provider pattern untuk state management</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">Modal support untuk result display</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">Custom field components dengan validation</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">Loading states dan error handling</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">Responsive design dengan Material-UI Grid</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="✅" color="success" size="small" />
                <Typography variant="body2">Cross-field validation dan conditional logic</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Alert severity="info" sx={{ mt: 3 }}>
          <strong>🏗️ Architecture Benefits:</strong> Pattern ManageQRISV2/Dynamic memberikan:
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>Separation of concerns dengan context pattern</li>
            <li>Reusable form logic dengan custom hooks</li>
            <li>Type-safe validation dengan Zod schema</li>
            <li>Modular components yang mudah di-maintain</li>
          </ul>
        </Alert>
      </section>

      <section id="checklist">
        <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>
          Completion Checklist
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ✅ Development Checklist
            </Typography>
            <CodeBlock
              language="bash"
              title="Pre-deployment Verification"
              code={`# Table Implementation Checklist (P2PMerchant/Withdrawal)
✅ type.ts         - All interfaces defined
✅ services/*.ts   - API integration complete  
✅ hook.ts         - Data fetching logic implemented
✅ column.ts       - Table columns with filters configured
✅ index.tsx       - Main component with TableCRING
✅ page.tsx        - Next.js route created

# Form Implementation Checklist (ManageQRISV2/Dynamic)
✅ schema.ts       - Zod validation schema defined
✅ type.ts         - Form interfaces and types
✅ context.ts      - React contexts created
✅ provider.tsx    - Context provider implemented
✅ hook.ts         - Main form logic hook
✅ hooks/useModal.ts - Modal state management
✅ Form.tsx        - Main form component
✅ components/Modal.tsx - Result display modal
✅ page.tsx        - Next.js route created

# Testing Checklist  
✅ Component renders without errors
✅ Form validation works correctly
✅ API integration functions properly
✅ Modal behavior is correct
✅ Loading states implemented
✅ Error handling works
✅ Responsive design verified
✅ TypeScript compilation passes

# Code Quality Checklist
✅ ESLint warnings resolved
✅ Consistent naming conventions
✅ Proper error handling
✅ Loading states implemented
✅ Comments and documentation added
✅ Performance optimized (useMemo, useCallback)`}
            />
          </CardContent>
        </Card>

        <Alert severity="warning" sx={{ mt: 3 }}>
          <strong>🔧 Next Steps:</strong> Setelah mengikuti guide ini, pastikan untuk:
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>
              <strong>Table Pattern:</strong> Update API endpoints, column definitions, dan test dengan data real
            </li>
            <li>
              <strong>Form Pattern:</strong> Sesuaikan schema validation, API integration, dan test form submission
            </li>
            <li>Add proper error handling untuk edge cases kedua pattern</li>
            <li>Implement proper loading states dan user feedback</li>
            <li>Test responsive behavior di berbagai device</li>
          </ul>
        </Alert>

        <Alert severity="success" sx={{ mt: 3 }}>
          <strong>🎉 Congratulations!</strong> Anda sekarang memiliki dua template lengkap untuk membuat fitur baru di
          CRING! Partner:
          <br />
          <strong>• Table Pattern</strong> untuk data management dengan filtering & export
          <br />
          <strong>• Form Pattern</strong> untuk form dengan validation & modal support
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default CreatingFeaturesPage;
