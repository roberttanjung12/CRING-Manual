'use client';

import React from 'react';
import {
  Typography,
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Stack,
  Chip,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

/**
 * Comprehensive Navigation Components Documentation
 *
 * Documentation for all navigation components available in the CRING application
 * including NavigationTabs, ButtonTo, and navigation-related utilities
 * with their usage patterns and API references.
 */

const NavigationComponentsDocumentation: React.FC = () => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Navigation Components Documentation
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Complete reference for all navigation components in the CRING application, including tabs, buttons, and
        navigation utilities with their props and usage patterns.
      </Alert>

      {/* NavigationTabs Component */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            NavigationTabs
          </Typography>

          <Alert severity="success" sx={{ mb: 2 }}>
            <strong>Tabbed navigation component</strong> with Material-UI styling, custom themes, and flexible content
            management.
          </Alert>

          <Typography variant="h6" gutterBottom>
            API Reference
          </Typography>
          <TableContainer sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Prop</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Required</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>tabs</TableCell>
                  <TableCell>NavigationTabsItem[]</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Array of tab configuration objects</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>tab</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Currently active tab id</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>onChange</TableCell>
                  <TableCell>(newTab: string) =&gt; void</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Tab change handler callback</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>isHideHead</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Hide tab headers (content only)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>right</TableCell>
                  <TableCell>RightContent</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Additional content on the right side</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            NavigationTabsItem Interface
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`interface NavigationTabsItem {
  id: string;                      // Unique tab identifier
  label: string;                   // Tab display label
  content: ReactNode;              // Tab content component
  isClose?: boolean;               // Hide/exclude tab from display
}

interface RightContent {
  content?: ReactNode | string;    // Right side content element
}

// Example tab configuration
const tabsConfig: NavigationTabsItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: <OverviewComponent />,
    isClose: false
  },
  {
    id: 'details',
    label: 'Details',
    content: <DetailsComponent />,
    isClose: false
  },
  {
    id: 'settings',
    label: 'Settings',
    content: <SettingsComponent />,
    isClose: false
  },
  {
    id: 'archived',
    label: 'Archived',
    content: <ArchivedComponent />,
    isClose: true  // This tab will be hidden
  }
];`}
            </Typography>
          </Card>

          <Typography variant="h6" gutterBottom>
            Key Features
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Custom Styling" color="primary" size="small" />
            <Chip label="Dynamic Content" color="secondary" size="small" />
            <Chip label="Tab Filtering" color="info" size="small" />
            <Chip label="Right Side Content" color="success" size="small" />
            <Chip label="Material-UI Integration" color="warning" size="small" />
          </Stack>

          <Typography variant="h6" gutterBottom>
            Usage Examples
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Basic tabs implementation
const [activeTab, setActiveTab] = useState('dashboard');

const tabs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    content: <DashboardView />
  },
  {
    id: 'transactions',
    label: 'Transactions',
    content: <TransactionsTable />
  },
  {
    id: 'reports',
    label: 'Reports',
    content: <ReportsComponent />
  }
];

<NavigationTabs
  tabs={tabs}
  tab={activeTab}
  onChange={(newTab) => setActiveTab(newTab)}
/>

// Tabs with right-side actions
<NavigationTabs
  tabs={tabs}
  tab={activeTab}
  onChange={setActiveTab}
  right={{
    content: (
      <Box>
        <Button variant="outlined" sx={{ mr: 1 }}>
          Export
        </Button>
        <Button variant="contained">
          Add New
        </Button>
      </Box>
    )
  }}
/>

// Content-only mode (hidden headers)
<NavigationTabs
  tabs={contentTabs}
  tab={currentView}
  onChange={handleViewChange}
  isHideHead={true}
  right={{
    content: <Typography variant="subtitle1">Step {currentStep} of 3</Typography>
  }}
/>

// Dynamic tabs with conditional display
const [userTabs, setUserTabs] = useState([
  { id: 'profile', label: 'Profile', content: <ProfileForm /> },
  { id: 'security', label: 'Security', content: <SecuritySettings /> },
  { 
    id: 'admin', 
    label: 'Admin Panel', 
    content: <AdminPanel />,
    isClose: !user.isAdmin  // Hide if not admin
  }
]);

