import PageID from '@/@dront/components/PageID';
import PatternsPage from '@/modules/03-Components/patterns';

export default function UsagePatternsPageRoute() {
  return (
    <PageID
      title="Usage Patterns - CRING! Portal Partner Documentation"
      description="Component usage patterns, best practices, dan common implementation scenarios"
      keywords="Usage Patterns, Component Patterns, Best Practices, Implementation"
      breadcrumbs={{
        title: 'Usage Patterns',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Usage Patterns' }
        ]
      }}
    >
      <PatternsPage />
    </PageID>
  );
}
