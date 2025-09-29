'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const ComplexStatePage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Complex State Overview' },
    { id: 'usereducer-patterns', title: 'useReducer Patterns' },
    { id: 'context-management', title: 'Context Management' },
    { id: 'state-machines', title: 'State Machines' },
    { id: 'advanced-patterns', title: 'Advanced Patterns' }
  ];

  return (
    <DocumentationPageLayout
      title="Complex State Management"
      description="Advanced state management patterns dan techniques untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Custom Hooks',
          href: '/advanced/custom-hooks'
        },
        next: {
          title: 'Integrations',
          href: '/advanced/integrations'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Complex State Management Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Ketika aplikasi berkembang, state management menjadi lebih complex. CRING! Partner menggunakan patterns untuk
          mengelola state yang complex, mulai dari useReducer patterns, Context API, hingga state machines untuk
          business logic yang sophisticated.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="useReducer" color="primary" variant="outlined" />
          <Chip label="Context API" color="secondary" variant="outlined" />
          <Chip label="State Machines" color="info" variant="outlined" />
          <Chip label="Patterns" color="success" variant="outlined" />
        </Stack>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>State Complexity:</strong> Gunakan useState untuk simple state, useReducer untuk complex state logic,
          dan Context untuk sharing state across multiple components.
        </Alert>
      </section>

      <section id="usereducer-patterns">
        <Typography variant="h5" sx={{ mb: 2 }}>
          useReducer Patterns
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🎯 Merchant Management Reducer
              </Typography>
              <CodeBlock
                language="typescript"
                title="Complex merchant state with useReducer"
                code={`// Define comprehensive state structure
interface MerchantState {
  merchants: Merchant[];
  selectedMerchants: string[];
  filters: MerchantFilters;
  sorting: {
    field: keyof Merchant;
    direction: 'asc' | 'desc';
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  ui: {
    loading: boolean;
    error: string | null;
    dialogOpen: boolean;
    selectedMerchant: Merchant | null;
  };
  bulkActions: {
    pending: boolean;
    selectedAction: string | null;
  };
}

// Define action types
type MerchantAction =
  | { type: 'LOAD_MERCHANTS_START' }
  | { type: 'LOAD_MERCHANTS_SUCCESS'; payload: { merchants: Merchant[]; total: number } }
  | { type: 'LOAD_MERCHANTS_ERROR'; payload: string }
  | { type: 'SELECT_MERCHANT'; payload: string }
  | { type: 'DESELECT_MERCHANT'; payload: string }
  | { type: 'SELECT_ALL_MERCHANTS' }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'SET_FILTERS'; payload: Partial<MerchantFilters> }
  | { type: 'SET_SORTING'; payload: { field: keyof Merchant; direction: 'asc' | 'desc' } }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'OPEN_DIALOG'; payload: Merchant }
  | { type: 'CLOSE_DIALOG' }
  | { type: 'START_BULK_ACTION'; payload: string }
  | { type: 'COMPLETE_BULK_ACTION' }
  | { type: 'UPDATE_MERCHANT'; payload: { id: string; updates: Partial<Merchant> } }
  | { type: 'DELETE_MERCHANT'; payload: string }
  | { type: 'RESET_STATE' };

// Initial state
const initialMerchantState: MerchantState = {
  merchants: [],
  selectedMerchants: [],
  filters: {},
  sorting: {
    field: 'name',
    direction: 'asc'
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0
  },
  ui: {
    loading: false,
    error: null,
    dialogOpen: false,
    selectedMerchant: null
  },
  bulkActions: {
    pending: false,
    selectedAction: null
  }
};

// Reducer function
function merchantReducer(state: MerchantState, action: MerchantAction): MerchantState {
  switch (action.type) {
    case 'LOAD_MERCHANTS_START':
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: true,
          error: null
        }
      };

    case 'LOAD_MERCHANTS_SUCCESS':
      return {
        ...state,
        merchants: action.payload.merchants,
        pagination: {
          ...state.pagination,
          total: action.payload.total
        },
        ui: {
          ...state.ui,
          loading: false,
          error: null
        }
      };

    case 'LOAD_MERCHANTS_ERROR':
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: false,
          error: action.payload
        }
      };

    case 'SELECT_MERCHANT':
      return {
        ...state,
        selectedMerchants: [...state.selectedMerchants, action.payload]
      };

    case 'DESELECT_MERCHANT':
      return {
        ...state,
        selectedMerchants: state.selectedMerchants.filter(id => id !== action.payload)
      };

    case 'SELECT_ALL_MERCHANTS':
      return {
        ...state,
        selectedMerchants: state.merchants.map(m => m.id)
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedMerchants: []
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 1 }, // Reset to first page
        selectedMerchants: [] // Clear selection when filtering
      };

    case 'SET_SORTING':
      return {
        ...state,
        sorting: action.payload,
        pagination: { ...state.pagination, page: 1 }
      };

    case 'SET_PAGE':
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload }
      };

    case 'OPEN_DIALOG':
      return {
        ...state,
        ui: {
          ...state.ui,
          dialogOpen: true,
          selectedMerchant: action.payload
        }
      };

    case 'CLOSE_DIALOG':
      return {
        ...state,
        ui: {
          ...state.ui,
          dialogOpen: false,
          selectedMerchant: null
        }
      };

    case 'START_BULK_ACTION':
      return {
        ...state,
        bulkActions: {
          pending: true,
          selectedAction: action.payload
        }
      };

    case 'COMPLETE_BULK_ACTION':
      return {
        ...state,
        bulkActions: {
          pending: false,
          selectedAction: null
        },
        selectedMerchants: []
      };

    case 'UPDATE_MERCHANT':
      return {
        ...state,
        merchants: state.merchants.map(merchant =>
          merchant.id === action.payload.id
            ? { ...merchant, ...action.payload.updates }
            : merchant
        )
      };

    case 'DELETE_MERCHANT':
      return {
        ...state,
        merchants: state.merchants.filter(merchant => merchant.id !== action.payload),
        selectedMerchants: state.selectedMerchants.filter(id => id !== action.payload)
      };

    case 'RESET_STATE':
      return initialMerchantState;

    default:
      return state;
  }
}

// Custom hook for merchant management
export function useMerchantState() {
  const [state, dispatch] = useReducer(merchantReducer, initialMerchantState);

  const actions = useMemo(() => ({
    loadMerchants: async () => {
      dispatch({ type: 'LOAD_MERCHANTS_START' });
      
      try {
        const response = await merchantService.getMerchants({
          ...state.filters,
          page: state.pagination.page,
          limit: state.pagination.limit,
          sortBy: state.sorting.field,
          sortDirection: state.sorting.direction
        });
        
        dispatch({
          type: 'LOAD_MERCHANTS_SUCCESS',
          payload: {
            merchants: response.data,
            total: response.meta.total
          }
        });
      } catch (error) {
        dispatch({
          type: 'LOAD_MERCHANTS_ERROR',
          payload: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    },

    selectMerchant: (id: string) => {
      if (state.selectedMerchants.includes(id)) {
        dispatch({ type: 'DESELECT_MERCHANT', payload: id });
      } else {
        dispatch({ type: 'SELECT_MERCHANT', payload: id });
      }
    },

    selectAllMerchants: () => {
      if (state.selectedMerchants.length === state.merchants.length) {
        dispatch({ type: 'CLEAR_SELECTION' });
      } else {
        dispatch({ type: 'SELECT_ALL_MERCHANTS' });
      }
    },

    setFilters: (filters: Partial<MerchantFilters>) => {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },

    setSorting: (field: keyof Merchant, direction: 'asc' | 'desc') => {
      dispatch({ type: 'SET_SORTING', payload: { field, direction } });
    },

    setPage: (page: number) => {
      dispatch({ type: 'SET_PAGE', payload: page });
    },

    openDialog: (merchant: Merchant) => {
      dispatch({ type: 'OPEN_DIALOG', payload: merchant });
    },

    closeDialog: () => {
      dispatch({ type: 'CLOSE_DIALOG' });
    },

    performBulkAction: async (action: string) => {
      dispatch({ type: 'START_BULK_ACTION', payload: action });
      
      try {
        await merchantService.bulkAction(action, state.selectedMerchants);
        dispatch({ type: 'COMPLETE_BULK_ACTION' });
        // Reload data
        await actions.loadMerchants();
      } catch (error) {
        dispatch({ type: 'COMPLETE_BULK_ACTION' });
        throw error;
      }
    }
  }), [state]);

  return {
    state,
    dispatch,
    actions
  };
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                📋 Form State Reducer Pattern
              </Typography>
              <CodeBlock
                language="typescript"
                title="Complex form with validation using useReducer"
                code={`// Form state structure
interface FormFieldState<T> {
  value: T;
  error: string | null;
  touched: boolean;
  dirty: boolean;
}

interface FormState<T> {
  fields: { [K in keyof T]: FormFieldState<T[K]> };
  isValid: boolean;
  isSubmitting: boolean;
  submitAttempted: boolean;
  globalError: string | null;
}

// Form actions
type FormAction<T> =
  | { type: 'SET_FIELD_VALUE'; field: keyof T; value: T[keyof T] }
  | { type: 'SET_FIELD_ERROR'; field: keyof T; error: string | null }
  | { type: 'SET_FIELD_TOUCHED'; field: keyof T; touched?: boolean }
  | { type: 'SET_SUBMITTING'; submitting: boolean }
  | { type: 'SET_SUBMIT_ATTEMPTED'; attempted: boolean }
  | { type: 'SET_GLOBAL_ERROR'; error: string | null }
  | { type: 'VALIDATE_FORM' }
  | { type: 'RESET_FORM'; initialValues: T };

// Form reducer
function createFormReducer<T extends Record<string, any>>() {
  return function formReducer(
    state: FormState<T>,
    action: FormAction<T>
  ): FormState<T> {
    switch (action.type) {
      case 'SET_FIELD_VALUE': {
        const field = action.field;
        return {
          ...state,
          fields: {
            ...state.fields,
            [field]: {
              ...state.fields[field],
              value: action.value,
              dirty: true,
              error: null // Clear error when user types
            }
          }
        };
      }

      case 'SET_FIELD_ERROR': {
        const field = action.field;
        return {
          ...state,
          fields: {
            ...state.fields,
            [field]: {
              ...state.fields[field],
              error: action.error
            }
          }
        };
      }

      case 'SET_FIELD_TOUCHED': {
        const field = action.field;
        return {
          ...state,
          fields: {
            ...state.fields,
            [field]: {
              ...state.fields[field],
              touched: action.touched ?? true
            }
          }
        };
      }

      case 'VALIDATE_FORM': {
        const isValid = Object.values(state.fields).every(
          field => field.error === null
        );
        return {
          ...state,
          isValid
        };
      }

      case 'SET_SUBMITTING':
        return {
          ...state,
          isSubmitting: action.submitting
        };

      case 'SET_SUBMIT_ATTEMPTED':
        return {
          ...state,
          submitAttempted: action.attempted
        };

      case 'SET_GLOBAL_ERROR':
        return {
          ...state,
          globalError: action.error
        };

      case 'RESET_FORM': {
        const initialFields = {} as { [K in keyof T]: FormFieldState<T[K]> };
        
        for (const key in action.initialValues) {
          initialFields[key] = {
            value: action.initialValues[key],
            error: null,
            touched: false,
            dirty: false
          };
        }

        return {
          fields: initialFields,
          isValid: true,
          isSubmitting: false,
          submitAttempted: false,
          globalError: null
        };
      }

      default:
        return state;
    }
  };
}

// Custom hook for form management
interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  onSubmit?: (values: T) => Promise<void>;
}

function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules,
  onSubmit
}: UseFormOptions<T>) {
  const reducer = useMemo(() => createFormReducer<T>(), []);
  
  const [state, dispatch] = useReducer(reducer, null, () => ({
    fields: Object.keys(initialValues).reduce((acc, key) => ({
      ...acc,
      [key]: {
        value: initialValues[key as keyof T],
        error: null,
        touched: false,
        dirty: false
      }
    }), {} as { [K in keyof T]: FormFieldState<T[K]> }),
    isValid: true,
    isSubmitting: false,
    submitAttempted: false,
    globalError: null
  }));

  const setValue = useCallback((field: keyof T, value: T[keyof T]) => {
    dispatch({ type: 'SET_FIELD_VALUE', field, value });
    
    // Validate field if rules exist
    if (validationRules?.[field]) {
      const error = validationRules[field](value, getFormValues());
      dispatch({ type: 'SET_FIELD_ERROR', field, error });
    }
    
    dispatch({ type: 'VALIDATE_FORM' });
  }, [validationRules]);

  const setTouched = useCallback((field: keyof T, touched = true) => {
    dispatch({ type: 'SET_FIELD_TOUCHED', field, touched });
  }, []);

  const getFormValues = useCallback(() => {
    return Object.keys(state.fields).reduce((acc, key) => ({
      ...acc,
      [key]: state.fields[key as keyof T].value
    }), {} as T);
  }, [state.fields]);

  const validateForm = useCallback(() => {
    if (!validationRules) return true;

    const values = getFormValues();
    let isValid = true;

    for (const field in validationRules) {
      const validator = validationRules[field];
      const error = validator(values[field], values);
      
      if (error) {
        dispatch({ type: 'SET_FIELD_ERROR', field: field as keyof T, error });
        isValid = false;
      }
    }

    dispatch({ type: 'VALIDATE_FORM' });
    return isValid;
  }, [validationRules, getFormValues]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    dispatch({ type: 'SET_SUBMIT_ATTEMPTED', attempted: true });
    
    if (!validateForm() || !onSubmit) return;
    
    dispatch({ type: 'SET_SUBMITTING', submitting: true });
    dispatch({ type: 'SET_GLOBAL_ERROR', error: null });
    
    try {
      await onSubmit(getFormValues());
    } catch (error) {
      dispatch({
        type: 'SET_GLOBAL_ERROR',
        error: error instanceof Error ? error.message : 'Submit failed'
      });
    } finally {
      dispatch({ type: 'SET_SUBMITTING', submitting: false });
    }
  }, [validateForm, onSubmit, getFormValues]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET_FORM', initialValues });
  }, [initialValues]);

  return {
    values: getFormValues(),
    fields: state.fields,
    isValid: state.isValid,
    isSubmitting: state.isSubmitting,
    submitAttempted: state.submitAttempted,
    globalError: state.globalError,
    setValue,
    setTouched,
    validateForm,
    handleSubmit,
    reset
  };
}`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="context-management">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Context Management Patterns
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🌐 Application Context Architecture
            </Typography>
            <CodeBlock
              language="typescript"
              title="Scalable context management with multiple providers"
              code={`// 1. Authentication Context
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  permissions: string[];
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    permissions: [],
    loading: true
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await authService.login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response });
      
      // Store token
      localStorage.setItem('token', response.token);
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const hasPermission = useCallback((permission: string) => {
    return state.permissions.includes(permission);
  }, [state.permissions]);

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify and load user
      authService.verifyToken(token)
        .then(user => dispatch({ type: 'LOGIN_SUCCESS', payload: user }))
        .catch(() => dispatch({ type: 'TOKEN_INVALID' }));
    } else {
      dispatch({ type: 'INIT_COMPLETE' });
    }
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshToken: async () => {
      // Implement token refresh logic
    },
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// 2. Application Settings Context
interface AppSettings {
  theme: 'light' | 'dark';
  language: 'en' | 'id';
  pageSize: number;
  dateFormat: string;
  currency: string;
}

interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const AppSettingsContext = createContext<AppSettingsContextType | null>(null);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<AppSettings>('app-settings', {
    theme: 'light',
    language: 'id',
    pageSize: 20,
    dateFormat: 'DD/MM/YYYY',
    currency: 'IDR'
  });

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, [setSettings]);

  const resetSettings = useCallback(() => {
    setSettings({
      theme: 'light',
      language: 'id',
      pageSize: 20,
      dateFormat: 'DD/MM/YYYY',
      currency: 'IDR'
    });
  }, [setSettings]);

  const value: AppSettingsContextType = {
    settings,
    updateSettings,
    resetSettings
  };

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  }
  return context;
}

// 3. Notification Context
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  autoClose?: boolean;
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = generateId();
    const newNotification: Notification = {
      id,
      autoClose: true,
      duration: 5000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove if configured
    if (newNotification.autoClose) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const value: NotificationContextType = {
    notifications,
    showNotification,
    removeNotification,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}

// 4. Compound Providers Pattern
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppSettingsProvider>
        <NotificationProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </ThemeProvider>
        </NotificationProvider>
      </AppSettingsProvider>
    </AuthProvider>
  );
}

// Usage in app
function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/merchants" element={<MerchantsPage />} />
          {/* More routes */}
        </Routes>
      </Router>
    </AppProviders>
  );
}`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>Context Architecture Ready!</strong> Scalable context management dengan proper separation of
              concerns dan performance optimization.
            </Alert>
          </CardContent>
        </Card>
      </section>

      <section id="state-machines">
        <Typography variant="h5" sx={{ mb: 2 }}>
          State Machines & Finite States
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🤖 XState Integration for Complex Business Logic
            </Typography>
            <CodeBlock
              language="typescript"
              title="State machine for merchant onboarding process"
              code={`import { createMachine, interpret, assign } from 'xstate';

