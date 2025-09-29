'use client';

import { Typography, Alert, Card, CardContent, Chip, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock, ExampleSection } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const TypesDocumentationPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Overview & Kegunaan' },
    { id: 'quick-start', title: 'Quick Start' },
    { id: 'common-types', title: 'Common Types' },
    { id: 'api-types', title: 'API Types' },
    { id: 'component-props', title: 'Component Props Types' },
    { id: 'utility-types', title: 'Utility Types' },
    { id: 'best-practices', title: 'Best Practices' }
  ];

  return (
    <DocumentationPageLayout
      title="Types System"
      description="TypeScript interfaces, types, dan type safety patterns untuk development yang aman"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Services & API',
          href: '/services/overview'
        },
        next: {
          title: 'Utility Functions',
          href: '/utils/overview'
        }
      }}
    >
      {/* Overview & Kegunaan */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Overview & Kegunaan
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>Types System</strong> menyediakan type definitions yang comprehensive untuk memastikan type safety,
          better IDE support, dan prevent runtime errors.
        </Alert>

        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
          Types dirancang untuk:
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="shield-check" style={{ fontSize: '1.5rem', color: '#4caf50' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    🛡️ Type Safety
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Prevent runtime errors dengan compile-time checking
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="code" style={{ fontSize: '1.5rem', color: '#2196f3' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    🔧 Better DX
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    IntelliSense, auto-completion, dan refactoring support
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="document-text" style={{ fontSize: '1.5rem', color: '#ff9800' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    📚 Self-Documenting
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Types berfungsi sebagai dokumentasi yang selalu up-to-date
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4 }}>
          <Chip label="TypeScript" color="primary" size="small" />
          <Chip label="Strict Mode" color="secondary" size="small" />
          <Chip label="Generic Types" color="info" size="small" />
          <Chip label="Utility Types" color="success" size="small" />
          <Chip label="Type Guards" color="warning" size="small" />
        </Stack>
      </section>

      {/* Quick Start */}
      <section id="quick-start">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Quick Start
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Cara menggunakan types yang sudah tersedia:
        </Typography>

        <CodeBlock
          language="typescript"
          title="1. Import types yang dibutuhkan"
          code={`// User related types
import { User, CreateUserRequest, UpdateUserRequest } from '@/types/user';

// API response types
import { ApiResponse, PaginatedResponse } from '@/types/api';

// Component props types
import { ButtonProps, FormFieldProps } from '@/types/components';

// Utility types
import { ID, Timestamp, Status } from '@/types/common';`}
        />

        <CodeBlock
          language="typescript"
          title="2. Gunakan dalam component/function"
          code={`const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (data: UpdateUserRequest): Promise<User> => {
    setLoading(true);
    try {
      const response: ApiResponse<User> = await userService.update(user.id, data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader title={user.name} subheader={user.email} />
      <CardContent>
        <SurfaceContent label="Role" content={user.role} isLast={false} />
        <SurfaceContent label="Status" content={user.status} isLast={true} />
      </CardContent>
    </Card>
  );
};`}
        />

        <Alert severity="info" sx={{ mt: 3 }}>
          <strong>💡 Tip:</strong> TypeScript akan memberikan error jika type tidak sesuai. Trust the types dan gunakan
          sebagai guide untuk development!
        </Alert>
      </section>

      {/* Common Types */}
      <section id="common-types">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Common Types
        </Typography>

        <ExampleSection
          id="basic-types"
          title="Basic Common Types"
          description="Types yang sering digunakan di seluruh aplikasi"
        >
          <CodeBlock
            language="typescript"
            title="@/types/common.ts - Basic Types"
            code={`// Basic identifier types
export type ID = string;
export type UUID = string;

// Date and time
export type Timestamp = string; // ISO string format
export type DateString = string; // YYYY-MM-DD format

// Status enums
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended'
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

// Generic response wrapper
export interface BaseEntity {
  id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}`}
          />

          <CodeBlock
            language="typescript"
            title="Cara Menggunakan - Basic Types"
            code={`// Dalam component
const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const fetchUsers = async () => {
    try {
      const response = await userService.getAll(pagination);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateUserStatus = async (userId: ID, status: Status) => {
    try {
      await userService.updateStatus(userId, status);
      // Update local state
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? { ...user, status } : user
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <DataTable
      data={users}
      pagination={pagination}
      onPaginationChange={setPagination}
    />
  );
};`}
          />
        </ExampleSection>
      </section>

      {/* API Types */}
      <section id="api-types">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          API Types
        </Typography>

        <ExampleSection
          id="api-response-types"
          title="API Response Types"
          description="Standardized types untuk API responses dan error handling"
        >
          <CodeBlock
            language="typescript"
            title="@/types/api.ts - API Response Types"
            code={`// Generic API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  meta?: any;
}

// Paginated response
export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  message?: string;
  meta: PaginationMeta;
}

// Error response
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: any;
}

// Request/Response types untuk authentication
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: true;
  data: {
    user: User;
    token: string;
    refreshToken: string;
    expiresAt: Timestamp;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  success: true;
  data: {
    token: string;
    expiresAt: Timestamp;
  };
}`}
          />

          <CodeBlock
            language="typescript"
            title="@/types/user.ts - User Related Types"
            code={`export interface User extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  status: Status;
  lastLoginAt?: Timestamp;
  emailVerifiedAt?: Timestamp;
  profile?: UserProfile;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  dateOfBirth?: DateString;
  gender?: 'male' | 'female' | 'other';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Request types
export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
  profile?: Partial<UserProfile>;
}

export interface UpdateUserRequest {
  name?: string;
  role?: UserRole;
  status?: Status;
  profile?: Partial<UserProfile>;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}`}
          />

          <CodeBlock
            language="typescript"
            title="Service Implementation dengan Types"
            code={`// @/services/userService.ts
class UserService extends BaseService {
  async getAll(
    params: PaginationParams
  ): Promise<PaginatedResponse<User>> {
    const response = await this.get<PaginatedResponse<User>>('', { params });
    return response.data;
  }

  async getById(id: ID): Promise<ApiResponse<User>> {
    const response = await this.get<ApiResponse<User>>(\`/\${id}\`);
    return response.data;
  }

  async create(
    userData: CreateUserRequest
  ): Promise<ApiResponse<User>> {
    const response = await this.post<ApiResponse<User>>(userData);
    return response.data;
  }

  async update(
    id: ID,
    userData: UpdateUserRequest
  ): Promise<ApiResponse<User>> {
    const response = await this.put<ApiResponse<User>>(userData, \`/\${id}\`);
    return response.data;
  }

  async changePassword(
    id: ID,
    passwords: ChangePasswordRequest
  ): Promise<ApiResponse<void>> {
    const response = await this.post<ApiResponse<void>>(
      passwords,
      \`/\${id}/change-password\`
    );
    return response.data;
  }
}`}
          />
        </ExampleSection>
      </section>

      {/* Component Props Types */}
      <section id="component-props">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Component Props Types
        </Typography>

        <ExampleSection
          id="component-interfaces"
          title="Component Props Interfaces"
          description="Type definitions untuk component props dan event handlers"
        >
          <CodeBlock
            language="typescript"
            title="@/types/components.ts - Component Props"
            code={`// Form components props
export interface ButtonSubmitProps {
  label?: string;
  isSend?: boolean;
  isFail?: boolean;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  isHideIcon?: boolean;
  icon?: React.ReactElement;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
}

export interface DateRangePickerProps {
  start?: Date;
  end?: Date;
  onSet: (start: Date, end: Date) => void;
  onDelete: () => void;
  minDate?: Date;
  maxDate?: Date;
  isHideTimes?: boolean;
}

export interface SurfaceContentProps {
  label: string;
  content: string | React.ReactNode;
  isLast: boolean;
}`}
          />

          <CodeBlock
            language="typescript"
            title="Table/Data Display Props"
            code={`// Table component types
export interface TableColumn<T = any> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: PaginationParams;
  onPaginationChange?: (pagination: PaginationParams) => void;
  onRowClick?: (row: T) => void;
  selection?: {
    selected: ID[];
    onSelectionChange: (selected: ID[]) => void;
  };
  actions?: {
    label: string;
    icon?: string;
    onClick: (row: T) => void;
    disabled?: (row: T) => boolean;
  }[];
}

// Navigation props
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  maxItems?: number;
}`}
          />

          <CodeBlock
            language="typescript"
            title="Component Usage dengan Types"
            code={`// Dalam component dengan proper typing
const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<ID[]>([]);

  const columns: TableColumn<User>[] = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 170,
      sortable: true
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 200,
      sortable: true
    },
    {
      id: 'role',
      label: 'Role',
      align: 'center',
      render: (value: UserRole) => (
        <Chip 
          label={value} 
          color={value === 'admin' ? 'error' : 'primary'}
          size="small"
        />
      )
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
      render: (value: Status, row: User) => (
        <Switch
          checked={value === Status.ACTIVE}
          onChange={() => handleStatusChange(row.id, value)}
        />
      )
    }
  ];

  const actions: DataTableProps<User>['actions'] = [
    {
      label: 'Edit',
      icon: 'edit',
      onClick: (user: User) => handleEdit(user),
    },
    {
      label: 'Delete',
      icon: 'delete',
      onClick: (user: User) => handleDelete(user),
      disabled: (user: User) => user.role === UserRole.ADMIN
    }
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      actions={actions}
      selection={{
        selected,
        onSelectionChange: setSelected
      }}
      onRowClick={(user: User) => router.push(\`/users/\${user.id}\`)}
    />
  );
};`}
          />
        </ExampleSection>
      </section>

      {/* Utility Types */}
      <section id="utility-types">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Utility Types
        </Typography>

        <ExampleSection
          id="helper-types"
          title="TypeScript Utility Types"
          description="Advanced TypeScript patterns dan helper types untuk complex scenarios"
        >
          <CodeBlock
            language="typescript"
            title="Custom Utility Types"
            code={`// @/types/utils.ts
// Make certain fields optional
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make certain fields required
export type Required<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Deep partial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Extract function parameters
export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// Extract function return type
export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// Create union from array
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// Non-nullable type
export type NonNullable<T> = T extends null | undefined ? never : T;`}
          />

          <CodeBlock
            language="typescript"
            title="Form Types dengan Utility Types"
            code={`// Form-specific utility types
export type FormData<T> = {
  [K in keyof T]: T[K] extends object 
    ? DeepPartial<T[K]> 
    : T[K];
};

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

export type FormState<T> = {
  data: FormData<T>;
  errors: FormErrors<T>;
  touched: { [K in keyof T]?: boolean };
  isSubmitting: boolean;
  isValid: boolean;
};

// Usage dalam form
const useUserForm = (initialData?: Optional<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  const [formState, setFormState] = useState<FormState<CreateUserRequest>>({
    data: {
      email: initialData?.email || '',
      name: initialData?.name || '',
      password: '',
      role: initialData?.role || UserRole.USER
    },
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: false
  });

  const updateField = <K extends keyof CreateUserRequest>(
    field: K, 
    value: CreateUserRequest[K]
  ) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      touched: { ...prev.touched, [field]: true }
    }));
  };

  return { formState, updateField };
};`}
          />

          <CodeBlock
            language="typescript"
            title="Type Guards & Runtime Validation"
            code={`// Type guards untuk runtime type checking
export const isUser = (obj: any): obj is User => {
  return obj && 
    typeof obj.id === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.name === 'string' &&
    Object.values(UserRole).includes(obj.role);
};

export const isApiResponse = <T>(obj: any): obj is ApiResponse<T> => {
  return obj && 
    typeof obj.success === 'boolean' &&
    obj.data !== undefined;
};

export const isPaginatedResponse = <T>(obj: any): obj is PaginatedResponse<T> => {
  return obj &&
    typeof obj.success === 'boolean' &&
    Array.isArray(obj.data) &&
    obj.meta &&
    typeof obj.meta.total === 'number';
};

// Usage dalam service
const handleApiResponse = (response: unknown) => {
  if (isPaginatedResponse<User>(response)) {
    // TypeScript knows this is PaginatedResponse<User>
    const users = response.data; // User[]
    const total = response.meta.total; // number
    return { users, total };
  }
  
  if (isApiResponse<User>(response)) {
    // TypeScript knows this is ApiResponse<User>
    const user = response.data; // User
    return { user };
  }
  
  throw new Error('Invalid response format');
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
                <Typography variant="body2">• Always define interfaces untuk complex objects</Typography>
                <Typography variant="body2">• Use union types untuk limited string values</Typography>
                <Typography variant="body2">• Implement type guards untuk runtime validation</Typography>
                <Typography variant="body2">• Use generic types untuk reusable components</Typography>
                <Typography variant="body2">• Prefer interface over type untuk object definitions</Typography>
                <Typography variant="body2">• Document complex types dengan JSDoc comments</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#f44336' }}>
                ❌ Don'ts
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Jangan gunakan 'any' type kecuali benar-benar diperlukan</Typography>
                <Typography variant="body2">• Jangan ignore TypeScript errors dengan @ts-ignore</Typography>
                <Typography variant="body2">• Jangan membuat types yang terlalu complex tanpa dokumentasi</Typography>
                <Typography variant="body2">• Jangan duplicate type definitions, gunakan shared types</Typography>
                <Typography variant="body2">• Jangan hardcode string/number values, gunakan enums</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                💡 Tips
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Use VS Code TypeScript extensions untuk better IntelliSense</Typography>
                <Typography variant="body2">• Enable strict mode dalam tsconfig.json</Typography>
                <Typography variant="body2">• Create index.ts files untuk clean imports</Typography>
                <Typography variant="body2">• Use utility types untuk transforming existing types</Typography>
                <Typography variant="body2">• Generate types from OpenAPI/Swagger specs if available</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="info" sx={{ mt: 4 }}>
          <strong>Type Safety First!</strong> Invest time dalam proper type definitions. Types akan save you time dalam
          debugging dan provide better developer experience.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default TypesDocumentationPage;