<NavigationTabs
  tabs={userTabs}
  tab={activeTab}
  onChange={setActiveTab}
/>`}
            </Typography>
          </Card>

          <Typography variant="h6" gutterBottom>
            Styling Customization
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// The component includes built-in styling for CRING theme
// Key styling features:

// Tab styling
{
  minWidth: 200,
  padding: '5px 32px',
  background: theme.palette.background.paper,
  borderRadius: '4px 32px 0px 0px',
  boxShadow: '1px 2px 6px 0px #13235914',
  fontSize: 14,
  color: theme.palette.common.black,
  textTransform: 'capitalize',
  
  // Selected state
  '&.Mui-selected': {
    backgroundColor: '#681399',  // CRING primary color
    color: '#fff'
  }
}

// Tab indicator
'.MuiTabs-indicator': {
  backgroundColor: '#681399'
}

// Custom tab styling example
const StyledNavigationTabs = styled(NavigationTabs)(({ theme }) => ({
  '& .MuiTab-root': {
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  }
}));`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* ButtonTo Component */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            ButtonTo
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Navigation button component</strong> with Next.js router integration and customizable styling.
          </Alert>

          <Typography variant="h6" gutterBottom>
            API Reference
          </Typography>
          <TableContainer sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Prop</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Required</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Description</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>label</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Button text content</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>href</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>✓</TableCell>
                  <TableCell>Navigation destination URL</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>disabled</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Disable button interaction</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>color</TableCell>
                  <TableCell>ButtonProps['color']</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Button color theme (default: 'primary')</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>variant</TableCell>
                  <TableCell>ButtonProps['variant']</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Button style variant (default: 'contained')</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>size</TableCell>
                  <TableCell>ButtonProps['size']</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Button size (default: 'large')</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>icon</TableCell>
                  <TableCell>ReactNode</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Start icon (default: AddCircleIcon)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>sx</TableCell>
                  <TableCell>ButtonProps['sx']</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Custom styling object</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            Key Features
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="Next.js Router" color="primary" size="small" />
            <Chip label="Custom Icons" color="secondary" size="small" />
            <Chip label="MUI Button Props" color="info" size="small" />
            <Chip label="Responsive Design" color="success" size="small" />
          </Stack>

          <Typography variant="h6" gutterBottom>
            Usage Examples
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Basic navigation button
<ButtonTo
  label="Add New User"
  href="/users/create"
/>

// Custom styling and icon
<ButtonTo
  label="View Reports"
  href="/reports"
  variant="outlined"
  color="secondary"
  icon={<BarChartIcon />}
  sx={{ mr: 2 }}
/>

// Without icon
<ButtonTo
  label="Back to Dashboard"
  href="/dashboard"
  variant="text"
  icon={<ArrowBackIcon />}
/>

// Disabled state
<ButtonTo
  label="Premium Feature"
  href="/premium"
  disabled={!user.isPremium}
  color="warning"
/>

// Different sizes
<ButtonTo
  label="Quick Action"
  href="/quick-action"
  size="small"
  variant="outlined"
/>

// With custom styling
<ButtonTo
  label="Important Action"
  href="/important"
  sx={{
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: 'darkred'
    },
    borderRadius: 2,
    minWidth: 200
  }}
