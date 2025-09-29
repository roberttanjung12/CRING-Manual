'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const CustomHooksPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Custom Hooks Overview' },
    { id: 'api-hooks', title: 'API & Data Hooks' },
    { id: 'ui-hooks', title: 'UI State Hooks' },
    { id: 'utility-hooks', title: 'Utility Hooks' },
    { id: 'advanced-patterns', title: 'Advanced Patterns' }
  ];

  return (
    <DocumentationPageLayout
      title="Advanced Custom Hooks"
      description="Creating dan using custom React hooks untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Performance',
          href: '/advanced/performance'
        },
        next: {
          title: 'Complex State',
          href: '/advanced/complex-state'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Custom Hooks Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Custom hooks adalah fundamental pattern dalam React untuk sharing stateful logic antar components. Di CRING!
          Portal Partner, custom hooks digunakan untuk mengelola API calls, UI state, form handling, dan business logic
          yang complex.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="Reusable Logic" color="primary" variant="outlined" />
          <Chip label="TypeScript" color="secondary" variant="outlined" />
          <Chip label="Testing Ready" color="info" variant="outlined" />
          <Chip label="Performance" color="success" variant="outlined" />
        </Stack>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Hook Rules:</strong> Custom hooks harus dimulai dengan "use" dan hanya boleh dipanggil di top level
          components atau hooks lainnya.
        </Alert>
      </section>

      <section id="api-hooks">
        <Typography variant="h5" sx={{ mb: 2 }}>
          API & Data Management Hooks
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🌐 useApi - Generic API Hook
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/hooks/useApi.ts"
                code={`import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  reset: () => void;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useApi<T>(
  apiFunction: () => Promise<T>,
  options: UseApiOptions = {}
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { immediate = true, onSuccess, onError } = options;

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      onError?.(err as Error);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    refetch: execute,
    reset
  };
}

// Usage Examples:
const MerchantList = () => {
  const {
    data: merchants,
    loading,
    error,
    refetch
  } = useApi(() => merchantService.getMerchants(), {
    onSuccess: (data) => {
      console.log('Loaded merchants:', data.length);
    },
    onError: (error) => {
      toast.error('Failed to load merchants');
    }
  });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <Button onClick={refetch}>Refresh</Button>
      {merchants?.map(merchant => (
        <MerchantCard key={merchant.id} merchant={merchant} />
      ))}
    </div>
  );
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📊 usePaginatedApi - Paginated Data Hook
              </Typography>
              <CodeBlock
                language="typescript"
                title="Paginated API with infinite scroll support"
                code={`interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, any>;
}

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UsePaginatedApiState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  totalItems: number;
  currentPage: number;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  setFilters: (filters: Partial<PaginationParams>) => void;
}

export function usePaginatedApi<T>(
  apiFunction: (params: PaginationParams) => Promise<PaginatedResponse<T>>,
  initialParams: Partial<PaginationParams> = {}
): UsePaginatedApiState<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  
  const [params, setParams] = useState<PaginationParams>({
    page: 1,
    limit: 20,
    ...initialParams
  });

  const fetchData = useCallback(async (reset = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFunction(params);
      
      if (reset) {
        setData(response.data);
      } else {
        setData(prev => [...prev, ...response.data]);
      }
      
      setTotalItems(response.meta.total);
      setHasMore(response.meta.page < response.meta.totalPages);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, params]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setParams(prev => ({ ...prev, page: prev.page + 1 }));
  }, [loading, hasMore]);

  const refresh = useCallback(async () => {
    setParams(prev => ({ ...prev, page: 1 }));
    await fetchData(true);
  }, [fetchData]);

  const setFilters = useCallback((newFilters: Partial<PaginationParams>) => {
    setParams(prev => ({ 
      ...prev, 
      ...newFilters, 
      page: 1 // Reset to first page when filters change
    }));
    setData([]); // Clear current data
  }, []);

  useEffect(() => {
    fetchData(params.page === 1);
  }, [params]);

  return {
    data,
    loading,
    error,
    hasMore,
    totalItems,
    currentPage: params.page,
    loadMore,
    refresh,
    setFilters
  };
}