// Define merchant onboarding context
interface MerchantOnboardingContext {
  merchantData: Partial<Merchant>;
  documents: Document[];
  verificationStatus: string | null;
  errors: Record<string, string>;
  currentStep: number;
}

// Define events
type MerchantOnboardingEvent =
  | { type: 'NEXT'; data?: any }
  | { type: 'PREVIOUS' }
  | { type: 'UPDATE_DATA'; data: Partial<Merchant> }
  | { type: 'UPLOAD_DOCUMENT'; document: Document }
  | { type: 'SUBMIT_FOR_REVIEW' }
  | { type: 'APPROVE' }
  | { type: 'REJECT'; reason: string }
  | { type: 'RETRY' }
  | { type: 'RESET' };

// Create the state machine
export const merchantOnboardingMachine = createMachine<
  MerchantOnboardingContext,
  MerchantOnboardingEvent
>({
  id: 'merchantOnboarding',
  initial: 'basicInfo',
  context: {
    merchantData: {},
    documents: [],
    verificationStatus: null,
    errors: {},
    currentStep: 1
  },
  states: {
    basicInfo: {
      entry: assign({ currentStep: 1 }),
      on: {
        NEXT: {
          target: 'businessDetails',
          actions: assign({
            merchantData: (context, event) => ({
              ...context.merchantData,
              ...event.data
            })
          }),
          cond: (context, event) => {
            // Validate basic info
            return event.data?.name && event.data?.email && event.data?.phone;
          }
        },
        UPDATE_DATA: {
          actions: assign({
            merchantData: (context, event) => ({
              ...context.merchantData,
              ...event.data
            })
          })
        }
      }
    },

    businessDetails: {
      entry: assign({ currentStep: 2 }),
      on: {
        NEXT: {
          target: 'documentUpload',
          actions: assign({
            merchantData: (context, event) => ({
              ...context.merchantData,
              ...event.data
            })
          }),
          cond: (context, event) => {
            // Validate business details
            return event.data?.businessType && event.data?.address;
          }
        },
        PREVIOUS: 'basicInfo',
        UPDATE_DATA: {
          actions: assign({
            merchantData: (context, event) => ({
              ...context.merchantData,
              ...event.data
            })
          })
        }
      }
    },

    documentUpload: {
      entry: assign({ currentStep: 3 }),
      on: {
        UPLOAD_DOCUMENT: {
          actions: assign({
            documents: (context, event) => [
              ...context.documents,
              event.document
            ]
          })
        },
        NEXT: {
          target: 'review',
          cond: (context) => {
            // Must have required documents
            const requiredDocs = ['ktp', 'npwp', 'business_license'];
            return requiredDocs.every(docType => 
              context.documents.some(doc => doc.type === docType)
            );
          }
        },
        PREVIOUS: 'businessDetails'
      }
    },

    review: {
      entry: assign({ currentStep: 4 }),
      on: {
        SUBMIT_FOR_REVIEW: {
          target: 'submitting',
          actions: assign({
            verificationStatus: 'pending'
          })
        },
        PREVIOUS: 'documentUpload'
      }
    },

    submitting: {
      invoke: {
        id: 'submitMerchant',
        src: (context) => merchantService.submitOnboarding(context.merchantData),
        onDone: {
          target: 'pendingVerification',
          actions: assign({
            verificationStatus: 'submitted'
          })
        },
        onError: {
          target: 'review',
          actions: assign({
            errors: (context, event) => ({
              submit: event.data.message || 'Submission failed'
            })
          })
        }
      }
    },

    pendingVerification: {
      entry: assign({ currentStep: 5 }),
      on: {
        APPROVE: {
          target: 'approved',
          actions: assign({
            verificationStatus: 'approved'
          })
        },
        REJECT: {
          target: 'rejected',
          actions: assign({
            verificationStatus: 'rejected',
            errors: (context, event) => ({
              rejection: event.reason
            })
          })
        }
      }
    },

    approved: {
      type: 'final',
      entry: assign({
        verificationStatus: 'approved',
        currentStep: 6
      })
    },

    rejected: {
      on: {
        RETRY: 'basicInfo',
        RESET: {
          target: 'basicInfo',
          actions: assign({
            merchantData: {},
            documents: [],
            verificationStatus: null,
            errors: {},
            currentStep: 1
          })
        }
      }
    }
  }
});

