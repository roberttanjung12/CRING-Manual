'use client';

import React from 'react';
import { Box, Typography, Divider, Alert, AlertTitle, Chip, Stack, Card, CardContent } from '@mui/material';
import CodeBlock from '@/documentation/components/CodeBlock';

/**
 * Context Providers Documentation Module
 *
 * Complete guide for React Context providers in CRING Portal Partner
 * managing global state, authentication, and shared functionality.
 *
 * References:
 * - references/context/ (context provider implementations)
 * - references/modules/ (usage patterns in components)
 */
const ContextProvidersDocumentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Chip label="COMPONENTS" color="primary" size="small" />
          <Chip label="Context API" color="secondary" variant="outlined" size="small" />
          <Chip label="State Management" color="info" variant="outlined" size="small" />
        </Stack>

        <Typography variant="h4" component="h1" gutterBottom>
          🌐 Context Providers
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          📁 references/context/ - Global state management and shared functionality
        </Typography>
      </Box>

      {/* Purpose Section */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <AlertTitle>🎯 Untuk Apa Context Providers?</AlertTitle>
        <Typography variant="body2" paragraph>
          Context Providers di CRING mengelola <strong>global state</strong> dan shared functionality yang dibutuhkan di
          seluruh aplikasi:
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <li>
            <strong>Authentication state</strong> - User login, permissions, roles
          </li>
          <li>
            <strong>UI state management</strong> - Loading states, notifications, modals
          </li>
          <li>
            <strong>Theme & preferences</strong> - Dark mode, language settings
          </li>
          <li>
            <strong>Business context</strong> - Current merchant, selected filters
          </li>
          <li>
            <strong>Real-time data</strong> - WebSocket connections, live updates
          </li>
          <li>
            <strong>Cache management</strong> - API response caching, invalidation
          </li>
        </Box>
      </Alert>

      {/* Provider Categories */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        📋 Provider Categories
      </Typography>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
        <Chip label="Authentication" color="error" />
        <Chip label="UI State" color="primary" />
        <Chip label="Business Logic" color="success" />
        <Chip label="Theme & Settings" color="warning" />
        <Chip label="Notifications" color="info" />
      </Stack>

      {/* Authentication Provider */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        🔐 AuthProvider - User Authentication
      </Typography>

      <CodeBlock
        title="AuthProvider Implementation"
        language="typescript"
        code={`// context/AuthProvider.tsx
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'merchant' | 'support';
  permissions: string[];
  merchantId?: string;
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'CLEAR_ERROR' };

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
  hasPermission: (permission: string) => boolean;
  isRole: (role: User['role']) => boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
      
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
      
    case 'LOGIN_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
        token: null,
      };
      
    case 'LOGOUT':
      return initialState;
      
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
      
    case 'CLEAR_ERROR':
      return { ...state, error: null };
      
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const user = await validateToken(token);
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
        } catch (error) {
          localStorage.removeItem('authToken');
        }
      }
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store token
      localStorage.setItem('authToken', data.token);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: data.user, token: data.token },
      });
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error instanceof Error ? error.message : 'Login failed',
      });
      throw error;
    }
  };

  // Logout function
  const logout = (): void => {
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
  };

  // Update user data
  const updateUser = (userData: Partial<User>): void => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  // Clear error
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Permission check
  const hasPermission = (permission: string): boolean => {
    return state.user?.permissions.includes(permission) ?? false;
  };

  // Role check
  const isRole = (role: User['role']): boolean => {
    return state.user?.role === role;
  };

  const contextValue: AuthContextType = {
    state,
    login,
    logout,
    updateUser,
    clearError,
    hasPermission,
    isRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper function (would be in separate file)
const validateToken = async (token: string): Promise<User> => {
  const response = await fetch('/api/auth/validate', {
    headers: { Authorization: \`Bearer \${token}\` },
  });
  
  if (!response.ok) {
    throw new Error('Invalid token');
  }
  
  const data = await response.json();
  return data.user;
};`}
      />

      {/* Usage Example */}
      <CodeBlock
        title="Using AuthProvider in Components"
        language="tsx"
        code={`// components/LoginForm.tsx
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthProvider';
import { TextField, Button, Alert, Box } from '@mui/material';

const LoginForm: React.FC = () => {
  const { state, login, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      // Redirect handled by app-level auth check
    } catch (error) {
      // Error is handled in AuthProvider
      console.error('Login failed:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {state.error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}
      
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={state.isLoading}
        sx={{ mt: 2 }}
      >
        {state.isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

// components/ProtectedRoute.tsx
import React from 'react';
import { useAuth } from '@/context/AuthProvider';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: 'admin' | 'merchant' | 'support';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requiredRole,
}) => {
  const { state, hasPermission, isRole } = useAuth();

  if (state.isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredRole && !isRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};`}
      />

      {/* Blocker Provider */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        🚧 BlockerProvider - Loading States & UI Blocking
      </Typography>

      <CodeBlock
        title="BlockerProvider Implementation"
        language="typescript"
        code={`// context/BlockerProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';

interface BlockerState {
  isBlocked: boolean;
  message?: string;
  showProgress?: boolean;
}

interface BlockerContextType {
  state: BlockerState;
  block: (message?: string, showProgress?: boolean) => void;
  unblock: () => void;
  withBlocking: <T>(
    asyncOperation: () => Promise<T>,
    message?: string
  ) => Promise<T>;
}

const BlockerContext = createContext<BlockerContextType | undefined>(undefined);

export const BlockerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BlockerState>({
    isBlocked: false,
    message: undefined,
    showProgress: true,
  });

  const block = (message?: string, showProgress: boolean = true): void => {
    setState({
      isBlocked: true,
      message,
      showProgress,
    });
  };

  const unblock = (): void => {
    setState({
      isBlocked: false,
      message: undefined,
      showProgress: true,
    });
  };

  const withBlocking = async <T,>(
    asyncOperation: () => Promise<T>,
    message?: string
  ): Promise<T> => {
    block(message);
    try {
      const result = await asyncOperation();
      return result;
    } finally {
      unblock();
    }
  };

  const contextValue: BlockerContextType = {
    state,
    block,
    unblock,
    withBlocking,
  };

  return (
    <BlockerContext.Provider value={contextValue}>
      {children}
      
      {/* Backdrop Component */}
      <Backdrop
        open={state.isBlocked}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1000, // Above everything
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {state.showProgress && <CircularProgress color="inherit" size={60} />}
        
        {state.message && (
          <Box textAlign="center">
            <Typography variant="h6" gutterBottom>
              {state.message}
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
              Mohon tunggu...
            </Typography>
          </Box>
        )}
      </Backdrop>
    </BlockerContext.Provider>
  );
};

export const useBlocker = (): BlockerContextType => {
  const context = useContext(BlockerContext);
  if (!context) {
    throw new Error('useBlocker must be used within a BlockerProvider');
  }
  return context;
};`}
      />

      <CodeBlock
        title="Using BlockerProvider"
        language="tsx"
        code={`// Example usage in components
import React from 'react';
import { useBlocker } from '@/context/BlockerProvider';
import { Button, Box } from '@mui/material';

const DataExportComponent: React.FC = () => {
  const { withBlocking, block, unblock } = useBlocker();

  // Method 1: Using withBlocking (recommended)
  const handleExport = async () => {
    try {
      await withBlocking(
        async () => {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 3000));
          await downloadReport();
        },
        'Mengekspor data...'
      );
      
      alert('Export berhasil!');
    } catch (error) {
      alert('Export gagal!');
    }
  };

  // Method 2: Manual blocking control
  const handleBulkUpdate = async () => {
    block('Memproses update data...', true);
    
    try {
      await processBulkUpdate();
      alert('Update berhasil!');
    } catch (error) {
      alert('Update gagal!');
    } finally {
      unblock();
    }
  };

  return (
    <Box>
      <Button 
        variant="contained" 
        onClick={handleExport}
        sx={{ mr: 2 }}
      >
        Export Data
      </Button>
      
      <Button 
        variant="outlined" 
        onClick={handleBulkUpdate}
      >
        Bulk Update
      </Button>
    </Box>
  );
};

// In API service layer
export const merchantService = {
  async createMerchant(data: CreateMerchantData) {
    const { withBlocking } = useBlocker();
    
    return withBlocking(
      async () => {
        const response = await fetch('/api/merchants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) throw new Error('Failed to create merchant');
        return response.json();
      },
      'Membuat merchant baru...'
    );
  },
};`}
      />

      {/* Notification Provider */}
      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4 }}>
        🔔 NotificationProvider - Toast Notifications
      </Typography>

      <CodeBlock
        title="NotificationProvider Implementation"
        language="typescript"
        code={`// context/NotificationProvider.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface Notification {
  id: string;
  type: AlertColor;
  message: string;
  duration?: number;
  action?: ReactNode;
}

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (
    type: AlertColor,
    message: string,
    duration?: number,
    action?: ReactNode
  ) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  closeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (
      type: AlertColor,
      message: string,
      duration: number = 4000,
      action?: ReactNode
    ): void => {
      const id = Date.now().toString() + Math.random().toString(36);
      
      const notification: Notification = {
        id,
        type,
        message,
        duration,
        action,
      };

      setNotifications(prev => [...prev, notification]);

      // Auto remove after duration
      if (duration > 0) {
        setTimeout(() => {
          closeNotification(id);
        }, duration);
      }
    },
    []
  );

  const showSuccess = useCallback(
    (message: string, duration?: number) => {
      showNotification('success', message, duration);
    },
    [showNotification]
  );

  const showError = useCallback(
    (message: string, duration?: number) => {
      showNotification('error', message, duration || 6000); // Longer for errors
    },
    [showNotification]
  );

  const showWarning = useCallback(
    (message: string, duration?: number) => {
      showNotification('warning', message, duration);
    },
    [showNotification]
  );

  const showInfo = useCallback(
    (message: string, duration?: number) => {
      showNotification('info', message, duration);
    },
    [showNotification]
  );

  const closeNotification = useCallback((id: string): void => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const contextValue: NotificationContextType = {
    notifications,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    closeNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      
      {/* Render notifications */}
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          style={{ 
            marginTop: \`\${index * 60}px\` // Stack notifications
          }}
        >
          <Alert
            severity={notification.type}
            onClose={() => closeNotification(notification.id)}
            action={notification.action}
            sx={{ minWidth: '300px' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};`}
      />

      <CodeBlock
        title="Using NotificationProvider"
        language="tsx"
        code={`// Example usage in components
import React from 'react';
import { useNotification } from '@/context/NotificationProvider';
import { Button, Stack } from '@mui/material';

const NotificationDemo: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  return (
    <Stack spacing={2} direction="row">
      <Button 
        color="success"
        onClick={() => showSuccess('Data berhasil disimpan!')}
      >
        Success
      </Button>
      
      <Button 
        color="error"
        onClick={() => showError('Gagal memproses data. Silakan coba lagi.')}
      >
        Error
      </Button>
      
      <Button 
        color="warning"
        onClick={() => showWarning('Data akan dihapus permanen!')}
      >
        Warning
      </Button>
      
      <Button 
        color="info"
        onClick={() => showInfo('Fitur ini masih dalam pengembangan.')}
      >
        Info
      </Button>
    </Stack>
  );
};

// In API service layer with error handling
export const useApiWithNotification = () => {
  const { showSuccess, showError } = useNotification();
  
  const apiCall = async (operation: () => Promise<any>, successMessage?: string) => {
    try {
      const result = await operation();
      
      if (successMessage) {
        showSuccess(successMessage);
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Terjadi kesalahan yang tidak diketahui';
      
      showError(errorMessage);
      throw error;
    }
  };
  
  return { apiCall };
};`}
      />

      {/* Provider Composition */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🏗️ Provider Composition & App Setup
      </Typography>

      <CodeBlock
        title="App-level Provider Setup"
        language="tsx"
        code={`// App.tsx - Main application setup
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Context Providers
import { AuthProvider } from '@/context/AuthProvider';
import { BlockerProvider } from '@/context/BlockerProvider';
import { NotificationProvider } from '@/context/NotificationProvider';
import { ThemeContextProvider } from '@/context/ThemeProvider';

// App components
import AppRouter from '@/routes/AppRouter';
import theme from '@/theme';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <NotificationProvider>
              <BlockerProvider>
                <AppRouter />
              </BlockerProvider>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
};

export default App;`}
      />

      <CodeBlock
        title="Custom Provider Hook Pattern"
        language="typescript"
        code={`// hooks/useAppContext.ts - Combine multiple contexts
import { useAuth } from '@/context/AuthProvider';
import { useBlocker } from '@/context/BlockerProvider';
import { useNotification } from '@/context/NotificationProvider';

export const useAppContext = () => {
  const auth = useAuth();
  const blocker = useBlocker();
  const notification = useNotification();

  // Combined utility functions
  const apiCallWithFeedback = async <T>(
    operation: () => Promise<T>,
    options: {
      loadingMessage?: string;
      successMessage?: string;
      errorMessage?: string;
    } = {}
  ): Promise<T> => {
    const {
      loadingMessage = 'Memproses...',
      successMessage,
      errorMessage = 'Terjadi kesalahan'
    } = options;

    try {
      const result = await blocker.withBlocking(operation, loadingMessage);
      
      if (successMessage) {
        notification.showSuccess(successMessage);
      }
      
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : errorMessage;
      notification.showError(message);
      throw error;
    }
  };

  const logoutWithConfirm = async (): Promise<void> => {
    const confirmed = window.confirm('Apakah Anda yakin ingin logout?');
    if (confirmed) {
      auth.logout();
      notification.showInfo('Anda telah berhasil logout');
    }
  };

  return {
    // Individual contexts
    auth,
    blocker,
    notification,
    
    // Combined utilities
    apiCallWithFeedback,
    logoutWithConfirm,
  };
};`}
      />

      {/* Best Practices */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🎯 Best Practices & Tips
      </Typography>

      <Alert severity="success" sx={{ mb: 3 }}>
        <AlertTitle>✅ Context Provider Best Practices</AlertTitle>
        <Box component="ul" sx={{ m: '8px 0 0 20px' }}>
          <li>
            <strong>Single Responsibility</strong>: Each provider should manage one concern
          </li>
          <li>
            <strong>TypeScript Safety</strong>: Use strict typing for context values
          </li>
          <li>
            <strong>Error Boundaries</strong>: Wrap providers in error boundaries
          </li>
          <li>
            <strong>Performance</strong>: Use React.memo for components consuming context
          </li>
          <li>
            <strong>Provider Composition</strong>: Order providers by dependency
          </li>
          <li>
            <strong>Custom Hooks</strong>: Create custom hooks for context consumption
          </li>
        </Box>
      </Alert>

      <Alert severity="error" sx={{ mt: 3 }}>
        <AlertTitle>❌ Common Mistakes to Avoid</AlertTitle>
        <Box component="ul" sx={{ m: '8px 0 0 20px' }}>
          <li>
            <strong>Context Hell</strong>: Too many nested providers
          </li>
          <li>
            <strong>Large Context Values</strong>: Causes unnecessary re-renders
          </li>
          <li>
            <strong>Missing Error Handling</strong>: Always handle context undefined cases
          </li>
          <li>
            <strong>No Context Validation</strong>: Check if hooks are used within providers
          </li>
          <li>
            <strong>Direct Context Usage</strong>: Use custom hooks instead of useContext
          </li>
          <li>
            <strong>State Mutations</strong>: Always use immutable updates in reducers
          </li>
        </Box>
      </Alert>

      <Divider sx={{ my: 4 }} />

      {/* Provider Library Reference */}
      <Typography variant="h5" component="h2" gutterBottom>
        📚 Complete Provider Library Reference
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 2 }}>
        Quick reference untuk semua context providers yang tersedia:
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔐 Authentication & Security
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="AuthProvider" size="small" />
            <Chip label="PermissionProvider" size="small" />
            <Chip label="SessionProvider" size="small" />
            <Chip label="SecurityProvider" size="small" />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🎨 UI & User Experience
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="BlockerProvider" size="small" />
            <Chip label="NotificationProvider" size="small" />
            <Chip label="ThemeProvider" size="small" />
            <Chip label="ModalProvider" size="small" />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            💼 Business Logic
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="MerchantProvider" size="small" />
            <Chip label="TransactionProvider" size="small" />
            <Chip label="FilterProvider" size="small" />
            <Chip label="SettingsProvider" size="small" />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🔄 Data Management
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <Chip label="CacheProvider" size="small" />
            <Chip label="WebSocketProvider" size="small" />
            <Chip label="SyncProvider" size="small" />
            <Chip label="OfflineProvider" size="small" />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContextProvidersDocumentation;
