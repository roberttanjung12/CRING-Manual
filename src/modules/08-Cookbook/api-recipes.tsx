'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const APIRecipesPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'API Recipes Overview' },
    { id: 'authentication', title: 'Authentication' },
    { id: 'crud-operations', title: 'CRUD Operations' },
    { id: 'error-handling', title: 'Error Handling' }
  ];

  return (
    <DocumentationPageLayout
      title="API Recipes"
      description="API integration patterns dan data handling solutions untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'UI Recipes',
          href: '/cookbook/ui-recipes'
        },
        next: {
          title: 'Utilities',
          href: '/cookbook/utilities'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          API Integration Recipes
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Ready-to-use API integration patterns, authentication flows, dan error handling untuk CRING! Partner API.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="REST API" color="primary" variant="outlined" />
          <Chip label="Authentication" color="secondary" variant="outlined" />
          <Chip label="Error Handling" color="warning" variant="outlined" />
        </Stack>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Production Ready:</strong> Semua API recipes sudah tested dan siap digunakan dalam production
          environment.
        </Alert>
      </section>

      <section id="authentication">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Authentication Flow
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Login & Token Management
            </Typography>
            <CodeBlock
              language="typescript"
              title="src/services/authService.ts"
              code={`interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

class AuthService {
  private baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(\`\${this.baseURL}/auth/login\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    
    // Store tokens
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    return data;
  }

  async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    const response = await fetch(\`\${this.baseURL}/auth/refresh\`, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${refreshToken}\`,
      },
    });

    if (!response.ok) {
      this.logout();
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    
    return data.token;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }
}

export const authService = new AuthService();`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="crud-operations">
        <Typography variant="h5" sx={{ mb: 2 }}>
          CRUD Operations
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Merchant Management API
            </Typography>
            <CodeBlock
              language="typescript"
              title="src/services/merchantService.ts"
              code={`interface Merchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
}

class MerchantService {
  private baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('token');
    
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(\`API Error: \${response.statusText}\`);
    }

    return response.json();
  }

  // GET - Fetch all merchants
  async getMerchants(page = 1, limit = 10): Promise<{
    data: Merchant[];
    meta: { total: number; page: number; totalPages: number };
  }> {
    return this.request(\`/merchants?page=\${page}&limit=\${limit}\`);
  }

  // GET - Fetch single merchant
  async getMerchant(id: string): Promise<Merchant> {
    return this.request(\`/merchants/\${id}\`);
  }

  // POST - Create merchant
  async createMerchant(data: Omit<Merchant, 'id'>): Promise<Merchant> {
    return this.request('/merchants', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT - Update merchant
  async updateMerchant(id: string, data: Partial<Merchant>): Promise<Merchant> {
    return this.request(\`/merchants/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE - Remove merchant
  async deleteMerchant(id: string): Promise<void> {
    return this.request(\`/merchants/\${id}\`, {
      method: 'DELETE',
    });
  }
}

export const merchantService = new MerchantService();`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="error-handling">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Error Handling
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              API Error Handler
            </Typography>
            <CodeBlock
              language="typescript"
              title="src/services/apiErrorHandler.ts"
              code={`interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export class ApiErrorHandler {
  static handle(error: any): ApiError {
    // Network error
    if (!error.response) {
      return {
        message: 'Network error. Please check your connection.',
        status: 0,
        code: 'NETWORK_ERROR'
      };
    }

    const status = error.response.status;
    
    switch (status) {
      case 400:
        return {
          message: 'Invalid request data',
          status,
          code: 'BAD_REQUEST'
        };
      
      case 401:
        // Auto logout on unauthorized
        localStorage.removeItem('token');
        window.location.href = '/login';
        return {
          message: 'Session expired. Please login again.',
          status,
          code: 'UNAUTHORIZED'
        };
      
      case 403:
        return {
          message: 'Access denied. Insufficient permissions.',
          status,
          code: 'FORBIDDEN'
        };
      
      case 404:
        return {
          message: 'Resource not found',
          status,
          code: 'NOT_FOUND'
        };
      
      case 500:
        return {
          message: 'Server error. Please try again later.',
          status,
          code: 'SERVER_ERROR'
        };
      
      default:
        return {
          message: 'An unexpected error occurred',
          status,
          code: 'UNKNOWN_ERROR'
        };
    }
  }

  static async withErrorHandling<T>(
    apiCall: () => Promise<T>,
    onError?: (error: ApiError) => void
  ): Promise<T | null> {
    try {
      return await apiCall();
    } catch (error) {
      const apiError = this.handle(error);
      
      if (onError) {
        onError(apiError);
      } else {
        // Default error notification
        console.error('API Error:', apiError);
      }
      
      return null;
    }
  }
}

// Usage example in React component
const fetchMerchants = async () => {
  const result = await ApiErrorHandler.withErrorHandling(
    () => merchantService.getMerchants(),
    (error) => {
      // Custom error handling
      setError(error.message);
    }
  );
  
  if (result) {
    setMerchants(result.data);
  }
};`}
            />
          </CardContent>
        </Card>

        <Alert severity="success" sx={{ mt: 3 }}>
          <strong>API Recipes Complete!</strong> Copy-paste patterns yang dibutuhkan dan sesuaikan dengan endpoint API
          spesifik.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default APIRecipesPage;
