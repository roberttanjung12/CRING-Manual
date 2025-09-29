'use client';

import { Typography, Alert, Card, CardContent, Chip, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock, ExampleSection } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const ServicesDocumentationPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview & Kegunaan' },
    { id: 'quick-start', title: 'Quick Start' },
    { id: 'api-client', title: 'API Client Setup' },
    { id: 'authentication', title: 'Authentication' },
    { id: 'data-fetching', title: 'Data Fetching' },
    { id: 'error-handling', title: 'Error Handling' },
    { id: 'best-practices', title: 'Best Practices' }
  ];

  return (
    <DocumentationPageLayout
      title="Services & API"
      description="HTTP services, API integration, dan data management patterns"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Components Library',
          href: '/components/overview'
        },
        next: {
          title: 'Types System',
          href: '/types/overview'
        }
      }}
    >
      {/* Overview & Kegunaan */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Overview & Kegunaan
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>Services Layer</strong> menghandle semua komunikasi dengan backend API, authentication, data fetching,
          dan error handling secara konsisten.
        </Alert>

        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
          Services dirancang untuk:
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="api" style={{ fontSize: '1.5rem', color: '#4caf50' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    🌐 API Integration
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Centralized HTTP client dengan interceptors dan error handling
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="shield-check" style={{ fontSize: '1.5rem', color: '#2196f3' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    🔐 Authentication
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    JWT token management, refresh logic, dan session handling
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="database" style={{ fontSize: '1.5rem', color: '#ff9800' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    📊 Data Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    CRUD operations, caching, dan state synchronization
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4 }}>
          <Chip label="Axios" color="primary" size="small" />
          <Chip label="JWT" color="secondary" size="small" />
          <Chip label="Redux Toolkit Query" color="info" size="small" />
          <Chip label="TypeScript" color="success" size="small" />
          <Chip label="Error Boundaries" color="warning" size="small" />
        </Stack>
      </section>

      {/* Quick Start */}
      <section id="quick-start">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Quick Start
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Cara tercepat menggunakan services untuk API calls:
        </Typography>

        <CodeBlock
          language="typescript"
          title="1. Import service yang dibutuhkan"
          code={`// User management
import { userService } from '@/services/userService';

// Authentication
import { authService } from '@/services/authService';

// Generic API client
import { apiClient } from '@/services/apiClient';`}
        />

        <CodeBlock
          language="typescript"
          title="2. Basic API call dalam component"
          code={`const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await userService.getAll();
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <List>
      {users.map(user => (
        <ListItem key={user.id}>
          <ListItemText primary={user.name} secondary={user.email} />
        </ListItem>
      ))}
    </List>
  );
};`}
        />

        <Alert severity="info" sx={{ mt: 3 }}>
          <strong>💡 Tip:</strong> Services sudah include authentication headers, error handling, dan response
          transformation. Focus pada business logic!
        </Alert>
      </section>

      {/* API Client Setup */}
      <section id="api-client">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          API Client Setup
        </Typography>

        <ExampleSection
          id="axios-setup"
          title="Axios Configuration"
          description="Konfigurasi base API client dengan interceptors"
        >
          <CodeBlock
            language="typescript"
            title="apiClient Configuration"
            code={`// @/services/apiClient.ts
import axios, { AxiosInstance } from 'axios';
import { store } from '@/store';
import { logout, refreshToken } from '@/store/slices/authSlice';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.cring.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try refresh
      try {
        await store.dispatch(refreshToken());
        // Retry original request
        return apiClient(error.config);
      } catch (refreshError) {
        // Refresh failed, logout user
        store.dispatch(logout());
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export { apiClient };`}
          />

          <CodeBlock
            language="typescript"
            title="Service Base Class"
            code={`// @/services/BaseService.ts
import { apiClient } from './apiClient';
import { AxiosResponse } from 'axios';

export class BaseService {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  protected async get<T>(path: string = ''): Promise<AxiosResponse<T>> {
    return apiClient.get(\`\${this.endpoint}\${path}\`);
  }

  protected async post<T>(data: any, path: string = ''): Promise<AxiosResponse<T>> {
    return apiClient.post(\`\${this.endpoint}\${path}\`, data);
  }

  protected async put<T>(data: any, path: string = ''): Promise<AxiosResponse<T>> {
    return apiClient.put(\`\${this.endpoint}\${path}\`, data);
  }

  protected async delete<T>(path: string = ''): Promise<AxiosResponse<T>> {
    return apiClient.delete(\`\${this.endpoint}\${path}\`);
  }
}`}
          />
        </ExampleSection>
      </section>

      {/* Authentication */}
      <section id="authentication">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Authentication Service
        </Typography>

        <ExampleSection
          id="auth-service"
          title="Login & Token Management"
          description="Implementasi authentication dengan JWT dan automatic refresh"
        >
          <CodeBlock
            language="typescript"
            title="Auth Service Implementation"
            code={`// @/services/authService.ts
import { BaseService } from './BaseService';
import { LoginRequest, LoginResponse, User } from '@/types/auth';

class AuthService extends BaseService {
  constructor() {
    super('/auth');
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.post<LoginResponse>(credentials, '/login');
    
    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.post({}, '/logout');
    } finally {
      // Always clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.post<{ token: string }>({ 
      refreshToken 
    }, '/refresh');

    localStorage.setItem('token', response.data.token);
    return response.data.token;
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.get<User>('/me');
    return response.data;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const authService = new AuthService();`}
          />

          <CodeBlock
            language="typescript"
            title="Login Component Usage"
            code={`const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setError 
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    setLoading(true);
    
    try {
      const response = await authService.login(data);
      
      // Update Redux state
      dispatch(setUser(response.user));
      dispatch(setToken(response.token));
      
      // Redirect to dashboard
      router.push('/dashboard');
      
    } catch (error: any) {
      setError('root', {
        message: error.response?.data?.message || 'Login failed'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email', { required: 'Email is required' })}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        sx={{ mb: 2 }}
      />
      
      <TextField
        {...register('password', { required: 'Password is required' })}
        type="password"
        label="Password"
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        sx={{ mb: 3 }}
      />
      
      {errors.root && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.root.message}
        </Alert>
      )}

      <ButtonSubmit
        label="Login"
        isSend={loading}
        type="submit"
        fullWidth
        color="primary"
      />
    </form>
  );
};`}
          />
        </ExampleSection>
      </section>

      {/* Data Fetching */}
      <section id="data-fetching">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Data Fetching Patterns
        </Typography>

        <ExampleSection
          id="crud-service"
          title="CRUD Service Implementation"
          description="Standard patterns untuk Create, Read, Update, Delete operations"
        >
          <CodeBlock
            language="typescript"
            title="User Service Example"
            code={`// @/services/userService.ts
import { BaseService } from './BaseService';
import { User, CreateUserRequest, UpdateUserRequest } from '@/types/user';

class UserService extends BaseService {
  constructor() {
    super('/users');
  }

  async getAll(params?: { page?: number; limit?: number; search?: string }): Promise<{
    data: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    const response = await this.get<any>('', { params });
    return response.data;
  }

  async getById(id: string): Promise<User> {
    const response = await this.get<User>(\`/\${id}\`);
    return response.data;
  }

  async create(userData: CreateUserRequest): Promise<User> {
    const response = await this.post<User>(userData);
    return response.data;
  }

  async update(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await this.put<User>(userData, \`/\${id}\`);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.delete(\`/\${id}\`);
  }

  async changePassword(id: string, passwords: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await this.post(passwords, \`/\${id}/change-password\`);
  }
}

export const userService = new UserService();`}
          />

          <CodeBlock
            language="typescript"
            title="Using with React Hooks"
            code={`// Custom hook untuk user data management
const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchUsers = async (params?: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userService.getAll(params);
      setUsers(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: CreateUserRequest) => {
    try {
      const newUser = await userService.create(userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateUser = async (id: string, userData: UpdateUserRequest) => {
    try {
      const updatedUser = await userService.update(id, userData);
      setUsers(prev => 
        prev.map(user => user.id === id ? updatedUser : user)
      );
      return updatedUser;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await userService.delete(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  };
};`}
          />
        </ExampleSection>
      </section>

      {/* Error Handling */}
      <section id="error-handling">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Error Handling
        </Typography>

        <ExampleSection
          id="error-patterns"
          title="Error Handling Patterns"
          description="Consistent error handling across the application"
        >
          <CodeBlock
            language="typescript"
            title="Error Types & Utilities"
            code={`// @/services/errorHandler.ts
export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: any;
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'An error occurred',
      code: error.response.data?.code || 'UNKNOWN_ERROR',
      status: error.response.status,
      details: error.response.data
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'Network error - please check your connection',
      code: 'NETWORK_ERROR',
      status: 0
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'CLIENT_ERROR',
      status: 0
    };
  }
};

export const showErrorMessage = (error: ApiError) => {
  // Integration dengan notification system
  switch (error.code) {
    case 'VALIDATION_ERROR':
      return 'Please check your input and try again';
    case 'UNAUTHORIZED':
      return 'You are not authorized to perform this action';
    case 'NOT_FOUND':
      return 'The requested resource was not found';
    case 'NETWORK_ERROR':
      return 'Please check your internet connection';
    default:
      return error.message;
  }
};`}
          />

          <CodeBlock
            language="typescript"
            title="Component Error Handling"
            code={`const UserManagement = () => {
  const { users, loading, error, fetchUsers, createUser } = useUsers();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCreateUser = async (userData: CreateUserRequest) => {
    setSubmitError(null);
    
    try {
      await createUser(userData);
      // Show success message
      enqueueSnackbar('User created successfully', { variant: 'success' });
    } catch (error: any) {
      const apiError = handleApiError(error);
      const errorMessage = showErrorMessage(apiError);
      
      setSubmitError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  // Global error display
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        <AlertTitle>Error Loading Users</AlertTitle>
        {error}
        <Button onClick={() => fetchUsers()} sx={{ mt: 1 }}>
          Try Again
        </Button>
      </Alert>
    );
  }

  return (
    <Box>
      {/* Form with error handling */}
      <UserForm 
        onSubmit={handleCreateUser}
        error={submitError}
        loading={loading}
      />
      
      {/* Users list */}
      <UserList users={users} loading={loading} />
    </Box>
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
                <Typography variant="body2">• Always handle loading states dalam UI</Typography>
                <Typography variant="body2">• Implement proper error boundaries untuk API errors</Typography>
                <Typography variant="body2">• Use TypeScript interfaces untuk API responses</Typography>
                <Typography variant="body2">• Cache frequently accessed data</Typography>
                <Typography variant="body2">• Implement retry logic untuk network failures</Typography>
                <Typography variant="body2">• Log errors untuk debugging purposes</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#f44336' }}>
                ❌ Don'ts
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Jangan hardcode API URLs, gunakan environment variables</Typography>
                <Typography variant="body2">• Jangan ignore error responses dari server</Typography>
                <Typography variant="body2">• Jangan store sensitive data di localStorage</Typography>
                <Typography variant="body2">• Jangan make API calls di render loops</Typography>
                <Typography variant="body2">• Jangan skip loading states untuk better UX</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                💡 Tips
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  • Gunakan React Query untuk advanced caching dan background updates
                </Typography>
                <Typography variant="body2">• Implement request/response logging untuk debugging</Typography>
                <Typography variant="body2">• Create custom hooks untuk complex data operations</Typography>
                <Typography variant="body2">• Use optimistic updates untuk better user experience</Typography>
                <Typography variant="body2">• Implement offline support dengan service workers</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="info" sx={{ mt: 4 }}>
          <strong>Need Help?</strong> Jika ada API endpoint baru atau service pattern yang perlu ditambahkan, coordinate
          dengan backend team dan update dokumentasi ini.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default ServicesDocumentationPage;
