/**
 * Component Playground Examples
 *
 * Contoh implementasi playground untuk berbagai komponen CRING
 */

import React, { useState } from 'react';
import {
  Button,
  TextField,
  Chip,
  Card,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Link,
  AppBar,
  Toolbar,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import {
  Home,
  Business,
  People,
  Settings,
  Menu,
  Notifications,
  AccountCircle,
  NavigateNext,
  Close
} from '@mui/icons-material';
import TableCRING from '@/components/(data-display)/TableCRING';
import type { TableCRINGColumnProps } from '@/components/(data-display)/TableCRING/type';
import ComponentPlayground from '@/components/ComponentPlayground';

// Real TableCRING Component untuk playground
const PlaygroundTableCRING: React.FC<{
  isLoading?: boolean;
  data?: Array<{ id: string; name: string; status: string; email?: string; role?: string }>;
  pagination?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}> = ({
  isLoading = false,
  data = [
    { id: '1', name: 'John Doe', status: 'Active', email: 'john@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', status: 'Pending', email: 'jane@example.com', role: 'User' },
    { id: '3', name: 'Bob Wilson', status: 'Inactive', email: 'bob@example.com', role: 'User' },
    { id: '4', name: 'Alice Brown', status: 'Active', email: 'alice@example.com', role: 'Admin' },
    { id: '5', name: 'Charlie Davis', status: 'Pending', email: 'charlie@example.com', role: 'User' },
    { id: '6', name: 'Diana Miller', status: 'Active', email: 'diana@example.com', role: 'User' },
    { id: '7', name: 'Edward Clark', status: 'Inactive', email: 'edward@example.com', role: 'Admin' },
    { id: '8', name: 'Fiona Garcia', status: 'Pending', email: 'fiona@example.com', role: 'User' }
  ],
  pagination = true,
  variant = 'default'
}) => {
  const handleFilter = (filters: Record<string, any>) => {
    console.log('Filter applied:', filters);
    // In real implementation, this would trigger data refetch with filters
  };
  // Define columns based on variant
  const columns: TableCRINGColumnProps[] = [
    {
      name: 'name',
      label: 'Name',
      head: { align: 'left' },
      cell: { align: 'left' },
      filters: [
        {
          type: 'text',
          name: 'name',
          query: 'name',
          label: 'Search Name'
        }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      head: { align: 'center' },
      cell: { align: 'center' },
      content: (row: any) => (
        <Chip
          label={row.status}
          size="small"
          color={row.status === 'Active' ? 'success' : row.status === 'Pending' ? 'warning' : 'error'}
        />
      ),
      filters: [
        {
          type: 'select',
          name: 'status',
          query: 'status',
          label: 'Filter Status',
          options: [
            { text: 'All Status', value: '' },
            { text: 'Active', value: 'Active' },
            { text: 'Pending', value: 'Pending' },
            { text: 'Inactive', value: 'Inactive' }
          ]
        }
      ]
    }
  ];

  // Add email column for detailed variant
  if (variant === 'detailed') {
    columns.splice(1, 0, {
      name: 'email',
      label: 'Email',
      head: { align: 'left' },
      cell: { align: 'left' },
      filters: [
        {
          type: 'text',
          name: 'email',
          query: 'email',
          label: 'Search Email'
        }
      ]
    });
    columns.push({
      name: 'role',
      label: 'Role',
      head: { align: 'center' },
      cell: { align: 'center' },
      filters: [
        {
          type: 'select',
          name: 'role',
          query: 'role',
          label: 'Filter Role',
          options: [
            { text: 'All Roles', value: '' },
            { text: 'Admin', value: 'Admin' },
            { text: 'User', value: 'User' }
          ]
        }
      ]
    });
  }

  const paginationConfig = pagination
    ? {
        current: 1,
        limit: 10,
        total: 1,
        rows: data.length
      }
    : undefined;

  return (
    <Box sx={{ width: '100%' }}>
      <TableCRING
        id="playground-table"
        isLoading={isLoading}
        columns={columns}
        data={data}
        params={{}}
        pagination={paginationConfig}
        onFilter={handleFilter}
        actions={
          variant === 'detailed'
            ? [
                {
                  label: 'Edit',
                  onClick: (data: any) => console.log('Edit:', data)
                },
                {
                  label: 'Delete',
                  onClick: (data: any) => console.log('Delete:', data)
                }
              ]
            : undefined
        }
      />
    </Box>
  );
};

// Mock Button Component untuk playground
const MockButton: React.FC<{
  label?: string;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
}> = ({
  label = 'Click Me',
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false
}) => (
  <Button variant={variant} color={color} size={size} disabled={disabled} fullWidth={fullWidth}>
    {label}
  </Button>
);

// Mock Form Component untuk Zod validation
const MockZodForm: React.FC<{
  showValidation?: boolean;
  validationStyle?: 'inline' | 'tooltip' | 'modal';
  realTimeValidation?: boolean;
  strictMode?: boolean;
}> = ({ showValidation = true, validationStyle = 'inline', realTimeValidation = true, strictMode = false }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Zod Form Validation Preview
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <TextField
          label="Email"
          type="email"
          error={showValidation}
          helperText={showValidation ? 'Please enter a valid email' : ''}
        />
        <TextField
          label="Password"
          type="password"
          error={showValidation && strictMode}
          helperText={showValidation && strictMode ? 'Password must be at least 8 characters' : ''}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Chip
          label={`Validation: ${showValidation ? 'ON' : 'OFF'}`}
          size="small"
          color={showValidation ? 'error' : 'default'}
        />
        <Chip label={`Style: ${validationStyle}`} size="small" sx={{ ml: 1 }} />
        <Chip label={`Real-time: ${realTimeValidation ? 'ON' : 'OFF'}`} size="small" sx={{ ml: 1 }} />
        <Chip label={`Strict: ${strictMode ? 'ON' : 'OFF'}`} size="small" sx={{ ml: 1 }} />
      </Box>

      <Typography variant="body2" color="text.secondary">
        This demonstrates Zod validation patterns with different configuration options.
      </Typography>
    </CardContent>
  </Card>
);

// Playground Examples
export const ButtonPlaygroundExample = () => (
  <ComponentPlayground
    componentName="Button"
    component={MockButton}
    defaultProps={{
      label: 'Click Me',
      variant: 'contained',
      color: 'primary',
      size: 'medium',
      disabled: false,
      fullWidth: false
    }}
    propTypes={{
      label: {
        type: 'string',
        description: 'Button text content'
      },
      variant: {
        type: 'select',
        options: ['contained', 'outlined', 'text'],
        description: 'Button appearance style'
      },
      color: {
        type: 'select',
        options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
        description: 'Button color theme'
      },
      size: {
        type: 'select',
        options: ['small', 'medium', 'large'],
        description: 'Button size'
      },
      disabled: {
        type: 'boolean',
        description: 'Disable button interaction'
      },
      fullWidth: {
        type: 'boolean',
        description: 'Make button full width'
      }
    }}
    examples={[
      {
        name: 'Primary Action',
        props: { label: 'Save Changes', variant: 'contained', color: 'primary', size: 'medium' },
        description: 'Standard primary action button'
      },
      {
        name: 'Secondary Action',
        props: { label: 'Cancel', variant: 'outlined', color: 'secondary', size: 'medium' },
        description: 'Secondary action with outlined style'
      },
      {
        name: 'Danger Action',
        props: { label: 'Delete Item', variant: 'contained', color: 'error', size: 'small' },
        description: 'Destructive action button'
      }
    ]}
    codeTemplate={`<Button
  variant="{{variant}}"
  color="{{color}}"
  size="{{size}}"
  disabled={{{disabled}}}
  fullWidth={{{fullWidth}}}
>
  {{label}}
</Button>`}
  />
);

export const TableCRINGPlaygroundExample = () => (
  <ComponentPlayground
    componentName="TableCRING"
    component={PlaygroundTableCRING}
    defaultProps={{
      isLoading: false,
      data: [
        { id: '1', name: 'John Doe', status: 'Active' },
        { id: '2', name: 'Jane Smith', status: 'Inactive' }
      ],
      pagination: true,
      variant: 'default'
    }}
    propTypes={{
      isLoading: {
        type: 'boolean',
        description: 'Show loading state'
      },
      data: {
        type: 'object',
        description: 'Table data array'
      },
      pagination: {
        type: 'boolean',
        description: 'Enable pagination'
      },
      variant: {
        type: 'select',
        options: ['default', 'compact', 'detailed'],
        description: 'Table display variant'
      }
    }}
    examples={[
      {
        name: 'Loading State',
        props: { isLoading: true, data: [], pagination: false },
        description: 'Table in loading state without data'
      },
      {
        name: 'Full Featured',
        props: {
          isLoading: false,
          data: [
            { id: '1', name: 'Merchant A', status: 'Active' },
            { id: '2', name: 'Merchant B', status: 'Pending' },
            { id: '3', name: 'Merchant C', status: 'Inactive' }
          ],
          pagination: true,
          variant: 'detailed'
        },
        description: 'Full-featured table with filters and actions enabled'
      },
      {
        name: 'Simple List',
        props: {
          isLoading: false,
          data: [{ id: '1', name: 'Simple Item', status: 'Active' }],
          pagination: false,
          variant: 'compact'
        },
        description: 'Minimal table configuration for simple lists'
      }
    ]}
    codeTemplate={`<TableCRING
  id="example-table"
  isLoading={{{isLoading}}}
  columns={[
    {
      name: 'name',
      label: 'Name',
      filters: [
        {
          type: 'text',
          name: 'name',
          query: 'name',
          label: 'Search Name'
        }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      content: (row) => (
        <Chip 
          label={row.status} 
          color={row.status === 'Active' ? 'success' : 'warning'} 
        />
      ),
      filters: [
        {
          type: 'select',
          name: 'status',
          query: 'status',
          options: [
            { text: 'All Status', value: '' },
            { text: 'Active', value: 'Active' },
            { text: 'Pending', value: 'Pending' }
          ]
        }
      ]
    }
  ]}
  data={{{data}}}
  params={params}
  {{#if pagination}}
  pagination={{
    limit: 10,
    rows: data.length,
    total: 1,
    current: 1
  }}
  {{/if}}
  onFilter={(filters) => console.log('Applied filters:', filters)}
/>`}
  />
);

export const ZodFormPlaygroundExample = () => (
  <ComponentPlayground
    componentName="ZodForm"
    component={MockZodForm}
    defaultProps={{
      showValidation: true,
      validationStyle: 'inline',
      realTimeValidation: true,
      strictMode: false
    }}
    propTypes={{
      showValidation: {
        type: 'boolean',
        description: 'Display validation errors'
      },
      validationStyle: {
        type: 'select',
        options: ['inline', 'tooltip', 'modal'],
        description: 'How to display validation errors'
      },
      realTimeValidation: {
        type: 'boolean',
        description: 'Validate on every input change'
      },
      strictMode: {
        type: 'boolean',
        description: 'Apply strict validation rules'
      }
    }}
    examples={[
      {
        name: 'Development Mode',
        props: { showValidation: true, validationStyle: 'inline', realTimeValidation: true, strictMode: false },
        description: 'Good for development with immediate feedback'
      },
      {
        name: 'Production Mode',
        props: { showValidation: true, validationStyle: 'tooltip', realTimeValidation: false, strictMode: true },
        description: 'Optimized for production with strict validation'
      },
      {
        name: 'User Friendly',
        props: { showValidation: false, validationStyle: 'inline', realTimeValidation: false, strictMode: false },
        description: 'Less intrusive validation for better UX'
      }
    ]}
    codeTemplate={`const schema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

const form = useForm({
  resolver: zodResolver(schema),
  mode: {{realTimeValidation}} ? 'all' : 'onSubmit'
});

<form onSubmit={form.handleSubmit(onSubmit)}>
  <TextField
    {...form.register('email')}
    error={!!form.formState.errors.email}
    helperText={form.formState.errors.email?.message}
  />
  <TextField
    {...form.register('password')}
    type="password"
    error={!!form.formState.errors.password}
    helperText={form.formState.errors.password?.message}
  />
</form>`}
  />
);

// Mock Modal Component
const MockModal: React.FC<{
  isOpen?: boolean;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  showActions?: boolean;
  backdrop?: boolean;
  persistent?: boolean;
  animation?: 'slide' | 'fade' | 'zoom';
}> = ({
  isOpen = false,
  title = 'Modal Title',
  size = 'medium',
  showActions = true,
  backdrop = true,
  persistent = false,
  animation = 'fade'
}) => {
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => setOpen(false);

  // Map size to MUI Dialog maxWidth
  const maxWidth = size === 'small' ? 'sm' : size === 'medium' ? 'md' : 'lg';

  // Don't use fullWidth for small size to see the difference
  const useFullWidth = size !== 'small';

  return (
    <Box>
      <Button onClick={() => setOpen(true)} variant="contained">
        Open {size.charAt(0).toUpperCase() + size.slice(1)} Modal
      </Button>
      <Dialog
        open={open}
        onClose={persistent ? undefined : handleClose}
        maxWidth={maxWidth}
        fullWidth={useFullWidth}
        disableEscapeKeyDown={persistent}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: backdrop ? 'rgba(0,0,0,0.5)' : 'transparent'
          }
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pr: 1
          }}
        >
          {title}
          <IconButton aria-label="close" onClick={handleClose} sx={{ color: theme => theme.palette.grey[500] }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This is a {size} modal dialog example with customizable properties.
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Chip label={`Size: ${size}`} size="small" />
            <Chip label={`Animation: ${animation}`} size="small" sx={{ ml: 1 }} />
            <Chip label={`Backdrop: ${backdrop ? 'ON' : 'OFF'}`} size="small" sx={{ ml: 1 }} />
            <Chip label={`Persistent: ${persistent ? 'ON' : 'OFF'}`} size="small" sx={{ ml: 1 }} />
          </Box>
          {size === 'large' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                This is a large modal with more content space. You can add forms, tables, or other complex components
                here.
              </Typography>
            </Box>
          )}
        </DialogContent>
        {showActions && (
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleClose} variant="contained">
              Confirm
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Box>
  );
};

