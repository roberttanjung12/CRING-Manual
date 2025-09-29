import PageID from '@/@dront/components/PageID';
import ErrorHandlingPage from '@/modules/04-Data-Services/error-handling';

export default function ErrorHandlingPageRoute() {
  return (
    <PageID
      title="Error Handling - CRING! Portal Partner Documentation"
      description="Strategi dan implementasi error handling yang comprehensive dalam CRING! Portal Partner"
      keywords="Error Handling, Exception Handling, Validation, CRING Portal Partner"
      breadcrumbs={{
        title: 'Error Handling',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Data & Services', href: '/data-services' },
          { label: 'Error Handling' }
        ]
      }}
    >
      <ErrorHandlingPage />
    </PageID>
  );
}