// React hook for using the state machine
export function useMerchantOnboarding() {
  const [state, send] = useMachine(merchantOnboardingMachine);

  const actions = useMemo(() => ({
    nextStep: (data?: any) => send({ type: 'NEXT', data }),
    previousStep: () => send({ type: 'PREVIOUS' }),
    updateData: (data: Partial<Merchant>) => send({ type: 'UPDATE_DATA', data }),
    uploadDocument: (document: Document) => send({ type: 'UPLOAD_DOCUMENT', document }),
    submitForReview: () => send({ type: 'SUBMIT_FOR_REVIEW' }),
    approve: () => send({ type: 'APPROVE' }),
    reject: (reason: string) => send({ type: 'REJECT', reason }),
    retry: () => send({ type: 'RETRY' }),
    reset: () => send({ type: 'RESET' })
  }), [send]);

  return {
    state: state.value,
    context: state.context,
    canGoNext: state.can('NEXT'),
    canGoBack: state.can('PREVIOUS'),
    isSubmitting: state.matches('submitting'),
    isPending: state.matches('pendingVerification'),
    isApproved: state.matches('approved'),
    isRejected: state.matches('rejected'),
    actions
  };
}

// Usage in component
const MerchantOnboardingFlow = () => {
  const {
    state,
    context,
    canGoNext,
    canGoBack,
    isSubmitting,
    actions
  } = useMerchantOnboarding();

  const renderCurrentStep = () => {
    switch (state) {
      case 'basicInfo':
        return (
          <BasicInfoForm
            data={context.merchantData}
            onChange={actions.updateData}
            onNext={actions.nextStep}
            canNext={canGoNext}
          />
        );

      case 'businessDetails':
        return (
          <BusinessDetailsForm
            data={context.merchantData}
            onChange={actions.updateData}
            onNext={actions.nextStep}
            onPrevious={actions.previousStep}
            canNext={canGoNext}
            canBack={canGoBack}
          />
        );

      case 'documentUpload':
        return (
          <DocumentUploadForm
            documents={context.documents}
            onUpload={actions.uploadDocument}
            onNext={actions.nextStep}
            onPrevious={actions.previousStep}
          />
        );

      case 'review':
        return (
          <ReviewStep
            data={context.merchantData}
            documents={context.documents}
            onSubmit={actions.submitForReview}
            onPrevious={actions.previousStep}
          />
        );

      case 'submitting':
        return <SubmittingLoader />;

      case 'pendingVerification':
        return <PendingVerification status={context.verificationStatus} />;

      case 'approved':
        return <ApprovalSuccess />;

      case 'rejected':
        return (
          <RejectionNotice
            reason={context.errors.rejection}
            onRetry={actions.retry}
            onReset={actions.reset}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <ProgressStepper currentStep={context.currentStep} />
      {renderCurrentStep()}
    </div>
  );
};`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="advanced-patterns">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Advanced State Patterns
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🧠 Custom State Management Solutions
            </Typography>
            <CodeBlock
              language="typescript"
              title="Advanced patterns for complex scenarios"
              code={`// 1. Optimistic Updates Pattern
interface OptimisticUpdateState<T> {
  data: T[];
  optimisticUpdates: Map<string, T>;
  pendingOperations: Set<string>;
  errors: Map<string, string>;
}

function useOptimisticUpdates<T extends { id: string }>(
  initialData: T[],
  updateService: (id: string, updates: Partial<T>) => Promise<T>
) {
  const [state, setState] = useState<OptimisticUpdateState<T>>({
    data: initialData,
    optimisticUpdates: new Map(),
    pendingOperations: new Set(),
    errors: new Map()
  });

  const optimisticUpdate = useCallback(async (id: string, updates: Partial<T>) => {
    // Apply optimistic update immediately
    setState(prev => ({
      ...prev,
      optimisticUpdates: new Map(prev.optimisticUpdates).set(id, {
        ...prev.data.find(item => item.id === id)!,
        ...updates
      } as T),
      pendingOperations: new Set(prev.pendingOperations).add(id),
      errors: new Map(prev.errors)
    }));

    try {
      // Perform actual update
      const updatedItem = await updateService(id, updates);
      
      setState(prev => ({
        ...prev,
        data: prev.data.map(item => item.id === id ? updatedItem : item),
        optimisticUpdates: (() => {
          const newMap = new Map(prev.optimisticUpdates);
          newMap.delete(id);
          return newMap;
        })(),
        pendingOperations: (() => {
          const newSet = new Set(prev.pendingOperations);
          newSet.delete(id);
          return newSet;
        })(),
        errors: (() => {
          const newMap = new Map(prev.errors);
          newMap.delete(id);
          return newMap;
        })()
      }));

    } catch (error) {
      // Revert optimistic update on error
      setState(prev => ({
        ...prev,
        optimisticUpdates: (() => {
          const newMap = new Map(prev.optimisticUpdates);
          newMap.delete(id);
          return newMap;
        })(),
        pendingOperations: (() => {
          const newSet = new Set(prev.pendingOperations);
          newSet.delete(id);
          return newSet;
        })(),
        errors: new Map(prev.errors).set(id, error.message)
      }));
    }
  }, [updateService]);

  const getDisplayData = useCallback(() => {
    return state.data.map(item => {
      const optimisticUpdate = state.optimisticUpdates.get(item.id);
      return optimisticUpdate || item;
    });
  }, [state.data, state.optimisticUpdates]);

  return {
    data: getDisplayData(),
    isPending: (id: string) => state.pendingOperations.has(id),
    getError: (id: string) => state.errors.get(id),
    optimisticUpdate,
    clearError: (id: string) => {
      setState(prev => ({
        ...prev,
        errors: (() => {
          const newMap = new Map(prev.errors);
          newMap.delete(id);
          return newMap;
        })()
      }));
    }
  };
}

// 2. Undo/Redo Pattern
interface UndoRedoState<T> {
  past: T[];
  present: T;
  future: T[];
}

function useUndoRedo<T>(initialState: T) {
  const [state, setState] = useState<UndoRedoState<T>>({
    past: [],
    present: initialState,
    future: []
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;

    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, -1);

    setState({
      past: newPast,
      present: previous,
      future: [state.present, ...state.future]
    });
  }, [state, canUndo]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    const next = state.future[0];
    const newFuture = state.future.slice(1);

    setState({
      past: [...state.past, state.present],
      present: next,
      future: newFuture
    });
  }, [state, canRedo]);

  const set = useCallback((newPresent: T) => {
    setState({
      past: [...state.past, state.present],
      present: newPresent,
      future: []
    });
  }, [state]);

  const reset = useCallback((newState: T) => {
    setState({
      past: [],
      present: newState,
      future: []
    });
  }, []);

  return {
    state: state.present,
    canUndo,
    canRedo,
    undo,
    redo,
    set,
    reset
  };
}

