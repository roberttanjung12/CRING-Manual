'use client';

import React from 'react';
import { Typography, Alert, Card, CardContent, Stack } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const CreatingComponentsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Getting Started' },
    { id: 'component-structure', title: 'Component Structure' },
    { id: 'styling-approach', title: 'Styling Approach' },
    { id: 'testing', title: 'Testing Components' },
    { id: 'documentation', title: 'Documenting Components' }
  ];

  return (
    <DocumentationPageLayout
      title="Creating Components"
      description="Guidelines dan best practices untuk membuat custom components yang consistent dan reusable"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Usage Patterns',
          href: '/components/patterns'
        },
        next: {
          title: 'API Architecture',
          href: '/data-services/api-architecture'
        }
      }}
    >
      {/* Overview */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Component Creation Guidelines
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Best practices untuk membuat custom components yang maintainable, testable, dan consistent dengan design
          system CRING! Partner.
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Before Creating:</strong> Check apakah functionality yang dibutuhkan sudah available di Material-UI
          atau component library kita sebelum membuat custom component.
        </Alert>
      </section>

      {/* Component Structure */}
      <section id="component-structure">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Component Structure
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                📁 File Organization
              </Typography>

              <CodeBlock
                language="bash"
                title="Recommended component structure"
                code={`src/components/
├── Button/
│   ├── index.ts                 # Export barrel
│   ├── Button.tsx               # Main component
│   ├── Button.stories.tsx       # Storybook stories
│   ├── Button.test.tsx          # Unit tests
│   └── Button.types.ts          # TypeScript types
├── Form/
│   ├── index.ts
│   ├── Form.tsx
│   ├── FormField.tsx            # Sub-components
│   ├── FormActions.tsx
│   ├── Form.stories.tsx
│   ├── Form.test.tsx
│   └── Form.types.ts
└── index.ts                     # Global exports`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🏗️ Component Template
              </Typography>

              <CodeBlock
                language="typescript"
                title="Standard component template"
                code={`import React, { forwardRef } from 'react';
import { Box, BoxProps } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

// Types
interface CustomButtonProps extends Omit<BoxProps, 'component'> {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'outlined';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Loading state */
  loading?: boolean;
  /** Icon before text */
  startIcon?: React.ReactNode;
  /** Icon after text */
  endIcon?: React.ReactNode;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Children content */
  children: React.ReactNode;
}

// Styled Components
const StyledButton = styled('button', {
  shouldForwardProp: (prop) => 
    !['variant', 'size', 'loading'].includes(prop as string)
})<CustomButtonProps>(({ theme, variant, size, loading }) => ({
  // Base styles
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: theme.shape.borderRadius,
  cursor: loading ? 'not-allowed' : 'pointer',
  fontFamily: theme.typography.button.fontFamily,
  fontWeight: theme.typography.button.fontWeight,
  textDecoration: 'none',
  transition: theme.transitions.create(
    ['background-color', 'box-shadow', 'border-color', 'color'],
    { duration: theme.transitions.duration.short }
  ),

  // Variant styles
  ...(variant === 'primary' && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  }),

  ...(variant === 'secondary' && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    }
  }),

  ...(variant === 'outlined' && {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: \`1px solid \${alpha(theme.palette.primary.main, 0.5)}\`,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
    }
  }),

  // Size styles
  ...(size === 'small' && {
    padding: theme.spacing(0.75, 1.5),
    fontSize: theme.typography.caption.fontSize,
    minHeight: 32
  }),

  ...(size === 'medium' && {
    padding: theme.spacing(1, 2),
    fontSize: theme.typography.body2.fontSize,
    minHeight: 40
  }),

  ...(size === 'large' && {
    padding: theme.spacing(1.25, 2.5),
    fontSize: theme.typography.body1.fontSize,
    minHeight: 48
  }),

  // Loading state
  ...(loading && {
    opacity: 0.6,
    pointerEvents: 'none'
  })
}));

// Component
export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ 
    variant = 'primary',
    size = 'medium',
    loading = false,
    startIcon,
    endIcon,
    children,
    onClick,
    ...props
  }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) return;
      onClick?.(event);
    };

    return (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        loading={loading}
        onClick={handleClick}
        {...props}
      >
        {startIcon && (
          <Box component="span" sx={{ mr: 1, display: 'flex' }}>
            {startIcon}
          </Box>
        )}
        
        {children}
        
        {endIcon && (
          <Box component="span" sx={{ ml: 1, display: 'flex' }}>
            {endIcon}
          </Box>
        )}
        
        {loading && (
          <Box
            component="span"
            sx={{
              ml: 1,
              display: 'flex',
              '& .MuiCircularProgress-root': {
                width: '16px !important',
                height: '16px !important'
              }
            }}
          >
            <CircularProgress size={16} />
          </Box>
        )}
      </StyledButton>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Styling Approach */}
      <section id="styling-approach">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Styling Best Practices
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🎨 Material-UI Integration
              </Typography>

              <CodeBlock
                language="typescript"
                title="Using theme values and responsive design"
                code={`import { styled } from '@mui/material/styles';

const ResponsiveCard = styled(Card)(({ theme }) => ({
  // Use theme values
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  
  // Responsive breakpoints
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },

  // Theme mode support
  backgroundColor: theme.palette.mode === 'dark' 
    ? theme.palette.grey[900]
    : theme.palette.grey[50],
    
  // Use palette colors
  borderLeft: \`4px solid \${theme.palette.primary.main}\`,
  
  // Consistent shadows
  boxShadow: theme.shadows[2],
  
  // Hover states
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
    transition: theme.transitions.create(['box-shadow', 'transform'], {
      duration: theme.transitions.duration.short
    })
  }
}));

// Alternative: sx prop approach
function FlexibleCard({ children, elevated = false }) {
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        ...(elevated && {
          boxShadow: 4,
          transform: 'translateY(-4px)'
        }),
        '&:hover': {
          boxShadow: elevated ? 6 : 2,
        },
        // Responsive styling
        [theme.breakpoints.down('sm')]: {
          p: 1,
          borderRadius: 1
        }
      }}
    >
      {children}
    </Card>
  );
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🔧 Custom Properties & Variants
              </Typography>

              <CodeBlock
                language="typescript"
                title="Extending Material-UI components"
                code={`// Extend theme for custom variants
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient: true;
    glass: true;
  }
}

// Create custom variants in theme
const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF5252 30%, #26A69A 90%)',
            }
          }
        },
        {
          props: { variant: 'glass' },
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
          }
        }
      ]
    }
  }
});

