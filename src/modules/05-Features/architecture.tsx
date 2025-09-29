'use client';

import { Typography, Alert, Card, CardContent, Stack, Chip } from '@mui/material';
import { CodeBlock } from '@/documentation/components';
import { DocumentationPageLayout } from '@/documentation/layouts/DocumentationLayout';

const FeaturesArchitecturePage = () => {
  const tableOfContents = [
    { id: 'overview', title: 'Architecture Overview' },
    { id: 'folder-structure', title: 'Folder Structure' },
    { id: 'module-patterns', title: 'Module Patterns' },
    { id: 'data-flow', title: 'Data Flow' }
  ];

  return (
    <DocumentationPageLayout
      title="Features Architecture"
      description="Architecture patterns untuk building complex features di CRING! Partner"
      tableOfContents={tableOfContents}
      navigation={{
        previous: {
          title: 'Creating Components',
          href: '/components/creating'
        },
        next: {
          title: 'Forms',
          href: '/features/forms'
        }
      }}
    >
      <section id="overview">
        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Features Architecture Overview
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          CRING! Partner menggunakan modular architecture dengan feature-based organization, custom hooks, dan service
          layers untuk scalability dan maintainability.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
          <Chip label="Modular Design" color="primary" variant="outlined" />
          <Chip label="Custom Hooks" color="secondary" variant="outlined" />
          <Chip label="Service Layer" color="info" variant="outlined" />
          <Chip label="Type Safe" color="success" variant="outlined" />
        </Stack>
      </section>

      <section id="folder-structure">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Folder Structure
        </Typography>

        <Card>
          <CardContent>
            <CodeBlock
              language="text"
              title="Feature-based Organization"
              code={`src/
├── app/                     # Next.js App Router
│   ├── dashboard/
│   ├── merchants/
│   └── settings/
│
├── components/              # Reusable UI components
│   ├── forms/
│   ├── layout/
│   └── shared/
│
├── services/               # API services
│   ├── merchantService.ts
│   ├── authService.ts
│   └── types/
│
├── hooks/                  # Custom React hooks
│   ├── useApi.ts
│   ├── useMerchants.ts
│   └── useAuth.ts
│
├── store/                  # State management
│   ├── slices/
│   └── middleware/
│
└── utility/               # Helper functions
    ├── formatUtils.ts
    └── validationUtils.ts`}
            />
          </CardContent>
        </Card>
      </section>

      <section id="module-patterns">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Module Patterns
        </Typography>

        <Stack spacing={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Service Layer Pattern
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/services/merchantService.ts"
                code={`class MerchantService {
  private baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem('token');
    
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? \`Bearer \${token}\` : '',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return response.json();
  }

  async getMerchants(params: PaginationParams): Promise<MerchantListResponse> {
    const query = new URLSearchParams(params as any).toString();
    return this.request<MerchantListResponse>(\`/merchants?\${query}\`);
  }

  async createMerchant(data: CreateMerchantRequest): Promise<Merchant> {
    return this.request<Merchant>('/merchants', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const merchantService = new MerchantService();`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Custom Hook Pattern
              </Typography>
              <CodeBlock
                language="typescript"
                title="src/hooks/useMerchants.ts"
                code={`export function useMerchants() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: merchantsData,
    loading,
    error,
    execute: fetchMerchants,
  } = useApi(
    () => merchantService.getMerchants({ page, limit }),
    [page, limit]
  );

  const createMerchant = useCallback(async (data: CreateMerchantRequest) => {
    try {
      const result = await merchantService.createMerchant(data);
      await fetchMerchants(); // Refresh list
      return result;
    } catch (error) {
      throw error;
    }
  }, [fetchMerchants]);

  return {
    merchants: merchantsData?.data || [],
    pagination: merchantsData?.meta,
    loading,
    error,
    createMerchant,
    refetch: fetchMerchants,
    goToPage: setPage,
  };
}`}
              />
            </CardContent>
          </Card>
        </Stack>
      </section>

      <section id="data-flow">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Data Flow Architecture
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Component Data Flow
            </Typography>
            <CodeBlock
              language="typescript"
              title="Page Component Example"
              code={`const MerchantPage: React.FC = () => {
  const {
    merchants,
    pagination,
    loading,
    createMerchant,
    goToPage,
  } = useMerchants();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateMerchant = async (data: CreateMerchantRequest) => {
    try {
      await createMerchant(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create merchant:', error);
    }
  };

  return (
    <PageLayout>
      <PageHeader 
        title="Merchants"
        actions={[{
          label: 'Add Merchant',
          onClick: () => setIsModalOpen(true)
        }]}
      />
      
      <MerchantTable
        merchants={merchants}
        loading={loading}
      />
      
      <Pagination
        pagination={pagination}
        onPageChange={goToPage}
      />
      
      <MerchantModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateMerchant}
      />
    </PageLayout>
  );
};`}
            />

            <Alert severity="info" sx={{ mt: 2 }}>
              <strong>Data Flow:</strong> Page Component → Custom Hook → Service Layer → API
            </Alert>
          </CardContent>
        </Card>

        <Alert severity="success" sx={{ mt: 3 }}>
          <strong>Architecture Ready!</strong> Pattern ini memastikan separation of concerns dan memudahkan testing
          serta maintenance.
        </Alert>
      </section>
    </DocumentationPageLayout>
  );
};

export default FeaturesArchitecturePage;
