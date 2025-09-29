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
 * Comprehensive Form Components Documentation
 *
 * Documentation for all form components available in the CRING application
 * including ButtonSubmit, AutoAsync, AutoMulti, DateRangePicker variants,
 * react-hook-form components, and their usage patterns.
 */

const FormComponentsDocumentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Form Components Documentation
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Complete reference for all form components in the CRING application, including their props, usage patterns, and
        integration with React Hook Form and Zod validation.
      </Alert>

      {/* ButtonSubmit Component */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            ButtonSubmit
          </Typography>

          <Alert severity="success" sx={{ mb: 2 }}>
            <strong>Primary button</strong> component with loading states, icons, and comprehensive styling options.
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
                  <TableCell>id</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>'form-button'</TableCell>
                  <TableCell>HTML element ID</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>label</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Button text content</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isSend</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Shows loading spinner when true</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isFail</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Shows fail state with info icon</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isHideIcon</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>true</TableCell>
                  <TableCell>Hide/show default icons</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isIconPlane</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Show send icon</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>color</TableCell>
                  <TableCell>MUI Color</TableCell>
                  <TableCell>'secondary'</TableCell>
                  <TableCell>Button color theme</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>variant</TableCell>
                  <TableCell>'text' | 'outlined' | 'contained'</TableCell>
                  <TableCell>'contained'</TableCell>
                  <TableCell>Button style variant</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>type</TableCell>
                  <TableCell>'button' | 'submit' | 'reset'</TableCell>
                  <TableCell>'submit'</TableCell>
                  <TableCell>HTML button type</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>fullWidth</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Full container width</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>disabled</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>false</TableCell>
                  <TableCell>Disable button interaction</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onClick</TableCell>
                  <TableCell>(event) =&gt; void</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Click event handler</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            Usage Examples
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Basic submit button
<ButtonSubmit
  label="Simpan Data"
  color="primary"
  fullWidth
/>

// Loading state button
<ButtonSubmit
  label="Mengirim..."
  isSend={isLoading}
  disabled={isLoading}
  color="success"
/>

// With custom icon
<ButtonSubmit
  label="Upload File"
  startIcon={<UploadIcon />}
  variant="outlined"
  onClick={handleUpload}
/>

// Fail state button
<ButtonSubmit
  label="Error Occurred"
  isFail={true}
  isHideIcon={false}
  color="error"
/>`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* AutoAsync Component */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            AutoAsync
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Asynchronous autocomplete</strong> component with debounced search, SWR caching, and customizable
            data shaping.
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
                  <TableCell>service</TableCell>
                  <TableCell>(args) =&gt; Promise</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>API service function for data fetching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>serviceKeyword</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Parameter name for search keyword</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onChange</TableCell>
                  <TableCell>(value) =&gt; void</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Value change handler</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>serviceValue</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>API response field for option value</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>serviceText</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>API response field for option label</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>shapeData</TableCell>
                  <TableCell>TypeShape[]</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Custom data shaping configuration</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>value</TableCell>
                  <TableCell>object</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Current selected value</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>params</TableCell>
                  <TableCell>object</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Additional API parameters</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>disabled</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Disable component interaction</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>placeholder</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Input placeholder text</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>disableOpt</TableCell>
                  <TableCell>TypeShape[]</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Options to disable/exclude</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            Key Features
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Debounced Search (500ms)" color="primary" size="small" />
            <Chip label="SWR Caching" color="secondary" size="small" />
            <Chip label="Loading States" color="info" size="small" />
            <Chip label="Custom Data Shaping" color="success" size="small" />
            <Chip label="Disable Options" color="warning" size="small" />
          </Stack>

          <Typography variant="h6" gutterBottom>
            Usage Examples
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Basic merchant autocomplete
<AutoAsync
  id="merchant-search"
  service={searchMerchants}
  serviceKeyword="name"
  serviceValue="id"
  serviceText="merchantName"
  placeholder="Cari merchant..."
  onChange={(selectedMerchant) => {
    setFieldValue('merchantId', selectedMerchant.value);
    setFieldValue('merchantName', selectedMerchant.text);
  }}
  value={values.merchant}
/>

// With custom data shaping
<AutoAsync
  service={searchProducts}
  serviceKeyword="productName"
  shapeData={[
    { key: 'id', value: 'productId' },
    { key: 'name', value: 'productName' },
    { key: 'price', value: 'productPrice' }
  ]}
  onChange={(selected) => {
    console.log(selected); // { id: '123', name: 'Product', price: 50000 }
  }}
/>

// With additional parameters
<AutoAsync
  service={searchUsers}
  serviceKeyword="userName"
  params={{
    status: 'active',
    role: 'merchant',
    limit: 20
  }}
  serviceValue="userId"
  serviceText="fullName"
  onChange={handleUserSelect}
/>`}
            </Typography>
          </Card>

          <Typography variant="h6" gutterBottom>
            TypeShape Interface
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`interface TypeShape {
  key: string;    // Property name in component value
  value: string;  // Property name from API response
}

// Example: Transform API response to component format
const shapeData: TypeShape[] = [
  { key: 'merchantId', value: 'id' },           // component.merchantId = api.id
  { key: 'merchantName', value: 'name' },       // component.merchantName = api.name  
  { key: 'merchantType', value: 'type' }        // component.merchantType = api.type
];`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* DateRangePicker Component */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            DateRangePicker
          </Typography>

          <Alert severity="success" sx={{ mb: 2 }}>
            <strong>Date range selection</strong> component with calendar dialog, default period support, and reset
            functionality.
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
                  <TableCell>onSet</TableCell>
                  <TableCell>(start: Date, end: Date) =&gt; void</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Date selection handler</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onDelete</TableCell>
                  <TableCell>() =&gt; void</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Reset date selection handler</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>start</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Currently selected start date</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>end</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Currently selected end date</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>minDate</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Minimum selectable date</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>maxDate</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Maximum selectable date</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isHideTimes</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Hide reset button functionality</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            Key Features
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Modal Dialog" color="primary" size="small" />
            <Chip label="Calendar Interface" color="secondary" size="small" />
            <Chip label="Reset Functionality" color="info" size="small" />
            <Chip label="Default Period Detection" color="success" size="small" />
            <Chip label="Date Range Validation" color="warning" size="small" />
          </Stack>

          <Typography variant="h6" gutterBottom>
            Usage Examples
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Basic date range picker
const [dateRange, setDateRange] = useState({
  start: null,
  end: null
});

