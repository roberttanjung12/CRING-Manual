'use client';

import { Typography, Alert, Card, CardContent, Chip, Stack, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const DevelopmentSetupPage = () => {
  const tableOfContents = [
    { id: 'prerequisites', title: 'Prerequisites' },
    { id: 'installation', title: 'Installation Steps' },
    { id: 'ide-setup', title: 'IDE Configuration' },
    { id: 'environment', title: 'Environment Variables' },
    { id: 'verification', title: 'Setup Verification' },
    { id: 'troubleshooting', title: 'Troubleshooting' }
  ];

  return (
    <DocumentationPageLayout
      title="Development Setup"
      description="Step-by-step guide untuk setup development environment"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Tech Stack',
          href: '/onboarding/tech-stack'
        },
        next: {
          title: 'Project Architecture',
          href: '/fundamentals/project-architecture'
        }
      }}
    >
      {/* Prerequisites */}
      <section id="prerequisites">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Prerequisites
        </Typography>

        <Alert severity="warning" sx={{ mb: 4 }}>
          <strong>Before you start:</strong> Pastikan Anda sudah familiar dengan React dan TypeScript basics. Jika
          belum, ambil waktu untuk belajar fundamentals terlebih dahulu.
        </Alert>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="nodejs" style={{ color: '#68A063' }} />
                Node.js & npm
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                JavaScript runtime dan package manager
              </Typography>

              <CodeBlock
                language="bash"
                title="Check your versions"
                code={`# Node.js version (required: 18+)
node --version

# npm version  
npm --version

# If not installed, download from: https://nodejs.org/`}
              />

              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  ✅ Recommended: Node.js 18.17+ atau 20.5+
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="git" style={{ color: '#F05032' }} />
                Git
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Version control system
              </Typography>

              <CodeBlock
                language="bash"
                title="Check Git installation"
                code={`# Git version
git --version

# If not installed, download from: https://git-scm.com/`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="vscode" style={{ color: '#007ACC' }} />
                VS Code (Recommended)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Code editor dengan excellent TypeScript support
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                Download dari: https://code.visualstudio.com/
              </Typography>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="Free" size="small" color="success" />
                <Chip label="Cross-platform" size="small" color="info" />
                <Chip label="Extensions" size="small" color="primary" />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Installation Steps */}
      <section id="installation">
        <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 3, fontWeight: 600 }}>
          Installation Steps
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              📥 Step 1: Clone Repository
            </Typography>

            <CodeBlock
              language="bash"
              title="Clone the project"
              code={`# Clone repository
git clone https://github.com/your-org/cring-portal-partner.git

# Navigate to project directory
cd cring-portal-partner

# Check current branch
git branch`}
            />

            <Alert severity="info" sx={{ mt: 2 }}>
              Pastikan Anda di branch yang benar. Dilarang menggunakan Branch dibawah ini untuk melakukan development,
              Branch tersebut adalah:
              <Stack spacing={2}>
                <Box>
                  <Typography fontWeight={700}>main</Typography>
                  <Typography component="small" fontSize={12}>
                    Digunakan untuk Production version
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight={700}>uat</Typography>
                  <Typography component="small" fontSize={12}>
                    Digunakan untuk User Acceptance Testing version
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight={700}>dev</Typography>
                  <Typography component="small" fontSize={12}>
                    Digunakan untuk Beta version
                  </Typography>
                </Box>
              </Stack>
            </Alert>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              📦 Step 2: Install Dependencies
            </Typography>

            <CodeBlock
              language="bash"
              title="Install packages"
              code={`# Install all dependencies
npm install

# This will install:
# - Next.js and React
# - TypeScript and type definitions
# - Material-UI components
# - Redux Toolkit and RTK Query
# - ESLint and Prettier
# - And more...`}
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ⏱️ Installation biasanya memakan waktu 2-5 menit tergantung koneksi internet.
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🔧 Step 3: Environment Configuration
            </Typography>

            <CodeBlock
              language="bash"
              title="Setup environment variables"
              code={`# Copy environment template
cp .env.example .env.local

# Edit environment variables
# (Lihat section Environment Variables untuk details)`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🚀 Step 4: Start Development Server
            </Typography>

            <CodeBlock
              language="bash"
              title="Run development server"
              code={`# Start the development server
npm run dev

# Server will start on http://localhost:8815
# Hot reload will be enabled automatically`}
            />

            <Alert severity="success" sx={{ mt: 2 }}>
              <strong>Success!</strong> Jika Anda melihat aplikasi berjalan di browser, setup berhasil! 🎉
            </Alert>
          </Box>
        </Stack>
      </section>

      {/* IDE Setup */}
      <section id="ide-setup">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          IDE Configuration
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🔌 Essential VS Code Extensions
            </Typography>

            <Stack spacing={2}>
              {[
                {
                  name: 'ES7+ React/Redux/React-Native snippets',
                  id: 'dsznajder.es7-react-js-snippets',
                  description: 'Code snippets untuk React development'
                },
                {
                  name: 'TypeScript Importer',
                  id: 'pmneo.tsimporter',
                  description: 'Auto import TypeScript modules'
                },
                {
                  name: 'Prettier - Code formatter',
                  id: 'esbenp.prettier-vscode',
                  description: 'Automatic code formatting'
                },
                {
                  name: 'ESLint',
                  id: 'dbaeumer.vscode-eslint',
                  description: 'JavaScript/TypeScript linting'
                },
                {
                  name: 'Material-UI Snippets',
                  id: 'vscodeshift.material-ui-snippets',
                  description: 'MUI component snippets'
                }
              ].map((ext, index) => (
                <Card key={index} variant="outlined">
                  <CardContent sx={{ py: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {ext.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {ext.description}
                        </Typography>
                      </Box>
                      <Chip label="Install" size="small" color="primary" />
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            <Box sx={{ mt: 3 }}>
              <CodeBlock
                language="bash"
                title="Install all extensions at once"
                code={`# Install recommended extensions
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension pmneo.tsimporter
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension vscodeshift.material-ui-snippets`}
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              ⚙️ VS Code Settings
            </Typography>

            <CodeBlock
              language="json"
              title=".vscode/settings.json"
              code={`{
  // TypeScript
  "typescript.preferences.quoteStyle": "single",
  "typescript.updateImportsOnFileMove.enabled": "always",
  
  // Formatting
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  
  // Files
  "files.exclude": {
    "**/.next": true,
    "**/node_modules": true,
    "**/.git": true
  },
  
  // Emmet
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}`}
            />
          </Box>
        </Stack>
      </section>

      {/* Environment Variables */}
      <section id="environment">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Environment Variables
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>Security Note:</strong> Jangan commit file <code>.env.local</code> ke Git. File ini sudah ada di{' '}
          <code>.gitignore</code>.
        </Alert>

        <Stack spacing={3}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              📝 Required Environment Variables
            </Typography>

            <CodeBlock
              language="bash"
              title=".env.local"
              code={`# API Configuration
NEXT_PUBLIC_API_URL=https://your-base-api.com/v1
NEXT_PUBLIC_APP_ENV=development

# Authentication
NEXTAUTH_URL=http://localhost:8815
NEXTAUTH_SECRET=your-secret-here

# Database (if applicable)
DATABASE_URL=your-database-url

# External Services
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🔑 Getting API Credentials
            </Typography>

            <Card>
              <CardContent>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Untuk mendapatkan API credentials dan environment variables:
                </Typography>

                <Stack spacing={1}>
                  <Typography variant="body2">1. Hubungi team lead atau DevOps engineer</Typography>
                  <Typography variant="body2">2. Request akses ke development environment</Typography>
                  <Typography variant="body2">
                    3. Download file <code>.env.local</code> dari secure location
                  </Typography>
                  <Typography variant="body2">4. Atau copy values dari team documentation</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </section>

      {/* Verification */}
      <section id="verification">
        <Typography variant="h4" component="h2" sx={{ mt: 4, mb: 3, fontWeight: 600 }}>
          Setup Verification
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Verifikasi bahwa setup Anda berjalan dengan benar:
        </Typography>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                ✅ Development Server Check
              </Typography>

              <CodeBlock
                language="bash"
                title="Test development server"
                code={`# Start development server
npm run dev

# Expected output:
# ▲ Next.js 15.0.0
# - Local:        http://localhost:8815
# - Ready in 2.3s`}
              />

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Browser harus membuka otomatis dan menampilkan homepage.
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🔍 Code Quality Check
              </Typography>

              <CodeBlock
                language="bash"
                title="Run linting and type check"
                code={`# Check for linting errors
npm run lint

# Check TypeScript types
npm run type-check

# Both should pass without errors`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🏗️ Build Check
              </Typography>

              <CodeBlock
                language="bash"
                title="Test production build"
                code={`# Build for production
npm run build

# Expected output should end with:
# ✓ Compiled successfully`}
              />
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>All Green? Perfect! 🎯</strong> Your development environment is ready. Sekarang Anda bisa mulai
          explore codebase dan membuat perubahan.
        </Alert>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Common Issues & Solutions
        </Typography>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'error.main', fontWeight: 600 }}>
                ❌ Node version mismatch
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Error: "The engine 'node' is incompatible with this module"
              </Typography>

              <CodeBlock
                language="bash"
                title="Solution"
                code={`# Check your Node.js version
node --version

# Update to Node.js 18+ 
# Download from: https://nodejs.org/

# Or use nvm (Node Version Manager)
nvm install 18
nvm use 18`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'error.main', fontWeight: 600 }}>
                ❌ Package installation failed
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                npm install errors atau dependency conflicts
              </Typography>

              <CodeBlock
                language="bash"
                title="Solution"
                code={`# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'error.main', fontWeight: 600 }}>
                ❌ Port 8815 already in use
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Error: "Port 8815 is already in use"
              </Typography>

              <CodeBlock
                language="bash"
                title="Solution"
                code={`# Option 1: Use different port
npm run dev -- --port 8816

# Option 2: Kill process on port 8815 (Windows)
netstat -ano | findstr :8815
taskkill /F /PID <PID_NUMBER>

# Option 2: Kill process on port 8815 (Mac/Linux)
lsof -ti:8815 | xargs kill -9`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'error.main', fontWeight: 600 }}>
                ❌ TypeScript errors
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Type checking errors atau missing declarations
              </Typography>

              <CodeBlock
                language="bash"
                title="Solution"
                code={`# Restart TypeScript server in VS Code
# Ctrl/Cmd + Shift + P → "TypeScript: Restart TS Server"

# Or check types manually
npm run type-check

# Install missing type definitions
npm install --save-dev @types/package-name`}
              />
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="info" sx={{ mt: 4 }}>
          <strong>Still having issues?</strong> Reach out to team members di Slack channel #frontend-help atau schedule
          pair programming session.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default DevelopmentSetupPage;
