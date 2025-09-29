'use client';

import Link from 'next/link';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, Chip, Alert, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { DocumentationLayout } from '@/documentation/layouts/DocumentationLayout';

const HomePage = () => {
  const documentationPages = [
    // === ONBOARDING PHASE ===
    {
      id: 'project-overview',
      title: 'Project Overview',
      description: 'Memahami apa itu CRING! Partner, business context, dan teknologi yang digunakan',
      icon: 'info',
      href: '/onboarding/project-overview',
      difficulty: 'Beginner',
      color: 'success',
      phase: 'Onboarding'
    },
    {
      id: 'project-architecture',
      title: 'Project Architecture',
      description: 'Arsitektur high-level, data flow, dan design patterns yang digunakan dalam aplikasi',
      icon: 'architecture',
      href: '/fundamentals/project-architecture',
      difficulty: 'Beginner',
      color: 'info',
      phase: 'Fundamentals'
    },

    // === CORE DEVELOPMENT ===
    {
      id: 'component-catalog',
      title: 'Component Catalog',
      description: 'Showcase semua reusable components yang tersedia dengan examples dan API reference',
      icon: 'view_comfy',
      href: '/components/catalog',
      difficulty: 'Intermediate',
      color: 'primary',
      phase: 'Components'
    },
    {
      id: 'data-fetching',
      title: 'Data Fetching',
      description: 'Patterns untuk API calls, caching, error handling, dan state management',
      icon: 'download',
      href: '/data-services/data-fetching',
      difficulty: 'Intermediate',
      color: 'warning',
      phase: 'Data & Services'
    },

    // === PRACTICAL GUIDES ===
    {
      id: 'creating-features',
      title: 'Creating New Features',
      description: 'Step-by-step guide untuk membuat feature baru dari scratch hingga deployment',
      icon: 'add_circle',
      href: '/workflow/creating-features',
      difficulty: 'Advanced',
      color: 'error',
      phase: 'Workflow'
    },
    {
      id: 'common-patterns',
      title: 'Common Patterns',
      description: 'Copy-paste solutions untuk pattern dan use cases yang sering digunakan',
      icon: 'content_copy',
      href: '/cookbook/patterns',
      difficulty: 'Intermediate',
      color: 'secondary',
      phase: 'Cookbook'
    }
  ];

  return (
    <DocumentationLayout showTableOfContents={false}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Box sx={{ mb: 3 }}>
          <Icon
            icon="menu_book"
            style={{
              fontSize: '4rem',
              color: '#1976d2',
              marginBottom: '16px'
            }}
          />
        </Box>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: '#1976d2',
            mb: 2
          }}
        >
          CRING! Manual
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6,
            mb: 3
          }}
        >
          Dokumentasi handover untuk pengembangan aplikasi CRING! Partner. Dirancang dengan learning path yang
          terstruktur untuk membantu Frontend Engineer memahami arsitektur dan menjadi produktif dengan cepat.
        </Typography>

        {/* Quick Start CTA */}
        <Link href="/onboarding/quick-start-guide" style={{ textDecoration: 'none' }}>
          <Alert
            severity="success"
            sx={{
              mb: 4,
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3
              }
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Icon icon="flash_on" style={{ fontSize: '2rem' }} />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                  🚀 New Developer? Start Here!
                </Typography>
                <Typography>Follow our 30-minute Quick Start Guide to go from zero to productive developer.</Typography>
              </Box>
            </Stack>
          </Alert>
        </Link>
      </Box>
      <Box sx={{ mb: 6 }}>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              sm: 4
            }}
          >
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Icon icon="rocket_launch" style={{ fontSize: '2rem', color: '#4caf50', marginBottom: '8px' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Quick Start
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mulai dalam 5 menit
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 4
            }}
          >
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Icon icon="widgets" style={{ fontSize: '2rem', color: '#2196f3', marginBottom: '8px' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Components
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reusable UI Components
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 4
            }}
          >
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <CardContent>
                <Icon icon="code" style={{ fontSize: '2rem', color: '#ff9800', marginBottom: '8px' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Examples
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Real-world Examples
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        Learning Path
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        <strong>New Structure:</strong> Dokumentasi sekarang diorganisir berdasarkan learning path yang logis. Mulai
        dari <strong>Onboarding</strong>, lanjut ke <strong>Fundamentals</strong>, kemudian <strong>Components</strong>{' '}
        dan seterusnya.
      </Alert>

      <Grid container spacing={3}>
        {documentationPages.map(page => (
          <Grid
            key={page.id}
            size={{
              xs: 12,
              sm: 6,
              lg: 4
            }}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardActionArea
                component={Link}
                href={page.href}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  p: 0
                }}
              >
                <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Icon
                      icon={page.icon}
                      style={{
                        fontSize: '2rem',
                        color: '#1976d2',
                        marginRight: '12px'
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {page.title}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip label={page.difficulty} size="small" color={page.color as any} variant="outlined" />
                        <Chip
                          label={page.phase}
                          size="small"
                          variant="filled"
                          sx={{
                            backgroundColor: 'rgba(25, 118, 210, 0.1)',
                            color: 'primary.main',
                            fontWeight: 600
                          }}
                        />
                      </Stack>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {page.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 8, pt: 4, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          <Icon icon="info" style={{ fontSize: '1rem', marginRight: '8px', verticalAlign: 'middle' }} />
          Dokumentasi handover ini dirancang dengan learning path yang terstruktur untuk membantu Frontend Engineer baru
          menjadi produktif dengan cepat di aplikasi CRING! Partner.
        </Typography>
      </Box>
    </DocumentationLayout>
  );
};

export default HomePage;

// Export placeholder components for legacy imports
export { default as ServicesDocumentationPage } from '@/modules/ServicesDocumentation';

export { default as TypesDocumentationPage } from '@/modules/TypesDocumentation';

export { default as UtilityDocumentationPage } from '@/modules/UtilityDocumentation';
