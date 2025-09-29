'use client';

import { Typography, Alert, Card, CardContent, Chip, Stack, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const RoutingNavigationPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'App Router Overview' },
    { id: 'routing-basics', title: 'Routing Basics' },
    { id: 'navigation', title: 'Navigation Methods' },
    { id: 'route-groups', title: 'Route Groups' },
    { id: 'dynamic-routes', title: 'Dynamic Routes' },
    { id: 'middleware', title: 'Middleware & Protection' }
  ];

  return (
    <DocumentationPageLayout
      title="Routing & Navigation"
      description="Cara kerja routing di Next.js 15 App Router dan navigation patterns"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Folder Structure',
          href: '/fundamentals/folder-structure'
        },
        next: {
          title: 'State Management',
          href: '/fundamentals/state-management'
        }
      }}
    >
      {/* Overview */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Next.js App Router Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner menggunakan <strong>Next.js 15 App Router</strong> yang memberikan file-based routing dengan
          performance dan developer experience yang lebih baik.
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Key Difference:</strong> App Router menggunakan Server Components by default dan memiliki built-in
          support untuk layouts, loading states, dan error handling.
        </Alert>

        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 4 }}>
          <Chip icon={<Icon icon="nextjs" />} label="App Router" color="primary" />
          <Chip icon={<Icon icon="react" />} label="Server Components" color="success" />
          <Chip icon={<Icon icon="folder" />} label="File-based" color="info" />
          <Chip icon={<Icon icon="layout" />} label="Nested Layouts" color="secondary" />
        </Stack>
      </section>

      {/* Routing Basics */}
      <section id="routing-basics">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Routing Basics
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              📁 File-based Routing
            </Typography>

            <CodeBlock
              language="text"
              title="Basic routing structure"
              code={`src/app/
├── page.tsx              → / (homepage)
├── about/
│   └── page.tsx          → /about
├── dashboard/
│   ├── page.tsx          → /dashboard
│   ├── settings/
│   │   └── page.tsx      → /dashboard/settings
│   └── users/
│       ├── page.tsx      → /dashboard/users
│       └── [id]/
│           └── page.tsx  → /dashboard/users/123`}
            />

            <Alert severity="info" sx={{ mt: 2 }}>
              Only <code>page.tsx</code> files are publicly accessible routes. Other files like components, utilities,
              etc., can exist in the same folder without creating routes.
            </Alert>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🎯 Special Files
            </Typography>

            <Stack spacing={2}>
              {[
                {
                  file: 'page.tsx',
                  description: 'Main page content - publicly accessible route',
                  icon: 'file'
                },
                {
                  file: 'layout.tsx',
                  description: 'Shared layout wrapper untuk child routes',
                  icon: 'layout'
                },
                {
                  file: 'loading.tsx',
                  description: 'Loading UI yang muncul saat route loading',
                  icon: 'loader'
                },
                {
                  file: 'error.tsx',
                  description: 'Error boundary untuk handle route errors',
                  icon: 'alert-circle'
                },
                {
                  file: 'not-found.tsx',
                  description: '404 page untuk routes yang tidak ditemukan',
                  icon: 'search-x'
                }
              ].map((item, index) => (
                <Card key={index} variant="outlined">
                  <CardContent sx={{ py: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Icon icon={item.icon} style={{ color: '#666', fontSize: '20px' }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {item.file}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Stack>
      </section>

      {/* Navigation Methods */}
      <section id="navigation">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Navigation Methods
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🔗 Link Component
            </Typography>

            <CodeBlock
              language="typescript"
              title="Using Next.js Link"
              code={`import Link from 'next/link'

// Basic link
<Link href="/dashboard">
  Go to Dashboard
</Link>

// Link with styling
<Link 
  href="/dashboard/users" 
  className="text-blue-600 hover:underline"
>
  View Users
</Link>

// Programmatic navigation with data
<Link 
  href={{
    pathname: '/dashboard/users',
    query: { tab: 'active' }
  }}
>
  Active Users
</Link>`}
            />

            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>Best Practice:</strong> Gunakan Link component untuk internal navigation. Next.js akan melakukan
              prefetching otomatis untuk better performance.
            </Alert>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🧭 useRouter Hook
            </Typography>

            <CodeBlock
              language="typescript"
              title="Programmatic navigation"
              code={`'use client' // Client component required for useRouter

import { useRouter } from 'next/navigation'

function MyComponent() {
  const router = useRouter()

  const handleSubmit = async (data: FormData) => {
    try {
      await submitForm(data)
      // Navigate after successful submission
      router.push('/dashboard/success')
    } catch (error) {
      console.error('Form submission failed')
    }
  }

  const goBack = () => {
    router.back() // Navigate to previous page
  }

  const refresh = () => {
    router.refresh() // Refresh current route
  }

  return (
    <div>
      <button onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </button>
      <button onClick={goBack}>
        Go Back
      </button>
    </div>
  )
}`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🔄 redirect() Function
            </Typography>

            <CodeBlock
              language="typescript"
              title="Server-side redirects"
              code={`import { redirect } from 'next/navigation'

// In Server Components or Server Actions
async function MyServerComponent() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login') // Server-side redirect
  }

  return <div>Welcome, {user.name}!</div>
}

// In Server Actions
async function createPost(formData: FormData) {
  const post = await savePost(formData)
  redirect(\`/posts/\${post.id}\`) // Redirect after action
}`}
            />
          </Box>
        </Stack>
      </section>

      {/* Route Groups */}
      <section id="route-groups">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Route Groups & Layouts
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🗂️ Route Groups
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Route groups menggunakan <code>()</code> untuk organize routes tanpa affecting URL path.
            </Typography>

            <CodeBlock
              language="text"
              title="Route groups structure"
              code={`src/app/
├── (auth)/                   # Route group - tidak affect URL
│   ├── login/
│   │   └── page.tsx          → /login
│   ├── register/
│   │   └── page.tsx          → /register
│   └── layout.tsx            # Layout untuk auth pages
├── (dashboard)/
│   ├── dashboard/
│   │   └── page.tsx          → /dashboard
│   ├── users/
│   │   └── page.tsx          → /users
│   └── layout.tsx            # Layout untuk dashboard pages
└── layout.tsx                # Root layout`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              📱 Layout Hierarchy
            </Typography>

            <CodeBlock
              language="typescript"
              title="Nested layouts example"
              code={`// Root Layout (src/app/layout.tsx)
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <GlobalHeader />
        {children}
        <GlobalFooter />
      </body>
    </html>
  )
}

// Dashboard Layout (src/app/(dashboard)/layout.tsx)
export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="content">
        {children}
      </main>
    </div>
  )
}`}
            />
          </Box>
        </Stack>
      </section>

      {/* Dynamic Routes */}
      <section id="dynamic-routes">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Dynamic Routes & Parameters
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🔢 Dynamic Segments
            </Typography>

            <CodeBlock
              language="text"
              title="Dynamic route examples"
              code={`src/app/
├── users/
│   └── [id]/
│       └── page.tsx          → /users/123, /users/456
├── posts/
│   └── [slug]/
│       └── page.tsx          → /posts/my-first-post
└── shop/
    └── [...categories]/
        └── page.tsx          → /shop/clothes/shirts/cotton`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🎛️ Accessing Parameters
            </Typography>

            <CodeBlock
              language="typescript"
              title="Using params in components"
              code={`// src/app/users/[id]/page.tsx
interface PageProps {
  params: {
    id: string
  }
  searchParams: {
    tab?: string
    filter?: string
  }
}

export default function UserPage({ 
  params, 
  searchParams 
}: PageProps) {
  const { id } = params
  const { tab = 'profile', filter } = searchParams

  return (
    <div>
      <h1>User ID: {id}</h1>
      <p>Active Tab: {tab}</p>
      {filter && <p>Filter: {filter}</p>}
    </div>
  )
}

// URL: /users/123?tab=settings&filter=active
// params: { id: '123' }
// searchParams: { tab: 'settings', filter: 'active' }`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🎨 generateStaticParams (SSG)
            </Typography>

            <CodeBlock
              language="typescript"
              title="Static generation for dynamic routes"
              code={`// Generate static pages at build time
export async function generateStaticParams() {
  const users = await fetchUsers()
 
  return users.map((user) => ({
    id: user.id.toString()
  }))
}

// This will generate:
// /users/1, /users/2, /users/3, etc.
export default function UserPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  return <div>User {params.id}</div>
}`}
            />
          </Box>
        </Stack>
      </section>

      {/* Middleware */}
      <section id="middleware">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Middleware & Route Protection
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🛡️ Auth Middleware
            </Typography>

            <CodeBlock
              language="typescript"
              title="middleware.ts (project root)"
              code={`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Check if user is authenticated
  const token = request.cookies.get('auth-token')
  
  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(
        new URL('/login', request.url)
      )
    }
  }

  // Redirect authenticated users from auth pages
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (token) {
      return NextResponse.redirect(
        new URL('/dashboard', request.url)
      )
    }
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register'
  ]
}`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🔒 Route Protection Patterns
            </Typography>

            <CodeBlock
              language="typescript"
              title="Protected page example"
              code={`// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function DashboardPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <p>Hello, {session.user?.name}</p>
    </div>
  )
}

// Client-side protection
'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ClientProtectedPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Loading...</div>
  if (!session) redirect('/login')

  return <div>Protected content</div>
}`}
            />
          </Box>
        </Stack>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Security Best Practice:</strong> Selalu implement protection di server-side (middleware atau Server
          Components) untuk keamanan yang sesungguhnya. Client-side protection hanya untuk UX.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default RoutingNavigationPage;
