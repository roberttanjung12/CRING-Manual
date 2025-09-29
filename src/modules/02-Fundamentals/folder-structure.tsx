'use client';

import { Typography, Alert, Card, CardContent, Chip, Stack, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const FolderStructurePage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Project Overview' },
    { id: 'next-structure', title: 'Next.js 15 Structure' },
    { id: 'src-organization', title: 'Source Code Organization' },
    { id: 'key-folders', title: 'Key Folders Explained' },
    { id: 'conventions', title: 'Naming Conventions' },
    { id: 'best-practices', title: 'Best Practices' }
  ];

  return (
    <DocumentationPageLayout
      title="Folder Structure"
      description="Understanding project organization dan bagaimana navigate codebase CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Development Setup',
          href: '/onboarding/development-setup'
        },
        next: {
          title: 'Routing & Navigation',
          href: '/fundamentals/routing-navigation'
        }
      }}
    >
      {/* Overview */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Project Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner menggunakan <strong>Next.js 15 App Router</strong> dengan <strong>TypeScript</strong>. Project
          ini diorganisir menggunakan modular architecture untuk maintainability dan scalability.
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Penting:</strong> Kami menggunakan App Router (bukan Pages Router), jadi semua routing logic ada di
          <code> src/app/</code> folder.
        </Alert>

        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 4 }}>
          <Chip icon={<Icon icon="nextjs" />} label="Next.js 15" color="primary" />
          <Chip icon={<Icon icon="typescript" />} label="TypeScript" color="info" />
          <Chip icon={<Icon icon="react" />} label="React 18" color="success" />
          <Chip icon={<Icon icon="material-ui" />} label="Material-UI v7" color="secondary" />
        </Stack>
      </section>

      {/* Next.js Structure */}
      <section id="next-structure">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Next.js 15 App Router Structure
        </Typography>

        <CodeBlock
          language="text"
          title="High-level folder structure"
          code={`cring-portal-partner/
├── public/                  # Static assets (images, fonts, icons)
├── src/                     # Source code
│   ├── app/                 # Next.js App Router (pages & routing)
│   ├── components/          # Reusable React components
│   ├── modules/             # Feature modules (documentation, etc.)
│   ├── store/              # Redux state management
│   ├── services/           # API services & external integrations
│   ├── hooks/              # Custom React hooks
│   ├── utility/            # Helper functions & utilities
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles & themes
├── .next/                  # Next.js build output (auto-generated)
├── node_modules/           # Dependencies (auto-generated)
├── package.json            # Project configuration & dependencies
└── tsconfig.json           # TypeScript configuration`}
        />

        <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
          🔍 Key Differences: App Router vs Pages Router
        </Typography>

        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" color="success.main">
                  ✅ App Router (We Use This)
                </Typography>
                <Chip label="Next.js 15" size="small" color="success" />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="body2">
                  • File-based routing di <code>src/app/</code>
                </Typography>
                <Typography variant="body2">• Server Components by default</Typography>
                <Typography variant="body2">• Built-in layouts dan error boundaries</Typography>
                <Typography variant="body2">• Better performance & SEO</Typography>
                <Typography variant="body2">• Modern React features (Suspense, etc.)</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  ❌ Pages Router (Legacy)
                </Typography>
                <Chip label="Old System" size="small" color="default" />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  • File-based routing di <code>pages/</code>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Client-side rendering by default
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Manual layout management
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Source Organization */}
      <section id="src-organization">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Source Code Organization
        </Typography>

        <CodeBlock
          language="text"
          title="Detailed src/ structure"
          code={`src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route groups (auth pages)
│   ├── (dashboard)/              # Route groups (main app)
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Global loading UI
│   ├── not-found.tsx             # 404 page
│   └── page.tsx                  # Homepage
│
├── components/                   # Reusable components
│   ├── ui/                       # Basic UI components
│   ├── forms/                    # Form components
│   ├── layouts/                  # Layout components
│   └── shared/                   # Shared business components
│
├── modules/                      # Feature modules
│   ├── 01-Onboarding/            # Documentation modules
│   ├── 02-Fundamentals/
│   ├── Components/
│   └── ...
│
├── store/                        # State management
│   ├── slices/                   # Redux slices
│   ├── api/                      # RTK Query APIs
│   └── index.ts                  # Store configuration
│
├── services/                     # External services
│   ├── api/                      # API configurations
│   ├── auth/                     # Authentication
│   └── integrations/             # Third-party integrations
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── ...
│
├── utility/                      # Helper functions
│   ├── formatters.ts
│   ├── validators.ts
│   └── constants.ts
│
├── types/                        # TypeScript definitions
│   ├── api.ts
│   ├── user.ts
│   └── common.ts
│
└── styles/                       # Styling
    ├── globals.css
    ├── theme.ts
    └── components.css`}
        />
      </section>

      {/* Key Folders */}
      <section id="key-folders">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Key Folders Explained
        </Typography>

        <Stack spacing={4}>
          {/* App Folder */}
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="folder" style={{ color: '#FFA726' }} />
                📁 src/app/
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Next.js App Router - semua pages, layouts, dan routing logic
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Route Groups
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Folder dengan <code>()</code> untuk organizing routes tanpa affecting URL path
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Special Files
                  </Typography>
                  <Stack spacing={1} sx={{ mt: 1 }}>
                    <Typography variant="body2">
                      • <code>layout.tsx</code> - Layout wrapper untuk routes
                    </Typography>
                    <Typography variant="body2">
                      • <code>page.tsx</code> - Page component
                    </Typography>
                    <Typography variant="body2">
                      • <code>loading.tsx</code> - Loading UI
                    </Typography>
                    <Typography variant="body2">
                      • <code>error.tsx</code> - Error boundary
                    </Typography>
                    <Typography variant="body2">
                      • <code>not-found.tsx</code> - 404 page
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Components Folder */}
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="react" style={{ color: '#61DAFB' }} />
                ⚛️ src/components/
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Reusable React components yang bisa dipakai di berbagai pages
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    ui/
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Basic UI components (Button, Input, Modal, dll)
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    forms/
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Form-related components (FormField, Validation, dll)
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    layouts/
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Layout components (Sidebar, Header, Footer)
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    shared/
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Business logic components yang shared across features
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Store Folder */}
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="database" style={{ color: '#9C27B0' }} />
                🗄️ src/store/
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Redux Toolkit state management setup
              </Typography>

              <CodeBlock
                language="typescript"
                title="Store structure example"
                code={`store/
├── slices/
│   ├── authSlice.ts         # Authentication state
│   ├── userSlice.ts         # User data state
│   └── appSlice.ts          # App-wide state
├── api/
│   ├── authApi.ts           # Auth API endpoints
│   ├── userApi.ts           # User API endpoints
│   └── baseApi.ts           # Base API configuration
└── index.ts                 # Store configuration`}
              />
            </CardContent>
          </Card>

          {/* Services Folder */}
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="api" style={{ color: '#FF5722' }} />
                🔌 src/services/
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                External services, API configurations, dan integrations
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    api/
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    HTTP client setup, base configurations
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    auth/
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Authentication service, token management
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    integrations/
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Third-party services (analytics, monitoring, dll)
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Naming Conventions */}
      <section id="conventions">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Naming Conventions
        </Typography>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                📝 File Naming
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    React Components
                  </Typography>
                  <CodeBlock
                    title="File Naming Convention"
                    language="text"
                    code={`# PascalCase for component files
UserProfile.tsx
LoginForm.tsx
DataTable.tsx
NavbarLayout.tsx`}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Utilities & Services
                  </Typography>
                  <CodeBlock
                    title="File Naming Convention"
                    language="text"
                    code={`# camelCase for utility files
formatUtils.ts
validationHelpers.ts
apiService.ts
authService.ts`}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Next.js Special Files
                  </Typography>
                  <CodeBlock
                    title="File Naming Convention"
                    language="text"
                    code={`# Lowercase for Next.js convention
page.tsx
layout.tsx
loading.tsx
error.tsx
not-found.tsx`}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                📁 Folder Naming
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    General Rule
                  </Typography>
                  <CodeBlock
                    title="File Naming Convention"
                    language="text"
                    code={`# kebab-case for folders
user-management/
data-tables/
api-services/
custom-hooks/`}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Next.js Route Groups
                  </Typography>
                  <CodeBlock
                    title="File Naming Convention"
                    language="text"
                    code={`# Parentheses for route groups
(auth)/
(dashboard)/
(admin)/`}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🔤 Variable Naming
              </Typography>

              <CodeBlock
                language="typescript"
                title="TypeScript naming conventions"
                code={`// Components - PascalCase
const UserProfile = () => { ... }
const DataTableRow = () => { ... }

// Variables & functions - camelCase
const userData = { ... }
const fetchUserData = () => { ... }

// Constants - UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_ATTEMPTS = 3

// Types & Interfaces - PascalCase
interface UserData {
  id: string;
  name: string;
}

type ApiResponse<T> = {
  data: T;
  status: number;
}`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Best Practices */}
      <section id="best-practices">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Folder Organization Best Practices
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'success.main' }}>
                ✅ Do These
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Group by Feature
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Organize components dan logic berdasarkan feature, bukan berdasarkan file type
                  </Typography>
                  <CodeBlock
                    title="File Naming Convention"
                    language="text"
                    code={`# ✅ Good - Feature-based
features/
├── user-management/
│   ├── UserList.tsx
│   ├── UserForm.tsx
│   ├── userApi.ts
│   └── userTypes.ts`}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Keep Related Files Close
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Component, styles, tests, dan types yang related harus deket satu sama lain
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Use Index Files
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Buat <code>index.ts</code> untuk export multiple items dari satu folder
                  </Typography>
                  <CodeBlock
                    language="typescript"
                    title="components/ui/index.ts"
                    code={`export { Button } from './Button'
export { Input } from './Input'
export { Modal } from './Modal'`}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'error.main' }}>
                ❌ Avoid These
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Deep Nesting
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Jangan buat folder structure terlalu dalam (max 3-4 levels)
                  </Typography>
                  <CodeBlock
                    title="File Naming Convention"
                    language="text"
                    code={`# ❌ Bad - Too deep
src/features/user/management/components/forms/create/UserCreateForm.tsx`}
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Mixing Public Assets
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Jangan campurkan component assets dengan public assets
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Unclear Names
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hindari nama folder/file yang ambiguous seperti <code>misc/</code>, <code>common/</code>,
                    <code>utils/</code>
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Alert severity="info" sx={{ mt: 4 }}>
            <strong>Pro Tip:</strong> Gunakan VS Code extension "File Utils" untuk quickly navigate dan rename files.
            Also install "Auto Import - ES6, TS, JSX, TSX" untuk automatic import management.
          </Alert>
        </Stack>
      </section>
    </DocumentationPageLayout>
  );
};

export default FolderStructurePage;