// Mock Form Component
const MockForm: React.FC<{
  layout?: 'vertical' | 'horizontal' | 'inline';
  showLabels?: boolean;
  showValidation?: boolean;
  fieldSize?: 'small' | 'medium' | 'large';
  submitStyle?: 'button' | 'floating' | 'inline';
  autoSave?: boolean;
}> = ({
  layout = 'vertical',
  showLabels = true,
  showValidation = true,
  fieldSize = 'medium',
  submitStyle = 'button',
  autoSave = false
}) => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Dynamic Form Example
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: layout === 'vertical' ? 'column' : 'row',
          gap: layout === 'inline' ? 1 : 2,
          mb: 2
        }}
      >
        <TextField
          label={showLabels ? 'Full Name' : undefined}
          placeholder={!showLabels ? 'Full Name' : undefined}
          size={fieldSize as 'small' | 'medium'}
          error={showValidation}
          helperText={showValidation ? 'Please enter your full name' : ''}
          sx={{ flex: layout !== 'vertical' ? 1 : 'auto' }}
        />
        <TextField
          label={showLabels ? 'Email Address' : undefined}
          placeholder={!showLabels ? 'Email Address' : undefined}
          size={fieldSize as 'small' | 'medium'}
          type="email"
          sx={{ flex: layout !== 'vertical' ? 1 : 'auto' }}
        />
        <FormControl sx={{ flex: layout !== 'vertical' ? 1 : 'auto', minWidth: 120 }}>
          <FormLabel component="legend">Role</FormLabel>
          <RadioGroup row={layout === 'horizontal'}>
            <FormControlLabel value="user" control={<Radio size={fieldSize as 'small' | 'medium'} />} label="User" />
            <FormControlLabel value="admin" control={<Radio size={fieldSize as 'small' | 'medium'} />} label="Admin" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Chip label={`Layout: ${layout}`} size="small" />
        <Chip label={`Labels: ${showLabels ? 'ON' : 'OFF'}`} size="small" sx={{ ml: 1 }} />
        <Chip label={`Validation: ${showValidation ? 'ON' : 'OFF'}`} size="small" sx={{ ml: 1 }} />
        <Chip label={`Size: ${fieldSize}`} size="small" sx={{ ml: 1 }} />
        <Chip label={`AutoSave: ${autoSave ? 'ON' : 'OFF'}`} size="small" sx={{ ml: 1 }} />
      </Box>

      {submitStyle === 'button' && (
        <Button variant="contained" fullWidth={layout === 'vertical'}>
          Submit Form
        </Button>
      )}
      {submitStyle === 'floating' && (
        <Button variant="contained" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
          Save
        </Button>
      )}
    </CardContent>
  </Card>
);

