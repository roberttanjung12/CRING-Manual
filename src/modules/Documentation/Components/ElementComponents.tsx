'use client';

import React from 'react';
import {
  Typography,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Stack,
  Chip,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

/**
 * Comprehensive Element Components Documentation
 *
 * Documentation for all element components available in the CRING application
 * including Skeleton, Indicator, ButtonDownload, and other UI elements
 * with their usage patterns and API references.
 */

const ElementComponentsDocumentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Element Components Documentation
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Complete reference for all element components in the CRING application, including utility components for loading
        states, downloads, indicators, and UI enhancements.
      </Alert>

      {/* SkeletonCRING Component */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            SkeletonCRING
          </Typography>

          <Alert severity="success" sx={{ mb: 2 }}>
            <strong>Loading state wrapper</strong> component for displaying skeleton UI during data loading.
          </Alert>

          <Typography variant="h6" gutterBottom>
            API Reference
          </Typography>
          <TableContainer sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Prop</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Required</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>isLoading</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Controls whether to show skeleton or content</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>skeleton</TableCell>
                  <TableCell>ReactNode</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Skeleton component to display during loading</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>children</TableCell>
                  <TableCell>ReactNode</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Actual content to display when loaded</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            Usage Examples
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Basic skeleton usage
<SkeletonCRING
  isLoading={isDataLoading}
  skeleton={
    <Box>
      <Skeleton variant="text" width="60%" height={40} />
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton variant="text" width="40%" />
    </Box>
  }
>
  <div>
    <Typography variant="h6">{data.title}</Typography>
    <img src={data.image} alt="content" />
    <Typography>{data.description}</Typography>
  </div>
</SkeletonCRING>

// Table skeleton
<SkeletonCRING
  isLoading={isTableLoading}
  skeleton={
    <TableContainer>
      <Table>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton width="80%" /></TableCell>
              <TableCell><Skeleton width="60%" /></TableCell>
              <TableCell><Skeleton width="40%" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  }
>
  <DataTable data={tableData} />
</SkeletonCRING>

// Card list skeleton
<SkeletonCRING
  isLoading={loading}
  skeleton={
    <Stack spacing={2}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardContent>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box flex={1}>
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="50%" />
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  }
>
  <UserCardList users={users} />
</SkeletonCRING>`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* ButtonDownload Component */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            ButtonDownload
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Download button component</strong> with single/multi-item support and confirmation dialogs.
          </Alert>

          <Typography variant="h6" gutterBottom>
            API Reference
          </Typography>
          <TableContainer sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Prop</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Default</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>label</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>'Download'</TableCell>
                  <TableCell>Button display text</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>items</TableCell>
                  <TableCell>DownloadItem[]</TableCell>
                  <TableCell>[]</TableCell>
                  <TableCell>Array of download options</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>variant</TableCell>
                  <TableCell>ButtonProps['variant']</TableCell>
                  <TableCell>'outlined'</TableCell>
                  <TableCell>Button style variant</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>color</TableCell>
                  <TableCell>ButtonProps['color']</TableCell>
                  <TableCell>'primary'</TableCell>
                  <TableCell>Button color theme</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>disabled</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Disable button interaction</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isHideIcon</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Hide download icon</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isOnlyIcon</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Show only icon, no text</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>size</TableCell>
                  <TableCell>ButtonProps['size']</TableCell>
                  <TableCell>'large'</TableCell>
                  <TableCell>Button size</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            DownloadItem Interface
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`interface DownloadItem {
  label: string;                    // Display name for download option
  onDownload: () => Promise<void>;  // Download handler function
  isClose?: boolean;                // Hide this option
  reminder?: {                      // Optional confirmation dialog
    textButtonCancel: string;
    textButtonSave: string;
    title: string;
    desc: string | ReactNode;
  };
}

// Example download items
const downloadItems: DownloadItem[] = [
  {
    label: 'Download PDF',
    onDownload: async () => {
      await downloadFile('/api/reports/pdf', 'report.pdf');
    }
  },
  {
    label: 'Download Excel',
    onDownload: async () => {
      await downloadFile('/api/reports/excel', 'report.xlsx');
    },
    reminder: {
      title: 'Download Excel File',
      desc: 'File ini berisi data sensitif. Pastikan untuk menyimpan dengan aman.',
      textButtonCancel: 'Batal',
      textButtonSave: 'Ya, Download'
    }
  },
  {
    label: 'Download CSV',
    onDownload: async () => {
      await exportDataToCSV(tableData);
    },
    isClose: !user.hasExportPermission  // Conditional display
  }
];`}
            </Typography>
          </Card>

          <Typography variant="h6" gutterBottom>
            Usage Examples
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Single download option
<ButtonDownload
  label="Download Report"
  items={[
    {
      label: 'Download PDF',
      onDownload: async () => {
        setIsDownloading(true);
        try {
          await downloadReport('pdf');
          toast.success('Download started');
        } catch (error) {
          toast.error('Download failed');
        } finally {
          setIsDownloading(false);
        }
      }
    }
  ]}
/>

// Multiple download options (shows dropdown)
<ButtonDownload
  label="Export Data"
  items={[
    {
      label: 'Export as PDF',
      onDownload: () => exportToPDF(data)
    },
    {
      label: 'Export as Excel',
      onDownload: () => exportToExcel(data)
    },
    {
      label: 'Export as CSV',
      onDownload: () => exportToCSV(data)
    }
  ]}
/>

// With confirmation dialog
<ButtonDownload
  label="Download Sensitive Data"
  items={[
    {
      label: 'Download Customer Data',
      onDownload: async () => {
        await downloadCustomerData();
      },
      reminder: {
        title: 'Download Confirmation',
        desc: (
          <div>
            You are about to download sensitive customer data.
            <br />
            Please ensure you have proper authorization.
          </div>
        ),
        textButtonCancel: 'Cancel',
        textButtonSave: 'Confirm Download'
      }
    }
  ]}
/>

// Icon only button
<ButtonDownload
  items={downloadOptions}
  isOnlyIcon={true}
  size="medium"
  color="secondary"
/>`}
            </Typography>
          </Card>

          <Typography variant="h6" gutterBottom>
            Key Features
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Single/Multi Mode" color="primary" size="small" />
            <Chip label="Confirmation Dialogs" color="secondary" size="small" />
            <Chip label="Async Support" color="info" size="small" />
            <Chip label="Conditional Display" color="success" size="small" />
            <Chip label="Custom Styling" color="warning" size="small" />
          </Stack>
        </CardContent>
      </Card>

      {/* Indicator Component */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Indicator
          </Typography>

          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Status indicator component</strong> for displaying various states and statuses with color coding.
          </Alert>

          <Typography variant="h6" gutterBottom>
            Usage Examples
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Status indicators in table
<TableCell>
  <Indicator
    status="active"
    label="Active"
    color="success"
  />
</TableCell>

// Payment status
<Indicator
  status={payment.status}
  label={payment.statusLabel}
  color={getStatusColor(payment.status)}
  variant="dot"
/>

// Custom indicator
<Indicator
  status="processing"
  label="Processing..."
  color="warning"
  icon={<CircularProgress size={16} />}
/>`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Wrapper and Surface Components */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Wrapper & Surface Components
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Layout and wrapper components</strong> for consistent spacing, surface styling, and field wrapping.
          </Alert>

          <Typography variant="h6" gutterBottom>
            Available Components
          </Typography>

          <Stack spacing={2} sx={{ mb: 3 }}>
            <Card variant="outlined">
              <CardContent sx={{ py: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  WrapperField
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Wrapper for form fields with consistent spacing and styling
                </Typography>
                <Card variant="outlined" sx={{ backgroundColor: '#f9f9f9', p: 2, mt: 1 }}>
                  <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    {`<WrapperField label="User Information" required>
  <TextField name="name" label="Full Name" />
  <TextField name="email" label="Email" />
</WrapperField>`}
                  </Typography>
                </Card>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent sx={{ py: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  SurfaceContent
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Content container with Material-UI surface styling and elevation
                </Typography>
                <Card variant="outlined" sx={{ backgroundColor: '#f9f9f9', p: 2, mt: 1 }}>
                  <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    {`<SurfaceContent elevation={2} padding="large">
  <Typography variant="h6">Dashboard Content</Typography>
  <DataTable data={tableData} />
</SurfaceContent>`}
                  </Typography>
                </Card>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent sx={{ py: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  ButtonBack
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Navigation back button with consistent styling and router integration
                </Typography>
                <Card variant="outlined" sx={{ backgroundColor: '#f9f9f9', p: 2, mt: 1 }}>
                  <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    {`<ButtonBack
  label="Back to Dashboard"
  href="/dashboard"
  icon={<ArrowBackIcon />}
/>`}
                  </Typography>
                </Card>
              </CardContent>
            </Card>
          </Stack>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>📋 Element Component Best Practices</AlertTitle>
        <Box component="ul" sx={{ pl: 3, mb: 0 }}>
          <li>Use SkeletonCRING for all loading states to maintain consistency</li>
          <li>Implement proper error handling in download functions</li>
          <li>Provide meaningful confirmation messages for sensitive downloads</li>
          <li>Use appropriate indicator colors that match your design system</li>
          <li>Apply consistent wrapper patterns across forms and content areas</li>
          <li>Ensure accessibility compliance with proper ARIA labels</li>
          <li>Test download functionality across different browsers and devices</li>
        </Box>
      </Alert>

      <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center', mt: 4 }}>
        For more specific examples and advanced usage patterns, refer to the individual component source files in
        <code> src/components/Elements/</code> and related directories.
      </Typography>
    </Box>
  );
};

export default ElementComponentsDocumentation;
