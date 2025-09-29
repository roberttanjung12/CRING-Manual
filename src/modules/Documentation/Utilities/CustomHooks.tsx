'use client';

import React from 'react';
import { Typography, Alert, AlertTitle, Card, CardContent, Box, Chip, Stack, Divider } from '@mui/material';
import CodeBlock from '@/documentation/components/CodeBlock';

/**
 * Comprehensive Custom Hooks Documentation
 *
 * Documentation for all custom hooks available in the CRING application
 * including data fetching, form management, state management, and utility hooks
 * with their usage patterns and API references.
 */

const CustomHooksDocumentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        🪝 Custom Hooks Documentation
      </Typography>

      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
        <Chip label="React Hooks" color="primary" size="small" />
        <Chip label="Reusable Logic" color="secondary" variant="outlined" size="small" />
        <Chip label="State Management" color="info" variant="outlined" size="small" />
      </Stack>

      <Alert severity="info" sx={{ mb: 4 }}>
        <AlertTitle>📋 Essential Hooks for CRING! Development</AlertTitle>
        <Typography variant="body2" paragraph>
          Custom hooks di CRING menyediakan <strong>reusable logic</strong> untuk kedua pattern utama:
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <li>
            <strong>📊 Table Pattern (P2PMerchant/Withdrawal):</strong> useFilter, data fetching, pagination
          </li>
          <li>
            <strong>📝 Form Pattern (ManageQRISV2/Dynamic):</strong> Context hooks, modal state, validation
          </li>
          <li>
            <strong>⚡ Performance hooks:</strong> Debouncing, memoization, caching
          </li>
          <li>
            <strong>🎯 UI interaction hooks:</strong> Click outside, keyboard shortcuts, responsive
          </li>
          <li>
            <strong>🔐 Business logic hooks:</strong> Permissions, authentication, API integration
          </li>
        </Box>
      </Alert>

      <Alert severity="success" sx={{ mb: 4 }}>
        <strong>🔗 Related:</strong> Lihat <strong>/workflow/creating-features</strong> untuk implementasi lengkap kedua
        pattern ini dengan custom hooks yang sesuai.
      </Alert>

      {/* Hook Categories */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        📋 Hook Categories
      </Typography>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
        <Chip label="State Management" color="primary" />
        <Chip label="API & Data" color="success" />
        <Chip label="Performance" color="warning" />
        <Chip label="UI & UX" color="info" />
        <Chip label="Business Logic" color="error" />
      </Stack>

      {/* Essential Pattern Hooks */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        🎯 Essential Pattern Hooks
      </Typography>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <strong>⚡ Must-Know Hooks:</strong> Hooks utama yang digunakan pada 2 pattern implementation terpenting.
      </Alert>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            📊 Table Pattern Hooks (P2PMerchant/Withdrawal)
          </Typography>

          <CodeBlock
            title="useFilter - Table Filtering & Pagination"
            language="typescript"
            code={`import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import qs from 'qs';
import useFilter from '@/hooks/useFilter';

/**
 * Essential hook untuk table implementation
 * Menghandle URL-based state, filtering, dan pagination
 */
const useDataTable = () => {
  const searchParams = useSearchParams();
  
  // Parse URL params
  const params = qs.parse(searchParams.toString());
  
  // Pagination and filtering logic
  const { pagination, onFilterGo } = useFilter({
    path: '/merchants',
    status: data?.status,
    headers: {
      'pagination-page': data?.headers?.['pagination-page'],
      'pagination-rows': data?.headers?.['pagination-rows']
    },
    page: params?.page
  });
  
  return { params, pagination, onFilterGo };
};

// Usage dalam TableCRING component:
const MerchantTable = () => {
  const { params, pagination, onFilterGo } = useDataTable();
  
  return (
    <TableCRING
      params={params}
      pagination={pagination}
      onFilter={onFilterGo}
      // ... other props
    />
  );
};`}
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            📝 Form Pattern Hooks (ManageQRISV2/Dynamic)
          </Typography>

          <CodeBlock
            title="Context Hooks - Form State Management"
            language="typescript"
            code={`import { createContext, useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';

// Context definition
interface FormContextType {
  method: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const FormContext = createContext<FormContextType>({} as FormContextType);

/**
 * Custom hook untuk consume form context
 * Pattern yang digunakan di ManageQRISV2/Dynamic
 */
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};

// Usage dalam form components:
const FormComponent = () => {
  const { method, onSubmit, isLoading } = useFormContext();
  const { handleSubmit } = method;
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};`}
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            🎭 Modal State Hook
          </Typography>

          <CodeBlock
            title="useModal - Modal State Management"
            language="typescript"
            code={`import { useState } from 'react';

/**
 * Modal state management hook
 * Digunakan untuk handle modal open/close states
 */
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  
  return { isOpen, onOpen, onClose };
};

// Usage dengan form submission:
const FormWithModal = () => {
  const { isOpen, onOpen, onClose } = useModal();
  
  const onSubmit = async (data) => {
    // Process form data
    await submitForm(data);
    
    // Open success modal
    onOpen();
  };
  
  return (
    <>
      <Form onSubmit={onSubmit} />
      <Modal open={isOpen} onClose={onClose}>
        Success message
      </Modal>
    </>
  );
};`}
          />
        </CardContent>
      </Card>

      {/* State Management Hooks */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        🗃️ State Management Hooks
      </Typography>

      <CodeBlock
        title="useLocalStorage - Persistent State"
        language="typescript"
        code={`// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}

// ✅ Usage Example
const UserPreferences: React.FC = () => {
  const [theme, setTheme] = useLocalStorage('user-theme', 'light');
  const [language, setLanguage] = useLocalStorage('user-language', 'id');
  
  return (
    <Box>
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme: {theme}
      </Button>
      <Button onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}>
        Language: {language}
      </Button>
    </Box>
  );
};`}
      />

      <CodeBlock
        title="useToggle - Boolean State Management"
        language="typescript"
        code={`// hooks/useToggle.ts
import { useState, useCallback } from 'react';

function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse, setValue } as const;
}

// ✅ Usage Examples
const ModalComponent: React.FC = () => {
  const modal = useToggle(false);
  const loading = useToggle(false);
  
  const handleSubmit = async () => {
    loading.setTrue();
    try {
      await submitData();
      modal.setFalse(); // Close modal on success
    } catch (error) {
      console.error(error);
    } finally {
      loading.setFalse();
    }
  };

  return (
    <>
      <Button onClick={modal.setTrue}>Open Modal</Button>
      
      <Modal open={modal.value} onClose={modal.setFalse}>
        <Box>
          <Button 
            onClick={handleSubmit} 
            disabled={loading.value}
          >
            {loading.value ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Modal>
    </>
  );
};`}
      />

      {/* Performance Hooks */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        ⚡ Performance Hooks
      </Typography>

      <CodeBlock
        title="useDebounce - Optimize Search & Input"
        language="typescript"
        code={`// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ✅ Usage in Search Component
const SearchMerchants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // This effect will only run when debouncedSearchTerm changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchMerchantsAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <TextField
      label="Search Merchants"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Type to search..."
    />
  );
};`}
      />

      <CodeBlock
        title="usePrevious - Compare State Changes"
        language="typescript"
        code={`// hooks/usePrevious.ts
import { useRef, useEffect } from 'react';

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// ✅ Usage for Detecting Changes
const TransactionStatus: React.FC<{ status: string }> = ({ status }) => {
  const prevStatus = usePrevious(status);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (prevStatus && prevStatus !== status) {
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 2000);
    }
  }, [status, prevStatus]);

  return (
    <Box>
      <Chip 
        label={status}
        color={status === 'completed' ? 'success' : 'warning'}
        className={showAnimation ? 'animate-pulse' : ''}
      />
      {prevStatus && prevStatus !== status && (
        <Typography variant="caption" color="text.secondary">
          Changed from: {prevStatus} → {status}
        </Typography>
      )}
    </Box>
  );
};`}
      />

      {/* API & Data Hooks */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        🌐 API & Data Hooks
      </Typography>

      <CodeBlock
        title="useApi - Generic API Hook"
        language="typescript"
        code={`// hooks/useApi.ts
import { useState, useEffect, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApi<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await apiFunction();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch };
}

// ✅ Usage Example
const MerchantDetails: React.FC<{ merchantId: string }> = ({ merchantId }) => {
  const { data: merchant, loading, error, refetch } = useApi(
    () => fetchMerchant(merchantId),
    [merchantId]
  );

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!merchant) return <Alert severity="info">Merchant not found</Alert>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{merchant.name}</Typography>
        <Typography color="text.secondary">{merchant.email}</Typography>
        <Button onClick={refetch} sx={{ mt: 2 }}>
          Refresh Data
        </Button>
      </CardContent>
    </Card>
  );
};`}
      />

      {/* UI & UX Hooks */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        🎨 UI & UX Hooks
      </Typography>

      <CodeBlock
        title="useClickOutside - Close Modals/Dropdowns"
        language="typescript"
        code={`// hooks/useClickOutside.ts
import { useEffect, useRef } from 'react';

function useClickOutside(handler: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
}

// ✅ Usage Example
const CustomDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        Toggle Dropdown
      </Button>
      
      {isOpen && (
        <Paper sx={{ position: 'absolute', mt: 1, p: 2 }}>
          <MenuItem onClick={() => setIsOpen(false)}>Option 1</MenuItem>
          <MenuItem onClick={() => setIsOpen(false)}>Option 2</MenuItem>
        </Paper>
      )}
    </div>
  );
};`}
      />

      <CodeBlock
        title="useMediaQuery - Responsive Design"
        language="typescript"
        code={`// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

// ✅ Usage for Responsive Components
const ResponsiveComponent: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <Box>
      {isMobile && (
        <Stack spacing={2} direction="column">
          <Button fullWidth>Mobile Layout</Button>
        </Stack>
      )}
      
      {isTablet && (
        <Stack spacing={2} direction="row">
          <Button>Tablet Layout</Button>
        </Stack>
      )}
      
      {isDesktop && (
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Button fullWidth>Desktop Layout</Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};`}
      />

      {/* Business Logic Hooks */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        🏢 Business Logic Hooks
      </Typography>

      <CodeBlock
        title="usePermission - Role-based Access Control"
        language="typescript"
        code={`// hooks/usePermission.ts
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

type Permission = 
  | 'merchant.create' 
  | 'merchant.edit' 
  | 'merchant.delete'
  | 'transaction.view'
  | 'transaction.export'
  | 'qris.manage'
  | 'user.admin';

function usePermission() {
  const { user } = useContext(AuthContext);

  const hasPermission = (permission: Permission): boolean => {
    if (!user?.permissions) return false;
    return user.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    userRole: user?.role,
    isAdmin: user?.role === 'admin'
  };
}

// ✅ Usage Example
const MerchantActions: React.FC<{ merchantId: string }> = ({ merchantId }) => {
  const { hasPermission } = usePermission();

  return (
    <Stack direction="row" spacing={1}>
      <Button variant="contained">View Details</Button>
      
      {hasPermission('merchant.edit') && (
        <Button variant="outlined">Edit Merchant</Button>
      )}
      
      {hasPermission('merchant.delete') && (
        <Button color="error" variant="outlined">Delete</Button>
      )}
      
      {hasPermission('transaction.export') && (
        <Button color="success">Export Data</Button>
      )}
    </Stack>
  );
};`}
      />

      <CodeBlock
        title="useCurrency - Format & Validation"
        language="typescript"
        code={`// hooks/useCurrency.ts
import { useMemo } from 'react';

function useCurrency(locale: string = 'id-ID') {
  const formatCurrency = useMemo(() => {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    return (amount: number): string => {
      return formatter.format(amount);
    };
  }, [locale]);

  const parseCurrency = (value: string): number => {
    // Remove currency symbols and spaces, keep only digits
    const numericValue = value.replace(/[^0-9]/g, '');
    return parseInt(numericValue) || 0;
  };

  const isValidAmount = (amount: number): boolean => {
    return amount > 0 && amount <= 999999999999; // Max 1T
  };

  return {
    formatCurrency,
    parseCurrency,
    isValidAmount
  };
}

// ✅ Usage Example
const PriceInput: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const { formatCurrency, parseCurrency, isValidAmount } = useCurrency();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseCurrency(event.target.value);
    if (isValidAmount(parsedValue)) {
      setAmount(parsedValue);
    }
  };

  return (
    <TextField
      label="Amount"
      value={formatCurrency(amount)}
      onChange={handleInputChange}
      helperText={!isValidAmount(amount) ? 'Invalid amount' : ''}
      error={!isValidAmount(amount)}
    />
  );
};`}
      />

      {/* Best Practices */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🎯 Best Practices & Tips
      </Typography>

      <Alert severity="success" sx={{ mb: 3 }}>
        <AlertTitle>✅ Hook Development Best Practices</AlertTitle>
        <Box component="ul" sx={{ m: '8px 0 0 20px' }}>
          <li>
            <strong>Single Responsibility</strong>: One hook, one purpose
          </li>
          <li>
            <strong>Proper Dependencies</strong>: Always include in useEffect dependencies
          </li>
          <li>
            <strong>Cleanup Functions</strong>: Remove event listeners, clear timers
          </li>
          <li>
            <strong>Error Handling</strong>: Handle edge cases gracefully
          </li>
          <li>
            <strong>TypeScript</strong>: Use proper typing for better DX
          </li>
          <li>
            <strong>Testability</strong>: Write unit tests for custom hooks
          </li>
        </Box>
      </Alert>

      <CodeBlock
        title="Hook Testing Pattern"
        language="typescript"
        code={`// __tests__/hooks/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );

    expect(result.current[0]).toBe('initial-value');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe('"new-value"');
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw error
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );

    act(() => {
      result.current[1]('new-value');
    });

    // Should not throw error and value should remain unchanged
    expect(result.current[0]).toBe('initial-value');
    
    mockSetItem.mockRestore();
  });
});`}
      />

      {/* Common Mistakes */}
      <Alert severity="error" sx={{ mt: 3 }}>
        <AlertTitle>❌ Common Mistakes to Avoid</AlertTitle>
        <Box component="ul" sx={{ m: '8px 0 0 20px' }}>
          <li>
            <strong>Missing dependencies</strong>: Forgetting to include values in useEffect deps
          </li>
          <li>
            <strong>Memory leaks</strong>: Not cleaning up event listeners or timers
          </li>
          <li>
            <strong>Infinite loops</strong>: Incorrect dependency arrays causing re-renders
          </li>
          <li>
            <strong>Complex hooks</strong>: Trying to do too much in one hook
          </li>
          <li>
            <strong>No error handling</strong>: Not handling edge cases or API failures
          </li>
          <li>
            <strong>Poor naming</strong>: Hook names should start with 'use' and be descriptive
          </li>
        </Box>
      </Alert>

      <Divider sx={{ my: 4 }} />

      {/* Hook Library Reference */}
      <Typography variant="h5" component="h2" gutterBottom>
        📚 Complete Hook Library Reference
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 2 }}>
        Quick reference untuk semua custom hooks yang tersedia:
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            State Management
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="useLocalStorage" size="small" />
            <Chip label="useToggle" size="small" />
            <Chip label="useCounter" size="small" />
            <Chip label="useArray" size="small" />
            <Chip label="useUndo" size="small" />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Performance & Optimization
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="useDebounce" size="small" />
            <Chip label="useThrottle" size="small" />
            <Chip label="usePrevious" size="small" />
            <Chip label="useMemoCompare" size="small" />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            API & Data Management
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="useApi" size="small" />
            <Chip label="useFetch" size="small" />
            <Chip label="useMutation" size="small" />
            <Chip label="useInfiniteQuery" size="small" />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            UI & User Experience
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="useClickOutside" size="small" />
            <Chip label="useMediaQuery" size="small" />
            <Chip label="useKeyPress" size="small" />
            <Chip label="useIntersectionObserver" size="small" />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Business Logic
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="usePermission" size="small" />
            <Chip label="useCurrency" size="small" />
            <Chip label="useAuth" size="small" />
            <Chip label="useNotification" size="small" />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomHooksDocumentation;
