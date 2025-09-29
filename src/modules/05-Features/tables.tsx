'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const TablesPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Tables Overview' },
    { id: 'basic-table', title: 'Basic Table' },
    { id: 'advanced-features', title: 'Advanced Features' },
    { id: 'custom-table', title: 'Custom Table Hook' }
  ];

  return (
    <DocumentationPageLayout
      title="Tables"
      description="Data table components dan advanced features untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Forms',
          href: '/features/forms'
        },
        next: {
          title: 'File Uploads',
          href: '/features/file-uploads'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Tables Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner menggunakan Material-UI Table components dengan features seperti sorting, pagination,
          filtering, dan custom actions untuk data management yang efisien.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="Material-UI Table" color="primary" variant="outlined" />
          <Chip label="Pagination" color="secondary" variant="outlined" />
          <Chip label="Sorting" color="info" variant="outlined" />
          <Chip label="Filtering" color="success" variant="outlined" />
        </Stack>
      </section>

      <section id="basic-table">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Basic Table
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Merchant Table Component
            </Typography>
            <CodeBlock
              language="typescript"
              title="MerchantTable.tsx"
              code={`import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

interface Merchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

interface MerchantTableProps {
  merchants: Merchant[];
  onEdit?: (merchant: Merchant) => void;
  onDelete?: (merchant: Merchant) => void;
  onView?: (merchant: Merchant) => void;
}

const MerchantTable: React.FC<MerchantTableProps> = ({
  merchants,
  onEdit,
  onDelete,
  onView
}) => {
  const getStatusColor = (status: Merchant['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID');
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="merchant table">
        <TableHead>
          <TableRow>
            <TableCell>Nama Merchant</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telepon</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Tanggal Dibuat</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {merchants.map((merchant) => (
            <TableRow
              key={merchant.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {merchant.name}
              </TableCell>
              <TableCell>{merchant.email}</TableCell>
              <TableCell>{merchant.phone}</TableCell>
              <TableCell>
                <Chip
                  label={merchant.status}
                  color={getStatusColor(merchant.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>{formatDate(merchant.createdAt)}</TableCell>
              <TableCell align="right">
                {onView && (
                  <Tooltip title="Lihat Detail">
                    <IconButton
                      size="small"
                      onClick={() => onView(merchant)}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                )}
                {onEdit && (
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => onEdit(merchant)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip title="Hapus">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(merchant)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MerchantTable;`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="advanced-features">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Advanced Features
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Table with Sorting dan Pagination
              </Typography>
              <CodeBlock
                language="typescript"
                title="AdvancedTable.tsx"
                code={`import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Box
} from '@mui/material';

type Order = 'asc' | 'desc';

interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
  sortable: boolean;
}

interface AdvancedTableProps<T> {
  data: T[];
  headCells: HeadCell[];
  renderRow: (item: T, index: number) => React.ReactNode;
  defaultOrderBy?: string;
  rowsPerPageOptions?: number[];
}

function AdvancedTable<T extends Record<string, any>>({
  data,
  headCells,
  renderRow,
  defaultOrderBy = 'name',
  rowsPerPageOptions = [5, 10, 25]
}: AdvancedTableProps<T>) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Sorting function
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const sortedData = React.useMemo(() => {
    return [...data].sort(getComparator(order, orderBy));
  }, [data, order, orderBy]);

  const paginatedData = React.useMemo(() => {
    return sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => renderRow(row, index))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default AdvancedTable;`}
              />
            </CardContent>
          </Card>

          <Alert severity="info">
            <strong>Pro Tip:</strong> Gunakan generic types untuk membuat table component yang reusable untuk berbagai
            data types.
          </Alert>
        </Stack>
      </section>

      <section id="custom-table">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Custom Table Hook
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              useTable Hook untuk State Management
            </Typography>
            <CodeBlock
              language="typescript"
              title="useTable.ts"
              code={`import { useState, useMemo, useCallback } from 'react';

interface UseTableProps<T> {
  data: T[];
  initialOrderBy?: string;
  initialRowsPerPage?: number;
}

interface TableState {
  page: number;
  rowsPerPage: number;
  order: 'asc' | 'desc';
  orderBy: string;
  selected: string[];
}

export function useTable<T extends Record<string, any>>({
  data,
  initialOrderBy = 'id',
  initialRowsPerPage = 10
}: UseTableProps<T>) {
  const [state, setState] = useState<TableState>({
    page: 0,
    rowsPerPage: initialRowsPerPage,
    order: 'asc',
    orderBy: initialOrderBy,
    selected: []
  });

  // Sorting
  const handleSort = useCallback((property: string) => {
    const isAsc = state.orderBy === property && state.order === 'asc';
    setState(prev => ({
      ...prev,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property
    }));
  }, [state.order, state.orderBy]);

  // Pagination
  const handleChangePage = useCallback((newPage: number) => {
    setState(prev => ({ ...prev, page: newPage }));
  }, []);

  const handleChangeRowsPerPage = useCallback((newRowsPerPage: number) => {
    setState(prev => ({
      ...prev,
      rowsPerPage: newRowsPerPage,
      page: 0
    }));
  }, []);

  // Selection
  const handleSelectAll = useCallback((checked: boolean) => {
    setState(prev => ({
      ...prev,
      selected: checked ? data.map(item => item.id) : []
    }));
  }, [data]);

  const handleSelect = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      selected: prev.selected.includes(id)
        ? prev.selected.filter(selectedId => selectedId !== id)
        : [...prev.selected, id]
    }));
  }, []);

  // Computed values
  const sortedData = useMemo(() => {
    const comparator = (a: T, b: T) => {
      const aValue = a[state.orderBy];
      const bValue = b[state.orderBy];
      
      if (bValue < aValue) return state.order === 'desc' ? -1 : 1;
      if (bValue > aValue) return state.order === 'desc' ? 1 : -1;
      return 0;
    };

    return [...data].sort(comparator);
  }, [data, state.order, state.orderBy]);

  const paginatedData = useMemo(() => {
    const startIndex = state.page * state.rowsPerPage;
    return sortedData.slice(startIndex, startIndex + state.rowsPerPage);
  }, [sortedData, state.page, state.rowsPerPage]);

  const isSelected = useCallback((id: string) => {
    return state.selected.includes(id);
  }, [state.selected]);

  return {
    // State
    ...state,
    
    // Data
    sortedData,
    paginatedData,
    
    // Handlers
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectAll,
    handleSelect,
    
    // Utilities
    isSelected,
    selectedCount: state.selected.length,
    totalCount: data.length
  };
}

// Usage Example
const MerchantTableWithHook: React.FC = () => {
  const merchants = []; // Your merchant data
  
  const {
    paginatedData,
    page,
    rowsPerPage,
    order,
    orderBy,
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
    totalCount
  } = useTable({
    data: merchants,
    initialOrderBy: 'name',
    initialRowsPerPage: 10
  });

  return (
    <>
      <AdvancedTable
        data={paginatedData}
        // ... other props
      />
      
      <TablePagination
        count={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => handleChangePage(newPage)}
        onRowsPerPageChange={(e) => 
          handleChangeRowsPerPage(parseInt(e.target.value))
        }
      />
    </>
  );
};`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>Table System Complete!</strong> Custom hook ini menyediakan complete table state management untuk
              sorting, pagination, dan selection.
            </Alert>
          </CardContent>
        </Card>
      </section>
    </DocumentationPageLayout>
  );
};

export default TablesPage;