// Usage
function CustomButtons() {
  return (
    <Stack spacing={2}>
      <Button variant="gradient">
        Gradient Button
      </Button>
      <Button variant="glass">
        Glass Button
      </Button>
    </Stack>
  );
}`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Testing */}
      <section id="testing">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Testing Components
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              🧪 Unit Testing Example
            </Typography>

            <CodeBlock
              language="typescript"
              title="Complete component testing"
              code={`import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { CustomButton } from './CustomButton';
import theme from '@/styles/theme';

// Test wrapper
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('CustomButton', () => {
  it('renders correctly', () => {
    renderWithTheme(<CustomButton>Click me</CustomButton>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <CustomButton onClick={handleClick}>Click me</CustomButton>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    renderWithTheme(
      <CustomButton loading>Loading button</CustomButton>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveStyle('opacity: 0.6');
    expect(button).toHaveStyle('pointer-events: none');
  });

  it('prevents click when loading', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <CustomButton loading onClick={handleClick}>
        Loading button
      </CustomButton>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with icons', () => {
    const StartIcon = () => <span data-testid="start-icon">→</span>;
    const EndIcon = () => <span data-testid="end-icon">←</span>;
    
    renderWithTheme(
      <CustomButton startIcon={<StartIcon />} endIcon={<EndIcon />}>
        With Icons
      </CustomButton>
    );
    
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('applies correct variant styles', () => {
    renderWithTheme(<CustomButton variant="secondary">Secondary</CustomButton>);
    
    const button = screen.getByRole('button');
    const styles = getComputedStyle(button);
    
    expect(styles.backgroundColor).toBe(theme.palette.secondary.main);
  });
});`}
            />
          </CardContent>
        </Card>
      </section>

      {/* Documentation */}
      <section id="documentation">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Component Documentation
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              📚 Storybook Integration
            </Typography>

            <CodeBlock
              language="typescript"
              title="Storybook stories example"
              code={`import type { Meta, StoryObj } from '@storybook/react';
import { CustomButton } from './CustomButton';

const meta: Meta<typeof CustomButton> = {
  title: 'Components/CustomButton',
  component: CustomButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable button component built on top of Material-UI'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined'],
      description: 'The visual style variant of the button'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner and disable interaction'
    },
    children: {
      control: 'text',
      description: 'Button content'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button'
  }
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <CustomButton variant="primary">Primary</CustomButton>
      <CustomButton variant="secondary">Secondary</CustomButton>
      <CustomButton variant="outlined">Outlined</CustomButton>
    </div>
  )
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <CustomButton size="small">Small</CustomButton>
      <CustomButton size="medium">Medium</CustomButton>
      <CustomButton size="large">Large</CustomButton>
    </div>
  )
};

export const WithIcons: Story = {
  args: {
    children: 'Download',
    startIcon: <span>⬇</span>
  }
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true
  }
};`}
            />
          </CardContent>
        </Card>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Ready to Build!</strong> Follow these guidelines untuk create components yang consistent, testable,
          dan well-documented. Always consider reusability dan accessibility dari awal development process.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default CreatingComponentsPage;
