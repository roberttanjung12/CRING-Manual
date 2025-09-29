'use client';

import { Typography, Alert, Card, CardContent, Stack } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const UsagePatternsPage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Pattern Overview' },
    { id: 'layout-patterns', title: 'Layout Patterns' },
    { id: 'form-patterns', title: 'Form Patterns' },
    { id: 'data-patterns', title: 'Data Display Patterns' },
    { id: 'navigation-patterns', title: 'Navigation Patterns' }
  ];

  return (
    <DocumentationPageLayout
      title="Usage Patterns"
      description="Common UI patterns dan best practices untuk menggunakan components secara effective"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Component Catalog',
          href: '/components/catalog'
        },
        next: {
          title: 'Creating Components',
          href: '/components/creating'
        }
      }}
    >
      {/* Overview */}
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Common Usage Patterns
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Collection of proven UI patterns dan best practices yang sering digunakan di CRING! Partner untuk consistent
          user experience.
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Pattern Library:</strong> Patterns ini sudah tested dan proven effective untuk business requirements
          kita. Use them as starting point for new features.
        </Alert>
      </section>

      {/* Layout Patterns */}
      <section id="layout-patterns">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Layout Patterns
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                📱 Dashboard Layout Pattern
              </Typography>

              <CodeBlock
                language="typescript"
                title="Standard dashboard layout"
                code={`import { Grid, Card, CardContent } from '@mui/material'

function DashboardLayout() {
  return (
    <Grid container spacing={3}>
      {/* Stats Cards Row */}
      <Grid xs={12}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={3}>
            <StatCard title="Total Users" value="1,234" />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <StatCard title="Revenue" value="$12,345" />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <StatCard title="Orders" value="456" />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <StatCard title="Growth" value="+23%" />
          </Grid>
        </Grid>
      </Grid>

      {/* Main Content Row */}
      <Grid xs={12} md={8}>
        <Card>
          <CardContent>
            <ChartComponent />
          </CardContent>
        </Card>
      </Grid>

      {/* Sidebar Content */}
      <Grid xs={12} md={4}>
        <Stack spacing={2}>
          <Card>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <QuickActions />
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  )
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                📋 List with Actions Pattern
              </Typography>

              <CodeBlock
                language="typescript"
                title="List with inline actions"
                code={`import { Card, List, ListItem, IconButton, Menu } from '@mui/material'

function ActionableList({ items, onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Card>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <Stack direction="row" spacing={1}>
                <IconButton onClick={() => onEdit(item.id)}>
                  <Icon icon="edit" />
                </IconButton>
                <IconButton onClick={() => onDelete(item.id)} color="error">
                  <Icon icon="delete" />
                </IconButton>
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                  <Icon icon="more-vert" />
                </IconButton>
              </Stack>
            }
          >
            <ListItemText 
              primary={item.title}
              secondary={item.description}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  )
}`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Form Patterns */}
      <section id="form-patterns">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Form Patterns
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                📝 Multi-Step Form Pattern
              </Typography>

              <CodeBlock
                language="typescript"
                title="Wizard-style form with steps"
                code={`import { Stepper, Step, StepLabel, Button, Box } from '@mui/material'

