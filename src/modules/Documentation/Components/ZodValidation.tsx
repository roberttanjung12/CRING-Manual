'use client';

import React from 'react';
import { Box, Typography, Divider, Alert, AlertTitle, Chip, Stack, Card, CardContent } from '@mui/material';
import CodeBlock from '@/documentation/components/CodeBlock';

/**
 * Zod TypeScript Validation Documentation Module
 *
 * Complete guide for implementing Zod validation in CRING Portal Partner
 * to replace Yup validation with better TypeScript integration.
 *
 * References:
 * - references/modules/ManageQRISV2/DynamicQRIS/ (usage patterns)
 * - references/modules/validation/ (existing validation patterns)
 */
const ZodValidationDocumentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Chip label="PRIORITY #2" color="warning" size="small" />
          <Chip label="Form Validation" color="primary" variant="outlined" size="small" />
          <Chip label="TypeScript" color="secondary" variant="outlined" size="small" />
        </Stack>

        <Typography variant="h4" component="h1" gutterBottom>
          🛡️ Zod TypeScript Validation
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          📁 Replacing Yup with Zod for better TypeScript integration
        </Typography>
      </Box>

      {/* Migration Alert */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <AlertTitle>🚀 Migration from Yup to Zod</AlertTitle>
        <Typography variant="body2" paragraph>
          CRING Portal Partner is migrating from <strong>Yup</strong> to <strong>Zod</strong> for form validation. Zod
          provides better TypeScript integration, runtime type checking, and schema inference.
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          ✅ Use Zod for all NEW form validation implementations
        </Typography>
      </Alert>

      {/* Quick Info Card */}
      <Card sx={{ mb: 4, bgcolor: 'success.50' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="success.main">
            📋 Quick Reference
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Install Command:
              </Typography>
              <Typography variant="body2" component="code" sx={{ bgcolor: 'grey.100', p: 0.5, borderRadius: 1 }}>
                npm install zod @hookform/resolvers
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Usage Example:
              </Typography>
              <Typography variant="body2" component="code" sx={{ bgcolor: 'grey.100', p: 0.5, borderRadius: 1 }}>
                references/modules/ManageQRISV2/DynamicQRIS
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                React Hook Form:
              </Typography>
              <Typography variant="body2" component="code" sx={{ bgcolor: 'grey.100', p: 0.5, borderRadius: 1 }}>
                @hookform/resolvers/zod
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Purpose Section */}
      <Alert severity="success" sx={{ mb: 4 }}>
        <AlertTitle>🎯 Untuk Apa Zod Validation?</AlertTitle>
        <Typography variant="body2" paragraph>
          Zod adalah schema validation library untuk TypeScript yang memberikan <strong>type-safe validation</strong>:
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <li>
            <strong>TypeScript inference</strong> - Otomatis generate types dari schema
          </li>
          <li>
            <strong>Runtime validation</strong> - Validasi data saat runtime
          </li>
          <li>
            <strong>Better DX</strong> - IntelliSense dan auto-completion
          </li>
          <li>
            <strong>Composable schemas</strong> - Reuse validation logic
          </li>
          <li>
            <strong>Custom error messages</strong> - Pesan error yang user-friendly
          </li>
          <li>
            <strong>React Hook Form integration</strong> - Seamless form validation
          </li>
        </Box>
      </Alert>

      {/* When to Use */}
      <Alert severity="warning" sx={{ mb: 4 }}>
        <AlertTitle>⚡ Kapan Harus Digunakan?</AlertTitle>
        <Typography variant="body2" paragraph>
          <strong>SEMUA</strong> form validation baru harus menggunakan Zod:
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
          <li>Form input validation (create/update forms)</li>
          <li>API request/response validation</li>
          <li>Dynamic form validation (conditional fields)</li>
          <li>File upload validation</li>
          <li>Search filter validation</li>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold', color: 'warning.main' }}>
          🔄 Gradually replace existing Yup validations with Zod
        </Typography>
      </Alert>

      {/* Basic Setup */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🚀 Basic Setup & Installation
      </Typography>

      <CodeBlock
        title="Installation Command"
        language="bash"
        code={`# Install Zod and React Hook Form resolver
npm install zod @hookform/resolvers

# TypeScript support is built-in with Zod
# No need for @types/zod`}
      />

      <CodeBlock
        title="Basic Schema Definition"
        language="typescript"
        code={`import { z } from 'zod';

// ✅ Basic schema example
const UserSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi'),
  email: z.string().email('Format email tidak valid'),
  age: z.number().min(18, 'Umur minimal 18 tahun'),
  phone: z.string().regex(/^08[0-9]{9,11}$/, 'Format nomor HP tidak valid')
});

// 🎯 TypeScript type inference
type User = z.infer<typeof UserSchema>; // TypeScript type generated automatically

// ✅ Validation usage
const validateUser = (data: unknown): User => {
  return UserSchema.parse(data); // Throws error if invalid
};

// ✅ Safe validation (returns result object)
const safeValidateUser = (data: unknown) => {
  const result = UserSchema.safeParse(data);
  if (result.success) {
    return result.data; // Type-safe data
  } else {
    console.error(result.error.errors); // Validation errors
  }
};`}
      />

      {/* React Hook Form Integration */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🎛️ React Hook Form Integration
      </Typography>

      <Typography variant="body1" paragraph>
        Pattern yang digunakan di CRING untuk integration dengan React Hook Form:
      </Typography>

      <CodeBlock
        title="Form Component with Zod Validation"
        language="tsx"
        code={`import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Box } from '@mui/material';

// ✅ Schema definition
const CreateMerchantSchema = z.object({
  merchantName: z.string()
    .min(1, 'Nama merchant harus diisi')
    .max(50, 'Nama merchant maksimal 50 karakter'),
  
  email: z.string()
    .email('Format email tidak valid')
    .optional()
    .or(z.literal('')), // Allow empty string
  
  phoneNumber: z.string()
    .regex(/^08[0-9]{9,11}$/, 'Format nomor HP tidak valid'),
  
  address: z.string()
    .min(10, 'Alamat minimal 10 karakter'),
  
  category: z.enum(['food', 'retail', 'service', 'other'], {
    errorMap: () => ({ message: 'Pilih kategori yang valid' })
  })
});

// 🎯 TypeScript type from schema
type CreateMerchantForm = z.infer<typeof CreateMerchantSchema>;

const CreateMerchantForm: React.FC = () => {
  // ✅ React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CreateMerchantForm>({
    resolver: zodResolver(CreateMerchantSchema),
    defaultValues: {
      merchantName: '',
      email: '',
      phoneNumber: '',
      address: '',
      category: 'food'
    }
  });

  // ✅ Form submission handler
  const onSubmit = async (data: CreateMerchantForm) => {
    try {
      // Data is already validated by Zod
      await createMerchant(data);
      reset();
    } catch (error) {
      console.error('Failed to create merchant:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <TextField
        {...register('merchantName')}
        label="Nama Merchant"
        fullWidth
        margin="normal"
        error={!!errors.merchantName}
        helperText={errors.merchantName?.message}
      />
      
      <TextField
        {...register('email')}
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      
      <TextField
        {...register('phoneNumber')}
        label="Nomor HP"
        fullWidth
        margin="normal"
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
      />
      
      <TextField
        {...register('address')}
        label="Alamat"
        multiline
        rows={3}
        fullWidth
        margin="normal"
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? 'Menyimpan...' : 'Simpan Merchant'}
      </Button>
    </Box>
  );
};`}
      />

      {/* Advanced Patterns */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🔧 Advanced Validation Patterns
      </Typography>

      <CodeBlock
        title="Dynamic & Conditional Validation"
        language="typescript"
        code={`import { z } from 'zod';

// ✅ Conditional validation based on other fields
const DynamicQRISSchema = z.object({
  qrisType: z.enum(['static', 'dynamic']),
  amount: z.number().optional(),
  description: z.string().optional()
}).refine((data) => {
  // If dynamic QRIS, amount is required
  if (data.qrisType === 'dynamic') {
    return data.amount !== undefined && data.amount > 0;
  }
  return true;
}, {
  message: 'Amount harus diisi untuk Dynamic QRIS',
  path: ['amount'] // Error will be shown on amount field
});

// ✅ File validation
const FileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 5000000, {
      message: 'File maksimal 5MB'
    })
    .refine((file) => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type), {
      message: 'Format file harus JPEG, PNG, atau PDF'
    }),
  
  description: z.string().min(1, 'Deskripsi harus diisi')
});

// ✅ Array validation
const BulkMerchantSchema = z.object({
  merchants: z.array(
    z.object({
      name: z.string().min(1, 'Nama harus diisi'),
      phone: z.string().regex(/^08[0-9]{9,11}$/, 'Format HP tidak valid')
    })
  ).min(1, 'Minimal 1 merchant').max(100, 'Maksimal 100 merchant')
});

// ✅ Custom validation with transform
const PhoneNumberSchema = z.string()
  .transform((val) => val.replace(/[^0-9]/g, '')) // Remove non-digits
  .pipe(
    z.string()
      .min(10, 'Nomor HP minimal 10 digit')
      .max(13, 'Nomor HP maksimal 13 digit')
      .regex(/^08/, 'Nomor HP harus dimulai dengan 08')
  );

// ✅ API response validation
const MerchantResponseSchema = z.object({
  status: z.literal('success'),
  data: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    createdAt: z.string().datetime()
  })
});

type MerchantResponse = z.infer<typeof MerchantResponseSchema>;

// ✅ Usage in API call
const fetchMerchant = async (id: string): Promise<MerchantResponse['data']> => {
  const response = await fetch(\`/api/merchants/\${id}\`);
  const rawData = await response.json();
  
  // Validate API response
  const validatedData = MerchantResponseSchema.parse(rawData);
  return validatedData.data;
};`}
      />

      {/* Migration from Yup */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🔄 Migration from Yup to Zod
      </Typography>

      <CodeBlock
        title="Yup vs Zod Comparison"
        language="typescript"
        code={`// ❌ OLD: Yup validation
import * as yup from 'yup';

const yupSchema = yup.object().shape({
  name: yup.string().required('Nama harus diisi').max(50),
  email: yup.string().email('Email tidak valid').required(),
  age: yup.number().min(18).required()
});

// Manual type definition needed
interface FormData {
  name: string;
  email: string;
  age: number;
}

// ✅ NEW: Zod validation
import { z } from 'zod';

const zodSchema = z.object({
  name: z.string().min(1, 'Nama harus diisi').max(50),
  email: z.string().email('Email tidak valid'),
  age: z.number().min(18)
});

// Automatic type inference
type FormData = z.infer<typeof zodSchema>;

// ✅ Benefits of Zod:
// 1. Better TypeScript integration
// 2. Runtime type checking
// 3. Schema composition
// 4. Better error messages
// 5. Transform capabilities`}
      />

      <CodeBlock
        title="Migration Strategy"
        language="typescript"
        code={`// 🔄 Step-by-step migration approach

// Step 1: Create parallel Zod schema
const legacyYupSchema = yup.object().shape({
  // existing yup validation
});

const newZodSchema = z.object({
  // equivalent zod validation
});

// Step 2: Use feature flag or gradual rollout
const useZodValidation = process.env.NEXT_PUBLIC_USE_ZOD === 'true';

const validationSchema = useZodValidation ? 
  zodResolver(newZodSchema) : 
  yupResolver(legacyYupSchema);

// Step 3: Test both schemas in parallel (optional)
const validateWithBoth = (data: any) => {
  const yupResult = legacyYupSchema.isValidSync(data);
  const zodResult = newZodSchema.safeParse(data).success;
  
  if (yupResult !== zodResult) {
    console.warn('Validation mismatch:', { data, yupResult, zodResult });
  }
  
  return useZodValidation ? zodResult : yupResult;
};

// Step 4: Remove Yup dependency after migration
// npm uninstall yup @types/yup
// Remove all yup imports and schemas`}
      />

      {/* Best Practices */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        🎯 Best Practices & Tips
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>💡 Performance Tips</AlertTitle>
        <Box component="ul" sx={{ m: '8px 0 0 20px' }}>
          <li>
            <strong>Schema reuse</strong>: Create reusable schemas untuk common fields
          </li>
          <li>
            <strong>Lazy validation</strong>: Use z.lazy() untuk recursive schemas
          </li>
          <li>
            <strong>Transform data</strong>: Clean/transform input sebelum validation
          </li>
          <li>
            <strong>Error customization</strong>: Provide user-friendly error messages
          </li>
        </Box>
      </Alert>

      <CodeBlock
        title="Schema Organization & Reuse"
        language="typescript"
        code={`// ✅ Create reusable field schemas
// utils/validations/common.ts
export const CommonFields = {
  email: z.string().email('Format email tidak valid'),
  
  phoneNumber: z.string()
    .regex(/^08[0-9]{9,11}$/, 'Format nomor HP tidak valid'),
  
  indonesianName: z.string()
    .min(1, 'Nama harus diisi')
    .max(50, 'Nama maksimal 50 karakter')
    .regex(/^[a-zA-Z\\s]+$/, 'Nama hanya boleh huruf dan spasi'),
  
  currency: z.number()
    .positive('Nominal harus positif')
    .multipleOf(0.01, 'Maksimal 2 desimal'),
  
  ktp: z.string()
    .length(16, 'NIK harus 16 digit')
    .regex(/^[0-9]+$/, 'NIK hanya boleh angka')
};

// ✅ Compose schemas using common fields
// forms/merchant/validation.ts
import { CommonFields } from '@/utils/validations/common';

export const CreateMerchantSchema = z.object({
  name: CommonFields.indonesianName,
  email: CommonFields.email.optional().or(z.literal('')),
  phone: CommonFields.phoneNumber,
  ownerKtp: CommonFields.ktp,
  
  // Specific fields
  businessType: z.enum(['individual', 'company'], {
    errorMap: () => ({ message: 'Pilih jenis usaha' })
  }),
  
  address: z.object({
    street: z.string().min(10, 'Alamat minimal 10 karakter'),
    city: z.string().min(1, 'Kota harus dipilih'),
    province: z.string().min(1, 'Provinsi harus dipilih'),
    postalCode: z.string().regex(/^[0-9]{5}$/, 'Kode pos harus 5 digit')
  })
});

// ✅ Error message customization
export const CustomErrorSchema = z.object({
  amount: z.number({
    required_error: 'Nominal harus diisi',
    invalid_type_error: 'Nominal harus berupa angka'
  }).positive('Nominal harus lebih dari 0'),
  
  date: z.string()
    .datetime('Format tanggal tidak valid')
    .refine((date) => new Date(date) <= new Date(), {
      message: 'Tanggal tidak boleh di masa depan'
    })
});`}
      />

      {/* Common Mistakes */}
      <Alert severity="error" sx={{ mt: 3 }}>
        <AlertTitle>❌ Common Mistakes to Avoid</AlertTitle>
        <Box component="ul" sx={{ m: '8px 0 0 20px' }}>
          <li>
            <strong>Mixed Yup & Zod</strong> - Don't use both in same form
          </li>
          <li>
            <strong>Tidak handle .safeParse()</strong> - Always check success property
          </li>
          <li>
            <strong>Over-validation</strong> - Don't validate presentation logic
          </li>
          <li>
            <strong>Generic error messages</strong> - Provide specific, actionable errors
          </li>
          <li>
            <strong>Schema in render</strong> - Define schemas outside component
          </li>
          <li>
            <strong>Ignoring transforms</strong> - Use .transform() untuk data cleaning
          </li>
        </Box>
      </Alert>

      <Divider sx={{ my: 4 }} />

      {/* Related Components */}
      <Typography variant="h5" component="h2" gutterBottom>
        🔗 Related Components & Patterns
      </Typography>

      <Typography variant="body1" paragraph sx={{ mb: 2 }}>
        Components yang sering digunakan dengan Zod validation:
      </Typography>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Chip label="React Hook Form" variant="outlined" />
        <Chip label="TextField Material-UI" variant="outlined" />
        <Chip label="FileUpload" variant="outlined" />
        <Chip label="AutocompleteField" variant="outlined" />
        <Chip label="DatePicker" variant="outlined" />
        <Chip label="FormProvider" variant="outlined" />
      </Stack>
    </Box>
  );
};

export default ZodValidationDocumentation;
