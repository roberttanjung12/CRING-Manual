'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const AuthenticationPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Authentication Overview' },
    { id: 'jwt-implementation', title: 'JWT Implementation' },
    { id: 'auth-flow', title: 'Authentication Flow' },
    { id: 'protected-routes', title: 'Protected Routes' },
    { id: 'refresh-tokens', title: 'Token Refresh' }
  ];

  return (
    <DocumentationPageLayout
      title="Authentication"
      description="JWT-based authentication system dan secure route protection patterns"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'API Architecture',
          href: '/data-services/api-architecture'
        },
        next: {
          title: 'Data Fetching',
          href: '/data-services/data-fetching'
        }
      }}
    >
      {/* Overview */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Authentication System
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner menggunakan JWT (JSON Web Token) untuk authentication dengan automatic token refresh dan secure
          route protection.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="JWT Tokens" color="primary" variant="outlined" />
          <Chip label="Auto Refresh" color="secondary" variant="outlined" />
          <Chip label="Role-based" color="success" variant="outlined" />
          <Chip label="Secure Routes" color="warning" variant="outlined" />
        </Stack>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Security First:</strong> All sensitive operations require authentication, dan tokens are automatically
          managed dengan secure storage practices.
        </Alert>
      </section>

      {/* JWT Implementation */}
      <section id="jwt-implementation">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          JWT Implementation
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🔐 Auth Types & Interfaces
              </Typography>

              <CodeBlock
                language="typescript"
                title="Authentication type definitions"
                code={`// Authentication types
interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  role?: UserRole;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type UserRole = 'admin' | 'manager' | 'operator' | 'viewer';

// JWT payload structure
interface JWTPayload {
  sub: string;           // User ID
  email: string;
  name: string;
  role: UserRole;
  iat: number;           // Issued at
  exp: number;           // Expires at
  jti: string;           // JWT ID
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🔑 Auth Service Implementation
              </Typography>

              <CodeBlock
                language="typescript"
                title="Authentication service"
                code={`import jwt from 'jsonwebtoken';

class AuthService {
  private readonly TOKEN_KEY = 'cring_access_token';
  private readonly REFRESH_KEY = 'cring_refresh_token';
  private readonly USER_KEY = 'cring_user';

  constructor(private api: APIService) {}

  // Login user
  async login(credentials: LoginCredentials): Promise<APIResponse<AuthTokens & { user: User }>> {
    try {
      const response = await this.api.post<AuthTokens & { user: User }>('/auth/login', credentials);
      
      if (response.success) {
        this.setTokens(response.data);
        this.setUser(response.data.user);
        this.api.setAuthToken(response.data.accessToken);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Register user
  async register(userData: RegisterData): Promise<APIResponse<{ user: User }>> {
    try {
      const response = await this.api.post<{ user: User }>('/auth/register', userData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        await this.api.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      this.clearAuth();
    }
  }

  // Refresh access token
  async refreshToken(): Promise<AuthTokens | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await this.api.post<AuthTokens>('/auth/refresh', {
        refreshToken
      });

      if (response.success) {
        this.setTokens(response.data);
        this.api.setAuthToken(response.data.accessToken);
        return response.data;
      }

      return null;
    } catch (error) {
      this.clearAuth();
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const payload = jwt.decode(token) as JWTPayload;
      if (!payload || !payload.exp) return false;

      // Check if token is expired (with 5 minute buffer)
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > (now + 300);
    } catch {
      return false;
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  // Token management
  private setTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_KEY, tokens.refreshToken);
  }

  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  private clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.api.setAuthToken(null);
  }

  // Check token expiry
  getTokenExpiry(): number | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = jwt.decode(token) as JWTPayload;
      return payload.exp * 1000; // Convert to milliseconds
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService(apiService);`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Auth Flow */}
      <section id="auth-flow">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Authentication Flow
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🔄 Redux Auth Slice
              </Typography>

              <CodeBlock
                language="typescript"
                title="Auth state management dengan Redux Toolkit"
                code={`import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshAuth = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const tokens = await authService.refreshToken();
      return tokens;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout();
  }
);

// Initial state
const initialState: AuthState = {
  user: authService.getCurrentUser(),
  tokens: null,
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    initializeAuth: (state) => {
      state.user = authService.getCurrentUser();
      state.isAuthenticated = authService.isAuthenticated();
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.tokens = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          expiresIn: action.payload.expiresIn,
          tokenType: action.payload.tokenType,
        };
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.tokens = null;
        state.error = action.payload as string;
      })

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Refresh
    builder
      .addCase(refreshAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.tokens = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(refreshAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.tokens = null;
      })

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    });
  },
});