// 3. Event Sourcing Pattern
interface Event<T = any> {
  id: string;
  type: string;
  payload: T;
  timestamp: number;
  userId?: string;
}

class EventStore {
  private events: Event[] = [];
  private subscribers: Map<string, Function[]> = new Map();

  append(event: Omit<Event, 'id' | 'timestamp'>) {
    const fullEvent: Event = {
      ...event,
      id: generateId(),
      timestamp: Date.now()
    };

    this.events.push(fullEvent);
    this.notifySubscribers(fullEvent.type, fullEvent);
  }

  getEvents(fromTimestamp?: number) {
    return fromTimestamp 
      ? this.events.filter(e => e.timestamp >= fromTimestamp)
      : [...this.events];
  }

  subscribe(eventType: string, callback: (event: Event) => void) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }
    this.subscribers.get(eventType)!.push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(eventType) || [];
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  private notifySubscribers(eventType: string, event: Event) {
    const callbacks = this.subscribers.get(eventType) || [];
    callbacks.forEach(callback => callback(event));
  }
}

// Global event store instance
export const eventStore = new EventStore();

// Hook for using event sourcing
function useEventSourcing<T>(
  initialState: T,
  reducer: (state: T, event: Event) => T,
  eventTypes: string[]
) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const unsubscribers = eventTypes.map(eventType =>
      eventStore.subscribe(eventType, (event) => {
        setState(prevState => reducer(prevState, event));
      })
    );

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [reducer, eventTypes]);

  const dispatch = useCallback((eventType: string, payload: any) => {
    eventStore.append({
      type: eventType,
      payload
    });
  }, []);

  return [state, dispatch] as const;
}

