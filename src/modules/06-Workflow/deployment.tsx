'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const DeploymentPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Deployment Overview' },
    { id: 'vercel-deployment', title: 'Vercel Deployment' },
    { id: 'cicd-pipeline', title: 'CI/CD Pipeline' },
    { id: 'environment-config', title: 'Environment Configuration' }
  ];

  return (
    <DocumentationPageLayout
      title="Deployment"
      description="Deployment processes dan CI/CD pipeline setup untuk CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Testing',
          href: '/workflow/testing'
        },
        next: {
          title: 'Troubleshooting',
          href: '/workflow/troubleshooting'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Deployment Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner menggunakan automated deployment dengan Vercel untuk production, staging, dan preview
          environments dengan CI/CD pipeline yang terintegrasi dengan GitHub Actions.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="Vercel" color="primary" variant="outlined" />
          <Chip label="GitHub Actions" color="secondary" variant="outlined" />
          <Chip label="Docker" color="info" variant="outlined" />
          <Chip label="Environment Variables" color="success" variant="outlined" />
        </Stack>
      </section>

      <section id="vercel-deployment">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Vercel Deployment
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Vercel Configuration
              </Typography>
              <CodeBlock
                language="json"
                title="vercel.json"
                code={`{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ],
  "env": {
    "NEXT_PUBLIC_APP_ENV": "production",
    "NEXT_PUBLIC_APP_VERSION": "1.0.0"
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Deployment Commands
              </Typography>
              <CodeBlock
                language="bash"
                title="Package.json Scripts"
                code={`{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "build:analyze": "ANALYZE=true npm run build",
    "deploy:preview": "vercel --prod=false",
    "deploy:production": "vercel --prod"
  }
}

# Manual deployment commands
npm run build              # Build for production
npm run type-check         # TypeScript validation
npm run lint               # ESLint validation
npm run test               # Run tests
vercel --prod              # Deploy to production`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="cicd-pipeline">
        <Typography variant="h5" sx={{ mb: 2 }}>
          CI/CD Pipeline
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                GitHub Actions Workflow
              </Typography>
              <CodeBlock
                language="text"
                title=".github/workflows/deploy.yml"
                code={`name: Deploy to Vercel

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run TypeScript check
        run: npm run type-check

      - name: Run linting
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          token: \${{ secrets.CODECOV_TOKEN }}

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_API_BASE_URL: \${{ secrets.API_BASE_URL }}
          NEXT_PUBLIC_APP_VERSION: \${{ github.sha }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: .next/

  deploy:
    needs: [test, build]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Docker Configuration
              </Typography>
              <CodeBlock
                language="text"
                title="Dockerfile"
                code={`FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js telemetry disabled
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="environment-config">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Environment Configuration
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Environment Variables Setup
            </Typography>
            <CodeBlock
              language="bash"
              title="Environment Configuration"
              code={`# .env.local (Development)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_DEBUG=true

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/cring_dev
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-jwt-secret-key
NEXTAUTH_URL=http://localhost:8815
NEXTAUTH_SECRET=your-nextauth-secret

# .env.production (Production)
NEXT_PUBLIC_API_BASE_URL=https://api.cring.id
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_DEBUG=false

# Production Database
DATABASE_URL=postgresql://prod_user:prod_pass@prod_host:5432/cring_prod
REDIS_URL=redis://prod_redis:6379

# Production secrets
JWT_SECRET=\${JWT_SECRET}
NEXTAUTH_URL=https://partner.cring.id
NEXTAUTH_SECRET=\${NEXTAUTH_SECRET}

# Vercel Environment Variables Setup
# Set these in Vercel Dashboard > Project > Settings > Environment Variables

# Development Environment
NEXT_PUBLIC_API_BASE_URL: https://dev-api.cring.id
BRANCH: preview

# Staging Environment  
NEXT_PUBLIC_API_BASE_URL: https://staging-api.cring.id
BRANCH: staging

# Production Environment
NEXT_PUBLIC_API_BASE_URL: https://api.cring.id
BRANCH: main

# Environment validation utility
export const validateEnv = () => {
  const requiredEnvs = [
    'NEXT_PUBLIC_API_BASE_URL',
    'DATABASE_URL',
    'JWT_SECRET'
  ];

  const missingEnvs = requiredEnvs.filter(env => !process.env[env]);
  
  if (missingEnvs.length > 0) {
    throw new Error(\`Missing environment variables: \${missingEnvs.join(', ')}\`);
  }
  
  console.log('✅ Environment variables validated');
};`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>Deployment Ready!</strong> Automated deployment pipeline dengan environment management dan quality
              checks sudah siap.
            </Alert>
          </CardContent>
        </Card>
      </section>
    </DocumentationPageLayout>
  );
};

export default DeploymentPage;
