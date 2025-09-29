import PageID from '@/@dront/components/PageID';
import PerformancePage from '@/modules/07-Advanced/performance';

export default function PerformancePageRoute() {
  return (
    <PageID
      title="Performance - CRING! Portal Partner Documentation"
      description="Performance optimization techniques, monitoring, dan best practices"
      keywords="Performance, Optimization, Monitoring, Best Practices, Speed"
      breadcrumbs={{
        title: 'Performance',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Advanced', href: '/advanced' },
          { label: 'Performance' }
        ]
      }}
    >
      <PerformancePage />
    </PageID>
  );
}
