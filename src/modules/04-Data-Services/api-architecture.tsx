'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const APIArchitecturePage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'API Overview' },
    { id: 'rest-structure', title: 'REST API Structure' },
    { id: 'data-flow', title: 'Data Flow Architecture' },
    { id: 'api-client', title: 'API Client Setup' },
    { id: 'best-practices', title: 'Best Practices' }
  ];

  return (
    <DocumentationPageLayout
      title="API Architecture"
      description="Understanding REST API structure dan data flow patterns di CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Creating Components',
          href: '/components/creating'
        },
        next: {
          title: 'Authentication',
          href: '/data-services/authentication'
        }
      }}
    >
      {/* Overview */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          API Architecture Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner menggunakan RESTful API architecture dengan standardized response format dan consistent error
          handling patterns.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="REST API" color="primary" variant="outlined" />
          <Chip label="JSON Response" color="secondary" variant="outlined" />
          <Chip label="JWT Auth" color="success" variant="outlined" />
          <Chip label="Error Handling" color="warning" variant="outlined" />
        </Stack>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>API Base URL:</strong> All API endpoints are prefixed dengan base URL yang configurable through
          environment variables (<code>NEXT_PUBLIC_API_HOST</code>).
        </Alert>
      </section>

      {/* CRING Service Layer */}
      <section id="cring-service-layer">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          CRING Service Layer Architecture
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING menggunakan custom service layer yang menggabungkan Axios dengan error handling, authentication, dan
          monitoring yang terintegrasi. Berikut adalah struktur service layer yang digunakan:
        </Typography>

        <CodeBlock
          language="typescript"
          title="services/index.ts - Core Service Configuration"
          code={`import axios, { type AxiosRequestConfig, type AxiosError, type AxiosResponse } from 'axios';
import isMultiSession from '@/utility/is-multi-session';
import { getValidAccessToken } from '@/utility/local-storage';

interface ServiceProps<TParams> {
  isDisabledAuth?: boolean;
  token?: string;
  params?: TParams;
  contentType?: string;
  responseType?: ResponseType;
}

const instance = axios.create({ 
  baseURL: process.env.NEXT_PUBLIC_API_HOST 
});

const config = <TParams>(newConfig?: ServiceProps<TParams>): AxiosRequestConfig => {
  const getToken = newConfig?.token ?? getValidAccessToken();
  const set: AxiosRequestConfig = {
    headers: {
      'Content-Type': newConfig?.contentType ?? 'application/json',
      Authorization: \`Bearer \${getToken}\`
    },
    params: newConfig?.params,
    responseType: newConfig?.responseType
  };

  if (newConfig?.isDisabledAuth) delete set.headers?.Authorization;
  return set;
};

// GET method with error handling
const onGet = async <TParams, TResponse>(
  url: string,
  newConfig?: ServiceProps<TParams>,
  onError?: (error: AxiosError) => void
): Promise<AxiosResponse<TResponse>> => {
  try {
    return await instance.get(url, config<TParams>(newConfig));
  } catch (error) {
    const getError = error as AxiosError;
    isMultiSession(getError.response, true); // Handle multi-session
    if (typeof onError === 'function') onError(getError);
    throw error;
  }
};`}
        />

        <Typography variant="body1" sx={{ mb: 3 }}>
          <strong>Key Features:</strong>
        </Typography>
        <ul style={{ marginBottom: '24px' }}>
          <li>
            <strong>Auto-authentication:</strong> Token otomatis ditambahkan ke headers
          </li>
          <li>
            <strong>Multi-session handling:</strong> Deteksi dan handle multi-device login
          </li>
          <li>
            <strong>Custom error handling:</strong> Callback untuk handle error spesifik
          </li>
        </ul>

        <CodeBlock
          language="typescript"
          title="services/auth.js - Authentication Service Example"
          code={`import AxiosError from 'axios-error';
import isEmpty from 'is-empty';
import services from '@/configs/service';
import jungAlert from '../utility/jung-alert';

// Specific error condition handling
const conAddAuth = ({ messageLowerCase }, { cb1, cb2, cb3, cb4, cb5 }) => {
  if (messageLowerCase === 'invalid credential') {
    cb1(); // Wrong username/password
  } else if (messageLowerCase === 'user have not set password') {
    cb2(); // Password not set
  } else if (messageLowerCase === 'inactive user') {
    cb3(); // Account not activated
  } else if (messageLowerCase === 'sesi anda di perangkat ini telah berakhir...') {
    cb4(); // Multi-session detected
  } else cb5(); // Other errors
};

const onAddAuth = async (data, configs) => {
  return await services({
    method: 'POST',
    url: '/user/login',
    data,
    configs,
    contentType: 'application/json',
    onError: err => {
      const error = new AxiosError(err).response;
      const alertObj = { type: 'error', text: '' };
      let count = 0;

      if (!isEmpty(error?.data?.message)) {
        const messageLowerCase = error.data.message.toLowerCase();
        
        conAddAuth({ messageLowerCase }, {
          cb1: () => { alertObj.text = 'Username / password yang anda masukan salah'; },
          cb2: () => { alertObj.text = 'Password anda belum diatur'; },
          cb3: () => { alertObj.text = 'Akun Anda belum aktif...'; },
          cb4: () => { alertObj.text = 'Sesi anda di perangkat ini telah berakhir...'; },
          cb5: () => { count += 1; }
        });
      } else count += 1;

      if (!configs?.isHidePopupError && count <= 0) jungAlert(alertObj);
    }
  });
};

// Export all auth services
export {
  onGetAuth,
  onAddAuth,
  onAddAuthLogout,
  onGetAuthMenus,
  onAddAuthPassword,
  onAddAuthForgotPassword
};`}
        />
      </section>

      {/* REST Structure */}
      <section id="rest-structure">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          REST API Structure
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                📋 Standard Response Format
              </Typography>

              <CodeBlock
                language="typescript"
                title="API Response Types"
                code={`// Standard success response
interface APIResponse<T = any> {
  success: true;
  data: T;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Standard error response
interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
}

// Example success responses
const userListResponse: APIResponse<User[]> = {
  success: true,
  data: [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
  ],
  message: "Users retrieved successfully",
  meta: {
    page: 1,
    limit: 10,
    total: 25,
    totalPages: 3
  }
};

// Example error response
const errorResponse: APIError = {
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid request data",
    details: {
      email: "Email format is invalid",
      password: "Password must be at least 8 characters"
    }
  }
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🛣️ API Endpoints Structure
              </Typography>

              <CodeBlock
                language="bash"
                title="REST endpoint patterns"
                code={`# Authentication endpoints
POST   /api/auth/login           # User login
POST   /api/auth/register        # User registration
POST   /api/auth/refresh         # Refresh JWT token
POST   /api/auth/logout          # User logout
POST   /api/auth/forgot-password # Request password reset
POST   /api/auth/reset-password  # Reset password with token

# User management
GET    /api/users                # List all users (paginated)
GET    /api/users/:id            # Get specific user
POST   /api/users                # Create new user
PUT    /api/users/:id            # Update user (full)
PATCH  /api/users/:id            # Update user (partial)
DELETE /api/users/:id            # Delete user

# Merchant management
GET    /api/merchants            # List merchants
GET    /api/merchants/:id        # Get merchant details
POST   /api/merchants            # Create merchant
PUT    /api/merchants/:id        # Update merchant
DELETE /api/merchants/:id        # Delete merchant

# Transaction endpoints
GET    /api/transactions         # List transactions (filtered)
GET    /api/transactions/:id     # Get transaction details
POST   /api/transactions         # Create transaction
PUT    /api/transactions/:id/status  # Update transaction status

# Report endpoints
GET    /api/reports/dashboard    # Dashboard statistics
GET    /api/reports/transactions # Transaction reports
GET    /api/reports/revenue      # Revenue reports
POST   /api/reports/export       # Export data

# File upload endpoints
POST   /api/upload/single        # Upload single file
POST   /api/upload/multiple      # Upload multiple files
DELETE /api/upload/:fileId       # Delete uploaded file`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Data Flow */}
      <section id="data-flow">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Data Flow Architecture
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🔄 Request/Response Flow
              </Typography>

              <CodeBlock
                language="typescript"
                title="Data flow implementation"
                code={`// 1. API Service Layer
class APIService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    const url = \`\${this.baseURL}\${endpoint}\`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: \`Bearer \${this.token}\` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new APIError(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError({
        code: 'NETWORK_ERROR',
        message: 'Network request failed'
      });
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<APIResponse<T>> {
    const url = params ? \`\${endpoint}?\${new URLSearchParams(params)}\` : endpoint;
    return this.request<T>(url);
  }

  async post<T>(endpoint: string, body?: any): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body?: any): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<APIResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// 2. Domain-specific Services
class UserService {
  constructor(private api: APIService) {}

  async getUsers(params?: UserListParams): Promise<APIResponse<User[]>> {
    return this.api.get('/users', params);
  }

  async getUser(id: string): Promise<APIResponse<User>> {
    return this.api.get(\`/users/\${id}\`);
  }

  async createUser(userData: CreateUserData): Promise<APIResponse<User>> {
    return this.api.post('/users', userData);
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<APIResponse<User>> {
    return this.api.put(\`/users/\${id}\`, userData);
  }

  async deleteUser(id: string): Promise<APIResponse<void>> {
    return this.api.delete(\`/users/\${id}\`);
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                ⚛️ React Integration dengan RTK Query
              </Typography>

              <CodeBlock
                language="typescript"
                title="RTK Query API slice"
                code={`import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query configuration
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', \`Bearer \${token}\`);
    }
    return headers;
  },
});

