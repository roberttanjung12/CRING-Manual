'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const TestingPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Testing Overview' },
    { id: 'pattern-testing', title: 'Pattern-Specific Testing' },
    { id: 'unit-testing', title: 'Unit Testing' },
    { id: 'component-testing', title: 'Component Testing' },
    { id: 'integration-testing', title: 'Integration Testing' }
  ];

  return (
    <DocumentationPageLayout
      title="Testing"
      description="Testing strategies dan automated testing setup untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Creating Features',
          href: '/workflow/creating-features'
        },
        next: {
          title: 'Deployment',
          href: '/workflow/deployment'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Testing Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner menggunakan comprehensive testing strategy dengan Jest, React Testing Library, dan Playwright
          untuk memastikan quality dan reliability aplikasi. Testing dilakukan untuk kedua pattern utama:
          <br />
          <strong>• Table Pattern (P2PMerchant/Withdrawal)</strong> - Testing filtering, pagination, data display
          <br />
          <strong>• Form Pattern (ManageQRISV2/Dynamic)</strong> - Testing validation, submission, modal behavior
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>🎯 Testing Focus:</strong> Lihat <strong>/workflow/creating-features</strong> untuk implementation
          patterns yang perlu di-test dengan strategies di halaman ini.
        </Alert>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="Jest" color="primary" variant="outlined" />
          <Chip label="React Testing Library" color="secondary" variant="outlined" />
          <Chip label="Playwright" color="info" variant="outlined" />
          <Chip label="MSW" color="success" variant="outlined" />
        </Stack>
      </section>

      <section id="pattern-testing">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Pattern-Specific Testing
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>🎯 Priority Testing:</strong> Testing strategies khusus untuk 2 pattern implementation utama di CRING!
          Partner.
        </Alert>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📊 Table Pattern Testing (P2PMerchant/Withdrawal)
              </Typography>
              <CodeBlock
                language="typescript"
                title="MerchantManagement.test.tsx"
                code={`import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MerchantManagement from '../MerchantManagement';

// Mock API responses
jest.mock('../services/getMerchants', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('MerchantManagement (Table Pattern)', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it('should render TableCRING with proper columns', () => {
    renderWithProviders(<MerchantManagement />);
    
    // Test table headers
    expect(screen.getByText('Merchant ID')).toBeInTheDocument();
    expect(screen.getByText('Merchant Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should handle filtering correctly', async () => {
    renderWithProviders(<MerchantManagement />);
    
    // Test search filter
    const searchInput = screen.getByLabelText('Search by Name');
    fireEvent.change(searchInput, { target: { value: 'Test Merchant' } });
    
    await waitFor(() => {
      expect(getMerchants).toHaveBeenCalledWith({
        merchantName: 'Test Merchant',
        limit: 10,
        offset: 0
      });
    });
  });

  it('should handle pagination', async () => {
    renderWithProviders(<MerchantManagement />);
    
    // Test pagination buttons
    const nextButton = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(getMerchants).toHaveBeenCalledWith({
        limit: 10,
        offset: 10
      });
    });
  });

  it('should handle export functionality', () => {
    renderWithProviders(<MerchantManagement />);
    
    const exportButton = screen.getByText('Export');
    expect(exportButton).toBeInTheDocument();
    
    fireEvent.click(exportButton);
    // Test export logic
  });
});`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📝 Form Pattern Testing (ManageQRISV2/Dynamic)
              </Typography>
              <CodeBlock
                language="typescript"
                title="QRISForm.test.tsx"
                code={`import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import QRISForm from '../QRISForm';
import QRISFormSchema from '../schema';

// Mock API calls
jest.mock('../services/createQRIS');

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    resolver: zodResolver(QRISFormSchema),
    defaultValues: {
      provider: { value: '', text: '' },
      amount: '',
      tip: false,
      method: '01'
    }
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('QRISForm (Form Pattern)', () => {
  it('should render all form fields', () => {
    render(
      <TestWrapper>
        <QRISForm />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nama Penyedia')).toBeInTheDocument();
    expect(screen.getByLabelText('Nominal Transaksi')).toBeInTheDocument();
    expect(screen.getByLabelText('Keterangan')).toBeInTheDocument();
    expect(screen.getByLabelText('Beri Tip')).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(
      <TestWrapper>
        <QRISForm />
      </TestWrapper>
    );

    const submitButton = screen.getByText('Buat QRIS');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Kolom ini wajib diisi!')).toBeInTheDocument();
    });
  });

  it('should handle amount validation', async () => {
    render(
      <TestWrapper>
        <QRISForm />
      </TestWrapper>
    );

    const amountInput = screen.getByLabelText('Nominal Transaksi');
    fireEvent.change(amountInput, { target: { value: '0' } });
    fireEvent.blur(amountInput);

    await waitFor(() => {
      expect(screen.getByText('Minimal Nominal Transaksi adalah Rp 1!')).toBeInTheDocument();
    });
  });

  it('should handle tip logic correctly', async () => {
    render(
      <TestWrapper>
        <QRISForm />
      </TestWrapper>
    );

    const tipCheckbox = screen.getByLabelText('Beri Tip');
    fireEvent.click(tipCheckbox);

    // Tip fields should appear
    await waitFor(() => {
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });
  });

  it('should handle form submission', async () => {
    const mockCreateQRIS = require('../services/createQRIS').default;
    mockCreateQRIS.mockResolvedValue({ success: true, qrCode: 'mock-qr-code' });

    render(
      <TestWrapper>
        <QRISForm />
      </TestWrapper>
    );

    // Fill form
    fireEvent.change(screen.getByLabelText('Nominal Transaksi'), { 
      target: { value: '10000' } 
    });

    const submitButton = screen.getByText('Buat QRIS');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCreateQRIS).toHaveBeenCalledWith({
        amount: 10000,
        tipEnabled: false
      });
    });
  });
});`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🪝 Custom Hooks Testing
              </Typography>
              <CodeBlock
                language="typescript"
                title="customHooks.test.tsx"
                code={`import { renderHook, act } from '@testing-library/react';
import { useFilter } from '../hooks/useFilter';
import { useModal } from '../hooks/useModal';

describe('Custom Hooks', () => {
  describe('useFilter (Table Pattern)', () => {
    it('should handle pagination correctly', () => {
      const { result } = renderHook(() => useFilter({
        path: '/merchants',
        status: 200,
        headers: {
          'pagination-page': '2',
          'pagination-rows': '25'
        }
      }));

      expect(result.current.pagination.page).toBe(2);
      expect(result.current.pagination.rows).toBe(25);
    });

    it('should handle filter changes', () => {
      const { result } = renderHook(() => useFilter({
        path: '/merchants',
        status: 200
      }));

      act(() => {
        result.current.onFilterGo({ merchantName: 'Test' });
      });

      // Test URL update logic
    });
  });

  describe('useModal (Form Pattern)', () => {
    it('should handle modal state', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.onOpen();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.onClose();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });
});`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="unit-testing">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Unit Testing
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Testing Utility Functions
              </Typography>
              <CodeBlock
                language="typescript"
                title="formatUtils.test.ts"
                code={`import { formatCurrency, formatDate, formatPhoneNumber } from '../formatUtils';

describe('formatUtils', () => {
  describe('formatCurrency', () => {
    it('should format Indonesian currency correctly', () => {
      expect(formatCurrency(1000000)).toBe('Rp 1.000.000');
      expect(formatCurrency(500.5)).toBe('Rp 501');
      expect(formatCurrency(0)).toBe('Rp 0');
    });

    it('should handle negative values', () => {
      expect(formatCurrency(-1000)).toBe('-Rp 1.000');
    });
  });

  describe('formatDate', () => {
    it('should format date to Indonesian locale', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      expect(formatDate(date)).toBe('15/01/2024');
    });

    it('should handle invalid dates', () => {
      expect(formatDate(null)).toBe('-');
      expect(formatDate(undefined)).toBe('-');
    });
  });

  describe('formatPhoneNumber', () => {
    it('should format phone number with country code', () => {
      expect(formatPhoneNumber('08123456789')).toBe('+62 812-3456-789');
      expect(formatPhoneNumber('628123456789')).toBe('+62 812-3456-789');
    });

    it('should handle invalid phone numbers', () => {
      expect(formatPhoneNumber('123')).toBe('123');
      expect(formatPhoneNumber('')).toBe('');
    });
  });
});`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Testing Custom Hooks
              </Typography>
              <CodeBlock
                language="typescript"
                title="useApi.test.ts"
                code={`import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from '../useApi';

// Mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('useApi', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should handle successful API call', async () => {
    const mockData = { id: 1, name: 'Test Merchant' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => 
      useApi(() => fetch('/api/merchants').then(res => res.json()))
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle API error', async () => {
    const errorMessage = 'Network error';
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => 
      useApi(() => fetch('/api/merchants').then(res => res.json()))
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(errorMessage);
  });

  it('should allow manual execution', async () => {
    const mockData = { success: true };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => 
      useApi(() => fetch('/api/merchants').then(res => res.json()), [], false)
    );

    // Should not auto-execute
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();

    // Manual execution
    result.current.execute();

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });
  });
});`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="component-testing">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Component Testing
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Testing Form Components
              </Typography>
              <CodeBlock
                language="typescript"
                title="LoginForm.test.tsx"
                code={`import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../LoginForm';

// Mock the auth service
jest.mock('../services/authService', () => ({
  login: jest.fn(),
}));

import { login } from '../services/authService';
const mockLogin = login as jest.MockedFunction<typeof login>;

describe('LoginForm', () => {
  beforeEach(() => {
    mockLogin.mockClear();
  });

  it('should render login form fields', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/email wajib diisi/i)).toBeInTheDocument();
      expect(screen.getByText(/password wajib diisi/i)).toBeInTheDocument();
    });
  });

  it('should show error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/format email tidak valid/i)).toBeInTheDocument();
    });
  });

  it('should call login API with correct credentials', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce({ token: 'fake-token' });
    
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    expect(screen.getByRole('button', { name: /login\\.\\.\\./i })).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Testing Table Components
              </Typography>
              <CodeBlock
                language="typescript"
                title="MerchantTable.test.tsx"
                code={`import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MerchantTable } from '../MerchantTable';

const mockMerchants = [
  {
    id: '1',
    name: 'Merchant A',
    email: 'a@example.com',
    phone: '08123456789',
    status: 'active' as const,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Merchant B',
    email: 'b@example.com',
    phone: '08987654321',
    status: 'pending' as const,
    createdAt: '2024-01-02T00:00:00Z'
  }
];

describe('MerchantTable', () => {
  it('should render merchant data correctly', () => {
    render(<MerchantTable merchants={mockMerchants} />);
    
    expect(screen.getByText('Merchant A')).toBeInTheDocument();
    expect(screen.getByText('a@example.com')).toBeInTheDocument();
    expect(screen.getByText('08123456789')).toBeInTheDocument();
    
    expect(screen.getByText('Merchant B')).toBeInTheDocument();
    expect(screen.getByText('b@example.com')).toBeInTheDocument();
  });

  it('should show correct status chips', () => {
    render(<MerchantTable merchants={mockMerchants} />);
    
    const activeChip = screen.getByText('active');
    const pendingChip = screen.getByText('pending');
    
    expect(activeChip).toBeInTheDocument();
    expect(pendingChip).toBeInTheDocument();
  });

  it('should call action handlers when buttons clicked', async () => {
    const user = userEvent.setup();
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();
    const mockOnView = jest.fn();
    
    render(
      <MerchantTable 
        merchants={mockMerchants}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onView={mockOnView}
      />
    );
    
    const editButtons = screen.getAllByTitle('Edit');
    const deleteButtons = screen.getAllByTitle('Hapus');
    const viewButtons = screen.getAllByTitle('Lihat Detail');
    
    await user.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockMerchants[0]);
    
    await user.click(deleteButtons[0]);
    expect(mockOnDelete).toHaveBeenCalledWith(mockMerchants[0]);
    
    await user.click(viewButtons[0]);
    expect(mockOnView).toHaveBeenCalledWith(mockMerchants[0]);
  });

  it('should not render action buttons when handlers not provided', () => {
    render(<MerchantTable merchants={mockMerchants} />);
    
    expect(screen.queryByTitle('Edit')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Hapus')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Lihat Detail')).not.toBeInTheDocument();
  });
});`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="integration-testing">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Integration Testing
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              API Integration Tests dengan MSW
            </Typography>
            <CodeBlock
              language="typescript"
              title="merchant.integration.test.tsx"
              code={`import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MerchantPage } from '../pages/MerchantPage';

// Setup MSW server
const server = setupServer(
  rest.get('/api/merchants', (req, res, ctx) => {
    return res(ctx.json({
      data: [
        {
          id: '1',
          name: 'Test Merchant',
          email: 'test@example.com',
          phone: '08123456789',
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z'
        }
      ],
      meta: {
        page: 1,
        limit: 10,
        total: 1
      }
    }));
  }),
  
  rest.post('/api/merchants', (req, res, ctx) => {
    return res(ctx.json({
      id: '2',
      name: 'New Merchant',
      email: 'new@example.com',
      phone: '08987654321',
      status: 'pending',
      createdAt: '2024-01-02T00:00:00Z'
    }));
  }),
  
  rest.delete('/api/merchants/:id', (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  })
);

// Start server before all tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MerchantPage Integration', () => {
  it('should load and display merchants from API', async () => {
    render(<MerchantPage />);
    
    // Should show loading state initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for merchants to load
    await waitFor(() => {
      expect(screen.getByText('Test Merchant')).toBeInTheDocument();
    });
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('08123456789')).toBeInTheDocument();
  });

  it('should create new merchant and refresh list', async () => {
    const user = userEvent.setup();
    render(<MerchantPage />);
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Test Merchant')).toBeInTheDocument();
    });
    
    // Open create modal
    const addButton = screen.getByRole('button', { name: /add merchant/i });
    await user.click(addButton);
    
    // Fill form
    const nameInput = screen.getByLabelText(/nama merchant/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/telepon/i);
    
    await user.type(nameInput, 'New Merchant');
    await user.type(emailInput, 'new@example.com');
    await user.type(phoneInput, '08987654321');
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /simpan/i });
    await user.click(submitButton);
    
    // Should close modal and refresh list
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    
    // New merchant should appear in list (mocked response)
    await waitFor(() => {
      expect(screen.getByText('New Merchant')).toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    // Override handler to return error
    server.use(
      rest.get('/api/merchants', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({
          error: 'Internal server error'
        }));
      })
    );
    
    render(<MerchantPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading merchants/i)).toBeInTheDocument();
    });
  });

  it('should delete merchant and update list', async () => {
    const user = userEvent.setup();
    render(<MerchantPage />);
    
    // Wait for merchants to load
    await waitFor(() => {
      expect(screen.getByText('Test Merchant')).toBeInTheDocument();
    });
    
    // Click delete button
    const deleteButton = screen.getByTitle('Hapus');
    await user.click(deleteButton);
    
    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await user.click(confirmButton);
    
    // Merchant should be removed from list
    await waitFor(() => {
      expect(screen.queryByText('Test Merchant')).not.toBeInTheDocument();
    });
  });
});`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>Testing Strategy Complete!</strong> Comprehensive testing setup dengan unit tests, component
              tests, dan integration tests untuk memastikan code quality.
            </Alert>
          </CardContent>
        </Card>
      </section>
    </DocumentationPageLayout>
  );
};

export default TestingPage;
