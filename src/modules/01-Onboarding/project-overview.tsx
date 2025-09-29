'use client';

import { Typography, Alert, Card, CardContent, Chip, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const ProjectOverviewPage = () => {
  const tableOfContents = [
    { id: 'what-is-cring', title: 'What is CRING! Partner?' },
    { id: 'key-features', title: 'Key Features' },
    { id: 'tech-overview', title: 'Technology Overview' },
    { id: 'user-roles', title: 'User Roles & Permissions' },
    { id: 'business-context', title: 'Business Context' },
    { id: 'development-approach', title: 'Development Approach' }
  ];

  return (
    <DocumentationPageLayout
      title="Project Overview"
      description="Memahami apa itu CRING! Partner dan konteks bisnis aplikasi ini"
      tableOfContents={tableOfContents}
      navigation={{
        next: {
          title: 'Tech Stack',
          href: '/onboarding/tech-stack'
        }
      }}
    >
      {/* What is CRING */}
      <section id="what-is-cring">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          What is CRING! Partner?
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>CRING! Partner</strong> adalah dashboard web application untuk mengelola mitra/partner dalam ekosistem
          pembayaran digital CRING!
        </Alert>

        <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
          Portal ini memungkinkan partner untuk mengelola merchant, memantau transaksi, mengatur settlement, dan
          mengakses berbagai layanan finansial digital.
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="store" style={{ fontSize: '2rem', color: '#1976d2' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Merchant Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mengelola data merchant, QR code, dan settlement
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="payments" style={{ fontSize: '2rem', color: '#1976d2' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Transaction Monitoring
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Real-time monitoring transaksi dan reporting
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="account_balance" style={{ fontSize: '2rem', color: '#1976d2' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Financial Operations
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Settlement, reconciliation, dan financial reporting
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Icon icon="admin_panel_settings" style={{ fontSize: '2rem', color: '#1976d2' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    User & Access Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mengelola user, roles, dan permissions
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>{' '}
      {/* Key Features */}
      <section id="key-features">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Key Features
        </Typography>

        <Stack spacing={3} sx={{ mb: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Icon icon="qr_code_scanner" style={{ fontSize: '1.5rem', color: '#4caf50' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  QRIS Management
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Generate, manage, dan monitor QR code untuk merchant
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="QR Generation" size="small" color="success" />
                <Chip label="Static/Dynamic QR" size="small" color="info" />
                <Chip label="Bulk Operations" size="small" color="warning" />
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Icon icon="analytics" style={{ fontSize: '1.5rem', color: '#2196f3' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Analytics & Reporting
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Comprehensive dashboard dengan real-time metrics dan custom reports
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="Real-time Dashboard" size="small" color="primary" />
                <Chip label="Custom Reports" size="small" color="secondary" />
                <Chip label="Data Export" size="small" color="info" />
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Icon icon="upload_file" style={{ fontSize: '1.5rem', color: '#ff9800' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Bulk Operations
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload dan process data dalam jumlah besar dengan validation
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label="Excel Upload" size="small" color="warning" />
                <Chip label="Data Validation" size="small" color="error" />
                <Chip label="Progress Tracking" size="small" color="success" />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>
      {/* Tech Overview */}
      <section id="tech-overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Technology Overview
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>Modern Tech Stack:</strong> Aplikasi ini dibangun dengan teknologi terdepan untuk performance,
          maintainability, dan developer experience yang optimal.
        </Alert>

        <Stack spacing={3} sx={{ mb: 4 }}>
          <Card sx={{ borderLeft: 4, borderColor: '#1976d2' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                🚀 Frontend Stack
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="Next.js 15" color="primary" size="small" />
                <Chip label="React 18" color="primary" size="small" />
                <Chip label="TypeScript" color="secondary" size="small" />
                <Chip label="Material-UI v7" color="info" size="small" />
                <Chip label="Redux Toolkit" color="warning" size="small" />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ borderLeft: 4, borderColor: '#4caf50' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                🛠 Development Tools
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip label="ESLint + Prettier" color="success" size="small" />
                <Chip label="Husky + CommitLint" color="success" size="small" />
                <Chip label="TypeScript Strict Mode" color="secondary" size="small" />
                <Chip label="VS Code Extensions" color="info" size="small" />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>
      {/* User Roles */}
      <section id="user-roles">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          User Roles & Permissions
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Sistem memiliki role-based access control dengan different permissions untuk setiap role:
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }}>
          <Card sx={{ borderTop: 4, borderColor: '#f44336' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Icon icon="admin_panel_settings" style={{ fontSize: '2rem', color: '#f44336', marginTop: '4px' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Super Admin
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Full system access
                  </Typography>
                  <Stack spacing={0.5}>
                    <Typography variant="caption">• User management</Typography>
                    <Typography variant="caption">• System configuration</Typography>
                    <Typography variant="caption">• All partner data</Typography>
                  </Stack>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ borderTop: 4, borderColor: '#2196f3' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Icon icon="business" style={{ fontSize: '2rem', color: '#2196f3', marginTop: '4px' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Partner Admin
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Manage own partner data
                  </Typography>
                  <Stack spacing={0.5}>
                    <Typography variant="caption">• Merchant management</Typography>
                    <Typography variant="caption">• Transaction reports</Typography>
                    <Typography variant="caption">• User management (own org)</Typography>
                  </Stack>
                </div>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ borderTop: 4, borderColor: '#4caf50' }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Icon icon="person" style={{ fontSize: '2rem', color: '#4caf50', marginTop: '4px' }} />
                <div>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Partner User
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Limited operational access
                  </Typography>
                  <Stack spacing={0.5}>
                    <Typography variant="caption">• View transactions</Typography>
                    <Typography variant="caption">• Generate reports</Typography>
                    <Typography variant="caption">• Read-only access</Typography>
                  </Stack>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>
      {/* Business Context */}
      <section id="business-context">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Business Context
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>Penting:</strong> Aplikasi ini handling data finansial dan transactional yang sensitive. Security,
          accuracy, dan auditability adalah prioritas utama.
        </Alert>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Aplikasi ini beroperasi dalam ekosistem payment yang memerlukan:
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
                🔒 Security Requirements
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Role-based access control</Typography>
                <Typography variant="body2">• Audit trail untuk semua actions</Typography>
                <Typography variant="body2">• Sensitive data encryption</Typography>
                <Typography variant="body2">• Session management</Typography>
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                📊 Performance Requirements
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">• Real-time data updates</Typography>
                <Typography variant="body2">• Large dataset handling</Typography>
                <Typography variant="body2">• Fast report generation</Typography>
                <Typography variant="body2">• Responsive UI</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </section>
      {/* Development Approach */}
      <section id="development-approach">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Development Approach
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
          Aplikasi ini dikembangkan dengan pendekatan:
        </Typography>

        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Icon icon="architecture" style={{ fontSize: '1.5rem', color: '#1976d2' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Component-Driven Development
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Reusable components dengan clear interfaces dan consistent design
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Icon icon="safety_check" style={{ fontSize: '1.5rem', color: '#4caf50' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Type-Safe Development
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Strict TypeScript dengan comprehensive type definitions
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Icon icon="api" style={{ fontSize: '1.5rem', color: '#ff9800' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  API-First Development
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                Clear separation antara frontend dan backend dengan well-defined API contracts
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="info" sx={{ mt: 4 }}>
          <strong>Next Step:</strong> Sekarang mari pelajari tech stack dan tools yang digunakan dalam project ini
          secara detail.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default ProjectOverviewPage;