// API slice definition
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['User', 'Merchant', 'Transaction'],
  endpoints: (builder) => ({
    // User endpoints
    getUsers: builder.query<APIResponse<User[]>, UserListParams | void>({
      query: (params) => ({
        url: '/users',
        params,
      }),
      providesTags: ['User'],
    }),

    getUser: builder.query<APIResponse<User>, string>({
      query: (id) => \`/users/\${id}\`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    createUser: builder.mutation<APIResponse<User>, CreateUserData>({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: builder.mutation<APIResponse<User>, { id: string; data: UpdateUserData }>({
      query: ({ id, data }) => ({
        url: \`/users/\${id}\`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),

    deleteUser: builder.mutation<APIResponse<void>, string>({
      query: (id) => ({
        url: \`/users/\${id}\`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = apiSlice;`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* API Client */}
      <section id="api-client">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          API Client Configuration
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              🔧 Environment-based Configuration
            </Typography>

            <CodeBlock
              language="typescript"
              title="API client setup"
              code={`// config/api.ts
interface APIConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

const getAPIConfig = (): APIConfig => {
  const env = process.env.NODE_ENV;
  
  const configs = {
    development: {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_DEV || 'http://localhost:3001/api',
      timeout: 10000,
      retryAttempts: 3,
      retryDelay: 1000,
    },
    staging: {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_STAGING || 'https://staging-api.cring.com/api',
      timeout: 15000,
      retryAttempts: 3,
      retryDelay: 1500,
    },
    production: {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.cring.com/api',
      timeout: 20000,
      retryAttempts: 5,
      retryDelay: 2000,
    },
  };

  return configs[env as keyof typeof configs] || configs.development;
};

// services/apiClient.ts
const apiConfig = getAPIConfig();
const apiService = new APIService(apiConfig.baseURL);

// Service instances
export const userService = new UserService(apiService);
export const merchantService = new MerchantService(apiService);
export const transactionService = new TransactionService(apiService);
export const reportService = new ReportService(apiService);

// Export configured API client
export { apiService };
export default apiService;`}
            />
          </CardContent>
        </Card>
      </section>

      {/* Best Practices */}
      <section id="best-practices">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          API Best Practices
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                ✅ Development Guidelines
              </Typography>

              <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                <strong>1. Error Handling:</strong>
              </Typography>
              <CodeBlock
                language="typescript"
                title="Consistent error handling"
                code={`// Always handle errors consistently
try {
  const response = await userService.getUsers();
  if (response.success) {
    setUsers(response.data);
  }
} catch (error) {
  if (error instanceof APIError) {
    // Handle known API errors
    setError(error.message);
  } else {
    // Handle unexpected errors
    setError('Something went wrong. Please try again.');
  }
}

// Use error boundaries for unhandled errors
class APIErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (error instanceof APIError) {
      // Log API errors to monitoring service
      logError('API_ERROR', error, errorInfo);
    }
  }
}`}
              />

              <Typography variant="body2" component="div" sx={{ mb: 2, mt: 3 }}>
                <strong>2. Request Optimization:</strong>
              </Typography>
              <CodeBlock
                language="typescript"
                title="Optimize API requests"
                code={`// Use RTK Query for automatic caching
const { data: users, error, isLoading } = useGetUsersQuery({
  page: 1,
  limit: 10
});

// Prefetch data for better UX
const dispatch = useAppDispatch();
const handleNavigateToUserDetail = (userId: string) => {
  // Prefetch user data before navigation
  dispatch(apiSlice.util.prefetch('getUser', userId, { force: false }));
  router.push(\`/users/\${userId}\`);
};

// Use debouncing for search
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useMemo(
  () => debounce((term: string) => {
    // Trigger search API call
    refetch();
  }, 300),
  []
);`}
              />

              <Typography variant="body2" component="div" sx={{ mb: 2, mt: 3 }}>
                <strong>3. Security Practices:</strong>
              </Typography>
              <CodeBlock
                language="typescript"
                title="Security implementation"
                code={`// Never expose sensitive data in client
const sanitizeUserData = (user: User) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  // Don't include sensitive fields like password, tokens, etc.
});

// Validate data before API calls
const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const handleCreateUser = async (userData: any) => {
  try {
    const validData = createUserSchema.parse(userData);
    await userService.createUser(validData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      setValidationErrors(error.formErrors);
    }
  }
};`}
              />
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Architecture Ready!</strong> API architecture provides solid foundation untuk scalable dan
          maintainable data layer. Follow these patterns untuk consistent implementation across application.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default APIArchitecturePage;