// Usage example
const MerchantEventSourcing = () => {
  const [merchants, dispatchEvent] = useEventSourcing<Merchant[]>(
    [],
    (state, event) => {
      switch (event.type) {
        case 'MERCHANT_ADDED':
          return [...state, event.payload];
        case 'MERCHANT_UPDATED':
          return state.map(m => 
            m.id === event.payload.id 
              ? { ...m, ...event.payload.updates }
              : m
          );
        case 'MERCHANT_DELETED':
          return state.filter(m => m.id !== event.payload.id);
        default:
          return state;
      }
    },
    ['MERCHANT_ADDED', 'MERCHANT_UPDATED', 'MERCHANT_DELETED']
  );

  const addMerchant = (merchant: Merchant) => {
    dispatchEvent('MERCHANT_ADDED', merchant);
  };

  const updateMerchant = (id: string, updates: Partial<Merchant>) => {
    dispatchEvent('MERCHANT_UPDATED', { id, updates });
  };

  return (
    <div>
      {/* Merchant list and controls */}
    </div>
  );
};`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>Advanced Patterns Ready!</strong> Sophisticated state management patterns untuk handling complex
              business scenarios dengan reliability.
            </Alert>
          </CardContent>
        </Card>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Complex State Management Complete!</strong> Semua advanced patterns sudah siap untuk mengelola state
          yang complex dengan scalable architecture.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default ComplexStatePage;
