'use client';

import Link from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Alert,
  Stack,
  Chip,
  Divider
} from '@mui/material';
import { Icon } from '@iconify/react';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const QuickStartGuidePage = () => {
  const steps = [
    {
      label: 'Understand the Project',
      description: 'Learn about CRING! Partner and its business context',
      icon: 'info',
      href: '/onboarding/project-overview',
      estimatedTime: '5 minutes',
      difficulty: 'Easy'
    },
    {
      label: 'Setup Development Environment',
      description: 'Install dependencies and configure your local environment',
      icon: 'construction',
      href: '/onboarding/development-setup',
      estimatedTime: '10 minutes',
      difficulty: 'Easy'
    },
    {
      label: 'Explore Architecture',
      description: 'Understand the project structure and patterns',
      icon: 'architecture',
      href: '/fundamentals/project-architecture',
      estimatedTime: '15 minutes',
      difficulty: 'Medium'
    },
    {
      label: 'Browse Component Library',
      description: 'See what UI components are available to use',
      icon: 'widgets',
      href: '/components/catalog',
      estimatedTime: '10 minutes',
      difficulty: 'Easy'
    },
    {
      label: 'Try Interactive Playground',
      description: 'Test components and generate code',
      icon: 'play_circle',
      href: '/tools/interactive-playground',
      estimatedTime: '15 minutes',
      difficulty: 'Easy'
    },
    {
      label: 'Create Your First Feature',
      description: 'Follow step-by-step guide to build something new',
      icon: 'add_circle',
      href: '/workflow/creating-features',
      estimatedTime: '30 minutes',
      difficulty: 'Medium'
    }
  ];

  const quickLinks = [
    {
      title: 'Component Playground',
      description: 'Test UI components interactively',
      icon: 'play_circle',
      href: '/tools/interactive-playground',
      color: 'success'
    },
    {
      title: 'Code Generator',
      description: 'Generate boilerplate code instantly',
      icon: 'code',
      href: '/tools/code-generator',
      color: 'primary'
    },
    {
      title: 'Common Patterns',
      description: 'Copy-paste ready solutions',
      icon: 'content_copy',
      href: '/cookbook/patterns',
      color: 'warning'
    },
    {
      title: 'API Reference',
      description: 'Complete component documentation',
      icon: 'library_books',
      href: '/documentation/components',
      color: 'info'
    }
  ];

  const tableOfContents = [
    { id: 'getting-started', title: 'Getting Started Steps' },
    { id: 'quick-access', title: 'Quick Access Tools' },
    { id: 'learning-paths', title: 'Learning Paths' },
    { id: 'troubleshooting', title: 'Common Issues' }
  ];

  return (
    <DocumentationPageLayout
      title="Quick Start Guide"
      description="Get up and running with CRING! Partner development in 30 minutes"
      tableOfContents={tableOfContents}
      navigation={{
        next: {
          title: 'Project Overview',
          href: '/onboarding/project-overview'
        }
      }}
    >
      {/* Hero Section */}
      <Alert severity="success" sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          👋 Welcome to CRING! Partner Documentation!
        </Typography>
        <Typography>
          This guide will get you from zero to productive developer in about 30 minutes. Follow the steps below to
          understand the project and start building features.
        </Typography>
      </Alert>

      {/* Getting Started Steps */}
      <section id="getting-started">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          🚀 Getting Started Steps
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Stepper orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label} active={true}>
                <StepLabel>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Icon icon={step.icon} style={{ fontSize: '1.5rem', color: '#1976d2' }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {step.label}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        <Chip label={step.estimatedTime} size="small" color="info" variant="outlined" />
                        <Chip
                          label={step.difficulty}
                          size="small"
                          color={step.difficulty === 'Easy' ? 'success' : 'warning'}
                          variant="outlined"
                        />
                      </Stack>
                    </Box>
                  </Stack>
                </StepLabel>
                <StepContent>
                  <Typography sx={{ mb: 2, color: 'text.secondary' }}>{step.description}</Typography>
                  <Link href={step.href}>
                    <Button variant="contained" size="small">
                      Start Step {index + 1}
                    </Button>
                  </Link>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* Quick Access Tools */}
      <section id="quick-access">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          ⚡ Quick Access Tools
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          Jump straight into these productivity tools if you're already familiar with the project:
        </Typography>

        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {quickLinks.map(link => (
            <Link key={link.title} href={link.href} style={{ textDecoration: 'none' }}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                      <Icon icon={link.icon} style={{ fontSize: '2rem', color: '#1976d2' }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {link.title}
                        </Typography>
                        <Chip label="Ready to use" size="small" color={link.color as any} variant="outlined" />
                      </Box>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {link.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </Box>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* Learning Paths */}
      <section id="learning-paths">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          📚 Learning Paths
        </Typography>

        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Beginner Path */}
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Icon icon="school" style={{ fontSize: '2rem', color: '#4caf50' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                    👶 Beginner Path
                  </Typography>
                  <Chip label="~1 hour" size="small" color="success" variant="outlined" />
                </Box>
              </Stack>
              <Typography variant="body2" sx={{ mb: 2 }}>
                New to the project? Start here to understand the basics.
              </Typography>
              <Stack spacing={1}>
                <Link href="/onboarding/project-overview" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    → Project Overview
                  </Typography>
                </Link>
                <Link href="/fundamentals/project-architecture" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    → Project Architecture
                  </Typography>
                </Link>
                <Link href="/components/design-system" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    → Design System Basics
                  </Typography>
                </Link>
              </Stack>
            </CardContent>
          </Card>

          {/* Intermediate Path */}
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Icon icon="code" style={{ fontSize: '2rem', color: '#ff9800' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    💻 Developer Path
                  </Typography>
                  <Chip label="~2 hours" size="small" color="warning" variant="outlined" />
                </Box>
              </Stack>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Ready to build features? Dive into development workflows.
              </Typography>
              <Stack spacing={1}>
                <Link href="/components/catalog" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    → Component Library
                  </Typography>
                </Link>
                <Link href="/data-services/data-fetching" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    → Data Fetching Patterns
                  </Typography>
                </Link>
                <Link href="/workflow/creating-features" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    → Creating New Features
                  </Typography>
                </Link>
              </Stack>
            </CardContent>
          </Card>

          {/* Advanced Path */}
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Icon icon="rocket" style={{ fontSize: '2rem', color: '#f44336' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'error.main' }}>
                    🚀 Expert Path
                  </Typography>
                  <Chip label="~3 hours" size="small" color="error" variant="outlined" />
                </Box>
              </Stack>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Master advanced patterns and contribute to the platform.
              </Typography>
              <Stack spacing={1}>
                <Link href="/cookbook/patterns" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    → Advanced Patterns
                  </Typography>
                </Link>
                <Link href="/workflow/testing" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    → Testing Guidelines
                  </Typography>
                </Link>
                <Link href="/tools/analytics-dashboard" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    → Platform Analytics
                  </Typography>
                </Link>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* Troubleshooting */}
      <section id="troubleshooting">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          🔧 Common Issues & Solutions
        </Typography>

        <Stack spacing={2}>
          <Alert severity="warning">
            <Typography variant="h6" sx={{ mb: 1 }}>
              🐛 Development Server Not Starting?
            </Typography>
            <Typography variant="body2">
              Make sure you're using Node.js 18+ and have installed all dependencies with <code>npm install</code>.
              Check that port 8815 is not in use by another application.
            </Typography>
          </Alert>

          <Alert severity="info">
            <Typography variant="h6" sx={{ mb: 1 }}>
              🎨 Components Not Displaying Correctly?
            </Typography>
            <Typography variant="body2">
              Ensure Material-UI theme is properly configured. Check the browser console for theme-related errors. Try
              clearing your browser cache and restarting the development server.
            </Typography>
          </Alert>

          <Alert severity="error">
            <Typography variant="h6" sx={{ mb: 1 }}>
              🔒 Authentication Issues?
            </Typography>
            <Typography variant="body2">
              Verify your <code>.env.local</code> file has the correct API URLs and authentication configuration. Check
              network connectivity to the authentication service.
            </Typography>
          </Alert>
        </Stack>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Need More Help?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Can't find what you're looking for? Browse our comprehensive documentation or check the troubleshooting
            guide.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Link href="/workflow/troubleshooting">
              <Button variant="outlined" size="small">
                Troubleshooting Guide
              </Button>
            </Link>
            <Link href="/documentation/components">
              <Button variant="contained" size="small">
                Browse Documentation
              </Button>
            </Link>
          </Stack>
        </Box>
      </section>
    </DocumentationPageLayout>
  );
};

export default QuickStartGuidePage;