export const { clearError, setUser, initializeAuth } = authSlice.actions;
export default authSlice.reducer;`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🎯 Login Component Example
              </Typography>

              <CodeBlock
                language="typescript"
                title="Login form implementation"
                code={`import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginUser, clearError } from '@/store/slices/authSlice';

function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    remember: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      
      // Redirect after successful login
      const redirectTo = searchParams.get('redirectTo') || '/dashboard';
      router.push(redirectTo);
      
      // Show success notification
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error || 'Login failed');
    }
  };

  const handleInputChange = (field: keyof LoginCredentials) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === 'remember' ? e.target.checked : e.target.value;
      setCredentials(prev => ({ ...prev, [field]: value }));
    };

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <CardContent>
        <Typography variant="h5" component="h1" textAlign="center" sx={{ mb: 3 }}>
          Login to CRING!
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              value={credentials.email}
              onChange={handleInputChange('email')}
              required
              fullWidth
              disabled={isLoading}
            />

            <TextField
              label="Password"
              type="password"
              value={credentials.password}
              onChange={handleInputChange('password')}
              required
              fullWidth
              disabled={isLoading}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={credentials.remember}
                  onChange={handleInputChange('remember')}
                  disabled={isLoading}
                />
              }
              label="Remember me"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={16} /> : null}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </Stack>
        </form>

        <Box textAlign="center" sx={{ mt: 2 }}>
          <Link href="/auth/forgot-password" color="primary">
            Forgot password?
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Protected Routes */}
      <section id="protected-routes">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Protected Routes & Authorization
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🛡️ Route Protection HOC
              </Typography>

              <CodeBlock
                language="typescript"
                title="withAuth higher-order component"
                code={`import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { initializeAuth } from '@/store/slices/authSlice';

interface WithAuthOptions {
  requireAuth?: boolean;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export function withAuth<T extends {}>(
  Component: React.ComponentType<T>,
  options: WithAuthOptions = {}
) {
  const {
    requireAuth = true,
    allowedRoles,
    redirectTo = '/auth/login'
  } = options;

  return function AuthenticatedComponent(props: T) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user, isLoading } = useAppSelector((state) => state.auth);

    useEffect(() => {
      // Initialize auth state dari localStorage
      dispatch(initializeAuth());
    }, [dispatch]);

    useEffect(() => {
      if (isLoading) return;

      // Check if authentication is required
      if (requireAuth && !isAuthenticated) {
        const currentPath = window.location.pathname;
        router.replace(\`\${redirectTo}?redirectTo=\${encodeURIComponent(currentPath)}\`);
        return;
      }

      // Check role-based access
      if (isAuthenticated && allowedRoles && user) {
        if (!allowedRoles.includes(user.role)) {
          router.replace('/unauthorized');
          return;
        }
      }
    }, [isAuthenticated, user, isLoading, router]);

    // Show loading while checking auth
    if (isLoading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      );
    }

    // Show nothing while redirecting
    if (requireAuth && !isAuthenticated) {
      return null;
    }

    // Show unauthorized if role check fails
    if (isAuthenticated && allowedRoles && user && !allowedRoles.includes(user.role)) {
      return null;
    }

    return <Component {...props} />;
  };
}

// Usage examples
export const withRequiredAuth = <T extends {}>(Component: React.ComponentType<T>) =>
  withAuth(Component, { requireAuth: true });

export const withAdminOnly = <T extends {}>(Component: React.ComponentType<T>) =>
  withAuth(Component, { requireAuth: true, allowedRoles: ['admin'] });

export const withManagerAccess = <T extends {}>(Component: React.ComponentType<T>) =>
  withAuth(Component, { requireAuth: true, allowedRoles: ['admin', 'manager'] });`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🔐 Route Guards dengan Middleware
              </Typography>

              <CodeBlock
                language="typescript"
                title="Next.js middleware untuk route protection"
                code={`// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password'];
const adminRoutes = ['/admin', '/users/manage', '/system'];
const managerRoutes = ['/reports', '/analytics'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('cring_access_token')?.value;
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check authentication
  if (!token) {
    return NextResponse.redirect(
      new URL(\`/auth/login?redirectTo=\${encodeURIComponent(pathname)}\`, request.url)
    );
  }

  try {
    const payload = jwt.decode(token) as JWTPayload;
    
    if (!payload || !payload.exp) {
      throw new Error('Invalid token');
    }

    // Check token expiry
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) {
      throw new Error('Token expired');
    }

    // Check role-based access
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }

    if (managerRoutes.some(route => pathname.startsWith(route))) {
      if (!['admin', 'manager'].includes(payload.role)) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    // Token is invalid, redirect to login
    return NextResponse.redirect(
      new URL(\`/auth/login?redirectTo=\${encodeURIComponent(pathname)}\`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Token Refresh */}
      <section id="refresh-tokens">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Automatic Token Refresh
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              🔄 Auto-refresh Implementation
            </Typography>

            <CodeBlock
              language="typescript"
              title="Token refresh hook dan interceptor"
              code={`// hooks/useTokenRefresh.ts
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { refreshAuth, logoutUser } from '@/store/slices/authSlice';

export function useTokenRefresh() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, tokens } = useAppSelector((state) => state.auth);
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !tokens) {
      return;
    }

    const scheduleRefresh = () => {
      const tokenExpiry = authService.getTokenExpiry();
      if (!tokenExpiry) return;

      const now = Date.now();
      const timeUntilExpiry = tokenExpiry - now;
      
      // Refresh 5 minutes before expiry
      const refreshTime = Math.max(timeUntilExpiry - (5 * 60 * 1000), 0);

      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }

      refreshTimeoutRef.current = setTimeout(async () => {
        try {
          await dispatch(refreshAuth()).unwrap();
          scheduleRefresh(); // Schedule next refresh
        } catch (error) {
          console.error('Token refresh failed:', error);
          dispatch(logoutUser());
        }
      }, refreshTime);
    };

    scheduleRefresh();

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [isAuthenticated, tokens, dispatch]);
}

