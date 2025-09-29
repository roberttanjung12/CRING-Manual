'use client';

import { Typography, Alert, Card, CardContent, Chip, Stack, Divider } from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock, ExampleSection } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const ComponentsDocumentationPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview & Kegunaan' },
    { id: 'quick-start', title: 'Quick Start' },
    { id: 'form-components', title: 'Form Components' },
    { id: 'data-display', title: 'Data Display Components' },
    { id: 'navigation', title: 'Navigation Components' },
    { id: 'feedback', title: 'Feedback Components' },
    { id: 'api-reference', title: 'API Reference' },
    { id: 'best-practices', title: 'Best Practices' }
  ];

  return (
    <DocumentationPageLayout
      title="Components Library"
      description="Reusable UI components yang siap pakai untuk mempercepat development"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Project Architecture',
          href: '/fundamentals/project-architecture'
        },
        next: {
          title: 'Data & Services',
          href: '/data-services/api-architecture'
        }
      }}
    >
      {/* Overview & Kegunaan */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Overview & Kegunaan
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>Component Library</strong> berisi reusable UI components yang sudah terintegrasi dengan Material-UI,
          validated, dan siap pakai untuk mempercepat development.
        </Alert>

        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
          Semua components dirancang untuk:
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="speed" style={{ fontSize: '1.5rem', color: '#4caf50' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    ⚡ Mempercepat Development
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Copy-paste ready components dengan styling dan logic yang sudah jadi
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="palette" style={{ fontSize: '1.5rem', color: '#2196f3' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    🎨 Konsisten Design
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mengikuti design system CRING! dan Material-UI guidelines
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="security" style={{ fontSize: '1.5rem', color: '#ff9800' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    🔒 Type-Safe & Validated
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Full TypeScript support dengan props validation dan error handling
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4 }}>
          <Chip label="Material-UI v7" color="primary" size="small" />
          <Chip label="TypeScript" color="secondary" size="small" />
          <Chip label="React Hook Form" color="info" size="small" />
          <Chip label="Responsive" color="success" size="small" />
          <Chip label="Accessible" color="warning" size="small" />
        </Stack>
      </section>

      {/* Quick Start */}
      <section id="quick-start">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Quick Start
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Cara tercepat menggunakan components yang tersedia:
        </Typography>

        <CodeBlock
          language="typescript"
          title="1. Import component yang dibutuhkan"
          code={`// Form components
import ButtonSubmit from '@/components/Form/ButtonSubmit';
import DateRangePicker from '@/components/Form/DateRangePicker';
import SelectInput from '@/components/Form/SelectInput';

// Data display components  
import DataTable from '@/components/(data-display)/TableCRING';
import SurfaceContent from '@/components/(surface)/SurfaceContent';

// Navigation components
import Breadcrumb from '@/components/Navigation/Breadcrumb';`}
        />

        <CodeBlock
          language="typescript"
          title="2. Gunakan langsung dalam component"
          code={`const MyPage = () => {
  const [loading, setLoading] = useState(false);
  
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Dashboard', href: '/' },
          { label: 'Users', href: '/users' },
          { label: 'Profile' }
        ]} 
      />
      
      <ButtonSubmit
        label="Simpan Data"
        isSend={loading}
        onClick={handleSave}
        color="primary"
        fullWidth
      />
    </div>
  );
};`}
        />

        <Alert severity="info" sx={{ mt: 3 }}>
          <strong>💡 Tip:</strong> Semua components sudah include error handling, loading states, dan responsive design.
          Tinggal focus pada business logic!
        </Alert>
      </section>

      {/* Form Components */}
      <section id="form-components">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Form Components
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Components untuk form input, validation, dan submission:
        </Typography>

        {/* ButtonSubmit */}
        <ExampleSection
          id="button-submit"
          title="ButtonSubmit - Submit Button dengan Loading"
          description="Button untuk form submission dengan loading indicator dan error states"
        >
          <CodeBlock
            language="typescript"
            title="Kegunaan Utama"
            code={`// ✅ Kapan menggunakan ButtonSubmit:
// - Form submission dengan loading state
// - Action buttons yang perlu loading indicator  
// - Button dengan error state handling
// - Consistent styling untuk semua submit buttons

// ❌ Jangan gunakan untuk:
// - Navigation links (gunakan Link/Button biasa)
// - Simple actions tanpa loading state`}
          />

          <CodeBlock
            language="typescript"
            title="Cara Menggunakan - Basic"
            code={`const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  setError(false);
  
  try {
    await submitData();
  } catch (err) {
    setError(true);
  } finally {
    setLoading(false);
  }
};

return (
  <ButtonSubmit
    label="Simpan Data"
    isSend={loading}        // Loading state
    isFail={error}          // Error state
    onClick={handleSubmit}
    color="primary"
    fullWidth
  />
);`}
          />

          <CodeBlock
            language="typescript"
            title="Props & API Reference"
            code={`interface ButtonSubmitProps {
  // Required
  label?: string;                    // Button text
  
  // States
  isSend?: boolean;                  // Show loading spinner
  isFail?: boolean;                  // Show error state
  disabled?: boolean;                // Disable button
  
  // Styling
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  
  // Icons
  isHideIcon?: boolean;              // Hide default icons
  icon?: ReactElement;               // Custom icon
  startIcon?: ReactElement;          // Left icon
  endIcon?: ReactElement;            // Right icon
  
  // Events
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  
  // HTML attributes
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  style?: CSSProperties;
  sx?: SxProps;
}`}
          />

          <CodeBlock
            language="typescript"
            title="Contoh Lengkap dengan Form"
            code={`import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Nama harus diisi'),
  email: yup.string().email().required('Email harus diisi')
});

const UserForm = () => {
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: false
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setSubmitState({ loading: true, error: false });
    
    try {
      await userService.create(data);
      // Handle success
    } catch (error) {
      setSubmitState({ loading: false, error: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('name')}
        label="Nama"
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        sx={{ mb: 2 }}
      />
      
      <TextField
        {...register('email')}
        label="Email"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        sx={{ mb: 3 }}
      />

      <ButtonSubmit
        label={submitState.error ? "Coba Lagi" : "Simpan User"}
        isSend={submitState.loading}
        isFail={submitState.error}
        type="submit"
        color="primary"
        fullWidth
        startIcon={<SaveIcon />}
      />
    </form>
  );
};`}
          />
        </ExampleSection>

        <Divider sx={{ my: 4 }} />

        {/* DateRangePicker */}
        <ExampleSection
          id="date-range-picker"
          title="DateRangePicker - Pilihan Rentang Tanggal"
          description="Component untuk memilih rentang tanggal dengan UI yang user-friendly"
        >
          <CodeBlock
            language="typescript"
            title="Kegunaan Utama"
            code={`// ✅ Kapan menggunakan DateRangePicker:
// - Filter data berdasarkan periode/tanggal
// - Report generation dengan date range
// - Transaction filtering
// - Analytics dashboard date selection

// ❌ Jangan gunakan untuk:
// - Single date selection (gunakan DatePicker biasa)
// - Date input dalam form (gunakan DateField)`}
          />

          <CodeBlock
            language="typescript"
            title="Cara Menggunakan - Filter Data"
            code={`const TransactionFilter = () => {
  const [dateFilter, setDateFilter] = useState({
    start: null,
    end: null
  });
  const [transactions, setTransactions] = useState([]);

  const handleDateChange = async (start: Date, end: Date) => {
    setDateFilter({ start, end });
    
    // Apply filter to data
    const filtered = await transactionService.getByDateRange({
      startDate: start,
      endDate: end
    });
    
    setTransactions(filtered);
  };

  const handleClearFilter = () => {
    setDateFilter({ start: null, end: null });
    // Reset to show all data
    loadAllTransactions();
  };

  return (
    <Box sx={{ mb: 3 }}>
      <DateRangePicker
        start={dateFilter.start}
        end={dateFilter.end}
        onSet={handleDateChange}
        onDelete={handleClearFilter}
        minDate={new Date('2020-01-01')}  // Minimum selectable date
        maxDate={new Date()}              // Maximum = today
        isHideTimes={false}              // Show reset button
      />
      
      {/* Display filtered results */}
      <DataTable 
        data={transactions}
        columns={columns}
      />
    </Box>
  );
};`}
          />

          <CodeBlock
            language="typescript"
            title="Props & API Reference"
            code={`interface DateRangePickerProps {
  // Required callbacks
  onSet: (start: Date, end: Date) => void;    // Called when date range is set
  onDelete: () => void;                       // Called when range is cleared
  
  // Date values
  start?: Date;                              // Start date value
  end?: Date;                                // End date value
  
  // Constraints
  minDate?: Date;                            // Minimum selectable date
  maxDate?: Date;                            // Maximum selectable date
  
  // Behavior
  isHideTimes?: boolean;                     // Hide reset button (default: false)
}`}
          />

          <CodeBlock
            language="typescript"
            title="Contoh dengan State Management (Redux)"
            code={`// Store slice
const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    dateRange: {
      start: null,
      end: null
    },
    data: []
  },
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    clearDateRange: (state) => {
      state.dateRange = { start: null, end: null };
    }
  }
});

// Component
const ReportPage = () => {
  const dispatch = useDispatch();
  const { dateRange } = useSelector(state => state.filter);
  
  const handleDateChange = (start: Date, end: Date) => {
    dispatch(setDateRange({ start, end }));
    
    // Trigger data fetch with new range
    dispatch(fetchReportData({ start, end }));
  };

  const handleClearDate = () => {
    dispatch(clearDateRange());
    dispatch(fetchReportData({})); // Fetch all data
  };

  return (
    <Card>
      <CardHeader title="Report Filter" />
      <CardContent>
        <DateRangePicker
          start={dateRange.start}
          end={dateRange.end}
          onSet={handleDateChange}
          onDelete={handleClearDate}
          maxDate={new Date()}
        />
      </CardContent>
    </Card>
  );
};`}
          />
        </ExampleSection>
      </section>

      {/* Data Display Components */}
      <section id="data-display">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Data Display Components
        </Typography>

        {/* SurfaceContent */}
        <ExampleSection
          id="surface-content"
          title="SurfaceContent - Label-Value Display"
          description="Component untuk menampilkan pasangan label-value dengan konsisten"
        >
          <CodeBlock
            language="typescript"
            title="Kegunaan Utama"
            code={`// ✅ Kapan menggunakan SurfaceContent:
// - Detail view/profile pages
// - Summary information display  
// - Key-value pair presentation
// - Invoice/receipt details

// ❌ Jangan gunakan untuk:
// - Editable forms (gunakan TextField)
// - Complex nested data (gunakan custom layout)`}
          />

          <CodeBlock
            language="typescript"
            title="Cara Menggunakan - User Profile"
            code={`const UserProfile = ({ user }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        User Information
      </Typography>
      
      <SurfaceContent
        label="Full Name"
        content={user.fullName}
        isLast={false}
      />
      
      <SurfaceContent
        label="Email Address"
        content={user.email}
        isLast={false}
      />
      
      <SurfaceContent
        label="Role"
        content={
          <Chip 
            label={user.role} 
            color={user.role === 'admin' ? 'error' : 'primary'}
            size="small" 
          />
        }
        isLast={false}
      />
      
      <SurfaceContent
        label="Last Login"
        content={formatDate(user.lastLogin)}
        isLast={false}
      />
      
      <SurfaceContent
        label="Status"
        content={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Icon 
              icon={user.isActive ? "check-circle" : "x-circle"}
              color={user.isActive ? "success" : "error"}
            />
            <span>{user.isActive ? "Active" : "Inactive"}</span>
          </Stack>
        }
        isLast={true}  // Important: set true for last item
      />
    </Paper>
  );
};`}
          />

          <CodeBlock
            language="typescript"
            title="Props & API Reference"
            code={`interface SurfaceContentProps {
  label: string;                    // Left side label text
  content: string | ReactNode;      // Right side content (can be JSX)
  isLast: boolean;                 // Remove bottom border for last item
}`}
          />

          <CodeBlock
            language="typescript"
            title="Contoh dengan Dynamic Data"
            code={`const OrderDetails = ({ order }) => {
  const orderFields = [
    { 
      label: "Order ID", 
      content: order.id 
    },
    { 
      label: "Customer", 
      content: order.customer.name 
    },
    { 
      label: "Amount", 
      content: formatCurrency(order.amount) 
    },
    { 
      label: "Status", 
      content: (
        <Chip 
          label={order.status} 
          color={getStatusColor(order.status)}
          size="small"
        />
      )
    },
    { 
      label: "Payment Method", 
      content: (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Icon icon={getPaymentIcon(order.paymentMethod)} />
          <span>{order.paymentMethod}</span>
        </Stack>
      )
    }
  ];

  return (
    <Card>
      <CardHeader title="Order Details" />
      <CardContent>
        {orderFields.map((field, index) => (
          <SurfaceContent
            key={index}
            label={field.label}
            content={field.content}
            isLast={index === orderFields.length - 1}
          />
        ))}
      </CardContent>
    </Card>
  );
};`}
          />
        </ExampleSection>
      </section>

      {/* Best Practices */}
      <section id="best-practices">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Best Practices
        </Typography>

        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#4caf50' }}>
                ✅ Do's
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Gunakan TypeScript untuk type safety</Typography>
                <Typography variant="body2">• Implement proper error handling di setiap component</Typography>
                <Typography variant="body2">• Test component dengan different props combinations</Typography>
                <Typography variant="body2">• Follow Material-UI theming guidelines</Typography>
                <Typography variant="body2">• Add loading states untuk async operations</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#f44336' }}>
                ❌ Don'ts
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Jangan modify component props di runtime</Typography>
                <Typography variant="body2">• Jangan hardcode styles, gunakan theme system</Typography>
                <Typography variant="body2">• Jangan ignore error states dalam component</Typography>
                <Typography variant="body2">• Jangan gunakan component untuk use case yang tidak sesuai</Typography>
                <Typography variant="body2">• Jangan skip accessibility attributes</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                💡 Tips
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Lihat existing usage patterns sebelum membuat component baru</Typography>
                <Typography variant="body2">• Gunakan Storybook untuk test component in isolation</Typography>
                <Typography variant="body2">• Dokumentasikan props interface dengan JSDoc comments</Typography>
                <Typography variant="body2">• Implement responsive design dari awal</Typography>
                <Typography variant="body2">• Keep components focused pada single responsibility</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="info" sx={{ mt: 4 }}>
          <strong>Need Help?</strong> Jika ada component yang belum tersedia atau perlu customization, check dengan team
          lead atau buat request di project issue tracker.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default ComponentsDocumentationPage;
