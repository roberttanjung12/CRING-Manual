'use client';

import { Typography, Alert, Card, CardContent, Chip, Stack, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const TechStackPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Tech Stack Overview' },
    { id: 'frontend', title: 'Frontend Technologies' },
    { id: 'development', title: 'Development Tools' },
    { id: 'architecture', title: 'Architecture Decisions' },
    { id: 'learning', title: 'Learning Resources' }
  ];

  return (
    <DocumentationPageLayout
      title="Tech Stack"
      description="Technology stack decisions, dependencies, dan reasoning behind choices"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Project Overview',
          href: '/onboarding/project-overview'
        },
        next: {
          title: 'Development Setup',
          href: '/onboarding/development-setup'
        }
      }}
    >
      {/* Overview */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Tech Stack Overview
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>CRING! Partner</strong> menggunakan modern tech stack yang dipilih untuk scalability, developer
          experience, dan maintainability jangka panjang.
        </Alert>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="react" style={{ color: '#61DAFB' }} />
                Frontend Stack
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Modern React ecosystem dengan TypeScript untuk type safety
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="Next.js 15" color="primary" size="small" />
                <Chip label="React 18" color="secondary" size="small" />
                <Chip label="TypeScript" color="info" size="small" />
                <Chip label="Material-UI v7" color="success" size="small" />
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="database" style={{ color: '#FF6B35' }} />
                State Management
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Redux ecosystem untuk predictable state management
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="Redux Toolkit" color="primary" size="small" />
                <Chip label="RTK Query" color="secondary" size="small" />
                <Chip label="Redux Persist" color="info" size="small" />
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="tools" style={{ color: '#4CAF50' }} />
                Development Tools
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Tools untuk productivity dan code quality
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="ESLint" color="warning" size="small" />
                <Chip label="Prettier" color="info" size="small" />
                <Chip label="Husky" color="secondary" size="small" />
                <Chip label="Commitlint" color="success" size="small" />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Frontend Technologies */}
      <section id="frontend">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Frontend Technologies
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🚀 Next.js 15 (App Router)
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Framework React dengan fitur full-stack capabilities:
            </Typography>

            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  ✅ Mengapa Next.js?
                </Typography>
                <Typography variant="body2" component="ul" sx={{ ml: 2 }}>
                  <li>Server-side rendering untuk better SEO dan performance</li>
                  <li>File-based routing yang intuitif</li>
                  <li>Built-in optimization (Image, Font, Bundle)</li>
                  <li>API routes untuk backend functionality</li>
                  <li>Excellent developer experience</li>
                </Typography>
              </Box>
            </Stack>

            <CodeBlock
              language="json"
              title="package.json dependencies"
              code={`{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              📘 TypeScript
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Static type checking untuk mengurangi bugs dan improve DX:
            </Typography>

            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  ✅ Benefits TypeScript:
                </Typography>
                <Typography variant="body2" component="ul" sx={{ ml: 2 }}>
                  <li>Catch errors at compile time, bukan runtime</li>
                  <li>Better IDE support dengan autocomplete</li>
                  <li>Self-documenting code dengan interfaces</li>
                  <li>Easier refactoring untuk large codebase</li>
                  <li>Team collaboration dengan clear contracts</li>
                </Typography>
              </Box>
            </Stack>

            <CodeBlock
              language="typescript"
              title="tsconfig.json configuration"
              code={`{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🎨 Material-UI v7
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Component library dengan design system yang comprehensive:
            </Typography>

            <Stack spacing={2} sx={{ mb: 3 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  ✅ Mengapa Material-UI?
                </Typography>
                <Typography variant="body2" component="ul" sx={{ ml: 2 }}>
                  <li>Production-ready components dengan accessibility</li>
                  <li>Consistent design system dengan theming</li>
                  <li>Responsive dan mobile-first approach</li>
                  <li>Extensive customization options</li>
                  <li>Large community dan excellent documentation</li>
                </Typography>
              </Box>
            </Stack>

            <CodeBlock
              language="typescript"
              title="MUI Theme Setup"
              code={`// src/theme/index.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});`}
            />
          </Box>
        </Stack>
      </section>

      {/* Development Tools */}
      <section id="development">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Development Tools
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🔧 Code Quality Tools
            </Typography>

            <Stack spacing={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    ESLint + Prettier
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Automated code formatting dan linting untuk consistency
                  </Typography>

                  <CodeBlock
                    language="json"
                    title=".eslintrc.json"
                    code={`{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error"
  }
}`}
                  />
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Git Hooks (Husky)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Pre-commit checks untuk maintain code quality
                  </Typography>

                  <CodeBlock
                    language="json"
                    title="package.json scripts"
                    code={`{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}`}
                  />
                </CardContent>
              </Card>
            </Stack>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              📦 Package Management
            </Typography>

            <Alert severity="info" sx={{ mb: 2 }}>
              Project ini menggunakan <strong>npm</strong> sebagai package manager
            </Alert>

            <CodeBlock
              language="bash"
              title="Common commands"
              code={`# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run type checking
npm run type-check`}
            />
          </Box>
        </Stack>
      </section>

      {/* Architecture Decisions */}
      <section id="architecture">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Architecture Decisions
        </Typography>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🏗️ Application Architecture
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Feature-based modular architecture dengan clear separation of concerns:
              </Typography>

              <CodeBlock
                language="text"
                title="High-level Architecture"
                code={`src/
├── app/           # Next.js App Router pages
├── components/    # Reusable UI components  
├── modules/       # Feature modules (business logic)
├── services/      # API integration layer
├── store/         # Redux state management
├── types/         # TypeScript definitions
├── utility/       # Helper functions
└── styles/        # Global styles & themes`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🔄 Data Flow Pattern
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Unidirectional data flow dengan Redux Toolkit:
              </Typography>

              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  UI Component → Action → Reducer → Store → UI Component
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                📱 Responsive Design Strategy
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Mobile-first approach dengan Material-UI breakpoints:
              </Typography>

              <CodeBlock
                language="typescript"
                title="Breakpoint strategy"
                code={`// Material-UI breakpoints
const breakpoints = {
  xs: 0,      // Mobile
  sm: 600,    // Tablet  
  md: 900,    // Small laptop
  lg: 1200,   // Desktop
  xl: 1536    // Large screen
};

// Usage dalam components
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
  },
}));`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Learning Resources */}
      <section id="learning">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Learning Resources
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Resources untuk deep dive dalam tech stack yang digunakan:
        </Typography>

        <Stack spacing={2}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                📚 Official Documentation
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  • <strong>Next.js:</strong> https://nextjs.org/docs
                </Typography>
                <Typography variant="body2">
                  • <strong>React:</strong> https://react.dev/
                </Typography>
                <Typography variant="body2">
                  • <strong>TypeScript:</strong> https://www.typescriptlang.org/docs
                </Typography>
                <Typography variant="body2">
                  • <strong>Material-UI:</strong> https://mui.com/
                </Typography>
                <Typography variant="body2">
                  • <strong>Redux Toolkit:</strong> https://redux-toolkit.js.org/
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                🎯 Learning Path Priority
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Week 1:</strong> React fundamentals, TypeScript basics
                </Typography>
                <Typography variant="body2">
                  <strong>Week 2:</strong> Next.js routing, Material-UI components
                </Typography>
                <Typography variant="body2">
                  <strong>Week 3:</strong> Redux state management patterns
                </Typography>
                <Typography variant="body2">
                  <strong>Week 4:</strong> Advanced patterns, optimization
                </Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                🛠️ Development Environment
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  • <strong>IDE:</strong> VS Code dengan extensions (ES7, Prettier, ESLint)
                </Typography>
                <Typography variant="body2">
                  • <strong>Browser:</strong> Chrome dengan React DevTools
                </Typography>
                <Typography variant="body2">
                  • <strong>Node.js:</strong> Version 18+ untuk compatibility
                </Typography>
                <Typography variant="body2">
                  • <strong>Git:</strong> Version control dengan conventional commits
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="success" sx={{ mt: 4 }}>
          <Typography variant="body2">
            <strong>Next Step:</strong> Setup your development environment dengan mengikuti
            <strong> Development Setup</strong> guide.
          </Typography>
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default TechStackPage;
