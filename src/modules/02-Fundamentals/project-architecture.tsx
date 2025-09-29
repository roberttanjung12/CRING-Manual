'use client';

import { Typography, Alert, Card, CardContent, Chip, Stack, Divider } from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const ProjectArchitecturePage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Architecture Overview' },
    { id: 'folder-structure', title: 'Folder Structure' },
    { id: 'data-flow', title: 'Data Flow' },
    { id: 'routing', title: 'Routing Strategy' },
    { id: 'state-management', title: 'State Management' },
    { id: 'component-hierarchy', title: 'Component Hierarchy' }
  ];

  return (
    <DocumentationPageLayout
      title="Project Architecture"
      description="Memahami arsitektur high-level dan design patterns yang digunakan di CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Project Overview',
          href: '/onboarding/project-overview'
        },
        next: {
          title: 'Folder Structure',
          href: '/fundamentals/folder-structure'
        }
      }}
    >
      {/* Architecture Overview */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Architecture Overview
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>Modular Architecture:</strong> Aplikasi menggunakan feature-based modular architecture untuk
          maintainability dan scalability yang optimal.
        </Alert>

        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
          CRING! Partner dibangun dengan arsitektur yang memisahkan concerns dengan jelas:
        </Typography>

        <Stack spacing={3} sx={{ mb: 4 }}>
          <Card sx={{ borderLeft: 4, borderColor: '#1976d2' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                📱 Presentation Layer
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                React components dengan Material-UI untuk user interface
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="Pages" size="small" color="primary" />
                <Chip label="Components" size="small" color="primary" />
                <Chip label="Layouts" size="small" color="primary" />
                <Chip label="Forms" size="small" color="primary" />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ borderLeft: 4, borderColor: '#4caf50' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#4caf50' }}>
                🧠 Business Logic Layer
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Custom hooks dan utilities untuk business logic dan data processing
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="Custom Hooks" size="small" color="success" />
                <Chip label="Utilities" size="small" color="success" />
                <Chip label="Validators" size="small" color="success" />
                <Chip label="Formatters" size="small" color="success" />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ borderLeft: 4, borderColor: '#ff9800' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ff9800' }}>
                🔄 State Management Layer
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Redux Toolkit untuk global state dan React Query untuk server state
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="Redux Toolkit" size="small" color="warning" />
                <Chip label="Redux Slices" size="small" color="warning" />
                <Chip label="React Query" size="small" color="warning" />
                <Chip label="Context API" size="small" color="warning" />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ borderLeft: 4, borderColor: '#f44336' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#f44336' }}>
                🌐 Service Layer
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                API services dan HTTP client untuk komunikasi dengan backend
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="Axios Client" size="small" color="error" />
                <Chip label="API Services" size="small" color="error" />
                <Chip label="Interceptors" size="small" color="error" />
                <Chip label="Error Handling" size="small" color="error" />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Folder Structure */}
      <section id="folder-structure">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Folder Structure Principles
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Struktur folder mengikuti prinsip <strong>feature-based organization</strong> dan{' '}
          <strong>separation of concerns</strong>:
        </Typography>

        <CodeBlock
          title="Folder Structure"
          language="text"
          code={`src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components  
├── modules/               # Feature modules
├── services/              # API services
├── store/                # Redux store & slices
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── utility/              # Helper functions
├── styles/               # Global styles
├── layouts/              # Page layouts`}
        />

        <Alert severity="info" sx={{ mt: 3, mb: 3 }}>
          <strong>Key Principle:</strong> Setiap folder memiliki tanggung jawab yang jelas. Components yang reusable di{' '}
          <code>/components</code>, feature-specific di <code>/modules</code>.
        </Alert>
      </section>

      {/* Data Flow */}
      <section id="data-flow">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Data Flow Architecture
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Data flow mengikuti unidirectional data flow pattern:
        </Typography>

        <Stack spacing={3} sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                1. 🎯 User Interaction
              </Typography>
              <Typography variant="body2" color="text.secondary">
                User melakukan action di UI component (click, input, submit)
              </Typography>
            </CardContent>
          </Card>

          <Divider />

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                2. 📞 Service Call
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Component memanggil service function atau dispatch Redux action
              </Typography>
            </CardContent>
          </Card>

          <Divider />

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                3. 🌐 API Request
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Service melakukan HTTP request ke backend API
              </Typography>
            </CardContent>
          </Card>

          <Divider />

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                4. 🔄 State Update
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Redux store atau React state di-update dengan response data
              </Typography>
            </CardContent>
          </Card>

          <Divider />

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                5. 🎨 UI Re-render
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Component re-render berdasarkan state changes
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="warning" sx={{ mb: 4 }}>
          <strong>Important:</strong> Semua data mutations harus melalui proper validation dan error handling sebelum
          update state.
        </Alert>
      </section>

      {/* Routing */}
      <section id="routing">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Routing Strategy
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Menggunakan <strong>Next.js App Router</strong> dengan file-based routing:
        </Typography>

        <CodeBlock
          title="File Structure"
          language="text"
          code={`app/
├── page.tsx                          # / (homepage)
├── getting-started/
│   └── page.tsx                     # /getting-started
├── components/
│   ├── page.tsx                     # /components
│   └── component-basics/
│       └── page.tsx                 # /components/component-basics
└── [dynamic]/
    ├── page.tsx                     # /[dynamic]
    └── [...slug]/
        └── page.tsx                 # /[dynamic]/[...slug]`}
        />

        <Stack spacing={2} sx={{ mt: 3, mb: 3 }}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Icon icon="route" style={{ fontSize: '1.25rem', color: '#1976d2' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Static Routes
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Routes yang sudah ditentukan seperti <code>/getting-started</code>, <code>/components</code>
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Icon icon="dynamic_feed" style={{ fontSize: '1.25rem', color: '#4caf50' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Dynamic Routes
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Routes dengan parameter seperti <code>/merchant/[id]</code>, <code>/user/[userId]/profile</code>
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Icon icon="security" style={{ fontSize: '1.25rem', color: '#ff9800' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Protected Routes
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Routes yang memerlukan authentication dan authorization
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* State Management */}
      <section id="state-management">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          State Management Strategy
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Aplikasi menggunakan <strong>hybrid state management</strong> approach:
        </Typography>

        <Stack spacing={3} sx={{ mb: 4 }}>
          <Card sx={{ borderLeft: 4, borderColor: '#1976d2' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                🏪 Redux Toolkit - Global State
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Untuk application-wide state yang perlu di-share across components
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• User authentication state</Typography>
                <Typography variant="body2">• Global UI state (sidebar, theme)</Typography>
                <Typography variant="body2">• Application settings</Typography>
                <Typography variant="body2">• Notification state</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ borderLeft: 4, borderColor: '#4caf50' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#4caf50' }}>
                🔄 React Query - Server State
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Untuk data fetching, caching, dan synchronization dengan server
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• API data caching</Typography>
                <Typography variant="body2">• Background data updates</Typography>
                <Typography variant="body2">• Optimistic updates</Typography>
                <Typography variant="body2">• Error retry logic</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ borderLeft: 4, borderColor: '#ff9800' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ff9800' }}>
                ⚛️ React State - Local State
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Untuk component-specific state yang tidak perlu di-share
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Form state dan validation</Typography>
                <Typography variant="body2">• Modal open/close state</Typography>
                <Typography variant="body2">• Local UI interactions</Typography>
                <Typography variant="body2">• Temporary data</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Rule of Thumb:</strong> Gunakan local state first, naik ke global state hanya jika data perlu di-share
          atau persist across navigation.
        </Alert>
      </section>

      {/* Component Hierarchy */}
      <section id="component-hierarchy">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Component Hierarchy
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Hierarchy components mengikuti <strong>composition pattern</strong>:
        </Typography>

        <CodeBlock
          title="Folder Structure"
          language="text"
          code={`App
├── Layout (Global)
│   ├── Header
│   │   ├── Navigation
│   │   ├── UserMenu
│   │   └── NotificationBell
│   ├── Sidebar
│   │   └── NavigationMenu
│   └── Main Content
│       ├── Page Container
│       │   ├── Page Header
│       │   ├── Page Content
│       │   │   ├── Feature Components
│       │   │   │   ├── Data Table
│       │   │   │   ├── Forms
│       │   │   │   └── Modals
│       │   │   └── UI Components
│       │   │       ├── Cards
│       │   │       ├── Buttons  
│       │   │       └── Inputs
│       │   └── Page Footer
│       └── Toast/Notifications`}
        />

        <Stack spacing={2} sx={{ mt: 3 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1976d2' }}>
                📦 Container Components
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Handle business logic, data fetching, dan state management
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#4caf50' }}>
                🎨 Presentational Components
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Focus pada UI rendering dan user interactions, menerima props
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#ff9800' }}>
                🔧 Utility Components
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Helper components seperti Error Boundaries, Providers, HOCs
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Next Step:</strong> Sekarang mari pelajari detail folder structure dan bagaimana cara navigate dalam
          codebase.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default ProjectArchitecturePage;
