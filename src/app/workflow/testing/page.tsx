import PageID from '@/@dront/components/PageID';
import TestingPage from '@/modules/06-Workflow/testing';

export default function TestingPageRoute() {
  return (
    <PageID
      title="Testing - CRING! Portal Partner Documentation"
      description="Testing strategies, unit tests, integration tests, dan testing tools"
      keywords="Testing, Unit Tests, Integration Tests, Jest, Testing Library"
      breadcrumbs={{
        title: 'Testing',
        routes: [{ label: 'Documentation', href: '/' }, { label: 'Workflow', href: '/workflow' }, { label: 'Testing' }]
      }}
    >
      <TestingPage />
    </PageID>
  );
}