/>`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Navigation Types and Interfaces */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Navigation Types & Interfaces
          </Typography>

          <Alert severity="warning" sx={{ mb: 2 }}>
            <strong>TypeScript definitions</strong> for navigation components to ensure type safety and proper usage.
          </Alert>

          <Typography variant="h6" gutterBottom>
            Type Definitions
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// NavigationTabs Types
interface TypeNavigationTabsItem {
  id: string;                        // Unique tab identifier
  label: string;                     // Tab display label
  content: Readonly<ReactNode>;      // Tab content component
  isClose?: boolean;                 // Hide tab from display
}

interface TypeNavigationTabsPropRightChild {
  content?: ReactNode | string;      // Right-side content
}

interface TypeNavigationTabsProps {
  tabs: Array<TypeNavigationTabsItem>;              // Tab configurations
  tab: string;                                      // Active tab id
  onChange: (newTab: string) => void;               // Tab change handler
  isHideHead?: boolean;                             // Hide tab headers
  right?: TypeNavigationTabsPropRightChild;        // Right-side content
}

// ButtonTo Props
interface ButtonToProps {
  label: string;                     // Button text
  href: string;                      // Navigation URL
  disabled?: boolean;                // Disable state
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  icon?: ReactNode;                  // Custom icon
  sx?: SxProps<Theme>;              // Custom styles
}

// Common navigation patterns
type NavigationDestination = {
  label: string;
  href: string;
  icon?: ReactNode;
  disabled?: boolean;
  badge?: number | string;
};

type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: ReactNode;
};

// Navigation state management
interface NavigationState {
  activeTab: string;
  breadcrumbs: BreadcrumbItem[];
  navigationHistory: string[];
}

// Navigation context type
interface NavigationContextType {
  state: NavigationState;
  actions: {
    setActiveTab: (tabId: string) => void;
    updateBreadcrumbs: (items: BreadcrumbItem[]) => void;
    navigateTo: (href: string) => void;
    goBack: () => void;
  };
}`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Navigation Patterns */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Common Navigation Patterns
          </Typography>

          <Typography variant="h6" gutterBottom>
            Tab-based Navigation
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Multi-level tab navigation
const MainTabs = () => {
  const [mainTab, setMainTab] = useState('users');
  const [userSubTab, setUserSubTab] = useState('active');

  const mainTabs = [
    { 
      id: 'users', 
      label: 'User Management',
      content: (
        <NavigationTabs
          tabs={userSubTabs}
          tab={userSubTab}
          onChange={setUserSubTab}
        />
      )
    },
    { id: 'reports', label: 'Reports', content: <ReportsView /> }
  ];

  const userSubTabs = [
    { id: 'active', label: 'Active Users', content: <ActiveUsersTable /> },
    { id: 'pending', label: 'Pending Users', content: <PendingUsersTable /> },
    { id: 'archived', label: 'Archived Users', content: <ArchivedUsersTable /> }
  ];

  return (
    <NavigationTabs
      tabs={mainTabs}
      tab={mainTab}
      onChange={setMainTab}
      right={{
        content: (
          <ButtonTo
            label="Add User"
            href="/users/create"
            size="medium"
          />
        )
      }}
    />
  );
};`}
            </Typography>
          </Card>

          <Typography variant="h6" gutterBottom>
            Breadcrumb Navigation (Custom Implementation)
          </Typography>
          <Card variant="outlined" sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2 }}>
            <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
              {`// Custom breadcrumb component using ButtonTo
const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <Box display="flex" alignItems="center" gap={1} mb={2}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.href ? (
            <ButtonTo
              label={item.label}
              href={item.href}
              variant="text"
              size="small"
              icon={item.icon}
              sx={{ minWidth: 'auto', p: 0.5 }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>
          )}
          {index < items.length - 1 && (
            <ChevronRightIcon fontSize="small" color="disabled" />
          )}
        </Fragment>
      ))}
    </Box>
  );
};

// Usage
const breadcrumbItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <HomeIcon /> },
  { label: 'Users', href: '/users' },
  { label: 'User Profile' } // Current page, no href
];

<Breadcrumb items={breadcrumbItems} />`}
            </Typography>
          </Card>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>📋 Navigation Component Best Practices</AlertTitle>
        <Box component="ul" sx={{ pl: 3, mb: 0 }}>
          <li>Use consistent navigation patterns across the application</li>
          <li>Implement proper keyboard navigation and accessibility</li>
          <li>Provide visual feedback for active states and loading</li>
          <li>Keep tab labels concise and descriptive</li>
          <li>Use appropriate icons to enhance usability</li>
          <li>Implement proper error boundaries for navigation failures</li>
          <li>Maintain navigation state across page refreshes when needed</li>
          <li>Follow Material-UI design guidelines for consistency</li>
        </Box>
      </Alert>

      <Typography variant="body2" sx={{ fontStyle: 'italic', textAlign: 'center', mt: 4 }}>
        For more specific examples and advanced usage patterns, refer to the individual navigation source files in
        <code> src/components/Navigations/</code> and <code> src/components/(navigation)/</code>
      </Typography>
    </Box>
  );
};

export default NavigationComponentsDocumentation;
