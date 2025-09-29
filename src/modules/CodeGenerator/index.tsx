'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Stack,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material';
import { Icon } from '@iconify/react';
import {
  ContentCopy,
  Download,
  PlayArrow,
  Code,
  ApiOutlined,
  DashboardOutlined,
  Forum as FormOutlined
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'component' | 'form' | 'api' | 'pattern';
  icon: React.ReactNode;
  template: string;
  variables: Array<{
    name: string;
    label: string;
    type: 'text' | 'select' | 'boolean';
    options?: string[];
    defaultValue: any;
    description?: string;
  }>;
  dependencies?: string[];
  examples: Array<{
    name: string;
    values: Record<string, any>;
  }>;
}

const codeTemplates: CodeTemplate[] = [
  {
    id: 'table-component',
    name: 'TableCRING Module',
    description: 'Generate complete TableCRING module mengikuti P2PMerchant/Withdrawal pattern',
    category: 'component',
    icon: <DashboardOutlined />,
    template: `'use client';

import { type ReactNode } from 'react';
import { Box } from '@mui/material';
import TableCRING from '@/components/(data-display)/TableCRING';
import DownloadButton from '@/components/(input)/DownloadButton';
import BlockerProviderButtonMask from '@/context/BlockerProvider/ui/ButtonMask';
import {{componentName}}Column from './column';
import use{{componentName}} from './hook';

/**
 * {{componentName}} Component
 * 
 * Features:
 * - Display {{entityNameLower}}s in a filterable table
 * - Export functionality
 * - Data masking support
 * - Pagination
 */
const {{componentName}} = (): Readonly<ReactNode> => {
  const { isLoading, params, payload, pagination, list, onFilterGo } = use{{componentName}}();

  return (
    <Box data-testid="{{componentName}}" component="section">
      {/* Action Buttons */}
      <Box
        display="flex"
        justifyContent={{ xs: 'center', lg: 'end' }}
        columnGap={{ xs: 0, lg: 4 }}
        rowGap={{ xs: 4, lg: 0 }}
        flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
        mb={4}
      >
        {{#if showMaskButton}}<BlockerProviderButtonMask />{{/if}}
        {{#if showExport}}<DownloadButton 
          name="{{entityNameKebab}}-data" 
          endpoint="/download/{{apiEndpoint}}" 
          payload={payload} 
        />{{/if}}
      </Box>

      {/* Data Table */}
      <TableCRING
        isLoading={isLoading}
        columns={{{componentName}}Column}
        data={list}
        params={params}
        pagination={{
          limit: pagination.limit,
          rows: pagination.rows,
          total: pagination.total,
          current: pagination.page
        }}
        onFilter={onFilterGo}
      />
    </Box>
  );
};

export default {{componentName}};`,
    variables: [
      {
        name: 'componentName',
        label: 'Component Name',
        type: 'text',
        defaultValue: 'MerchantManagement',
        description: 'Name of the React component'
      },
      {
        name: 'entityName',
        label: 'Entity Name',
        type: 'text',
        defaultValue: 'Merchant',
        description: 'Name of the data entity'
      },
      {
        name: 'apiEndpoint',
        label: 'API Endpoint',
        type: 'text',
        defaultValue: 'merchants',
        description: 'API endpoint for data fetching'
      },
      {
        name: 'showMaskButton',
        label: 'Show Mask Button',
        type: 'boolean',
        defaultValue: true
      },
      {
        name: 'showExport',
        label: 'Show Export Button',
        type: 'boolean',
        defaultValue: true
      }
    ],
    dependencies: [
      '@/components/(data-display)/TableCRING',
      '@/components/(input)/DownloadButton',
      '@/context/BlockerProvider'
    ],
    examples: [
      {
        name: 'Merchant Management',
        values: {
          componentName: 'MerchantManagement',
          entityName: 'Merchant',
          apiEndpoint: 'merchants',
          showMaskButton: true,
          showExport: true
        }
      },
      {
        name: 'User Management',
        values: {
          componentName: 'UserManagement',
          entityName: 'User',
          apiEndpoint: 'users',
          showMaskButton: false,
          showExport: true
        }
      },
      {
        name: 'Transaction List',
        values: {
          componentName: 'TransactionList',
          entityName: 'Transaction',
          apiEndpoint: 'transactions',
          showMaskButton: true,
          showExport: false
        }
      }
    ]
  },
  {
    id: 'zod-form',
    name: 'Zod Form Validation',
    description: 'Generate form with Zod schema validation and React Hook Form',
    category: 'form',
    icon: <FormOutlined />,
    template: `import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  TextField,
  Button,
  Typography,
  {{#if useSelect}}Select,
  MenuItem,
  FormControl,
  InputLabel,{{/if}}
  {{#if useCheckbox}}FormControlLabel,
  Checkbox,{{/if}}
} from '@mui/material';

// Zod Schema
const {{schemaName}} = z.object({
  {{#each fields}}
  {{name}}: z{{#if_eq type 'string'}}.string(){{#if required}}.min(1, '{{label}} is required'){{/if}}{{#if minLength}}.min({{minLength}}, '{{label}} must be at least {{minLength}} characters'){{/if}}{{/if_eq}}{{#if_eq type 'email'}}.string().email('Invalid email format'){{/if_eq}}{{#if_eq type 'number'}}.number(){{#if min}}.min({{min}}, '{{label}} must be at least {{min}}'){{/if}}{{/if_eq}}{{#if_eq type 'boolean'}}.boolean(){{/if_eq}},
  {{/each}}
});

type {{formTypeName}} = z.infer<typeof {{schemaName}}>;

interface {{componentName}}Props {
  onSubmit: (data: {{formTypeName}}) => void;
  {{#if defaultValues}}defaultValues?: Partial<{{formTypeName}}>;{{/if}}
  {{#if loading}}loading?: boolean;{{/if}}
}

const {{componentName}}: React.FC<{{componentName}}Props> = ({ 
  onSubmit,
  {{#if defaultValues}}defaultValues,{{/if}}
  {{#if loading}}loading = false{{/if}}
}) => {
  const form = useForm<{{formTypeName}}>({
    resolver: zodResolver({{schemaName}}),
    {{#if defaultValues}}defaultValues,{{/if}}
    mode: '{{validationMode}}'
  });

  const handleSubmit = (data: {{formTypeName}}) => {
    onSubmit(data);
    {{#if resetOnSubmit}}form.reset();{{/if}}
  };

  return (
    <Box component="form" onSubmit={form.handleSubmit(handleSubmit)} sx={{ maxWidth: 600 }}>
      <Typography variant="h6" gutterBottom>
        {{formTitle}}
      </Typography>

      {{#each fields}}
      {{#if_eq inputType 'text'}}
      <TextField
        {...form.register('{{name}}')}
        label="{{label}}"
        fullWidth
        margin="normal"
        {{#if multiline}}multiline
        rows={{{rows}}}{{/if}}
        {{#if_eq type 'email'}}type="email"{{/if_eq}}
        {{#if_eq type 'password'}}type="password"{{/if_eq}}
        error={!!form.formState.errors.{{name}}}
        helperText={form.formState.errors.{{name}}?.message}
        {{#if disabled}}disabled={loading}{{/if}}
      />
      {{/if_eq}}
      
      {{#if_eq inputType 'select'}}
      <FormControl fullWidth margin="normal" error={!!form.formState.errors.{{name}}}>
        <InputLabel>{{label}}</InputLabel>
        <Select
          {...form.register('{{name}}')}
          label="{{label}}"
          {{#if disabled}}disabled={loading}{{/if}}
        >
          {{#each options}}
          <MenuItem value="{{value}}">{{label}}</MenuItem>
          {{/each}}
        </Select>
      </FormControl>
      {{/if_eq}}

      {{#if_eq inputType 'checkbox'}}
      <FormControlLabel
        control={
          <Checkbox
            {...form.register('{{name}}')}
            {{#if disabled}}disabled={loading}{{/if}}
          />
        }
        label="{{label}}"
      />
      {{/if_eq}}
      {{/each}}

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          {{#if loading}}disabled={loading || !form.formState.isValid}{{/if}}
          {{#if fullWidth}}fullWidth{{/if}}
        >
          {{#if loading}}
          {loading ? 'Submitting...' : '{{submitText}}'}
          {{else}}
          {{submitText}}
          {{/if}}
        </Button>
        
        {{#if showReset}}
        <Button
          type="button"
          variant="outlined"
          onClick={() => form.reset()}
          {{#if loading}}disabled={loading}{{/if}}
        >
          Reset
        </Button>
        {{/if}}
      </Box>
    </Box>
  );
};

export default {{componentName}};`,
    variables: [
      {
        name: 'componentName',
        label: 'Component Name',
        type: 'text',
        defaultValue: 'UserForm',
        description: 'Name of the form component'
      },
      {
        name: 'schemaName',
        label: 'Schema Name',
        type: 'text',
        defaultValue: 'userSchema',
        description: 'Name of the Zod schema'
      },
      {
        name: 'formTypeName',
        label: 'Form Type Name',
        type: 'text',
        defaultValue: 'UserFormData',
        description: 'TypeScript type name'
      },
      {
        name: 'formTitle',
        label: 'Form Title',
        type: 'text',
        defaultValue: 'User Information',
        description: 'Title displayed on the form'
      },
      {
        name: 'submitText',
        label: 'Submit Button Text',
        type: 'text',
        defaultValue: 'Save User',
        description: 'Text for submit button'
      },
      {
        name: 'validationMode',
        label: 'Validation Mode',
        type: 'select',
        options: ['onChange', 'onSubmit', 'onBlur', 'all'],
        defaultValue: 'onChange',
        description: 'When to trigger validation'
      },
      {
        name: 'showReset',
        label: 'Show Reset Button',
        type: 'boolean',
        defaultValue: true
      },
      {
        name: 'loading',
        label: 'Support Loading State',
        type: 'boolean',
        defaultValue: true
      },
      {
        name: 'resetOnSubmit',
        label: 'Reset Form After Submit',
        type: 'boolean',
        defaultValue: false
      }
    ],
    dependencies: ['react-hook-form', '@hookform/resolvers/zod', 'zod'],
    examples: [
      {
        name: 'User Registration',
        values: {
          componentName: 'UserRegistrationForm',
          schemaName: 'registrationSchema',
          formTypeName: 'RegistrationData',
          formTitle: 'Create New Account',
          submitText: 'Register',
          validationMode: 'onChange',
          showReset: false,
          loading: true,
          resetOnSubmit: true
        }
      },
      {
        name: 'Merchant Setup',
        values: {
          componentName: 'MerchantSetupForm',
          schemaName: 'merchantSchema',
          formTypeName: 'MerchantData',
          formTitle: 'Merchant Information',
          submitText: 'Save Merchant',
          validationMode: 'onSubmit',
          showReset: true,
          loading: true,
          resetOnSubmit: false
        }
      }
    ]
  },
  {
    id: 'custom-hook',
    name: 'Custom Data Hook',
    description: 'Generate custom hook mengikuti P2PMerchant/Withdrawal pattern dengan SWR',
    category: 'pattern',
    icon: <Code />,
    template: `'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';
import qs from 'qs';
import useSWR from 'swr';
import { useBlockerContext } from '@/context/BlockerProvider';
import useFilter from '@/hooks/useFilter';
import onEncrypt from '@/utility/aes';
import type { {{entityName}}Params, {{entityName}}Row, Use{{entityName}} } from './type';
import get{{entityName}}s, { type Get{{entityName}}sParams } from './services/get{{entityName}}s';

/**
 * Custom hook for {{entityName}} functionality
 */
const use{{entityName}} = (): Use{{entityName}} => {
  const { isLocked } = useBlockerContext();
  const searchParams = useSearchParams();
  
  // Parse URL params
  const params: {{entityName}}Params = qs.parse(searchParams.toString());
  
  // Transform URL params to API payload
  const payload = useMemo(() => {
    const defaultParams: Get{{entityName}}sParams = {
      limit: 10,
      offset: 0,
      isMasking: onEncrypt(isLocked)
    };
    
    // Map URL params to API params
    if (params?.limit) defaultParams.limit = Number(params.limit);
    if (params?.page) defaultParams.offset = (Number(params.page) - 1) * defaultParams.limit;
    {{#if searchField}}if (params?.{{searchField}}) defaultParams.{{searchField}} = params.{{searchField}};{{/if}}
    {{#if statusField}}if (params?.{{statusField}}) defaultParams.{{statusField}} = params.{{statusField}};{{/if}}
    {{#if dateField}}if (params?.{{dateField}}) defaultParams.{{dateField}} = params.{{dateField}}.toISOString();{{/if}}
    
    return defaultParams;
  }, [isLocked, params]);
  
  // Fetch data with SWR
  const { isLoading, data, mutate } = useSWR(
    \`/{{apiEndpoint}}?\${qs.stringify({ ...payload, isMasking: isLocked })}\`,
    () => get{{entityName}}s(payload)
  );
  
  // Pagination and filtering
  const { pagination, onFilterGo } = useFilter<{{entityName}}Params>({
    path: '/{{pathName}}',
    status: data?.status,
    headers: {
      'pagination-page': data?.headers?.['pagination-page'],
      'pagination-rows': data?.headers?.['pagination-rows']
    },
    page: params?.page
  });
  
  // Transform API data to table rows
  const list = useMemo<{{entityName}}Row[]>(() => {
    if (data?.status !== 200 || !Array.isArray(data?.data)) return [];
    
    return data.data.map(item => ({
      id: item.id,
      {{#if nameField}}{{nameField}}: item.{{nameField}},{{/if}}
      {{#if emailField}}{{emailField}}: item.{{emailField}},{{/if}}
      {{#if dateField}}{{dateField}}: [
        moment(item.{{dateField}}).format('DD/MM/YYYY'),
        moment(item.{{dateField}}).format('HH:mm:ss')
      ],{{/if}}
      {{#if statusField}}{{statusField}}: {
        id: item.{{statusField}}.toLowerCase(),
        label: item.{{statusField}},
        color: item.{{statusField}} === 'ACTIVE' ? 'success' : 'error'
      } as any,{{/if}}
      ...item
    }));
  }, [data]);
  
  return {
    isLoading,
    params,
    payload,
    pagination,
    list,
    mutate,
    onFilterGo
  };
};

export default use{{entityName}};`,
    variables: [
      {
        name: 'entityName',
        label: 'Entity Name',
        type: 'text',
        defaultValue: 'MerchantManagement',
        description: 'Name of the data entity'
      },
      {
        name: 'apiEndpoint',
        label: 'API Endpoint',
        type: 'text',
        defaultValue: 'merchants',
        description: 'API endpoint path'
      },
      {
        name: 'pathName',
        label: 'Route Path Name',
        type: 'text',
        defaultValue: 'merchants',
        description: 'Route path for navigation'
      },
      {
        name: 'searchField',
        label: 'Search Field',
        type: 'text',
        defaultValue: 'merchantName',
        description: 'Primary search field (optional)'
      },
      {
        name: 'statusField',
        label: 'Status Field',
        type: 'text',
        defaultValue: 'status',
        description: 'Status field name (optional)'
      },
      {
        name: 'dateField',
        label: 'Date Field',
        type: 'text',
        defaultValue: 'registrationDate',
        description: 'Date field name (optional)'
      },
      {
        name: 'nameField',
        label: 'Name Field',
        type: 'text',
        defaultValue: 'merchantName',
        description: 'Display name field (optional)'
      },
      {
        name: 'emailField',
        label: 'Email Field',
        type: 'text',
        defaultValue: 'email',
        description: 'Email field (optional)'
      }
    ],
    dependencies: ['swr', 'moment', 'qs', 'next/navigation', '@/hooks/useFilter'],
    examples: [
      {
        name: 'Merchant Hook',
        values: {
          entityName: 'MerchantManagement',
          apiEndpoint: 'merchants',
          pathName: 'merchants',
          searchField: 'merchantName',
          statusField: 'status',
          dateField: 'registrationDate',
          nameField: 'merchantName',
          emailField: 'email'
        }
      },
      {
        name: 'User Hook',
        values: {
          entityName: 'UserManagement',
          apiEndpoint: 'users',
          pathName: 'users',
          searchField: 'userName',
          statusField: 'status',
          dateField: 'createdAt',
          nameField: 'fullName',
          emailField: 'email'
        }
      }
    ]
  },
  {
    id: 'api-service',
    name: 'API Service Layer',
    description: 'Generate API service functions with error handling and TypeScript types',
    category: 'api',
    icon: <ApiOutlined />,
    template: `import { AxiosResponse } from 'axios';
import apiClient from '@/services/api-client';

// Types
export interface {{entityName}} {
  {{#each fields}}
  {{name}}: {{type}};
  {{/each}}
}

export interface {{entityName}}ListResponse {
  data: {{entityName}}[];
  total: number;
  page: number;
  limit: number;
}

export interface {{entityName}}Params {
  page?: number;
  limit?: number;
  search?: string;
  {{#each filterFields}}
  {{name}}?: {{type}};
  {{/each}}
}

export interface Create{{entityName}}Data {
  {{#each createFields}}
  {{name}}: {{type}};
  {{/each}}
}

export interface Update{{entityName}}Data {
  {{#each updateFields}}
  {{name}}?: {{type}};
  {{/each}}
}

// API Service Class
class {{serviceName}} {
  private readonly baseUrl = '/{{apiPath}}';

  /**
   * Get list of {{entityNameLower}}s with optional filtering and pagination
   */
  async getAll(params: {{entityName}}Params = {}): Promise<{{entityName}}ListResponse> {
    try {
      const response: AxiosResponse<{{entityName}}ListResponse> = await apiClient.get(
        this.baseUrl,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching {{entityNameLower}}s:', error);
      throw error;
    }
  }

  /**
   * Get single {{entityNameLower}} by ID
   */
  async getById(id: string | number): Promise<{{entityName}}> {
    try {
      const response: AxiosResponse<{ data: {{entityName}} }> = await apiClient.get(
        \`\${this.baseUrl}/\${id}\`
      );
      return response.data.data;
    } catch (error) {
      console.error(\`Error fetching {{entityNameLower}} \${id}:\`, error);
      throw error;
    }
  }

  {{#if enableCreate}}
  /**
   * Create new {{entityNameLower}}
   */
  async create(data: Create{{entityName}}Data): Promise<{{entityName}}> {
    try {
      const response: AxiosResponse<{ data: {{entityName}} }> = await apiClient.post(
        this.baseUrl,
        data
      );
      return response.data.data;
    } catch (error) {
      console.error('Error creating {{entityNameLower}}:', error);
      throw error;
    }
  }
  {{/if}}

  {{#if enableUpdate}}
  /**
   * Update existing {{entityNameLower}}
   */
  async update(id: string | number, data: Update{{entityName}}Data): Promise<{{entityName}}> {
    try {
      const response: AxiosResponse<{ data: {{entityName}} }> = await apiClient.put(
        \`\${this.baseUrl}/\${id}\`,
        data
      );
      return response.data.data;
    } catch (error) {
      console.error(\`Error updating {{entityNameLower}} \${id}:\`, error);
      throw error;
    }
  }
  {{/if}}

  {{#if enableDelete}}
  /**
   * Delete {{entityNameLower}}
   */
  async delete(id: string | number): Promise<void> {
    try {
      await apiClient.delete(\`\${this.baseUrl}/\${id}\`);
    } catch (error) {
      console.error(\`Error deleting {{entityNameLower}} \${id}:\`, error);
      throw error;
    }
  }
  {{/if}}

  {{#if enableBulkOperations}}
  /**
   * Bulk delete {{entityNameLower}}s
   */
  async bulkDelete(ids: (string | number)[]): Promise<void> {
    try {
      await apiClient.post(\`\${this.baseUrl}/bulk-delete\`, { ids });
    } catch (error) {
      console.error('Error bulk deleting {{entityNameLower}}s:', error);
      throw error;
    }
  }

  /**
   * Export {{entityNameLower}}s data
   */
  async export(params: {{entityName}}Params = {}): Promise<Blob> {
    try {
      const response = await apiClient.get(\`\${this.baseUrl}/export\`, {
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting {{entityNameLower}}s:', error);
      throw error;
    }
  }
  {{/if}}
}

// Export singleton instance
export const {{serviceInstanceName}} = new {{serviceName}}();
export default {{serviceInstanceName}};`,
    variables: [
      {
        name: 'serviceName',
        label: 'Service Class Name',
        type: 'text',
        defaultValue: 'MerchantService',
        description: 'Name of the service class'
      },
      {
        name: 'serviceInstanceName',
        label: 'Service Instance Name',
        type: 'text',
        defaultValue: 'merchantService',
        description: 'Name of exported service instance'
      },
      {
        name: 'entityName',
        label: 'Entity Name',
        type: 'text',
        defaultValue: 'Merchant',
        description: 'Name of the data entity'
      },
      {
        name: 'apiPath',
        label: 'API Path',
        type: 'text',
        defaultValue: 'merchants',
        description: 'API endpoint path'
      },
      {
        name: 'enableCreate',
        label: 'Enable Create Method',
        type: 'boolean',
        defaultValue: true
      },
      {
        name: 'enableUpdate',
        label: 'Enable Update Method',
        type: 'boolean',
        defaultValue: true
      },
      {
        name: 'enableDelete',
        label: 'Enable Delete Method',
        type: 'boolean',
        defaultValue: true
      },
      {
        name: 'enableBulkOperations',
        label: 'Enable Bulk Operations',
        type: 'boolean',
        defaultValue: false
      }
    ],
    dependencies: ['axios', '@/services/api-client'],
    examples: [
      {
        name: 'Merchant API',
        values: {
          serviceName: 'MerchantService',
          serviceInstanceName: 'merchantService',
          entityName: 'Merchant',
          apiPath: 'merchants',
          enableCreate: true,
          enableUpdate: true,
          enableDelete: true,
          enableBulkOperations: true
        }
      },
      {
        name: 'User API',
        values: {
          serviceName: 'UserService',
          serviceInstanceName: 'userService',
          entityName: 'User',
          apiPath: 'users',
          enableCreate: true,
          enableUpdate: true,
          enableDelete: false,
          enableBulkOperations: false
        }
      }
    ]
  }
];

const CodeGeneratorPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate | null>(null);
  const [variables, setVariables] = useState<Record<string, any>>({});
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Templates' },
    { value: 'component', label: 'Components' },
    { value: 'form', label: 'Forms' },
    { value: 'api', label: 'API Services' },
    { value: 'pattern', label: 'Patterns' }
  ];

  const filteredTemplates =
    selectedCategory === 'all' ? codeTemplates : codeTemplates.filter(t => t.category === selectedCategory);

  const generateCode = (template: CodeTemplate, vars: Record<string, any>) => {
    let code = template.template;

    // Simple template replacement (in real app, use a proper template engine)
    Object.entries(vars).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');

      code = code.replace(regex, String(value));
    });

    // Add computed variables
    if (vars.entityName) {
      const entityNameLower = vars.entityName.toLowerCase();
      const entityNameCamel = vars.entityName.charAt(0).toLowerCase() + vars.entityName.slice(1);
      const entityNameKebab = vars.entityName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

      code = code.replace(/{{entityNameLower}}/g, entityNameLower);
      code = code.replace(/{{entityNameCamel}}/g, entityNameCamel);
      code = code.replace(/{{entityNameKebab}}/g, entityNameKebab);
    }

    setGeneratedCode(code);
  };

  const handleTemplateSelect = (template: CodeTemplate) => {
    setSelectedTemplate(template);
    const defaultVariables = template.variables.reduce(
      (acc, variable) => {
        acc[variable.name] = variable.defaultValue;

        return acc;
      },
      {} as Record<string, any>
    );

    setVariables(defaultVariables);
    generateCode(template, defaultVariables);
  };

  const handleVariableChange = (name: string, value: any) => {
    const newVariables = { ...variables, [name]: value };

    setVariables(newVariables);
    if (selectedTemplate) {
      generateCode(selectedTemplate, newVariables);
    }
  };

  const loadExample = (example: { name: string; values: Record<string, any> }) => {
    setVariables(example.values);
    if (selectedTemplate) {
      generateCode(selectedTemplate, example.values);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = `${selectedTemplate?.name.replace(/\s+/g, '-').toLowerCase() || 'generated'}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ maxWidth: '1600px', mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Icon icon="code-generator" width={32} height={32} />
          <Typography variant="h3" component="h1" fontWeight={700}>
            Code Generator
          </Typography>
          <Chip label="TOOLS" size="small" color="info" variant="filled" />
        </Stack>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Generate boilerplate code untuk components, hooks, API services, dan patterns mengikuti P2PMerchant/Withdrawal
          pattern
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>🚀 Updated Templates:</strong> Templates telah diupdate untuk mengikuti pattern terbaru dari
          creating-features guide. Generate code sesuai dengan P2PMerchant/Withdrawal architecture untuk konsistensi
          codebase.
        </Alert>
      </Box>
      <Grid container spacing={4}>
        {/* Template Selection */}
        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Select Template
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Category</InputLabel>
                <Select value={selectedCategory} label="Category" onChange={e => setSelectedCategory(e.target.value)}>
                  {categories.map(category => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack spacing={2}>
                {filteredTemplates.map(template => (
                  <Card
                    key={template.id}
                    variant="outlined"
                    sx={{
                      cursor: 'pointer',
                      border: selectedTemplate?.id === template.id ? 2 : 1,
                      borderColor: selectedTemplate?.id === template.id ? 'primary.main' : 'divider',
                      '&:hover': { borderColor: 'primary.light' }
                    }}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        {template.icon}
                        <Typography variant="subtitle2" fontWeight={600}>
                          {template.name}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {template.description}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip label={template.category} size="small" color="primary" variant="outlined" />
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Configuration Panel */}
        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >
          {selectedTemplate ? (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Configuration
                </Typography>

                {/* Examples */}
                {selectedTemplate.examples.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Quick Examples:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                      {selectedTemplate.examples.map(example => (
                        <Chip
                          key={example.name}
                          label={example.name}
                          size="small"
                          variant="outlined"
                          onClick={() => loadExample(example)}
                          clickable
                        />
                      ))}
                    </Stack>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                  </Box>
                )}

                {/* Variables */}
                <Stack spacing={2}>
                  {selectedTemplate.variables.map(variable => (
                    <Box key={variable.name}>
                      {variable.type === 'text' && (
                        <TextField
                          fullWidth
                          label={variable.label}
                          value={variables[variable.name] || ''}
                          onChange={e => handleVariableChange(variable.name, e.target.value)}
                          helperText={variable.description}
                          size="small"
                        />
                      )}

                      {variable.type === 'select' && (
                        <FormControl fullWidth size="small">
                          <InputLabel>{variable.label}</InputLabel>
                          <Select
                            value={variables[variable.name] || ''}
                            label={variable.label}
                            onChange={e => handleVariableChange(variable.name, e.target.value)}
                          >
                            {variable.options?.map(option => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}

                      {variable.type === 'boolean' && (
                        <FormControlLabel
                          control={
                            <Switch
                              checked={variables[variable.name] || false}
                              onChange={e => handleVariableChange(variable.name, e.target.checked)}
                            />
                          }
                          label={variable.label}
                        />
                      )}
                    </Box>
                  ))}
                </Stack>

                {/* Dependencies */}
                {selectedTemplate.dependencies && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Dependencies:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                      {selectedTemplate.dependencies.map(dep => (
                        <Chip key={dep} label={dep} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Box>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <Code sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Select a template to start
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose from the available templates to generate your code
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Generated Code */}
        <Grid
          size={{
            xs: 12,
            md: 4
          }}
        >
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h6">Generated Code</Typography>
                {generatedCode && (
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Copy to clipboard">
                      <IconButton onClick={copyToClipboard} size="small">
                        <ContentCopy />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download file">
                      <IconButton onClick={downloadCode} size="small">
                        <Download />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                )}
              </Stack>

              {generatedCode ? (
                <Paper variant="outlined" sx={{ maxHeight: 600, overflow: 'auto' }}>
                  <SyntaxHighlighter
                    language="typescript"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      fontSize: '12px'
                    }}
                  >
                    {generatedCode}
                  </SyntaxHighlighter>
                </Paper>
              ) : (
                <Box
                  sx={{
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    bgcolor: 'grey.50'
                  }}
                >
                  <Stack alignItems="center" spacing={2}>
                    <PlayArrow sx={{ fontSize: 48, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      Configure template variables to generate code
                    </Typography>
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Usage Instructions */}
      <Box sx={{ mt: 6 }}>
        <Alert severity="info">
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>📖 How to use:</strong>
          </Typography>
          <ol style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Select a code template from the available categories</li>
            <li>Configure the variables according to your needs</li>
            <li>Use quick examples for common configurations</li>
            <li>Copy the generated code or download as TypeScript file</li>
            <li>Install required dependencies if needed</li>
            <li>Customize the generated code for your specific use case</li>
          </ol>
        </Alert>
      </Box>
    </Box>
  );
};

export default CodeGeneratorPage;