// Usage with infinite scroll:
const InfiniteMerchantList = () => {
  const {
    data: merchants,
    loading,
    hasMore,
    loadMore,
    setFilters
  } = usePaginatedApi(merchantService.getMerchantsPaginated);

  const handleSearch = (searchTerm: string) => {
    setFilters({ search: searchTerm });
  };

  // Infinite scroll implementation
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      {merchants.map(merchant => (
        <MerchantCard key={merchant.id} merchant={merchant} />
      ))}
      {loading && <CircularProgress />}
      {!hasMore && <Typography>No more data</Typography>}
    </div>
  );
};`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="ui-hooks">
        <Typography variant="h5" sx={{ mb: 2 }}>
          UI State Management Hooks
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎛️ useToggle - Boolean State Hook
              </Typography>
              <CodeBlock
                language="typescript"
                title="Boolean state management with utilities"
                code={`interface UseToggleReturn {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  setValue: (value: boolean) => void;
}

export function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const set = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue: set
  };
}

// Usage:
const MerchantDialog = () => {
  const dialog = useToggle(false);
  const loading = useToggle(false);
  
  const handleSave = async () => {
    loading.setTrue();
    try {
      await saveMerchant();
      dialog.setFalse();
    } catch (error) {
      // Handle error
    } finally {
      loading.setFalse();
    }
  };

  return (
    <>
      <Button onClick={dialog.setTrue}>Open Dialog</Button>
      <Dialog open={dialog.value} onClose={dialog.setFalse}>
        <DialogContent>
          {/* Form content */}
        </DialogContent>
        <DialogActions>
          <Button onClick={dialog.setFalse}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading.value}>
            {loading.value ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📝 useFormState - Advanced Form Hook
              </Typography>
              <CodeBlock
                language="typescript"
                title="Form state management with validation"
                code={`interface FormField<T> {
  value: T;
  error: string | null;
  touched: boolean;
}

interface UseFormStateOptions<T> {
  initialValues: T;
  validationSchema?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit?: (values: T) => Promise<void> | void;
}

interface UseFormStateReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (field: keyof T, value: T[keyof T]) => void;
  setError: (field: keyof T, error: string) => void;
  setTouched: (field: keyof T, touched?: boolean) => void;
  validateField: (field: keyof T) => void;
  validateForm: () => boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

export function useFormState<T extends Record<string, any>>(
  options: UseFormStateOptions<T>
): UseFormStateReturn<T> {
  const { initialValues, validationSchema, onSubmit } = options;
  
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const setError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);

  const setTouchedField = useCallback((field: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  const validateField = useCallback((field: keyof T) => {
    if (!validationSchema) return;
    
    const fieldErrors = validationSchema(values);
    const fieldError = fieldErrors[field];
    
    if (fieldError) {
      setError(field, fieldError);
    } else {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [values, validationSchema, setError]);

  const validateForm = useCallback(() => {
    if (!validationSchema) return true;
    
    const formErrors = validationSchema(values);
    setErrors(formErrors);
    
    return Object.keys(formErrors).length === 0;
  }, [values, validationSchema]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !onSubmit) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setValue,
    setError,
    setTouched: setTouchedField,
    validateField,
    validateForm,
    handleSubmit,
    reset
  };
}

// Usage:
interface MerchantFormData {
  name: string;
  email: string;
  phone: string;
}

const MerchantForm = () => {
  const form = useFormState<MerchantFormData>({
    initialValues: {
      name: '',
      email: '',
      phone: ''
    },
    validationSchema: (values) => {
      const errors: Partial<Record<keyof MerchantFormData, string>> = {};
      
      if (!values.name.trim()) {
        errors.name = 'Name is required';
      }
      
      if (!values.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^@]+@[^@]+\\.[^@]+$/.test(values.email)) {
        errors.email = 'Invalid email format';
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      await merchantService.createMerchant(values);
      toast.success('Merchant created successfully');
      form.reset();
    }
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <TextField
        label="Name"
        value={form.values.name}
        onChange={(e) => form.setValue('name', e.target.value)}
        onBlur={() => {
          form.setTouched('name');
          form.validateField('name');
        }}
        error={!!form.errors.name && !!form.touched.name}
        helperText={form.touched.name && form.errors.name}
      />
      
      <TextField
        label="Email"
        type="email"
        value={form.values.email}
        onChange={(e) => form.setValue('email', e.target.value)}
        onBlur={() => {
          form.setTouched('email');
          form.validateField('email');
        }}
        error={!!form.errors.email && !!form.touched.email}
        helperText={form.touched.email && form.errors.email}
      />
      
      <Button
        type="submit"
        disabled={!form.isValid || form.isSubmitting}
      >
        {form.isSubmitting ? 'Creating...' : 'Create Merchant'}
      </Button>
    </form>
  );
};`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="utility-hooks">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Utility Hooks
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                ⏰ useDebounce - Debounced Values
              </Typography>
              <CodeBlock
                language="typescript"
                title="Debouncing for search and performance"
                code={`export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

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

// Enhanced version with immediate execution
export function useAdvancedDebounce<T>(
  value: T, 
  delay: number, 
  options: { leading?: boolean; trailing?: boolean } = {}
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const { leading = false, trailing = true } = options;
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (leading && isFirstRun.current) {
      setDebouncedValue(value);
      isFirstRun.current = false;
      return;
    }

    if (trailing) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, delay, leading, trailing]);

  return debouncedValue;
}

// Usage in search component:
const MerchantSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const searchMerchants = useCallback(async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await merchantService.search(term);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchMerchants(debouncedSearchTerm);
  }, [debouncedSearchTerm, searchMerchants]);

  return (
    <div>
      <TextField
        placeholder="Search merchants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: loading ? <CircularProgress size={20} /> : null
        }}
      />
      
      <List>
        {results.map(merchant => (
          <ListItem key={merchant.id}>
            <ListItemText primary={merchant.name} secondary={merchant.email} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                💾 useLocalStorage - Persistent State
              </Typography>
              <CodeBlock
                language="typescript"
                title="Local storage with TypeScript support"
                code={`export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(\`Error removing localStorage key "\${key}":\`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Usage:
interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'id';
  pageSize: number;
}

const UserSettings = () => {
  const [preferences, setPreferences, clearPreferences] = useLocalStorage<UserPreferences>('user-preferences', {
    theme: 'light',
    language: 'id',
    pageSize: 10
  });

  const updateTheme = (theme: 'light' | 'dark') => {
    setPreferences(prev => ({ ...prev, theme }));
  };

  return (
    <div>
      <FormControl>
        <InputLabel>Theme</InputLabel>
        <Select
          value={preferences.theme}
          onChange={(e) => updateTheme(e.target.value as 'light' | 'dark')}
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </Select>
      </FormControl>
      
      <Button onClick={clearPreferences}>
        Reset to Defaults
      </Button>
    </div>
  );
};`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="advanced-patterns">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Advanced Hook Patterns
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🧩 Compound Hooks - Complex State Logic
            </Typography>
            <CodeBlock
              language="typescript"
              title="Advanced patterns for complex scenarios"
              code={`// 1. useMerchantManager - Compound hook for merchant operations
interface MerchantManagerState {
  merchants: Merchant[];
  selectedMerchant: Merchant | null;
  filters: MerchantFilters;
  loading: boolean;
  error: string | null;
}

interface MerchantManagerActions {
  loadMerchants: () => Promise<void>;
  selectMerchant: (merchant: Merchant) => void;
  updateMerchant: (id: string, updates: Partial<Merchant>) => Promise<void>;
  deleteMerchant: (id: string) => Promise<void>;
  setFilters: (filters: Partial<MerchantFilters>) => void;
  bulkAction: (action: string, ids: string[]) => Promise<void>;
  reset: () => void;
}

export function useMerchantManager(): MerchantManagerState & MerchantManagerActions {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [filters, setFilters] = useState<MerchantFilters>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMerchants = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await merchantService.getMerchants(filters);
      setMerchants(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const selectMerchant = useCallback((merchant: Merchant) => {
    setSelectedMerchant(merchant);
  }, []);

  const updateMerchant = useCallback(async (id: string, updates: Partial<Merchant>) => {
    try {
      const updated = await merchantService.updateMerchant(id, updates);
      
      setMerchants(prev => 
        prev.map(merchant => 
          merchant.id === id ? { ...merchant, ...updated } : merchant
        )
      );
      
      if (selectedMerchant?.id === id) {
        setSelectedMerchant(prev => prev ? { ...prev, ...updated } : null);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
      throw err;
    }
  }, [selectedMerchant]);

  const deleteMerchant = useCallback(async (id: string) => {
    try {
      await merchantService.deleteMerchant(id);
      
      setMerchants(prev => prev.filter(merchant => merchant.id !== id));
      
      if (selectedMerchant?.id === id) {
        setSelectedMerchant(null);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
      throw err;
    }
  }, [selectedMerchant]);

  const bulkAction = useCallback(async (action: string, ids: string[]) => {
    try {
      await merchantService.bulkAction(action, ids);
      await loadMerchants(); // Refresh data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bulk action failed');
      throw err;
    }
  }, [loadMerchants]);

  const updateFilters = useCallback((newFilters: Partial<MerchantFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const reset = useCallback(() => {
    setMerchants([]);
    setSelectedMerchant(null);
    setFilters({});
    setError(null);
    setLoading(false);
  }, []);

  // Auto-load when filters change
  useEffect(() => {
    loadMerchants();
  }, [filters]);

  return {
    // State
    merchants,
    selectedMerchant,
    filters,
    loading,
    error,
    // Actions
    loadMerchants,
    selectMerchant,
    updateMerchant,
    deleteMerchant,
    setFilters: updateFilters,
    bulkAction,
    reset
  };
}

// 2. useAsyncOperation - Generic async operations
interface AsyncOperationState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

export function useAsyncOperation<T, Args extends any[]>(
  operation: (...args: Args) => Promise<T>
): AsyncOperationState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: Args): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const result = await operation(...args);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [operation]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset
  };
}

// 3. Usage examples
const MerchantManagement = () => {
  const merchantManager = useMerchantManager();
  const deleteOperation = useAsyncOperation(merchantService.deleteMerchant);
  const exportOperation = useAsyncOperation(merchantService.exportMerchants);

  const handleDelete = async (id: string) => {
    try {
      await deleteOperation.execute(id);
      await merchantManager.loadMerchants(); // Refresh list
      toast.success('Merchant deleted successfully');
    } catch (error) {
      toast.error('Failed to delete merchant');
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportOperation.execute(merchantManager.merchants.map(m => m.id));
      downloadFile(blob, 'merchants.xlsx');
    } catch (error) {
      toast.error('Export failed');
    }
  };

  return (
    <div>
      <MerchantFilters 
        filters={merchantManager.filters}
        onFiltersChange={merchantManager.setFilters}
      />
      
      <MerchantTable
        merchants={merchantManager.merchants}
        loading={merchantManager.loading}
        onSelect={merchantManager.selectMerchant}
        onDelete={handleDelete}
        deleteLoading={deleteOperation.loading}
      />
      
      <Button 
        onClick={handleExport}
        disabled={exportOperation.loading}
      >
        {exportOperation.loading ? 'Exporting...' : 'Export'}
      </Button>
    </div>
  );
};`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>Advanced Hooks Ready!</strong> Custom hooks yang powerful untuk mengelola complex state dan
              business logic dengan clean separation of concerns.
            </Alert>
          </CardContent>
        </Card>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Custom Hooks Complete!</strong> Semua patterns custom hooks sudah siap untuk meningkatkan reusability
          dan maintainability code.
        </Alert>
      </section>

      {/* CRING Specific Hooks */}
      <section id="cring-specific-hooks">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          CRING-Specific Custom Hooks
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Berikut adalah custom hooks spesifik yang digunakan di CRING! Partner berdasarkan kebutuhan business logic
          yang unik:
        </Typography>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              useDebounce Hook (Production Implementation)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Simple dan efektif debounce hook yang digunakan untuk search dan input optimization.
            </Typography>

            <CodeBlock
              language="js"
              title="hooks/useDebounce.js"
              code={`import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value.
 * @param {*} value - The value to be debounced.
 * @param {number} delay - The delay in milliseconds before updating the debounced value.
 * @returns {*} The debounced value.
 */
export default function useDebounce(value, delay) {
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

// Usage example in search component:
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <TextField
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search merchants..."
    />
  );
};`}
            />
          </CardContent>
        </Card>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              useAes Hook (Encryption/Decryption)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Hook untuk handle AES encryption/decryption yang digunakan untuk sensitive data.
            </Typography>

            <CodeBlock
              language="js"
              title="hooks/useAes.js"
              code={`// Note: This is a reference from production code
// Actual implementation handles AES encryption for sensitive data like:
// - Password handling
// - Session tokens
// - Sensitive merchant information
// 
// Usage pattern:
const useAes = () => {
  const encrypt = (data) => {
    // AES encryption logic
    return encryptedData;
  };
  
  const decrypt = (encryptedData) => {
    // AES decryption logic
    return decryptedData;
  };
  
  return { encrypt, decrypt };
};`}
            />
          </CardContent>
        </Card>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              useFilter Hook (Data Filtering)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Hook untuk manage complex filtering logic dengan TypeScript support.
            </Typography>

            <CodeBlock
              language="typescript"
              title="hooks/useFilter.ts"
              code={`// Production pattern for complex data filtering
interface FilterState {
  searchTerm: string;
  dateRange: { start: Date | null; end: Date | null };
  status: string[];
  merchant: string | null;
}

const useFilter = <T>(data: T[], initialFilters: FilterState) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Apply multiple filter conditions
      const matchesSearch = !filters.searchTerm || 
        item.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
        
      const matchesDateRange = !filters.dateRange.start || 
        (item.createdAt >= filters.dateRange.start && 
         item.createdAt <= filters.dateRange.end);
         
      const matchesStatus = filters.status.length === 0 || 
        filters.status.includes(item.status);
        
      return matchesSearch && matchesDateRange && matchesStatus;
    });
  }, [data, filters]);
  
  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const resetFilters = () => {
    setFilters(initialFilters);
  };
  
  return {
    filters,
    filteredData,
    updateFilter,
    resetFilters
  };
};`}
            />
          </CardContent>
        </Card>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              useHelper Hook (Utility Functions)
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Hook yang menyediakan helper functions untuk formatting dan utilities.
            </Typography>

            <CodeBlock
              language="typescript"
              title="hooks/useHelper.ts"
              code={`// Production helper hook for common utility functions
const useHelper = () => {
  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }, []);
  
  const formatDate = useCallback((date: Date | string) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }, []);
  
  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  }, []);
  
  const generateId = useCallback(() => {
    return Math.random().toString(36).substr(2, 9);
  }, []);
  
  return {
    formatCurrency,
    formatDate,
    validateEmail,
    generateId
  };
};`}
            />
          </CardContent>
        </Card>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Production Hooks:</strong> Hooks ini adalah adaptasi dari implementation sebenarnya di CRING! Portal
          Partner. Sesuaikan dengan kebutuhan specific business logic dan security requirements.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default CustomHooksPage;
