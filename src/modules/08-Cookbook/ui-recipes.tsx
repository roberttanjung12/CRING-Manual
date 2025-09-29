'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const UIRecipesPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'UI Recipes Overview' },
    { id: 'pattern-ui', title: 'Pattern UI Components' },
    { id: 'form-components', title: 'Form Components' },
    { id: 'data-display', title: 'Data Display' },
    { id: 'layout-patterns', title: 'Layout Patterns' }
  ];

  return (
    <DocumentationPageLayout
      title="UI Recipes"
      description="Ready-to-use UI components dan layout patterns untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Patterns',
          href: '/cookbook/patterns'
        },
        next: {
          title: 'API Recipes',
          href: '/cookbook/api-recipes'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          UI Component Recipes
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Copy-paste ready UI components dan patterns untuk CRING! Partner interface, dengan focus pada 2 pattern
          implementation utama: Table dan Form patterns.
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>🎯 Pattern-Based UI:</strong> Lihat <strong>/workflow/creating-features</strong> untuk implementasi
          lengkap dari UI components yang ditampilkan di halaman ini.
        </Alert>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="Material-UI" color="primary" variant="outlined" />
          <Chip label="TypeScript" color="secondary" variant="outlined" />
          <Chip label="Responsive" color="info" variant="outlined" />
        </Stack>
      </section>

      <section id="pattern-ui">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Pattern UI Components
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>🎯 Essential UI:</strong> Copy-paste UI components yang essential untuk 2 pattern implementation
          utama.
        </Alert>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📊 Table Pattern UI (P2PMerchant/Withdrawal Style)
              </Typography>
              <CodeBlock
                language="typescript"
                title="TableWithActions.tsx"
                code={`import { Box, Button, Stack } from '@mui/material';
import { Download, Visibility } from '@mui/icons-material';
import TableCRING from '@/components/(data-display)/TableCRING';
import DownloadButton from '@/components/(input)/DownloadButton';
import BlockerProviderButtonMask from '@/context/BlockerProvider/ui/ButtonMask';

const TableWithActions = ({ 
  columns, 
  data, 
  params, 
  pagination, 
  onFilter,
  downloadEndpoint,
  downloadPayload 
}) => {
  return (
    <Box data-testid="data-table-section" component="section">
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
          name="data-export" 
          endpoint={downloadEndpoint}
          payload={downloadPayload} 
        />
      </Box>

      {/* Data Table */}
      <TableCRING
        isLoading={false}
        columns={columns}
        data={data}
        params={params}
        pagination={{
          limit: pagination.limit,
          rows: pagination.rows,
          total: pagination.total,
          current: pagination.page
        }}
        onFilter={onFilter}
      />
    </Box>
  );
};

export default TableWithActions;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📝 Form Pattern UI (ManageQRISV2/Dynamic Style)
              </Typography>
              <CodeBlock
                language="typescript"
                title="FormWithProvider.tsx"
                code={`import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import ButtonBack from '@/components/(field)/ButtonBack';
import ButtonSave from '@/components/(field)/ButtonSave';
import FieldError from '@/components/(field)/FieldError';

const FormWithProvider = ({ 
  methods, 
  onSubmit, 
  title, 
  children, 
  backHref, 
  submitLabel,
  isLoading 
}) => {
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid size={{ md: 6, xs: 12 }}>
            <Card sx={{ boxShadow: 'none' }}>
              <CardContent sx={{ p: 8, bgcolor: 'white' }}>
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
                  {title}
                </Typography>
                
                <Stack spacing={6} pl={6} mt={6}>
                  {children}
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
                      href={backHref}
                      buttonProps={{ sx: { minWidth: 'unset', height: 36.5 } }}
                    />
                    <ButtonSave
                      label={submitLabel}
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
    </FormProvider>
  );
};

export default FormWithProvider;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎭 Modal Result Display
              </Typography>
              <CodeBlock
                language="typescript"
                title="ResultModal.tsx"
                code={`import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import { CheckCircle, QrCode2 } from '@mui/icons-material';

const ResultModal = ({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  content, 
  type = 'success' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'qr':
        return <QrCode2 sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />;
      case 'success':
      default:
        return <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />;
    }
  };

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
        {getIcon()}
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </DialogTitle>
      
      <DialogContent sx={{ textAlign: 'center', pt: 2 }}>
        {content && (
          <Box sx={{ mb: 3 }}>
            {content}
          </Box>
        )}
        
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

export default ResultModal;`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="form-components">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Form Components
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Search Input Component
            </Typography>
            <CodeBlock
              language="typescript"
              title="src/components/forms/SearchInput.tsx"
              code={`import React, { useState } from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface SearchOption {
  id: string;
  label: string;
  description?: string;
}

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => Promise<SearchOption[]>;
  onSelect: (option: SearchOption | null) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  onSelect,
}) => {
  const [options, setOptions] = useState<SearchOption[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (event: any, newInputValue: string) => {
    if (!newInputValue.trim()) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const results = await onSearch(newInputValue);
      setOptions(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      onInputChange={handleInputChange}
      onChange={(event, newValue) => onSelect(newValue)}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Box>
            <Typography variant="body1">{option.label}</Typography>
            {option.description && (
              <Typography variant="body2" color="text.secondary">
                {option.description}
              </Typography>
            )}
          </Box>
        </Box>
      )}
      sx={{ minWidth: 300 }}
    />
  );
};`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="data-display">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Data Display Components
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Status Badge Component
            </Typography>
            <CodeBlock
              language="typescript"
              title="src/components/display/StatusBadge.tsx"
              code={`import React from 'react';
import { Chip, ChipProps } from '@mui/material';
import {
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Pause as PendingIcon,
} from '@mui/icons-material';

type StatusType = 'active' | 'inactive' | 'pending';

interface StatusBadgeProps extends Omit<ChipProps, 'color'> {
  status: StatusType;
  text?: string;
}

const statusConfig: Record<StatusType, {
  color: ChipProps['color'];
  icon: React.ReactElement;
  defaultText: string;
}> = {
  active: {
    color: 'success',
    icon: <ActiveIcon />,
    defaultText: 'Active'
  },
  inactive: {
    color: 'default',
    icon: <InactiveIcon />,
    defaultText: 'Inactive'
  },
  pending: {
    color: 'warning',
    icon: <PendingIcon />,
    defaultText: 'Pending'
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  ...props
}) => {
  const config = statusConfig[status];
  const displayText = text || config.defaultText;

  return (
    <Chip
      label={displayText}
      color={config.color}
      icon={config.icon}
      size="small"
      {...props}
    />
  );
};`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="layout-patterns">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Layout Patterns
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Page Header Component
            </Typography>
            <CodeBlock
              language="typescript"
              title="src/components/layout/PageHeader.tsx"
              code={`import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface ActionButton {
  label: string;
  icon?: React.ReactElement;
  onClick: () => void;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ActionButton[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions = [],
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>

        {actions.length > 0 && (
          <Stack direction="row" spacing={1}>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="contained"
                startIcon={action.icon}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </Stack>
        )}
      </Stack>

      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};`}
            />
          </CardContent>
        </Card>

        <Alert severity="success" sx={{ mt: 3 }}>
          <strong>UI Recipes Ready!</strong> Copy-paste components yang dibutuhkan untuk CRING! Partner.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default UIRecipesPage;
