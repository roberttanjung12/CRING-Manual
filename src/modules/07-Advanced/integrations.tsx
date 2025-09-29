'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const IntegrationsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Integration Overview' },
    { id: 'api-clients', title: 'API Client Architecture' },
    { id: 'authentication', title: 'Authentication Integration' },
    { id: 'third-party', title: 'Third-party Services' },
    { id: 'webhooks', title: 'Webhook Handling' }
  ];

  return (
    <DocumentationPageLayout
      title="Third-party Integrations"
      description="Integration dengan external APIs dan services untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Complex State',
          href: '/advanced/complex-state'
        },
        next: {
          title: 'Patterns',
          href: '/cookbook/patterns'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Third-party Integration Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner mengintegrasikan berbagai external services dan APIs untuk functionality yang comprehensive.
          Dari payment gateways, authentication providers, hingga monitoring services - semua dikelola dengan
          architecture yang scalable.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="API Integration" color="primary" variant="outlined" />
          <Chip label="Authentication" color="secondary" variant="outlined" />
          <Chip label="Webhooks" color="info" variant="outlined" />
          <Chip label="Third-party" color="success" variant="outlined" />
        </Stack>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Integration Architecture:</strong> Menggunakan abstraction layer untuk semua external integrations
          dengan proper error handling dan retry mechanisms.
        </Alert>
      </section>

      <section id="api-clients">
        <Typography variant="h5" sx={{ mb: 2 }}>
          API Client Architecture
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🔌 Base API Client dengan Advanced Features
            </Typography>
            <CodeBlock
              language="typescript"
              title="Universal API client dengan retry, caching, dan monitoring"
              code={`// Base API client configuration
interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  enableCache: boolean;
  cacheTimeout: number;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

interface ApiError {
  message: string;
  status: number;
  code: string;
  details?: any;
}

// Enhanced API client class
export class ApiClient {
  private config: ApiClientConfig;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private requestQueue: Map<string, Promise<any>> = new Map();

  constructor(config: ApiClientConfig) {
    this.config = {
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      enableCache: false,
      cacheTimeout: 5 * 60 * 1000, // 5 minutes
      ...config
    };
  }

  // Generic request method with retry and caching
  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    data?: any,
    options: {
      cache?: boolean;
      timeout?: number;
      retryAttempts?: number;
      headers?: Record<string, string>;
    } = {}
  ): Promise<ApiResponse<T>> {
    const cacheKey = \`\${method}:\${endpoint}:\${JSON.stringify(data)}\`;
    const useCache = options.cache ?? this.config.enableCache;

    // Check cache for GET requests
    if (method === 'GET' && useCache) {
      const cached = this.getCached<T>(cacheKey);
      if (cached) return cached;
    }

    // Deduplicate identical requests
    if (this.requestQueue.has(cacheKey)) {
      return this.requestQueue.get(cacheKey);
    }

    const requestPromise = this.executeRequest<T>(method, endpoint, data, options);
    this.requestQueue.set(cacheKey, requestPromise);

    try {
      const result = await requestPromise;
      
      // Cache successful GET requests
      if (method === 'GET' && useCache && result.status < 400) {
        this.setCache(cacheKey, result);
      }

      return result;
    } finally {
      this.requestQueue.delete(cacheKey);
    }
  }

  private async executeRequest<T>(
    method: string,
    endpoint: string,
    data?: any,
    options: any = {}
  ): Promise<ApiResponse<T>> {
    const maxAttempts = options.retryAttempts ?? this.config.retryAttempts;
    let lastError: ApiError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          options.timeout ?? this.config.timeout
        );

        const response = await fetch(\`\${this.config.baseURL}\${endpoint}\`, {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...this.config.headers,
            ...options.headers
          },
          body: data ? JSON.stringify(data) : undefined,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(\`API Error: \${response.status} - \${errorData.message || response.statusText}\`);
        }

        const responseData = await response.json();
        
        return {
          data: responseData,
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          meta: responseData.meta
        };

      } catch (error) {
        lastError = {
          message: error.message || 'Network error',
          status: error.status || 0,
          code: error.code || 'UNKNOWN_ERROR',
          details: error
        };

        // Don't retry on client errors (4xx)
        if (error.status >= 400 && error.status < 500) {
          break;
        }

        if (attempt < maxAttempts) {
          await this.delay(this.config.retryDelay * Math.pow(2, attempt - 1));
        }
      }
    }

    throw lastError;
  }

  // Public API methods
  async get<T>(endpoint: string, options?: any): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, options);
  }

  async post<T>(endpoint: string, data: any, options?: any): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, options);
  }

  async put<T>(endpoint: string, data: any, options?: any): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, options);
  }

  async patch<T>(endpoint: string, data: any, options?: any): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, options);
  }

  async delete<T>(endpoint: string, options?: any): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, options);
  }

  // Cache management
  private getCached<T>(key: string): ApiResponse<T> | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.config.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Utility methods
  clearCache(): void {
    this.cache.clear();
  }

  updateConfig(updates: Partial<ApiClientConfig>): void {
    this.config = { ...this.config, ...updates };
  }
}

// Specialized API clients
export const cringApiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.cring.id',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  enableCache: true,
  cacheTimeout: 5 * 60 * 1000,
  headers: {
    'Accept': 'application/json',
    'X-Client-Version': '1.0.0'
  }
});

export const paymentApiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_PAYMENT_API_URL || 'https://payment.cring.id',
  timeout: 60000, // Payment API needs longer timeout
  retryAttempts: 5,
  retryDelay: 2000,
  enableCache: false, // Never cache payment requests
  headers: {
    'Accept': 'application/json',
    'X-Payment-Client': 'portal-partner'
  }
});`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="authentication">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Authentication Integration
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🔐 JWT Authentication dengan Auto-Refresh
              </Typography>
              <CodeBlock
                language="typescript"
                title="Complete authentication system dengan token management"
                code={`// Authentication service with token management
interface TokenData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  permissions: string[];
}

class AuthenticationService {
  private tokenData: TokenData | null = null;
  private refreshPromise: Promise<TokenData> | null = null;
  private user: User | null = null;

  constructor() {
    this.loadTokenFromStorage();
    this.setupTokenInterceptor();
  }

  // Login with credentials
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await cringApiClient.post<{
        user: User;
        token: TokenData;
      }>('/auth/login', { email, password });

      this.tokenData = response.data.token;
      this.user = response.data.user;
      
      this.saveTokenToStorage();
      this.scheduleTokenRefresh();

      return this.user;
    } catch (error) {
      throw new Error(\`Login failed: \${error.message}\`);
    }
  }

  // Logout and cleanup
  async logout(): Promise<void> {
    try {
      if (this.tokenData?.refreshToken) {
        await cringApiClient.post('/auth/logout', {
          refreshToken: this.tokenData.refreshToken
        });
      }
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      this.clearTokenData();
      this.clearTokenFromStorage();
    }
  }

  // Get current access token with auto-refresh
  async getValidToken(): Promise<string> {
    if (!this.tokenData) {
      throw new Error('Not authenticated');
    }

    // Check if token is expired or will expire in 5 minutes
    const expiresAt = Date.now() + (this.tokenData.expiresIn * 1000);
    const fiveMinutes = 5 * 60 * 1000;

    if (Date.now() + fiveMinutes >= expiresAt) {
      await this.refreshAccessToken();
    }

    return this.tokenData.accessToken;
  }

  // Refresh access token
  private async refreshAccessToken(): Promise<TokenData> {
    // Prevent multiple simultaneous refresh attempts
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    if (!this.tokenData?.refreshToken) {
      throw new Error('No refresh token available');
    }

    this.refreshPromise = this.performTokenRefresh();
    
    try {
      const newTokenData = await this.refreshPromise;
      this.tokenData = newTokenData;
      this.saveTokenToStorage();
      this.scheduleTokenRefresh();
      return newTokenData;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performTokenRefresh(): Promise<TokenData> {
    try {
      const response = await cringApiClient.post<{ token: TokenData }>('/auth/refresh', {
        refreshToken: this.tokenData?.refreshToken
      });

      return response.data.token;
    } catch (error) {
      // If refresh fails, clear tokens and redirect to login
      this.clearTokenData();
      this.clearTokenFromStorage();
      window.location.href = '/login';
      throw new Error('Token refresh failed');
    }
  }

  // Setup automatic token injection
  private setupTokenInterceptor(): void {
    const originalRequest = cringApiClient.request;
    
    cringApiClient.request = async (method, endpoint, data, options = {}) => {
      try {
        const token = await this.getValidToken();
        options.headers = {
          ...options.headers,
          'Authorization': \`Bearer \${token}\`
        };
      } catch (error) {
        // If no valid token, continue without Authorization header
        console.warn('No valid token for request:', endpoint);
      }

      return originalRequest.call(cringApiClient, method, endpoint, data, options);
    };
  }

  // Schedule automatic token refresh
  private scheduleTokenRefresh(): void {
    if (!this.tokenData) return;

    const expiresIn = this.tokenData.expiresIn * 1000;
    const refreshAt = expiresIn - (10 * 60 * 1000); // Refresh 10 minutes before expiry

    setTimeout(() => {
      this.refreshAccessToken().catch(console.error);
    }, Math.max(refreshAt, 60000)); // At least 1 minute delay
  }

  // Token storage management
  private saveTokenToStorage(): void {
    if (this.tokenData) {
      localStorage.setItem('auth-token', JSON.stringify(this.tokenData));
    }
    if (this.user) {
      localStorage.setItem('auth-user', JSON.stringify(this.user));
    }
  }

  private loadTokenFromStorage(): void {
    try {
      const tokenJson = localStorage.getItem('auth-token');
      const userJson = localStorage.getItem('auth-user');
      
      if (tokenJson) {
        this.tokenData = JSON.parse(tokenJson);
        this.scheduleTokenRefresh();
      }
      
      if (userJson) {
        this.user = JSON.parse(userJson);
      }
    } catch (error) {
      console.error('Failed to load tokens from storage:', error);
      this.clearTokenFromStorage();
    }
  }

  private clearTokenFromStorage(): void {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
  }

  private clearTokenData(): void {
    this.tokenData = null;
    this.user = null;
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.tokenData && !!this.user;
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  hasPermission(permission: string): boolean {
    return this.user?.permissions?.includes(permission) ?? false;
  }

  hasRole(role: string): boolean {
    return this.user?.roles?.includes(role) ?? false;
  }
}

// Export singleton instance
export const authService = new AuthenticationService();

// React hook for authentication
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [user, setUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated());
      setUser(authService.getCurrentUser());
    };

    // Check auth status periodically
    const interval = setInterval(checkAuth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    isAuthenticated,
    user,
    login: authService.login.bind(authService),
    logout: authService.logout.bind(authService),
    hasPermission: authService.hasPermission.bind(authService),
    hasRole: authService.hasRole.bind(authService)
  };
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                🛡️ Role-Based Access Control (RBAC)
              </Typography>
              <CodeBlock
                language="typescript"
                title="RBAC implementation dengan React components"
                code={`// RBAC utility functions
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
  VIEWER: 'viewer'
} as const;

export const PERMISSIONS = {
  // Merchant permissions
  MERCHANT_CREATE: 'merchant.create',
  MERCHANT_READ: 'merchant.read',
  MERCHANT_UPDATE: 'merchant.update',
  MERCHANT_DELETE: 'merchant.delete',
  
  // Transaction permissions
  TRANSACTION_READ: 'transaction.read',
  TRANSACTION_REFUND: 'transaction.refund',
  TRANSACTION_EXPORT: 'transaction.export',
  
  // Settings permissions
  SETTINGS_READ: 'settings.read',
  SETTINGS_UPDATE: 'settings.update',
  
  // User management
  USER_MANAGE: 'user.manage'
} as const;

type Role = typeof ROLES[keyof typeof ROLES];
type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// Role hierarchy and permissions mapping
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: [
    PERMISSIONS.MERCHANT_CREATE,
    PERMISSIONS.MERCHANT_READ,
    PERMISSIONS.MERCHANT_UPDATE,
    PERMISSIONS.MERCHANT_DELETE,
    PERMISSIONS.TRANSACTION_READ,
    PERMISSIONS.TRANSACTION_REFUND,
    PERMISSIONS.TRANSACTION_EXPORT,
    PERMISSIONS.SETTINGS_READ,
    PERMISSIONS.SETTINGS_UPDATE,
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.MERCHANT_READ,
    PERMISSIONS.MERCHANT_UPDATE,
    PERMISSIONS.TRANSACTION_READ,
    PERMISSIONS.TRANSACTION_EXPORT,
    PERMISSIONS.SETTINGS_READ,
  ],
  [ROLES.OPERATOR]: [
    PERMISSIONS.MERCHANT_READ,
    PERMISSIONS.TRANSACTION_READ,
  ],
  [ROLES.VIEWER]: [
    PERMISSIONS.MERCHANT_READ,
    PERMISSIONS.TRANSACTION_READ,
    PERMISSIONS.SETTINGS_READ,
  ]
};

// RBAC utility functions
export function hasPermission(userRoles: Role[], permission: Permission): boolean {
  return userRoles.some(role => 
    ROLE_PERMISSIONS[role]?.includes(permission)
  );
}

export function hasAnyPermission(userRoles: Role[], permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRoles, permission));
}

