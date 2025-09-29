'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const FormsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Forms Overview' },
    { id: 'basic-forms', title: 'Basic Forms' },
    { id: 'validation', title: 'Form Validation' },
    { id: 'advanced-forms', title: 'Advanced Forms' }
  ];

  return (
    <DocumentationPageLayout
      title="Forms"
      description="Form components dan validation patterns untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Features Architecture',
          href: '/features/architecture'
        },
        next: {
          title: 'Tables',
          href: '/features/tables'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Forms Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner menggunakan Material-UI form components dengan React Hook Form untuk validation dan state
          management yang optimal.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="React Hook Form" color="primary" variant="outlined" />
          <Chip label="Material-UI" color="secondary" variant="outlined" />
          <Chip label="TypeScript" color="info" variant="outlined" />
          <Chip label="Validation" color="success" variant="outlined" />
        </Stack>
      </section>

      <section id="basic-forms">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Basic Forms
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Simple Login Form
            </Typography>
            <CodeBlock
              language="typescript"
              title="LoginForm Component"
              code={`import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert
} from '@mui/material';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Call login API
      console.log('Login data:', data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          Login to CRING!
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email wajib diisi',
              pattern: {
                value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
                message: 'Format email tidak valid'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password wajib diisi',
              minLength: {
                value: 6,
                message: 'Password minimal 6 karakter'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Login...' : 'Login'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginForm;`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="validation">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Form Validation
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Merchant Registration Form
              </Typography>
              <CodeBlock
                language="typescript"
                title="MerchantForm with Validation"
                code={`import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const merchantSchema = yup.object({
  merchantName: yup
    .string()
    .required('Nama merchant wajib diisi')
    .min(3, 'Nama merchant minimal 3 karakter'),
  email: yup
    .string()
    .required('Email wajib diisi')
    .email('Format email tidak valid'),
  phone: yup
    .string()
    .required('Nomor telepon wajib diisi')
    .matches(/^[0-9]+$/, 'Nomor telepon hanya boleh angka'),
  address: yup
    .string()
    .required('Alamat wajib diisi')
    .min(10, 'Alamat minimal 10 karakter'),
  category: yup
    .string()
    .required('Kategori wajib dipilih')
});

interface MerchantFormData {
  merchantName: string;
  email: string;
  phone: string;
  address: string;
  category: string;
}

const MerchantForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<MerchantFormData>({
    resolver: yupResolver(merchantSchema),
    mode: 'onChange'
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="merchantName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nama Merchant"
            fullWidth
            margin="normal"
            error={!!errors.merchantName}
            helperText={errors.merchantName?.message}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Kategori"
            fullWidth
            margin="normal"
            error={!!errors.category}
            helperText={errors.category?.message}
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Pilih Kategori</option>
            <option value="food">Makanan & Minuman</option>
            <option value="retail">Retail</option>
            <option value="services">Jasa</option>
          </TextField>
        )}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? 'Menyimpan...' : 'Simpan Merchant'}
      </Button>
    </Box>
  );
};`}
              />
            </CardContent>
          </Card>

          <Alert severity="info">
            <strong>Tips:</strong> Gunakan yup untuk schema validation yang lebih kompleks dan reusable validation
            rules.
          </Alert>
        </Stack>
      </section>

      <section id="advanced-forms">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Advanced Forms
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Dynamic Forms dengan Custom Hook
            </Typography>
            <CodeBlock
              language="typescript"
              title="useDynamicForm Hook"
              code={`interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox';
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: any;
}

const useDynamicForm = (fields: FormField[], onSubmit: (data: any) => void) => {
  const form = useForm({
    mode: 'onChange'
  });

  const renderField = (field: FormField) => {
    const { name, label, type, required, options } = field;
    
    return (
      <Controller
        key={name}
        name={name}
        control={form.control}
        rules={{
          required: required ? \`\${label} wajib diisi\` : false,
          ...field.validation
        }}
        render={({ field: fieldProps }) => {
          switch (type) {
            case 'select':
              return (
                <TextField
                  {...fieldProps}
                  select
                  label={label}
                  fullWidth
                  margin="normal"
                  error={!!form.formState.errors[name]}
                  helperText={form.formState.errors[name]?.message}
                  SelectProps={{ native: true }}
                >
                  <option value="">Pilih {label}</option>
                  {options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              );
            
            case 'checkbox':
              return (
                <FormControlLabel
                  control={<Checkbox {...fieldProps} />}
                  label={label}
                />
              );
            
            default:
              return (
                <TextField
                  {...fieldProps}
                  label={label}
                  type={type}
                  fullWidth
                  margin="normal"
                  error={!!form.formState.errors[name]}
                  helperText={form.formState.errors[name]?.message}
                />
              );
          }
        }}
      />
    );
  };

  return {
    ...form,
    renderField,
    handleSubmit: form.handleSubmit(onSubmit)
  };
};

// Usage Example
const DynamicForm: React.FC = () => {
  const fields: FormField[] = [
    { name: 'name', label: 'Nama', type: 'text', required: true },
    { 
      name: 'type', 
      label: 'Tipe', 
      type: 'select', 
      required: true,
      options: [
        { value: 'personal', label: 'Personal' },
        { value: 'business', label: 'Business' }
      ]
    },
    { name: 'email', label: 'Email', type: 'email', required: true }
  ];

  const { renderField, handleSubmit } = useDynamicForm(
    fields,
    (data) => console.log('Form data:', data)
  );

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {fields.map(renderField)}
      
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>Advanced Forms Ready!</strong> Pattern ini memungkinkan pembuatan forms yang dinamis dan reusable.
            </Alert>
          </CardContent>
        </Card>
      </section>
    </DocumentationPageLayout>
  );
};

export default FormsPage;
