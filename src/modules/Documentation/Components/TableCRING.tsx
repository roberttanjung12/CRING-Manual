'use client';

import React from 'react';
import { Box, Typography, Divider, Alert, AlertTitle, Chip, Stack, Card, CardContent } from '@mui/material';
import CodeBlock from '@/documentation/components/CodeBlock';

/**
 * TableCRING Component Documentation Module
 *
 * Comprehensive guide for using TableCRING - the primary table component
 * in CRING Portal Partner application.
 *
 * References:
 * - references/components/(data-display)/TableCRING/
 * - references/modules/P2PMerchant/Withdrawal/ (usage example)
 */
const TableCRINGDocumentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Chip label="PRIORITY #1" color="error" size="small" />
          <Chip label="Data Display" color="primary" variant="outlined" size="small" />
        </Stack>

        <Typography variant="h4" component="h1" gutterBottom>
          🏆 TableCRING Component
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          📁 references/components/(data-display)/TableCRING
        </Typography>
      </Box>

      {/* Quick Info Card */}
      <Card sx={{ mb: 4, bgcolor: 'primary.50' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary.main">
            📋 Quick Reference
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Import Path:
              </Typography>
              <Typography variant="body2" component="code" sx={{ bgcolor: 'grey.100', p: 0.5, borderRadius: 1 }}>
                @/components/(data-display)/TableCRING
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Usage Example:
              </Typography>
              <Typography variant="body2" component="code" sx={{ bgcolor: 'grey.100', p: 0.5, borderRadius: 1 }}>
                references/modules/P2PMerchant/Withdrawal
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Type Definitions:
              </Typography>
              <Typography variant="body2" component="code" sx={{ bgcolor: 'grey.100', p: 0.5, borderRadius: 1 }}>
                TableCRING/type.ts
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Purpose Section */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <AlertTitle>🎯 Untuk Apa Component Ini?</AlertTitle>
        <Typography variant="body2" paragraph>
          TableCRING adalah <strong>single source of truth</strong> untuk semua kebutuhan tabel di aplikasi CRING.
          Component ini sudah dilengkapi dengan fitur production-ready:
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <li>Advanced filtering (text, select, date, autocomplete)</li>
          <li>Built-in pagination dengan server-side support</li>
          <li>Loading states & skeleton animation</li>
          <li>Column sorting & grouping</li>
          <li>Copy to clipboard functionality</li>
          <li>Currency formatting otomatis</li>
          <li>Expandable rows untuk detail data</li>
          <li>Action buttons per row</li>
        </Box>
      </Alert>

      {/* When to Use */}
      <Alert severity="success" sx={{ mb: 4 }}>
        <AlertTitle>✅ Kapan Harus Digunakan?</AlertTitle>
        <Typography variant="body2" paragraph>
          <strong>SELALU</strong> gunakan TableCRING untuk semua kebutuhan menampilkan data tabular:
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <li>Transaction history & reports</li>
          <li>User management & merchant lists</li>
          <li>QRIS data & payment information</li>
          <li>Any data yang memerlukan filtering/pagination</li>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold', color: 'error.main' }}>
          ❌ JANGAN buat custom table components! Gunakan TableCRING untuk consistency.
        </Typography>
      </Alert>

      {/* Props Documentation */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        📋 Props & API Reference
      </Typography>

      <CodeBlock
        title="TableCRING Props Interface"
        language="typescript"
        code={`// Main component props
interface TableCRINGProps {
  // ✅ REQUIRED PROPS
  data: Record<string, any>[];           // Array data yang akan ditampilkan
  columns: TableCRINGColumnProps[];      // Definisi kolom dengan filters

  // 🔧 OPTIONAL PROPS
  id?: string;                           // Unique identifier untuk table
  isLoading?: boolean;                   // Loading state (shows skeleton)
  params?: Record<string, any>;          // Filter parameters dari URL/state
  
  // 📄 PAGINATION
  pagination?: {
    current: number;                     // Current page (1-based)
    limit: number;                       // Items per page
    total: number;                       // Total items available
    rows: number;                        // Actual rows returned
  };
  
  // 🔍 ADVANCED FEATURES
  expanded?: (data: any) => ReactNode;   // Function untuk render expanded content
  actions?: TableCRINGActionProps[];     // Action buttons per row
  
  // 🎯 EVENT HANDLERS
  onClick?: (rowData: any) => void;      // Row click handler
  onFilter?: (filters: any) => void;     // Filter change handler
}`}
      />

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        Column Configuration
      </Typography>

      <CodeBlock
        title="Column Props Interface"
        language="typescript"
        code={`// Column definition interface
interface TableCRINGColumnProps {
  // ✅ BASIC PROPS
  name: string;                          // Field name dari data object
  label: string | string[] | ReactNode;  // Column header label
  isOpen?: boolean;                      // Show/hide column (default: true)
  
  // 🔗 GROUPING
  join?: string;                         // Group related columns together
  
  // 🎨 STYLING & ABILITIES
  head?: TableCellProps;                 // Header cell props
  cell?: TableCellProps;                 // Data cell props
  ability?: {
    sx?: SxProps;                        // Custom styles
    copy?: boolean;                      // Enable copy to clipboard
    currency?: 'Rp' | 'IDR';            // Format as currency
  };
  
  // 🔍 FILTERS - The Power Feature!
  filters?: Array<{
    type: 'text' | 'select' | 'date' | 'autocomplete' | 'daterange';
    name: string;                        // Filter field name
    query: string;                       // URL parameter name
    label?: string;                      // Filter label (optional)
    
    // For 'select' type
    options?: Array<{
      value: string; 
      text: string;
    }>;
    
    // For 'autocomplete' type
    autocomplete?: {
      service: {
        endpoint: string;                // API endpoint
        keyword: string[];               // Search fields
      };
      shapes: Array<{
        field: string;                   // Output field
        from: string;                    // Source field from API
      }>;
    };
    
    // For 'date' type
    date?: {
      maxDate?: Date;
      minDate?: Date;
    };
  }>;
}`}
      />

      {/* Real Production Example */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🚀 Production Example (P2PMerchant/Withdrawal)
      </Typography>

      <Typography variant="body1" paragraph>
        Contoh implementasi actual dari references/modules/P2PMerchant/Withdrawal:
      </Typography>

      <CodeBlock
        title="P2PMerchant Withdrawal Implementation"
        language="tsx"
        code={`// references/modules/P2PMerchant/Withdrawal/index.tsx
import TableCRING from '@/components/(data-display)/TableCRING';
import DownloadButton from '@/components/(input)/DownloadButton';
import P2PMerchantWithdrawalColumn from './column';
import useP2PMerchantWithdrawal from './hook';

const P2PMerchantWithdrawal = (): Readonly<ReactNode> => {
  const { isLoading, params, payload, pagination, list, onFilterGo } = useP2PMerchantWithdrawal();

  return (
    <Box data-testid="P2PMerchantWithdrawal" component="section">
      {/* Download Button */}
      <Box display="flex" justifyContent="end" mb={4}>
        <DownloadButton 
          name="riwayat-penarikan-dana" 
          endpoint="/download/rdl-history-withdrawal" 
          payload={payload} 
        />
      </Box>
      
      {/* Table */}
      <TableCRING
        isLoading={isLoading}
        columns={P2PMerchantWithdrawalColumn}
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

      <CodeBlock
        title="Column Definition Example"
        language="typescript"
        code={`// references/modules/P2PMerchant/Withdrawal/column.ts
import type { TableCRINGColumnProps } from '@/components/(data-display)/TableCRING/type';

const P2PMerchantWithdrawalColumn: TableCRINGColumnProps[] = [
  {
    name: 'id',
    label: 'ID',
    cell: { sx: { whiteSpace: 'pre' } },
    ability: { copy: true },
    filters: [{
      type: 'text',
      name: 'id',
      query: 'id'
    }]
  },
  {
    // Column grouping example
    join: 'client',
    name: 'clientName',
    label: 'Nama P2P Merchant',
    ability: { sx: { fontWeight: 700 } },
    filters: [{
      type: 'text',
      name: 'clientName',
      query: 'clientName',
      label: 'Nama P2P Merchant'
    }]
  },
  {
    join: 'client',  // Same group as clientName
    name: 'clientId',
    label: 'ID',
    ability: { copy: true, sx: { whiteSpace: 'pre' } },
    filters: [{
      type: 'text',
      name: 'clientId',
      query: 'clientId',
      label: 'ID'
    }]
  },
  {
    name: 'date',
    label: 'Tanggal',
    head: { align: 'center' },
    cell: { sx: { whiteSpace: 'pre' } },
    filters: [{
      type: 'date',
      name: 'date',
      query: 'transactionDate',
      date: { maxDate: new Date() }
    }]
  },
  {
    name: 'bank',
    label: 'Nama Bank',
    ability: { sx: { fontWeight: 700 } },
    filters: [{
      type: 'autocomplete',
      name: 'bank',
      query: 'bank',
      autocomplete: {
        service: {
          endpoint: '/banks',
          keyword: ['bankName']
        },
        shapes: [
          { field: 'value', from: 'bankInterbankName' },
          { field: 'text', from: 'bankName' }
        ]
      },
      label: 'Nama Bank'
    }]
  },
  {
    name: 'amount',
    label: 'Nominal',
    head: { align: 'right' },
    cell: { sx: { whiteSpace: 'pre' } },
    ability: { currency: 'Rp' }
  },
  {
    name: 'status',
    label: 'Status',
    head: { align: 'center' },
    filters: [{
      type: 'select',
      name: 'status',
      query: 'status',
      options: [
        { value: '', text: 'Semua' },
        { value: 'PENDING', text: 'Pending' },
        { value: 'DISBURSING', text: 'Disbursing' },
        { value: 'COMPLETED', text: 'Berhasil' },
        { value: 'FAILED', text: 'Gagal' }
      ]
    }]
  }
];`}
      />

      {/* Best Practices */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🎯 Best Practices & Tips
      </Typography>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <AlertTitle>⚡ Performance Tips</AlertTitle>
        <Box component="ul" sx={{ m: '8px 0 0 20px' }}>
          <li>
            <strong>useMemo untuk columns</strong>: Wrap column definition dengan useMemo
          </li>
          <li>
            <strong>Debounce filters</strong>: Gunakan debounce untuk text filters (500ms recommended)
          </li>
          <li>
            <strong>Server-side pagination</strong>: Selalu implement untuk data {'>'}100 items
          </li>
          <li>
            <strong>Loading states</strong>: Gunakan isLoading prop untuk UX yang baik
          </li>
        </Box>
      </Alert>

      <CodeBlock
        title="Optimized Implementation Pattern"
        language="tsx"
        code={`const OptimizedTable: React.FC = () => {
  // ✅ Memoize columns untuk performance
  const columns = useMemo(() => [
    {
      name: 'id',
      label: 'Transaction ID',
      filters: [{ type: 'text', name: 'id', query: 'transactionId' }]
    },
    {
      name: 'amount',
      label: 'Amount',
      head: { align: 'right' },
      ability: { currency: 'Rp' }
    }
    // ... other columns
  ], []);

  // ✅ Custom hook untuk data management
  const { 
    data, 
    isLoading, 
    pagination, 
    handleFilter 
  } = useTableData();

  // ✅ Debounced filter handler
  const debouncedFilter = useCallback(
    debounce((newFilters) => {
      handleFilter(newFilters);
    }, 500),
    [handleFilter]
  );

  return (
    <Box>
      {/* Optional: Download button */}
      <Box display="flex" justifyContent="end" mb={2}>
        <DownloadButton name="data-export" endpoint="/api/export" />
      </Box>
      
      {/* Main table */}
      <TableCRING
        data={data}
        columns={columns}
        isLoading={isLoading}
        pagination={pagination}
        onFilter={debouncedFilter}
      />
    </Box>
  );
};`}
      />

      {/* Common Mistakes */}
      <Alert severity="error" sx={{ mt: 3 }}>
        <AlertTitle>❌ Common Mistakes to Avoid</AlertTitle>
        <Box component="ul" sx={{ m: '8px 0 0 20px' }}>
          <li>
            <strong>Custom table components</strong> - Always use TableCRING!
          </li>
          <li>
            <strong>Column definition tidak di-memoize</strong> - Causes unnecessary re-renders
          </li>
          <li>
            <strong>Tidak handle loading state</strong> - Poor UX experience
          </li>
          <li>
            <strong>Filter tidak debounced</strong> - Too many API calls
          </li>
          <li>
            <strong>Hardcode filter options</strong> - Use dynamic options dari API
          </li>
          <li>
            <strong>Tidak consistent naming</strong> - Follow column naming conventions
          </li>
        </Box>
      </Alert>

      <Divider sx={{ my: 4 }} />

      {/* Related Components */}
      <Typography variant="h5" component="h2" gutterBottom>
        🔗 Related Components
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 2 }}>
        Components yang sering digunakan bersamaan dengan TableCRING:
      </Typography>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Chip label="DownloadButton" variant="outlined" />
        <Chip label="FilterPeriod" variant="outlined" />
        <Chip label="Pagination" variant="outlined" />
        <Chip label="Modal/Detail" variant="outlined" />
        <Chip label="BlockerProvider" variant="outlined" />
      </Stack>
    </Box>
  );
};

export default TableCRINGDocumentation;