// API interceptor untuk automatic retry dengan refreshed token
class AuthInterceptor {
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
  }> = [];

  constructor(private apiService: APIService) {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Response interceptor
    this.apiService.addResponseInterceptor(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Queue the request while token is being refreshed
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then((token) => {
              originalRequest.headers.Authorization = \`Bearer \${token}\`;
              return this.apiService.request(originalRequest);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newTokens = await authService.refreshToken();
            
            if (newTokens) {
              // Update API client with new token
              this.apiService.setAuthToken(newTokens.accessToken);
              
              // Retry all queued requests
              this.processQueue(newTokens.accessToken, null);
              
              // Retry original request
              originalRequest.headers.Authorization = \`Bearer \${newTokens.accessToken}\`;
              return this.apiService.request(originalRequest);
            } else {
              throw new Error('Token refresh failed');
            }
          } catch (refreshError) {
            this.processQueue(null, refreshError);
            
            // Clear auth and redirect to login
            authService.logout();
            window.location.href = '/auth/login';
            
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(token: string | null, error: any) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }
}

// Initialize interceptor
new AuthInterceptor(apiService);`}
            />
          </CardContent>
        </Card>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Secure Authentication Ready!</strong> JWT-based system dengan automatic token refresh ensures seamless
          user experience dan robust security. All routes are protected dengan proper authorization checks.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default AuthenticationPage;