export function hasAllPermissions(userRoles: Role[], permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRoles, permission));
}

// React components for access control
interface ProtectedComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface RequirePermissionProps extends ProtectedComponentProps {
  permission: Permission;
}

interface RequireRoleProps extends ProtectedComponentProps {
  role: Role;
}

interface RequireAnyPermissionProps extends ProtectedComponentProps {
  permissions: Permission[];
}

export function RequirePermission({ 
  children, 
  permission, 
  fallback = null 
}: RequirePermissionProps) {
  const { user } = useAuth();
  
  if (!user || !hasPermission(user.roles as Role[], permission)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}

export function RequireRole({ 
  children, 
  role, 
  fallback = null 
}: RequireRoleProps) {
  const { user } = useAuth();
  
  if (!user || !user.roles.includes(role)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}

export function RequireAnyPermission({ 
  children, 
  permissions, 
  fallback = null 
}: RequireAnyPermissionProps) {
  const { user } = useAuth();
  
  if (!user || !hasAnyPermission(user.roles as Role[], permissions)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}

// Usage examples in components
const MerchantManagement = () => {
  return (
    <div>
      <RequirePermission permission={PERMISSIONS.MERCHANT_READ}>
        <MerchantList />
      </RequirePermission>
      
      <RequirePermission 
        permission={PERMISSIONS.MERCHANT_CREATE}
        fallback={<div>You don't have permission to create merchants</div>}
      >
        <Button onClick={handleCreateMerchant}>
          Create Merchant
        </Button>
      </RequirePermission>
      
      <RequireAnyPermission 
        permissions={[PERMISSIONS.MERCHANT_UPDATE, PERMISSIONS.MERCHANT_DELETE]}
      >
        <MerchantActions />
      </RequireAnyPermission>
    </div>
  );
};`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="third-party">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Third-party Service Integration
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              💳 Payment Gateway Integration
            </Typography>
            <CodeBlock
              language="typescript"
              title="Multi-payment gateway dengan unified interface"
              code={`// Payment gateway abstraction
interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  merchantId: string;
  customerEmail: string;
  customerName: string;
  description: string;
  callbackUrl: string;
  returnUrl: string;
  metadata?: Record<string, any>;
}

interface PaymentResponse {
  transactionId: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  paymentUrl?: string;
  gatewayResponse: any;
  fees?: {
    merchantFee: number;
    customerFee: number;
    gatewayFee: number;
  };
}

// Base payment gateway interface
abstract class PaymentGateway {
  abstract createPayment(request: PaymentRequest): Promise<PaymentResponse>;
  abstract checkPaymentStatus(transactionId: string): Promise<PaymentResponse>;
  abstract cancelPayment(transactionId: string): Promise<boolean>;
  abstract refundPayment(transactionId: string, amount?: number): Promise<PaymentResponse>;
}

// Midtrans implementation
class MidtransGateway extends PaymentGateway {
  private serverKey: string;
  private clientKey: string;
  private isProduction: boolean;

  constructor(serverKey: string, clientKey: string, isProduction = false) {
    super();
    this.serverKey = serverKey;
    this.clientKey = clientKey;
    this.isProduction = isProduction;
  }

  private getBaseUrl(): string {
    return this.isProduction 
      ? 'https://api.midtrans.com/v2'
      : 'https://api.sandbox.midtrans.com/v2';
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const midtransRequest = {
      transaction_details: {
        order_id: request.orderId,
        gross_amount: request.amount
      },
      customer_details: {
        first_name: request.customerName,
        email: request.customerEmail
      },
      item_details: [{
        id: request.orderId,
        price: request.amount,
        quantity: 1,
        name: request.description
      }],
      callbacks: {
        finish: request.returnUrl,
        error: request.returnUrl,
        pending: request.returnUrl
      },
      custom_expiry: {
        expiry_duration: 24,
        unit: 'hour'
      }
    };

    try {
      const response = await fetch(\`\${this.getBaseUrl()}/charge\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': \`Basic \${btoa(this.serverKey + ':')}\`
        },
        body: JSON.stringify(midtransRequest)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(\`Midtrans error: \${data.error_messages?.join(', ') || 'Unknown error'}\`);
      }

      return {
        transactionId: data.transaction_id,
        status: this.mapMidtransStatus(data.transaction_status),
        paymentUrl: data.redirect_url,
        gatewayResponse: data,
        fees: {
          merchantFee: 0, // Calculate based on Midtrans fee structure
          customerFee: 0,
          gatewayFee: Math.round(request.amount * 0.029) // 2.9% + Rp 2,000
        }
      };
    } catch (error) {
      throw new Error(\`Payment creation failed: \${error.message}\`);
    }
  }

  async checkPaymentStatus(transactionId: string): Promise<PaymentResponse> {
    try {
      const response = await fetch(\`\${this.getBaseUrl()}/\${transactionId}/status\`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': \`Basic \${btoa(this.serverKey + ':')}\`
        }
      });

      const data = await response.json();

      return {
        transactionId: data.transaction_id,
        status: this.mapMidtransStatus(data.transaction_status),
        gatewayResponse: data
      };
    } catch (error) {
      throw new Error(\`Status check failed: \${error.message}\`);
    }
  }

  async cancelPayment(transactionId: string): Promise<boolean> {
    try {
      const response = await fetch(\`\${this.getBaseUrl()}/\${transactionId}/cancel\`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': \`Basic \${btoa(this.serverKey + ':')}\`
        }
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async refundPayment(transactionId: string, amount?: number): Promise<PaymentResponse> {
    const refundRequest = amount ? { amount, reason: 'Partial refund' } : {};

    try {
      const response = await fetch(\`\${this.getBaseUrl()}/\${transactionId}/refund\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': \`Basic \${btoa(this.serverKey + ':')}\`
        },
        body: JSON.stringify(refundRequest)
      });

      const data = await response.json();

      return {
        transactionId: data.transaction_id,
        status: 'success',
        gatewayResponse: data
      };
    } catch (error) {
      throw new Error(\`Refund failed: \${error.message}\`);
    }
  }

  private mapMidtransStatus(status: string): PaymentResponse['status'] {
    const statusMap: Record<string, PaymentResponse['status']> = {
      'capture': 'success',
      'settlement': 'success',
      'pending': 'pending',
      'deny': 'failed',
      'cancel': 'cancelled',
      'expire': 'cancelled',
      'failure': 'failed'
    };

    return statusMap[status] || 'pending';
  }
}

// Payment service manager
class PaymentService {
  private gateways: Map<string, PaymentGateway> = new Map();
  private defaultGateway: string;

  constructor() {
    // Initialize gateways
    this.gateways.set('midtrans', new MidtransGateway(
      process.env.MIDTRANS_SERVER_KEY!,
      process.env.MIDTRANS_CLIENT_KEY!,
      process.env.NODE_ENV === 'production'
    ));

    this.defaultGateway = 'midtrans';
  }

  async createPayment(
    request: PaymentRequest,
    gatewayName?: string
  ): Promise<PaymentResponse> {
    const gateway = this.gateways.get(gatewayName || this.defaultGateway);
    if (!gateway) {
      throw new Error(\`Payment gateway '\${gatewayName}' not found\`);
    }

    return gateway.createPayment(request);
  }

  async checkPaymentStatus(
    transactionId: string,
    gatewayName?: string
  ): Promise<PaymentResponse> {
    const gateway = this.gateways.get(gatewayName || this.defaultGateway);
    if (!gateway) {
      throw new Error(\`Payment gateway '\${gatewayName}' not found\`);
    }

    return gateway.checkPaymentStatus(transactionId);
  }

  async processRefund(
    transactionId: string,
    amount?: number,
    gatewayName?: string
  ): Promise<PaymentResponse> {
    const gateway = this.gateways.get(gatewayName || this.defaultGateway);
    if (!gateway) {
      throw new Error(\`Payment gateway '\${gatewayName}' not found\`);
    }

    return gateway.refundPayment(transactionId, amount);
  }
}

export const paymentService = new PaymentService();`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="webhooks">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Webhook Handling System
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              🔗 Robust Webhook Processing dengan Retry Logic
            </Typography>
            <CodeBlock
              language="typescript"
              title="Complete webhook handling system"
              code={`// Webhook event types
interface WebhookEvent {
  id: string;
  type: string;
  timestamp: number;
  data: any;
  signature: string;
  source: string;
  retryCount?: number;
}

interface WebhookHandler {
  eventType: string;
  handler: (event: WebhookEvent) => Promise<void>;
  maxRetries: number;
  retryDelay: number;
}

// Webhook processing service
class WebhookService {
  private handlers: Map<string, WebhookHandler> = new Map();
  private processingQueue: WebhookEvent[] = [];
  private isProcessing = false;
  private readonly maxConcurrent = 5;

  constructor() {
    this.registerDefaultHandlers();
    this.startProcessing();
  }

  // Register webhook handlers
  registerHandler(handler: WebhookHandler): void {
    this.handlers.set(handler.eventType, handler);
  }

  // Process incoming webhook
  async processWebhook(
    payload: any,
    signature: string,
    source: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Verify webhook signature
      if (!this.verifySignature(payload, signature, source)) {
        throw new Error('Invalid webhook signature');
      }

      // Parse webhook event
      const event: WebhookEvent = {
        id: payload.id || this.generateEventId(),
        type: payload.type || payload.event_type,
        timestamp: Date.now(),
        data: payload.data || payload,
        signature,
        source,
        retryCount: 0
      };

      // Add to processing queue
      this.processingQueue.push(event);

      // Start processing if not already running
      if (!this.isProcessing) {
        this.startProcessing();
      }

      return { success: true, message: 'Webhook queued for processing' };

    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Start webhook processing
  private async startProcessing(): Promise<void> {
    if (this.isProcessing) return;
    
    this.isProcessing = true;

    while (this.processingQueue.length > 0) {
      const batch = this.processingQueue.splice(0, this.maxConcurrent);
      
      await Promise.allSettled(
        batch.map(event => this.processEvent(event))
      );
    }

    this.isProcessing = false;
  }

  // Process individual webhook event
  private async processEvent(event: WebhookEvent): Promise<void> {
    const handler = this.handlers.get(event.type);
    if (!handler) {
      console.warn(\`No handler found for webhook type: \${event.type}\`);
      return;
    }

    const maxRetries = handler.maxRetries || 3;
    const retryDelay = handler.retryDelay || 1000;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        await handler.handler(event);
        
        // Log successful processing
        console.log(\`Webhook processed successfully: \${event.id} (\${event.type})\`);
        return;

      } catch (error) {
        console.error(\`Webhook processing failed (attempt \${attempt + 1}): \${event.id}\`, error);

        if (attempt < maxRetries) {
          // Wait before retry with exponential backoff
          await this.delay(retryDelay * Math.pow(2, attempt));
        } else {
          // Max retries reached, send to dead letter queue
          await this.handleFailedEvent(event, error);
        }
      }
    }
  }

  // Handle events that failed all retries
  private async handleFailedEvent(event: WebhookEvent, error: Error): Promise<void> {
    console.error(\`Webhook failed permanently: \${event.id}\`, { event, error });
    
    // Store in database for manual review
    try {
      await cringApiClient.post('/webhooks/failed-events', {
        eventId: event.id,
        eventType: event.type,
        payload: event.data,
        error: error.message,
        timestamp: event.timestamp,
        source: event.source
      });
    } catch (dbError) {
      console.error('Failed to store failed webhook event:', dbError);
    }
  }

  // Verify webhook signature
  private verifySignature(payload: any, signature: string, source: string): boolean {
    try {
      const secret = this.getWebhookSecret(source);
      if (!secret) return false;

      const expectedSignature = this.computeSignature(JSON.stringify(payload), secret);
      return signature === expectedSignature;

    } catch (error) {
      console.error('Signature verification error:', error);
      return false;
    }
  }

  private getWebhookSecret(source: string): string | null {
    const secrets: Record<string, string> = {
      'midtrans': process.env.MIDTRANS_WEBHOOK_SECRET || '',
      'cring': process.env.CRING_WEBHOOK_SECRET || '',
      'payment': process.env.PAYMENT_WEBHOOK_SECRET || ''
    };

    return secrets[source] || null;
  }

  private computeSignature(payload: string, secret: string): string {
    const crypto = require('crypto');
    return crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
  }

  // Register default webhook handlers
  private registerDefaultHandlers(): void {
    // Payment status webhook
    this.registerHandler({
      eventType: 'payment.status_changed',
      maxRetries: 5,
      retryDelay: 2000,
      handler: async (event: WebhookEvent) => {
        const { transaction_id, status } = event.data;
        
        await cringApiClient.patch(\`/transactions/\${transaction_id}\`, {
          status,
          updatedAt: new Date().toISOString(),
          webhookData: event.data
        });

        // Notify relevant parties
        await this.notifyStatusChange(transaction_id, status);
      }
    });

    // Merchant verification webhook
    this.registerHandler({
      eventType: 'merchant.verification_completed',
      maxRetries: 3,
      retryDelay: 1000,
      handler: async (event: WebhookEvent) => {
        const { merchant_id, verification_status, documents } = event.data;
        
        await cringApiClient.patch(\`/merchants/\${merchant_id}\`, {
          verificationStatus: verification_status,
          verificationDocuments: documents,
          verifiedAt: new Date().toISOString()
        });

        // Send notification email to merchant
        await this.sendVerificationNotification(merchant_id, verification_status);
      }
    });

    // Settlement webhook
    this.registerHandler({
      eventType: 'settlement.completed',
      maxRetries: 3,
      retryDelay: 1500,
      handler: async (event: WebhookEvent) => {
        const { settlement_id, transactions, amount } = event.data;
        
        await cringApiClient.post('/settlements', {
          id: settlement_id,
          transactions,
          amount,
          status: 'completed',
          settledAt: new Date().toISOString()
        });

        // Update merchant balances
        await this.updateMerchantBalances(transactions);
      }
    });
  }

  // Utility methods
  private generateEventId(): string {
    return \`webhook_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async notifyStatusChange(transactionId: string, status: string): Promise<void> {
    // Implementation for status change notifications
    console.log(\`Payment status changed: \${transactionId} -> \${status}\`);
  }

  private async sendVerificationNotification(merchantId: string, status: string): Promise<void> {
    // Implementation for verification notifications
    console.log(\`Merchant verification: \${merchantId} -> \${status}\`);
  }

  private async updateMerchantBalances(transactions: any[]): Promise<void> {
    // Implementation for balance updates
    console.log(\`Updating balances for \${transactions.length} transactions\`);
  }
}

export const webhookService = new WebhookService();

// Express.js route handler example
export const webhookHandler = async (req: any, res: any) => {
  const signature = req.headers['x-signature'] || req.headers['x-webhook-signature'];
  const source = req.headers['x-webhook-source'] || 'unknown';
  
  const result = await webhookService.processWebhook(
    req.body,
    signature,
    source
  );

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ error: result.message });
  }
};`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>Integration Complete!</strong> Comprehensive third-party integration system dengan authentication,
              payment gateways, dan webhook handling siap digunakan.
            </Alert>
          </CardContent>
        </Card>
      </section>
    </DocumentationPageLayout>
  );
};

export default IntegrationsPage;
