'use client';

import { useState } from 'react';
import {
  Typography,
  Alert,
  Card,
  CardContent,
  Stack,
  Box,
  Button,
  TextField,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
  Switch,
  Checkbox,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const ComponentCatalogPage = () => {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const tableOfContents = [
    { id: 'overview', title: 'Component Overview' },
    { id: 'buttons', title: 'Buttons & Actions' },
    { id: 'inputs', title: 'Form Inputs' },
    { id: 'display', title: 'Data Display' },
    { id: 'feedback', title: 'Feedback Components' },
    { id: 'layout', title: 'Layout Components' }
  ];

  return (
    <DocumentationPageLayout
      title="Component Catalog"
      description="Comprehensive catalog of all available components dengan live examples dan usage code"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Design System',
          href: '/components/design-system'
        },
        next: {
          title: 'Usage Patterns',
          href: '/components/patterns'
        }
      }}
    >
      {/* Overview */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Component Catalog Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Catalog ini berisi semua components yang tersedia di CRING! Partner, complete dengan live examples, props
          documentation, dan usage code yang bisa langsung di-copy.
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Interactive Examples:</strong> Semua components di bawah ini adalah live examples. Anda bisa interact
          dengan mereka untuk melihat behavior-nya secara real-time.
        </Alert>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            {
              category: 'Buttons & Actions',
              count: '8 components',
              icon: 'cursor-pointer',
              color: 'primary.main'
            },
            {
              category: 'Form Inputs',
              count: '12 components',
              icon: 'edit',
              color: 'success.main'
            },
            {
              category: 'Data Display',
              count: '15 components',
              icon: 'table',
              color: 'info.main'
            },
            {
              category: 'Feedback',
              count: '6 components',
              icon: 'bell',
              color: 'warning.main'
            },
            {
              category: 'Layout',
              count: '10 components',
              icon: 'layout',
              color: 'secondary.main'
            },
            {
              category: 'Navigation',
              count: '7 components',
              icon: 'navigation',
              color: 'error.main'
            }
          ].map((item, index) => (
            <Grid
              key={index}
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}
            >
              <Card>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: `${item.color}20`
                      }}
                    >
                      <Icon icon={item.icon} style={{ color: item.color, fontSize: '20px' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                        {item.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.count}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
      {/* Buttons & Actions */}
      <section id="buttons">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Buttons & Actions
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Primary Buttons
              </Typography>

              <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 3 }}>
                <Button variant="contained" color="primary">
                  Primary Button
                </Button>
                <Button variant="contained" color="secondary">
                  Secondary Button
                </Button>
                <Button variant="contained" color="success">
                  Success Button
                </Button>
                <Button variant="contained" color="error">
                  Error Button
                </Button>
              </Stack>

              <CodeBlock
                language="typescript"
                title="Primary button examples"
                code={`import { Button } from '@mui/material'

// Basic buttons
<Button variant="contained" color="primary">
  Primary Button
</Button>

<Button variant="contained" color="secondary">
  Secondary Button  
</Button>

// With icons
<Button 
  variant="contained" 
  startIcon={<Icon icon="plus" />}
  onClick={handleClick}
>
  Add New
</Button>

// Loading state
<Button 
  variant="contained" 
  disabled={isLoading}
  startIcon={isLoading ? <CircularProgress size={16} /> : <Icon icon="save" />}
>
  {isLoading ? 'Saving...' : 'Save'}
</Button>`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Button Variants
              </Typography>

              <Stack spacing={2}>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Button variant="contained">Contained</Button>
                  <Button variant="outlined">Outlined</Button>
                  <Button variant="text">Text</Button>
                </Stack>

                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Button variant="contained" size="small">
                    Small
                  </Button>
                  <Button variant="contained" size="medium">
                    Medium
                  </Button>
                  <Button variant="contained" size="large">
                    Large
                  </Button>
                </Stack>

                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <IconButton color="primary">
                    <Icon icon="heart" />
                  </IconButton>
                  <IconButton color="secondary">
                    <Icon icon="star" />
                  </IconButton>
                  <IconButton color="error">
                    <Icon icon="delete" />
                  </IconButton>
                </Stack>
              </Stack>

              <CodeBlock
                language="typescript"
                title="Button variants and sizes"
                code={`// Button variants
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>

// Button sizes
<Button variant="contained" size="small">Small</Button>
<Button variant="contained" size="medium">Medium</Button>
<Button variant="contained" size="large">Large</Button>

// Icon buttons
<IconButton color="primary">
  <Icon icon="heart" />
</IconButton>`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>
      {/* Form Inputs */}
      <section id="inputs">
        <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 3, fontWeight: 600 }}>
          Form Inputs
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Text Fields
              </Typography>

              <Stack spacing={3} sx={{ mb: 3 }}>
                <TextField variant="outlined" placeholder="Enter text here..." fullWidth />
                <TextField variant="outlined" required error helperText="This field is required" fullWidth />
                <TextField variant="outlined" disabled value="Disabled value" fullWidth />
                <TextField multiline rows={4} variant="outlined" fullWidth />
              </Stack>

              <CodeBlock
                language="typescript"
                title="TextField examples"
                code={`import { TextField } from '@mui/material'

// Basic text field
<TextField
  variant="outlined"
  placeholder="Enter text here..."
  fullWidth
  onChange={(e) => setValue(e.target.value)}
/>

// Required field with validation
<TextField
  variant="outlined"
  required
  error={hasError}
  helperText={hasError ? "This field is required" : ""}
  fullWidth
/>

// Multiline textarea
<TextField
  multiline
  rows={4}
  variant="outlined"
  fullWidth
/>`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Checkboxes & Switches
              </Typography>

              <Stack spacing={2} sx={{ mb: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Checkbox checked={checkboxChecked} onChange={e => setCheckboxChecked(e.target.checked)} />
                  <Typography>Accept terms and conditions</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Switch checked={switchChecked} onChange={e => setSwitchChecked(e.target.checked)} />
                  <Typography>Enable notifications</Typography>
                </Stack>
              </Stack>

              <CodeBlock
                language="typescript"
                title="Checkbox and switch examples"
                code={`import { Checkbox, Switch, FormControlLabel } from '@mui/material'

// Checkbox with label
<FormControlLabel
  control={
    <Checkbox 
      checked={agreed}
      onChange={(e) => setAgreed(e.target.checked)}
    />
  }
  label="Accept terms and conditions"
/>

// Switch with label
<FormControlLabel
  control={
    <Switch
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
    />
  }
  label="Enable notifications"
/>`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>
      {/* Data Display */}
      <section id="display">
        <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 3, fontWeight: 600 }}>
          Data Display Components
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Tables
              </Typography>

              <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>
                        <Chip label="Active" color="success" size="small" />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <Icon icon="edit" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Icon icon="delete" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>
                        <Chip label="Pending" color="warning" size="small" />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <Icon icon="edit" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <Icon icon="delete" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <CodeBlock
                language="typescript"
                title="Table with actions"
                code={`import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Chip 
} from '@mui/material'

<TableContainer component={Paper} variant="outlined">
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Role</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>
            <Chip 
              label={user.status} 
              color={user.status === 'Active' ? 'success' : 'warning'}
              size="small" 
            />
          </TableCell>
          <TableCell>
            <IconButton onClick={() => handleEdit(user.id)}>
              <Icon icon="edit" />
            </IconButton>
            <IconButton onClick={() => handleDelete(user.id)} color="error">
              <Icon icon="delete" />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Lists & Avatars
              </Typography>

              <List sx={{ mb: 3 }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="John Doe" secondary="Administrator - Last seen 2 hours ago" />
                  <Chip label="Online" color="success" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>JS</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Jane Smith" secondary="Manager - Last seen yesterday" />
                  <Chip label="Away" color="warning" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'info.main' }}>MB</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Mike Brown" secondary="Developer - Last seen 1 week ago" />
                  <Chip label="Offline" color="default" size="small" />
                </ListItem>
              </List>

              <CodeBlock
                language="typescript"
                title="List with avatars and status"
                code={`import { 
  List, ListItem, ListItemText, ListItemAvatar,
  Avatar, Chip 
} from '@mui/material'

<List>
  {users.map((user) => (
    <ListItem key={user.id}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          {user.name.split(' ').map(n => n[0]).join('')}
        </Avatar>
      </ListItemAvatar>
      <ListItemText 
        primary={user.name}
        secondary={\`\${user.role} - Last seen \${user.lastSeen}\`}
      />
      <Chip 
        label={user.status} 
        color={getStatusColor(user.status)}
        size="small" 
      />
    </ListItem>
  ))}
</List>`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>
      {/* Feedback */}
      <section id="feedback">
        <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 3, fontWeight: 600 }}>
          Feedback Components
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Alerts
              </Typography>

              <Stack spacing={2} sx={{ mb: 3 }}>
                <Alert severity="success">
                  <strong>Success!</strong> Your changes have been saved successfully.
                </Alert>
                <Alert severity="info">
                  <strong>Info:</strong> This is an informational message.
                </Alert>
                <Alert severity="warning">
                  <strong>Warning:</strong> Please check your input before proceeding.
                </Alert>
                <Alert severity="error">
                  <strong>Error!</strong> Something went wrong. Please try again.
                </Alert>
              </Stack>

              <CodeBlock
                language="typescript"
                title="Alert components"
                code={`import { Alert } from '@mui/material'

// Different severity levels
<Alert severity="success">
  <strong>Success!</strong> Your changes have been saved.
</Alert>

<Alert severity="info">
  <strong>Info:</strong> This is informational.
</Alert>

<Alert severity="warning">
  <strong>Warning:</strong> Please check your input.
</Alert>

<Alert severity="error">
  <strong>Error!</strong> Something went wrong.
</Alert>

// Closable alert
<Alert 
  severity="info" 
  onClose={() => setShowAlert(false)}
  closeText="Close"
>
  This alert can be closed
</Alert>`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Progress Indicators
              </Typography>

              <Stack spacing={3} sx={{ mb: 3 }}>
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Linear Progress
                  </Typography>
                  <LinearProgress variant="determinate" value={65} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2">Circular Progress:</Typography>
                  <CircularProgress size={24} />
                  <CircularProgress variant="determinate" value={75} size={24} />
                </Box>
              </Stack>

              <CodeBlock
                language="typescript"
                title="Progress indicators"
                code={`import { LinearProgress, CircularProgress } from '@mui/material'

// Linear progress bar
<LinearProgress variant="determinate" value={progress} />
<LinearProgress /> // Indeterminate

// Circular progress
<CircularProgress size={24} />
<CircularProgress variant="determinate" value={75} size={24} />

// With custom colors
<CircularProgress color="secondary" />
<LinearProgress color="success" />`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>
      {/* Layout */}
      <section id="layout">
        <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 3, fontWeight: 600 }}>
          Layout Components
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Grid System
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid
                    size={{
                      xs: 12,
                      md: 6
                    }}
                  >
                    <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white', textAlign: 'center' }}>
                      xs=12 md=6
                    </Paper>
                  </Grid>
                  <Grid
                    size={{
                      xs: 12,
                      md: 6
                    }}
                  >
                    <Paper sx={{ p: 2, bgcolor: 'secondary.light', color: 'white', textAlign: 'center' }}>
                      xs=12 md=6
                    </Paper>
                  </Grid>
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4
                    }}
                  >
                    <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'white', textAlign: 'center' }}>
                      xs=12 sm=6 md=4
                    </Paper>
                  </Grid>
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4
                    }}
                  >
                    <Paper sx={{ p: 2, bgcolor: 'warning.light', color: 'white', textAlign: 'center' }}>
                      xs=12 sm=6 md=4
                    </Paper>
                  </Grid>
                  <Grid
                    size={{
                      xs: 12,
                      sm: 12,
                      md: 4
                    }}
                  >
                    <Paper sx={{ p: 2, bgcolor: 'error.light', color: 'white', textAlign: 'center' }}>
                      xs=12 sm=12 md=4
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              <CodeBlock
                language="typescript"
                title="Grid system example"
                code={`import { Grid, Paper } from '@mui/material'

<Grid container spacing={2}>
  <Grid xs={12} md={6}>
    <Paper sx={{ p: 2 }}>
      Left column
    </Paper>
  </Grid>
  <Grid xs={12} md={6}>
    <Paper sx={{ p: 2 }}>
      Right column
    </Paper>
  </Grid>
  
  <Grid xs={12} sm={6} md={4}>
    <Paper sx={{ p: 2 }}>
      Responsive column
    </Paper>
  </Grid>
  <Grid xs={12} sm={6} md={4}>
    <Paper sx={{ p: 2 }}>
      Responsive column
    </Paper>
  </Grid>
  <Grid xs={12} sm={12} md={4}>
    <Paper sx={{ p: 2 }}>
      Responsive column
    </Paper>
  </Grid>
</Grid>`}
              />
            </CardContent>
          </Card>

          <Alert severity="success" sx={{ mt: 4 }}>
            <strong>Component Library Complete!</strong> Semua components sudah ready untuk digunakan dalam development.
            Check Usage Patterns untuk best practices dan common patterns.
          </Alert>
        </Stack>

        {/* CRING Table Component */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              TableCring Component (Production)
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              Advanced table component yang digunakan di production dengan fitur filtering, pagination, dan drag-scroll.
            </Typography>

            <CodeBlock
              language="js"
              title="components/Table/TableCring.js"
              code={`import { Box, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import ScrollContainer from 'react-indiana-drag-scroll';
import ComTableHeadFilters from './HeadFilters';
import TableLoading from './TableLoading';
import CompPagination from '../Pagination/Pagination';

const TableCring = ({
  id = 'component:table-cring',
  tableColumns,
  query,
  loading,
  data,
  filter,
  children,
  config = {
    isHidePagination: false
  },
  onFilterGo
}) => {
  return (
    <Box id={id}>
      <Box id={\`\${id}-table-cring-container\`} position="relative">
        {/* Drag-scrollable container */}
        <ScrollContainer
          className="scroll-container"
          hideScrollbars={false}
          ignoreElements=".--no-scroll, .tab-filter"
          style={{ overflow: 'auto' }}
        >
          <TableContainer sx={{ borderRadius: '0' }}>
            <Table>
              <TableHead>
                {/* Advanced filters in table header */}
                <ComTableHeadFilters
                  columns={tableColumns}
                  idFor={\`\${id}-table-cring-container\`}
                  values={query}
                  onFilterGo={values => onFilterGo({ ...values, page: 1 })}
                />
              </TableHead>
              
              <TableBody>
                {loading ? (
                  <TableLoading columns={tableColumns.length} />
                ) : (
                  children
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </ScrollContainer>
        
        {/* Pagination component */}
        {!config.isHidePagination && (
          <CompPagination
            data={data}
            query={query}
            onPageChange={onFilterGo}
          />
        )}
      </Box>
    </Box>
  );
};

// Usage example:
const MerchantTable = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10, search: '' });
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);

  const tableColumns = [
    { key: 'merchant_name', label: 'Merchant Name', filterable: true },
    { key: 'status', label: 'Status', filterable: true, type: 'select' },
    { key: 'created_date', label: 'Created Date', filterable: true, type: 'date' },
    { key: 'actions', label: 'Actions', filterable: false }
  ];

  const handleFilterChange = (newQuery) => {
    setQuery(newQuery);
    fetchMerchants(newQuery);
  };

  return (
    <TableCring
      id="merchants-table"
      tableColumns={tableColumns}
      query={query}
      loading={loading}
      data={merchants}
      onFilterGo={handleFilterChange}
    >
      {merchants.map((merchant) => (
        <TableRow key={merchant.id}>
          <TableCell>{merchant.merchant_name}</TableCell>
          <TableCell>
            <Chip 
              label={merchant.status} 
              color={merchant.status === 'active' ? 'success' : 'default'} 
            />
          </TableCell>
          <TableCell>{formatDate(merchant.created_date)}</TableCell>
          <TableCell>
            <IconButton onClick={() => handleEdit(merchant.id)}>
              <EditIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableCring>
  );
};`}
            />

            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>Key Features:</strong> Drag-scroll horizontal table, integrated filters in headers, loading
              states, dan pagination yang terintegrasi.
            </Alert>
          </CardContent>
        </Card>
      </section>
    </DocumentationPageLayout>
  );
};

export default ComponentCatalogPage;