// Mock Navigation Component
const MockNavigation: React.FC<{
  type?: 'sidebar' | 'breadcrumb' | 'stepper' | 'tabs';
  variant?: 'default' | 'compact' | 'minimal';
  showIcons?: boolean;
  orientation?: 'horizontal' | 'vertical';
  activeStep?: number;
}> = ({ type = 'sidebar', variant = 'default', showIcons = true, orientation = 'vertical', activeStep = 0 }) => {
  const menuItems = [
    { label: 'Dashboard', icon: <Home /> },
    { label: 'Merchants', icon: <Business /> },
    { label: 'Users', icon: <People /> },
    { label: 'Settings', icon: <Settings /> }
  ];

  const breadcrumbItems = ['Home', 'Merchants', 'Merchant Details'];
  const stepItems = ['Account Info', 'Business Details', 'Verification', 'Complete'];

  if (type === 'sidebar') {
    return (
      <Card variant="outlined" sx={{ width: 280 }}>
        <CardContent sx={{ p: 1 }}>
          <List dense={variant === 'compact'}>
            {menuItems.map((item, index) => (
              <ListItem
                key={item.label}
                sx={{
                  borderRadius: 1,
                  mb: variant === 'minimal' ? 0 : 0.5,
                  bgcolor: index === 1 ? 'primary.light' : 'transparent'
                }}
              >
                {showIcons && (
                  <ListItemIcon sx={{ minWidth: variant === 'compact' ? 36 : 48 }}>{item.icon}</ListItemIcon>
                )}
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: variant === 'compact' ? 'body2' : 'body1'
                  }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }

  if (type === 'breadcrumb') {
    return (
      <Card variant="outlined">
        <CardContent>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <Link
                key={item}
                color={index === breadcrumbItems.length - 1 ? 'text.primary' : 'inherit'}
                href="#"
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                {showIcons && index === 0 && <Home sx={{ mr: 0.5 }} fontSize="inherit" />}
                {item}
              </Link>
            ))}
          </Breadcrumbs>
        </CardContent>
      </Card>
    );
  }

  if (type === 'stepper') {
    return (
      <Card variant="outlined">
        <CardContent>
          <Stepper activeStep={activeStep} orientation={orientation} sx={{ width: '100%' }}>
            {stepItems.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <AppBar position="static" elevation={0}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit">
              <Menu />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              CRING Dashboard
            </Typography>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </CardContent>
    </Card>
  );
};

// Modal Playground Example
export const ModalPlaygroundExample = () => (
  <ComponentPlayground
    componentName="Modal/Dialog"
    component={MockModal}
    defaultProps={{
      isOpen: false,
      title: 'Confirmation Modal',
      size: 'medium',
      showActions: true,
      backdrop: true,
      persistent: false,
      animation: 'fade'
    }}
    propTypes={{
      title: {
        type: 'string',
        description: 'Modal title text'
      },
      size: {
        type: 'select',
        options: ['small', 'medium', 'large'],
        description: 'Modal width size'
      },
      showActions: {
        type: 'boolean',
        description: 'Show action buttons in footer'
      },
      backdrop: {
        type: 'boolean',
        description: 'Show backdrop overlay'
      },
      persistent: {
        type: 'boolean',
        description: 'Prevent modal from closing on backdrop click'
      },
      animation: {
        type: 'select',
        options: ['slide', 'fade', 'zoom'],
        description: 'Modal entrance animation'
      }
    }}
    examples={[
      {
        name: 'Confirmation Dialog',
        props: { title: 'Delete Item?', size: 'small', showActions: true, backdrop: true, persistent: true },
        description: 'Standard confirmation dialog with persistent behavior'
      },
      {
        name: 'Form Modal',
        props: { title: 'Add New Merchant', size: 'large', showActions: true, backdrop: true, persistent: false },
        description: 'Large modal for complex forms'
      },
      {
        name: 'Info Modal',
        props: { title: 'Information', size: 'medium', showActions: false, backdrop: false, persistent: false },
        description: 'Simple info modal without actions'
      }
    ]}
    codeTemplate={`<Dialog
  open={open}
  onClose={{{persistent}} ? undefined : handleClose}
  maxWidth="{{size}}"
  fullWidth={{{size}} !== 'small'}
  disableEscapeKeyDown={{{persistent}}}
  sx={{
    '& .MuiBackdrop-root': {
      backgroundColor: {{#if backdrop}}'rgba(0,0,0,0.5)'{{else}}'transparent'{{/if}}
    }
  }}
>
  <DialogTitle sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    pr: 1
  }}>
    {{title}}
    <IconButton 
      aria-label="close" 
      onClick={handleClose}
      sx={{ color: theme => theme.palette.grey[500] }}
    >
      <Close />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    {/* Modal content here */}
  </DialogContent>
  {{#if showActions}}
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleClose} variant="contained">Confirm</Button>
  </DialogActions>
  {{/if}}
</Dialog>`}
  />
);

// Form Playground Example
export const FormPlaygroundExample = () => (
  <ComponentPlayground
    componentName="Form Layout"
    component={MockForm}
    defaultProps={{
      layout: 'vertical',
      showLabels: true,
      showValidation: true,
      fieldSize: 'medium',
      submitStyle: 'button',
      autoSave: false
    }}
    propTypes={{
      layout: {
        type: 'select',
        options: ['vertical', 'horizontal', 'inline'],
        description: 'Form field arrangement'
      },
      showLabels: {
        type: 'boolean',
        description: 'Display field labels'
      },
      showValidation: {
        type: 'boolean',
        description: 'Show validation errors'
      },
      fieldSize: {
        type: 'select',
        options: ['small', 'medium', 'large'],
        description: 'Input field size'
      },
      submitStyle: {
        type: 'select',
        options: ['button', 'floating', 'inline'],
        description: 'Submit button placement'
      },
      autoSave: {
        type: 'boolean',
        description: 'Automatic form saving'
      }
    }}
    examples={[
      {
        name: 'Registration Form',
        props: {
          layout: 'vertical',
          showLabels: true,
          showValidation: true,
          fieldSize: 'large',
          submitStyle: 'button'
        },
        description: 'Standard registration form layout'
      },
      {
        name: 'Quick Entry',
        props: {
          layout: 'inline',
          showLabels: false,
          showValidation: false,
          fieldSize: 'small',
          submitStyle: 'inline'
        },
        description: 'Compact inline form for quick data entry'
      },
      {
        name: 'Mobile Optimized',
        props: {
          layout: 'vertical',
          showLabels: true,
          showValidation: true,
          fieldSize: 'large',
          submitStyle: 'floating',
          autoSave: true
        },
        description: 'Mobile-friendly form with floating save button'
      }
    ]}
    codeTemplate={`<Box sx={{ display: 'flex', flexDirection: '{{layout}}', gap: 2 }}>
  <TextField
    {{#if showLabels}}label="Field Label"{{/if}}
    {{#unless showLabels}}placeholder="Field Placeholder"{{/unless}}
    size="{{fieldSize}}"
    {{#if showValidation}}error helperText="Validation message"{{/if}}
  />
  
  {{#if autoSave}}
  // Auto-save functionality
  const debouncedSave = useMemo(
    () => debounce((values) => saveForm(values), 500),
    []
  );
  {{/if}}
</Box>`}
  />
);

// Navigation Playground Example
export const NavigationPlaygroundExample = () => (
  <ComponentPlayground
    componentName="Navigation"
    component={MockNavigation}
    defaultProps={{
      type: 'sidebar',
      variant: 'default',
      showIcons: true,
      orientation: 'vertical',
      activeStep: 1
    }}
    propTypes={{
      type: {
        type: 'select',
        options: ['sidebar', 'breadcrumb', 'stepper', 'tabs'],
        description: 'Navigation component type'
      },
      variant: {
        type: 'select',
        options: ['default', 'compact', 'minimal'],
        description: 'Visual variant style'
      },
      showIcons: {
        type: 'boolean',
        description: 'Display icons with navigation items'
      },
      orientation: {
        type: 'select',
        options: ['horizontal', 'vertical'],
        description: 'Navigation orientation (for stepper)'
      },
      activeStep: {
        type: 'number',
        description: 'Current active step (for stepper)'
      }
    }}
    examples={[
      {
        name: 'Main Sidebar',
        props: { type: 'sidebar', variant: 'default', showIcons: true },
        description: 'Primary navigation sidebar with icons'
      },
      {
        name: 'Process Steps',
        props: { type: 'stepper', orientation: 'horizontal', activeStep: 2 },
        description: 'Multi-step process navigation'
      },
      {
        name: 'Page Breadcrumb',
        props: { type: 'breadcrumb', showIcons: true },
        description: 'Breadcrumb navigation for page hierarchy'
      },
      {
        name: 'Compact Menu',
        props: { type: 'sidebar', variant: 'compact', showIcons: false },
        description: 'Space-efficient sidebar without icons'
      }
    ]}
    codeTemplate={`{{#if_eq type 'sidebar'}}
<List>
  {menuItems.map((item) => (
    <ListItem key={item.label}>
      {{#if showIcons}}<ListItemIcon>{item.icon}</ListItemIcon>{{/if}}
      <ListItemText primary={item.label} />
    </ListItem>
  ))}
</List>
{{/if_eq}}

{{#if_eq type 'stepper'}}
<Stepper activeStep={activeStep} orientation="{{orientation}}">
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>
{{/if_eq}}

{{#if_eq type 'breadcrumb'}}
<Breadcrumbs>
  {breadcrumbs.map((crumb, index) => (
    <Link key={crumb} color={index === breadcrumbs.length - 1 ? 'textPrimary' : 'inherit'}>
      {crumb}
    </Link>
  ))}
</Breadcrumbs>
{{/if_eq}}`}
  />
);