function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0)
  const steps = ['Basic Info', 'Details', 'Review']

  const handleNext = () => setActiveStep(prev => prev + 1)
  const handleBack = () => setActiveStep(prev => prev - 1)

  return (
    <Card>
      <CardContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 4 }}>
          {activeStep === 0 && <BasicInfoStep />}
          {activeStep === 1 && <DetailsStep />}
          {activeStep === 2 && <ReviewStep />}
        </Box>

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button 
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            variant="contained"
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                ✅ Form Validation Pattern
              </Typography>

              <CodeBlock
                language="typescript"
                title="Form with validation and error handling"
                code={`import { useFormState } from '@/hooks/useFormState'

function ValidatedForm() {
  const {
    values,
    errors,
    touched,
    setValue,
    setFieldTouched,
    handleSubmit,
    isSubmitting
  } = useFormState({
    initialValues: { name: '', email: '' },
    validate: (values) => {
      const errors = {}
      if (!values.name) errors.name = 'Name is required'
      if (!values.email) errors.email = 'Email is required'
      else if (!/\\S+@\\S+\\.\\S+/.test(values.email)) {
        errors.email = 'Email is invalid'
      }
      return errors
    },
    onSubmit: async (values) => {
      await submitForm(values)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Name"
          value={values.name}
          onChange={(e) => setValue('name', e.target.value)}
          onBlur={() => setFieldTouched('name')}
          error={touched.name && !!errors.name}
          helperText={touched.name && errors.name}
          required
        />

        <TextField
          label="Email"
          type="email"
          value={values.email}
          onChange={(e) => setValue('email', e.target.value)}
          onBlur={() => setFieldTouched('email')}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          required
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : null}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Stack>
    </form>
  )
}`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Data Patterns */}
      <section id="data-patterns">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Data Display Patterns
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🗃️ Data Table with Pagination Pattern
              </Typography>

              <CodeBlock
                language="typescript"
                title="Complete data table implementation"
                code={`import { useDataTable } from '@/hooks/useDataTable'

function DataTablePattern() {
  const {
    data,
    loading,
    pagination,
    sorting,
    filters,
    handlePageChange,
    handleSortChange,
    handleFilterChange
  } = useDataTable('/api/users')

  return (
    <Card>
      <CardHeader 
        title="Users"
        action={
          <Button variant="contained" startIcon={<Icon icon="plus" />}>
            Add User
          </Button>
        }
      />
      
      <Box sx={{ p: 2 }}>
        <TextField
          placeholder="Search users..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          InputProps={{
            startAdornment: <Icon icon="search" />
          }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell 
                sortDirection={sorting.field === 'name' ? sorting.direction : false}
              >
                <TableSortLabel
                  active={sorting.field === 'name'}
                  direction={sorting.direction}
                  onClick={() => handleSortChange('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowsSkeleton rows={10} columns={4} />
            ) : (
              data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip label={user.role} size="small" />
                  </TableCell>
                  <TableCell>
                    <ActionMenu user={user} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={pagination.total}
        page={pagination.page}
        onPageChange={handlePageChange}
        rowsPerPage={pagination.pageSize}
        onRowsPerPageChange={handlePageSizeChange}
      />
    </Card>
  )
}`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      {/* Navigation Patterns */}
      <section id="navigation-patterns">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Navigation Patterns
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                🧭 Breadcrumb Navigation Pattern
              </Typography>

              <CodeBlock
                language="typescript"
                title="Dynamic breadcrumb generation"
                code={`import { Breadcrumbs, Link, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

function BreadcrumbNavigation() {
  const router = useRouter()
  const pathnames = router.asPath.split('/').filter(Boolean)

  const breadcrumbNameMap = {
    '/dashboard': 'Dashboard',
    '/dashboard/users': 'Users',
    '/dashboard/users/create': 'Create User',
    '/dashboard/settings': 'Settings'
  }

  return (
    <Breadcrumbs separator="›" sx={{ mb: 2 }}>
      <Link
        component="button"
        onClick={() => router.push('/')}
        underline="hover"
        color="inherit"
      >
        Home
      </Link>
      
      {pathnames.map((pathname, index) => {
        const routeTo = \`/\${pathnames.slice(0, index + 1).join('/')}\`
        const isLast = index === pathnames.length - 1
        const name = breadcrumbNameMap[routeTo] || pathname

        return isLast ? (
          <Typography key={routeTo} color="text.primary">
            {name}
          </Typography>
        ) : (
          <Link
            key={routeTo}
            component="button"
            onClick={() => router.push(routeTo)}
            underline="hover"
            color="inherit"
          >
            {name}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}`}
              />
            </CardContent>
          </Card>
        </Stack>

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Pattern Library Complete!</strong> These patterns cover 80% of common UI scenarios. Customize them
          based on specific requirements, tetapi maintain consistency dengan design system.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default UsagePatternsPage;
