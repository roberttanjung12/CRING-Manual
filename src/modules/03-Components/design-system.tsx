'use client';

import { useState } from 'react';
import { Typography, Alert, Card, CardContent, Stack, Box, Tabs, Tab, Chip, Grid } from '@mui/material';
import { Icon } from '@iconify/react';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const DesignSystemPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tableOfContents = [
    { id: 'overview', title: 'Design System Overview' },
    { id: 'colors', title: 'Color Palette' },
    { id: 'typography', title: 'Typography System' },
    { id: 'spacing', title: 'Spacing & Layout' },
    { id: 'components', title: 'Component Library' },
    { id: 'theme', title: 'Theme Configuration' }
  ];

  return (
    <DocumentationPageLayout
      title="Design System"
      description="CRING! Partner design system - colors, typography, spacing, dan component guidelines"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'State Management',
          href: '/fundamentals/state-management'
        },
        next: {
          title: 'Component Catalog',
          href: '/components/catalog'
        }
      }}
    >
      {/* Overview */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Design System Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Design system CRING! Partner dibangun menggunakan <strong>Material-UI v7</strong> sebagai foundation,
          dikustomisasi sesuai brand identity dan kebutuhan business logic aplikasi.
        </Typography>

        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon icon="palette" style={{ color: '#2196F3' }} />
                Design Principles
              </Typography>

              <Grid container spacing={2}>
                <Grid
                  size={{
                    xs: 12,
                    md: 6
                  }}
                >
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                      🎯 Consistency
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Uniform visual language across all components dan pages untuk better user experience.
                    </Typography>
                  </Card>
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 6
                  }}
                >
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'success.main' }}>
                      ♿ Accessibility
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      WCAG 2.1 compliant dengan proper contrast ratios dan keyboard navigation support.
                    </Typography>
                  </Card>
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 6
                  }}
                >
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'warning.main' }}>
                      📱 Responsive
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mobile-first approach dengan breakpoints yang konsisten untuk semua devices.
                    </Typography>
                  </Card>
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    md: 6
                  }}
                >
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: 'error.main' }}>
                      ⚡ Performance
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Optimized components dengan minimal bundle size dan efficient rendering.
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Alert severity="info">
            <strong>Brand Alignment:</strong> Design system ini mengikuti CRING! brand guidelines dengan adaptasi untuk
            web application context dan business requirements.
          </Alert>
        </Stack>
      </section>
      {/* Colors */}
      <section id="colors">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Color Palette
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🎨 Primary Colors
            </Typography>

            <Grid container spacing={3}>
              <Grid
                size={{
                  xs: 12,
                  md: 4
                }}
              >
                <Card>
                  <Box sx={{ bgcolor: 'primary.main', height: 80 }} />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Primary
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      #1976D2
                    </Typography>
                    <Typography variant="caption">Main brand color</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 4
                }}
              >
                <Card>
                  <Box sx={{ bgcolor: 'secondary.main', height: 80 }} />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Secondary
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      #DC004E
                    </Typography>
                    <Typography variant="caption">Accent color</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 4
                }}
              >
                <Card>
                  <Box sx={{ bgcolor: 'error.main', height: 80 }} />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Error
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      #D32F2F
                    </Typography>
                    <Typography variant="caption">Error states</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🌈 Semantic Colors
            </Typography>

            <Grid container spacing={2}>
              {[
                { name: 'Success', color: '#2E7D32', usage: 'Success messages, completed states' },
                { name: 'Warning', color: '#ED6C02', usage: 'Warnings, pending states' },
                { name: 'Info', color: '#0288D1', usage: 'Information, tips' },
                { name: 'Error', color: '#D32F2F', usage: 'Errors, destructive actions' }
              ].map((item, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                  }}
                >
                  <Card variant="outlined">
                    <Box sx={{ bgcolor: item.color, height: 40 }} />
                    <CardContent sx={{ py: 1.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {item.color}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.usage}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🎨 Usage Examples
            </Typography>

            <CodeBlock
              language="typescript"
              title="Using theme colors in components"
              code={`import { useTheme } from '@mui/material/styles'

// Using theme colors
const theme = useTheme()

// In sx prop
<Box sx={{ 
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  border: '1px solid',
  borderColor: 'divider'
}}>
  Primary background
</Box>

// With alpha transparency
<Box sx={{ 
  bgcolor: 'error.main',
  opacity: 0.8
}}>
  Semi-transparent error
</Box>

// Programmatic access
const primaryColor = theme.palette.primary.main
const errorColor = theme.palette.error.main`}
            />
          </Box>
        </Stack>
      </section>
      {/* Typography */}
      <section id="typography">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Typography System
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              📝 Font Family
            </Typography>

            <Card>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Primary font family: <strong>Inter</strong> - Modern, readable, dan excellent di berbagai sizes
                </Typography>

                <CodeBlock
                  language="text"
                  title="Font stack"
                  code={`font-family: 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif;

/* Font loading optimization */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');`}
                />
              </CardContent>
            </Card>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              📏 Type Scale
            </Typography>

            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
              <Tab label="Headings" />
              <Tab label="Body Text" />
              <Tab label="Components" />
            </Tabs>

            {activeTab === 0 && (
              <Stack spacing={3}>
                {[
                  { variant: 'h1', label: 'H1 - Page Title', sample: 'Dashboard Overview' },
                  { variant: 'h2', label: 'H2 - Section Title', sample: 'User Management' },
                  { variant: 'h3', label: 'H3 - Subsection', sample: 'Active Users' },
                  { variant: 'h4', label: 'H4 - Card Title', sample: 'Recent Activity' },
                  { variant: 'h5', label: 'H5 - Small Title', sample: 'Quick Actions' },
                  { variant: 'h6', label: 'H6 - Minor Title', sample: 'Settings' }
                ].map((item, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid
                          size={{
                            xs: 12,
                            md: 4
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {item.label}
                          </Typography>
                        </Grid>
                        <Grid
                          size={{
                            xs: 12,
                            md: 8
                          }}
                        >
                          <Typography variant={item.variant as any} sx={{ fontWeight: 600 }}>
                            {item.sample}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}

            {activeTab === 1 && (
              <Stack spacing={3}>
                {[
                  { variant: 'body1', label: 'Body Large', sample: 'Regular paragraph text for main content' },
                  { variant: 'body2', label: 'Body Small', sample: 'Secondary text, captions, descriptions' },
                  { variant: 'caption', label: 'Caption', sample: 'Helper text, labels, metadata' },
                  { variant: 'overline', label: 'Overline', sample: 'CATEGORY LABELS, SECTION HEADERS' }
                ].map((item, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid
                          size={{
                            xs: 12,
                            md: 3
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {item.label}
                          </Typography>
                        </Grid>
                        <Grid
                          size={{
                            xs: 12,
                            md: 9
                          }}
                        >
                          <Typography variant={item.variant as any}>{item.sample}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}

            {activeTab === 2 && (
              <Stack spacing={3}>
                {[
                  { variant: 'button', label: 'Button Text', sample: 'CLICK HERE' },
                  { variant: 'subtitle1', label: 'List Item Primary', sample: 'Primary list item text' },
                  { variant: 'subtitle2', label: 'List Item Secondary', sample: 'Secondary list item text' }
                ].map((item, index) => (
                  <Card key={index} variant="outlined">
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid
                          size={{
                            xs: 12,
                            md: 4
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {item.label}
                          </Typography>
                        </Grid>
                        <Grid
                          size={{
                            xs: 12,
                            md: 8
                          }}
                        >
                          <Typography variant={item.variant as any}>{item.sample}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              ✍️ Typography Usage
            </Typography>

            <CodeBlock
              language="typescript"
              title="Typography component examples"
              code={`import { Typography } from '@mui/material'

// Page title
<Typography variant="h1" component="h1" sx={{ fontWeight: 700 }}>
  Dashboard
</Typography>

// Section heading  
<Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
  Recent Activity
</Typography>

// Body text with custom styling
<Typography 
  variant="body1" 
  sx={{ 
    color: 'text.secondary',
    lineHeight: 1.6,
    maxWidth: '600px'
  }}
>
  This is a longer paragraph of body text that demonstrates
  proper line height and max width for optimal readability.
</Typography>

// Emphasized text
<Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
  Important information
</Typography>`}
            />
          </Box>
        </Stack>
      </section>
      {/* Spacing */}
      <section id="spacing">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Spacing & Layout System
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              📐 Spacing Scale
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              Material-UI menggunakan 8px base unit untuk consistent spacing. Semua spacing values adalah multiples of
              8px.
            </Typography>

            <Grid container spacing={2}>
              {[
                { value: 0.5, px: '4px', usage: 'Tight spacing' },
                { value: 1, px: '8px', usage: 'Default small' },
                { value: 2, px: '16px', usage: 'Default medium' },
                { value: 3, px: '24px', usage: 'Default large' },
                { value: 4, px: '32px', usage: 'Section spacing' },
                { value: 6, px: '48px', usage: 'Large sections' },
                { value: 8, px: '64px', usage: 'Page sections' }
              ].map((item, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 4
                  }}
                >
                  <Card variant="outlined">
                    <CardContent>
                      <Box
                        sx={{
                          width: item.px,
                          height: '16px',
                          bgcolor: 'primary.main',
                          mb: 1,
                          borderRadius: 0.5
                        }}
                      />
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {item.value} unit
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.px} • {item.usage}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              📱 Responsive Breakpoints
            </Typography>

            <Grid container spacing={3}>
              {[
                { name: 'xs', size: '0px+', description: 'Mobile phones', color: 'error.main' },
                { name: 'sm', size: '600px+', description: 'Large phones, small tablets', color: 'warning.main' },
                { name: 'md', size: '900px+', description: 'Tablets, small laptops', color: 'info.main' },
                { name: 'lg', size: '1200px+', description: 'Desktops', color: 'success.main' },
                { name: 'xl', size: '1536px+', description: 'Large screens', color: 'primary.main' }
              ].map((bp, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 12,
                    md: 6,
                    lg: 4
                  }}
                >
                  <Card variant="outlined">
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: bp.color
                          }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {bp.name.toUpperCase()}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {bp.size}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {bp.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🎯 Usage Examples
            </Typography>

            <CodeBlock
              language="typescript"
              title="Spacing and layout examples"
              code={`import { Box, Stack, Grid } from '@mui/material'

// Using sx prop with theme spacing
<Box sx={{ 
  p: 2,        // padding: 16px (2 * 8px)
  m: 3,        // margin: 24px (3 * 8px)  
  mb: 4,       // margin-bottom: 32px (4 * 8px)
  px: 1,       // padding-left & right: 8px
  py: 0.5      // padding-top & bottom: 4px
}}>
  Content with themed spacing
</Box>

// Responsive spacing
<Box sx={{
  p: { xs: 2, md: 4 },      // 16px on mobile, 32px on desktop
  m: { xs: 1, sm: 2, lg: 3 } // Responsive margins
}}>
  Responsive spacing
</Box>

// Using Stack for consistent spacing
<Stack spacing={2}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>

// Grid with consistent gutters
<Grid container spacing={2}>
  <Grid xs={12} md={6}>Item 1</Grid>
  <Grid xs={12} md={6}>Item 2</Grid>
</Grid>`}
            />
          </Box>
        </Stack>
      </section>
      {/* Components */}
      <section id="components">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Component Library Overview
        </Typography>

        <Stack spacing={4}>
          <Typography variant="body1">
            Component library kami dibangun di atas Material-UI v7 dengan customization untuk CRING! brand dan specific
            business requirements.
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                category: 'Layout',
                icon: 'layout',
                color: '#2196F3',
                components: ['Grid2', 'Stack', 'Box', 'Container', 'Paper']
              },
              {
                category: 'Navigation',
                icon: 'navigation',
                color: '#4CAF50',
                components: ['AppBar', 'Drawer', 'Tabs', 'Breadcrumbs', 'Stepper']
              },
              {
                category: 'Inputs',
                icon: 'edit',
                color: '#FF9800',
                components: ['TextField', 'Select', 'Checkbox', 'Radio', 'Switch']
              },
              {
                category: 'Data Display',
                icon: 'table',
                color: '#9C27B0',
                components: ['Table', 'List', 'Card', 'Avatar', 'Chip']
              },
              {
                category: 'Feedback',
                icon: 'notification',
                color: '#F44336',
                components: ['Alert', 'Snackbar', 'Dialog', 'Progress', 'Skeleton']
              },
              {
                category: 'Surface',
                icon: 'dashboard',
                color: '#607D8B',
                components: ['Paper', 'Card', 'Accordion', 'AppBar']
              }
            ].map((category, index) => (
              <Grid
                key={index}
                size={{
                  xs: 12,
                  md: 6,
                  lg: 4
                }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <Icon icon={category.icon} style={{ color: category.color, fontSize: '20px' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {category.category}
                      </Typography>
                    </Stack>

                    <Stack direction="row" flexWrap="wrap" gap={0.5}>
                      {category.components.map((comp, idx) => (
                        <Chip key={idx} label={comp} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Alert severity="info">
            <strong>Component Catalog:</strong> Untuk detailed component documentation dan live examples, lihat halaman{' '}
            <strong>Component Catalog</strong>.
          </Alert>
        </Stack>
      </section>
      {/* Theme */}
      <section id="theme">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Theme Configuration
        </Typography>

        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🎨 Theme Structure
            </Typography>

            <CodeBlock
              language="typescript"
              title="src/styles/theme.ts"
              code={`import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  // Color palette
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2',
      light: '#42A5F5',
      dark: '#1565C0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#DC004E',
      light: '#FF5983',
      dark: '#9A0036',
      contrastText: '#ffffff',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },

  // Typography
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },

  // Component overrides
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },

  // Custom spacing
  spacing: 8, // Base unit 8px

  // Breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🔧 Theme Usage
            </Typography>

            <CodeBlock
              language="typescript"
              title="Using theme in components"
              code={`import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'

function ResponsiveComponent() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  return (
    <Box sx={{
      // Using theme values
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      padding: theme.spacing(2),
      
      // Responsive styling
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
      },
      
      // Custom media query
      ...(isMobile && {
        fontSize: '0.875rem',
      }),
    }}>
      Themed component
    </Box>
  )
}`}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              🌙 Dark Mode Support
            </Typography>

            <Alert severity="info" sx={{ mb: 2 }}>
              Theme support untuk dark mode sudah disiapkan infrastructure-nya, implementasi UI toggle akan ditambahkan
              di future releases.
            </Alert>

            <CodeBlock
              language="typescript"
              title="Dark mode theme configuration"
              code={`// Dark theme variant
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90CAF9',
    },
    secondary: {
      main: '#F48FB1',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  // Other theme options...
})`}
            />
          </Box>
        </Stack>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Ready to Use!</strong> Design system sudah fully configured dan ready untuk development. Lanjut ke
          Component Catalog untuk melihat semua available components dan usage examples.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default DesignSystemPage;