<DateRangePicker
  start={dateRange.start}
  end={dateRange.end}
  onSet={(start, end) => {
    setDateRange({ start, end });
    // Trigger data refresh or filtering
    refetch();
  }}
  onDelete={() => {
    setDateRange({ start: null, end: null });
    // Reset to default period
    refetch();
  }}
/>

// With date constraints
<DateRangePicker
  start={values.startDate}
  end={values.endDate}
  minDate={new Date('2023-01-01')}
  maxDate={new Date()}
  onSet={(start, end) => {
    setFieldValue('startDate', start);
    setFieldValue('endDate', end);
  }}
  onDelete={() => {
    setFieldValue('startDate', null);
    setFieldValue('endDate', null);
  }}
/>

// Integration with React Hook Form
const { control, setValue, watch } = useForm();
const startDate = watch('startDate');
const endDate = watch('endDate');

<DateRangePicker
  start={startDate}
  end={endDate}
  onSet={(start, end) => {
    setValue('startDate', start);
    setValue('endDate', end);
  }}
  onDelete={() => {
    setValue('startDate', null);
    setValue('endDate', null);
  }}
/>`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* React Hook Form Components */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            React Hook Form Components
          </Typography>

          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>Specialized components</strong> designed specifically for React Hook Form integration with proper
            validation support.
          </Alert>

          <Typography variant="h6" gutterBottom>
            Available Components
          </Typography>

          <Stack spacing={2} sx={{ mb: 3 }}>
            <Card variant="outlined">
              <CardContent sx={{ py: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  SwitchButton
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Toggle switch component with React Hook Form integration
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent sx={{ py: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  FileUpload & FileUploadBox
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  File upload components with drag-drop support and validation
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent sx={{ py: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  DateTime
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date and time picker with React Hook Form integration
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent sx={{ py: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  RupiahInput
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Currency input with Indonesian Rupiah formatting and validation
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent sx={{ py: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  DateRangePicker (RHF Version)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date range picker specifically designed for React Hook Form
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          <Typography variant="h6" gutterBottom>
            Common Usage Pattern
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SwitchButton from '@/components/Form/react-hook-form/SwitchButton';
import RupiahInput from '@/components/Form/react-hook-form/RupiahInput';
import FileUpload from '@/components/Form/react-hook-form/FileUpload';

const MyForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(myFormSchema),
    defaultValues: {
      isActive: false,
      amount: '',
      document: null
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Switch Button */}
      <Controller
        name="isActive"
        control={control}
        render={({ field, fieldState }) => (
          <SwitchButton
            {...field}
            label="Aktifkan Fitur"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {/* Rupiah Input */}
      <Controller
        name="amount"
        control={control}
        render={({ field, fieldState }) => (
          <RupiahInput
            {...field}
            label="Jumlah"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      {/* File Upload */}
      <Controller
        name="document"
        control={control}
        render={({ field, fieldState }) => (
          <FileUpload
            {...field}
            label="Upload Dokumen"
            accept=".pdf,.jpg,.png"
            maxSize={5242880} // 5MB
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <ButtonSubmit
        label="Submit"
        type="submit"
        fullWidth
      />
    </form>
  );
};`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>📋 Form Component Best Practices</AlertTitle>
        <Box component="ul" sx={{ pl: 3, mb: 0 }}>
          <li>Always use Zod validation with React Hook Form for type safety</li>
          <li>Implement proper error handling and user feedback</li>
          <li>Use debounced search in AutoAsync components</li>
          <li>Provide loading states for better user experience</li>
          <li>Apply consistent styling and theming across forms</li>
          <li>Use Controller component for complex form integrations</li>
          <li>Implement proper accessibility attributes</li>
        </Box>
      </Alert>

      <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center', mt: 4 }}>
        For more specific examples and advanced usage patterns, refer to the individual component source files in
        <code> src/components/Form/</code>
      </Typography>
    </Box>
  );
};

export default FormComponentsDocumentation;
