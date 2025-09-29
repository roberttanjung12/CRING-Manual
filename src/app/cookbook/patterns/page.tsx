import PageID from '@/@dront/components/PageID';
import PatternsPage from '@/modules/08-Cookbook/patterns';

export default function PatternsPageRoute() {
  return (
    <PageID
      title="Patterns - CRING! Portal Partner Documentation"
      description="Reusable patterns, design patterns, dan best practices cookbook"
      keywords="Design Patterns, Best Practices, Cookbook, Reusable Patterns"
      breadcrumbs={{
        title: 'Patterns',
        routes: [{ label: 'Documentation', href: '/' }, { label: 'Cookbook', href: '/cookbook' }, { label: 'Patterns' }]
      }}
    >
      <PatternsPage />
    </PageID>
  );
}
