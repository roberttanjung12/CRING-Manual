'use client';

import React from 'react';
import {
  Typography,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

/**
 * Comprehensive Utility Functions Documentation
 *
 * Documentation for all utility functions available in the CRING application
 * including data manipulation, formatting, validation, and helper functions
 * with their usage patterns and API references.
 */

const UtilityFunctionsDocumentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Utility Functions Documentation
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Complete reference for all utility functions in the CRING application, including data formatting, validation,
        storage management, and helper utilities.
      </Alert>

      {/* String and Text Utilities */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Text & String Utilities
          </Typography>

          <Typography variant="h6" gutterBottom>
            capitalize
          </Typography>
          <Alert severity="success" sx={{ mb: 2 }}>
            <strong>Text capitalization utility</strong> for proper case formatting of strings.
          </Alert>

          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 3 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`import capitalize from '@/utility/capitalize';

// Basic usage
capitalize('john doe');           // 'John Doe'
capitalize('JANE SMITH');         // 'Jane Smith'
capitalize('merchant name');      // 'Merchant Name'

// Use in components
const UserProfile = ({ user }) => (
  <div>
    <h1>{capitalize(user.fullName)}</h1>
    <p>Role: {capitalize(user.role)}</p>
  </div>
);

// Array processing
const userRoles = ['admin', 'user', 'moderator'];
const formattedRoles = userRoles.map(capitalize);
// Result: ['Admin', 'User', 'Moderator']`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Number and Currency Utilities */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Number & Currency Utilities
          </Typography>

          <Typography variant="h6" gutterBottom>
            locale-to-number
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Locale string to number converter</strong> for parsing formatted currency and number strings.
          </Alert>

          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 3 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`import localeToNumber from '@/utility/locale-to-number';

// Currency string parsing
localeToNumber('Rp 150.000');        // 150000
localeToNumber('1.500.000');         // 1500000
localeToNumber('25,50');             // 25.5

// Form integration
const handleAmountChange = (value: string) => {
  const numericValue = localeToNumber(value);
  setFieldValue('amount', numericValue);
};

// Validation with Zod
const schema = z.object({
  amount: z
    .string()
    .refine(val => localeToNumber(val) > 0, 'Amount must be greater than 0')
});

// Table filtering
const filteredData = data.filter(item =>
  localeToNumber(item.amount) >= minAmount &&
  localeToNumber(item.amount) <= maxAmount
);`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Date and Time Utilities */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Date & Time Utilities
          </Typography>

          <Typography variant="h6" gutterBottom>
            format-date-time & default-period
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Date formatting and period utilities</strong> for consistent date handling across the application.
          </Alert>

          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 3 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`import formatDateTime from '@/utility/format-date-time';
import defaultPeriod from '@/utility/default-period';

// Date formatting
formatDateTime(new Date(), 'DD/MM/YYYY');           // '15/01/2024'
formatDateTime(new Date(), 'DD MMM YYYY HH:mm');    // '15 Jan 2024 14:30'
formatDateTime('2024-01-15', 'YYYY-MM-DD');         // '2024-01-15'

// Default period management
const { start, end } = defaultPeriod;
console.log(start);  // Start of current month
console.log(end);    // End of current month

// Filter initialization
const [dateRange, setDateRange] = useState({
  startDate: defaultPeriod.start,
  endDate: defaultPeriod.end
});

// Table column with date formatting
{
  name: 'createdAt',
  label: 'Created Date',
  cell: (row) => formatDateTime(row.createdAt, 'DD MMM YYYY HH:mm')
}

// Date range picker integration
<DateRangePicker
  start={dateRange.startDate}
  end={dateRange.endDate}
  onSet={(start, end) => {
    setDateRange({ startDate: start, endDate: end });
  }}
  onDelete={() => {
    // Reset to default period
    setDateRange({
      startDate: defaultPeriod.start,
      endDate: defaultPeriod.end
    });
  }}
/>`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Storage Utilities */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Storage & State Management
          </Typography>

          <Typography variant="h6" gutterBottom>
            local-storage
          </Typography>
          <Alert severity="success" sx={{ mb: 2 }}>
            <strong>Local storage utility</strong> with type safety and error handling for browser storage operations.
          </Alert>

          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 3 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`import { 
  setLocalStorage, 
  getLocalStorage, 
  removeLocalStorage 
} from '@/utility/local-storage';

// Setting data
setLocalStorage('user-preferences', {
  theme: 'dark',
  language: 'id',
  itemsPerPage: 20
});

// Getting data with type safety
interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  itemsPerPage: number;
}

const preferences = getLocalStorage<UserPreferences>('user-preferences');
if (preferences) {
  setTheme(preferences.theme);
}

// Setting with expiration
setLocalStorage('session-data', sessionInfo, 3600000); // 1 hour

// Removing data
removeLocalStorage('temp-data');

// Hook integration
const useUserPreferences = () => {
  const [preferences, setPreferences] = useState(() =>
    getLocalStorage<UserPreferences>('user-preferences') || defaultPreferences
  );

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);
    setLocalStorage('user-preferences', newPreferences);
  };

  return { preferences, updatePreferences };
};`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* File and Upload Utilities */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            File & Upload Utilities
          </Typography>

          <Typography variant="h6" gutterBottom>
            fileUpload & templateDownload
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>File handling utilities</strong> for upload processing and template downloads.
          </Alert>

          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 3 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`import { validateFile, processUpload } from '@/utility/fileUpload';
import { downloadTemplate } from '@/utility/templateDownload';

// File validation
const handleFileSelect = (file: File) => {
  const validation = validateFile(file, {
    maxSize: 5 * 1024 * 1024,  // 5MB
    allowedTypes: ['.pdf', '.jpg', '.png', '.docx'],
    required: true
  });

  if (!validation.isValid) {
    toast.error(validation.error);
    return;
  }

  processUpload(file);
};

// Bulk upload processing
const handleBulkUpload = async (file: File) => {
  try {
    setUploading(true);
    const result = await processUpload(file, {
      endpoint: '/api/bulk-upload',
      onProgress: (progress) => setProgress(progress),
      chunkSize: 1024 * 1024  // 1MB chunks
    });

    if (result.success) {
      toast.success(\`\${result.processed} items uploaded successfully\`);
      if (result.errors?.length > 0) {
        toast.warning(\`\${result.errors.length} items failed\`);
        downloadErrorReport(result.errors);
      }
    }
  } catch (error) {
    toast.error('Upload failed');
  } finally {
    setUploading(false);
  }
};

// Template downloads
const downloadTemplates = {
  merchantBulk: () => downloadTemplate('bulk_add_merchant_QR_Statis.xlsx'),
  vaCreditBNI: () => downloadTemplate('template-upload-va-credit-bni.xlsx'),
  vaCreditBTN: () => downloadTemplate('template-upload-va-credit-btn.xlsx'),
  vaCreditDKI: () => downloadTemplate('template-upload-va-credit-dki.xlsx')
};

// Component integration
<ButtonDownload
  label="Download Templates"
  items={[
    {
      label: 'Merchant Bulk Template',
      onDownload: downloadTemplates.merchantBulk
    },
    {
      label: 'VA Credit BNI Template',
      onDownload: downloadTemplates.vaCreditBNI
    }
  ]}
/>`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Validation Utilities */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Validation Utilities
          </Typography>

          <Typography variant="h6" gutterBottom>
            validations/digitsOnly
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Input validation utilities</strong> for form field validation and data sanitization.
          </Alert>

          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 3 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`import { digitsOnly, validatePhoneNumber, validateEmail } from '@/utility/validations';

// Digits only validation
const handlePhoneInput = (event: ChangeEvent<HTMLInputElement>) => {
  const value = digitsOnly(event.target.value);
  setFieldValue('phone', value);
};

// Form validation with Zod
const userSchema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(val => digitsOnly(val).length >= 10, 'Phone must be at least 10 digits')
    .refine(val => digitsOnly(val) === val, 'Phone must contain only digits'),
  
  email: z
    .string()
    .email('Invalid email format')
    .refine(validateEmail, 'Email domain not allowed'),
  
  merchantId: z
    .string()
    .regex(/^[0-9]+$/, 'Merchant ID must contain only numbers')
});

// Input component with validation
<TextField
  name="phone"
  label="Phone Number"
  value={values.phone}
  onChange={(e) => {
    const sanitized = digitsOnly(e.target.value);
    setFieldValue('phone', sanitized);
  }}
  error={!!errors.phone}
  helperText={errors.phone}
  inputProps={{
    maxLength: 15,
    pattern: '[0-9]*'
  }}
/>

// Bulk validation
const validateBulkData = (data: any[]) => {
  return data.map((item, index) => ({
    ...item,
    errors: {
      phone: digitsOnly(item.phone) !== item.phone ? 'Invalid phone format' : null,
      email: validateEmail(item.email) ? null : 'Invalid email',
      row: index + 1
    }
  }));
};`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* System Utilities */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            System & Configuration Utilities
          </Typography>

          <Typography variant="h6" gutterBottom>
            mui-styles & set-monitoring
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>System configuration utilities</strong> for Material-UI customization and application monitoring.
          </Alert>

          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 3 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`import { createCustomTheme, getResponsiveStyles } from '@/utility/mui-styles';
import { setMonitoring, trackEvent, logError } from '@/utility/set-monitoring';

// Custom MUI theme
const customTheme = createCustomTheme({
  primary: '#681399',
  secondary: '#F5F5F5',
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536
  }
});

// Responsive styling utility
const ResponsiveComponent = () => {
  const styles = getResponsiveStyles({
    mobile: { padding: 16, fontSize: 14 },
    tablet: { padding: 24, fontSize: 16 },
    desktop: { padding: 32, fontSize: 18 }
  });

  return <Box sx={styles}>Content</Box>;
};

// Monitoring setup
setMonitoring({
  apiKey: process.env.NEXT_PUBLIC_MONITORING_KEY,
  environment: process.env.NODE_ENV,
  userId: user?.id,
  sessionId: sessionStorage.getItem('sessionId')
});

// Event tracking
const handleUserAction = (action: string, data?: object) => {
  trackEvent('user_action', {
    action,
    timestamp: new Date().toISOString(),
    page: router.pathname,
    ...data
  });
};

// Error logging
const handleApiError = (error: Error, context: string) => {
  logError(error, {
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href
  });

  // Show user-friendly error
  toast.error('Something went wrong. Please try again.');
};`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Utility Categories */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Utility Categories Overview
          </Typography>

          <TableContainer sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Category</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Functions</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Primary Use Case</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Text Processing</TableCell>
                  <TableCell>capitalize, digitsOnly</TableCell>
                  <TableCell>String formatting and validation</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Number Formatting</TableCell>
                  <TableCell>locale-to-number</TableCell>
                  <TableCell>Currency and number parsing</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>format-date-time, default-period</TableCell>
                  <TableCell>Date formatting and period management</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Storage</TableCell>
                  <TableCell>local-storage</TableCell>
                  <TableCell>Browser storage with type safety</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>File Management</TableCell>
                  <TableCell>fileUpload, templateDownload</TableCell>
                  <TableCell>File processing and template handling</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>System</TableCell>
                  <TableCell>mui-styles, set-monitoring</TableCell>
                  <TableCell>Theme customization and monitoring</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>📋 Utility Functions Best Practices</AlertTitle>
        <Box component="ul" sx={{ pl: 3, mb: 0 }}>
          <li>Always handle edge cases and null/undefined values in utility functions</li>
          <li>Use TypeScript generics for better type safety in generic utilities</li>
          <li>Implement proper error handling and logging for critical utilities</li>
          <li>Keep utilities pure and side-effect free when possible</li>
          <li>Document complex utility functions with JSDoc comments</li>
          <li>Write unit tests for all utility functions</li>
          <li>Use consistent naming conventions across all utilities</li>
          <li>Consider performance implications for frequently used utilities</li>
        </Box>
      </Alert>

      <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center', mt: 4 }}>
        For more specific examples and advanced usage patterns, refer to the individual utility source files in
        <code> src/utility/</code>
      </Typography>
    </Box>
  );
};

export default UtilityFunctionsDocumentation;
