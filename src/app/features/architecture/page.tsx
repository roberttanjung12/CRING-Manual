import PageID from '@/@dront/components/PageID';
import FeatureArchitecturePage from '@/modules/05-Features/feature-architecture';

export default function FeatureArchitecturePageRoute() {
  return (
    <PageID
      title="Feature Architecture - CRING! Portal Partner Documentation"
      description="Arsitektur dan pola pengembangan fitur dalam aplikasi CRING! Portal Partner"
      keywords="Feature Architecture, Development, Patterns, CRING Portal Partner"
      breadcrumbs={{
        title: 'Feature Architecture',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Features', href: '/features' },
          { label: 'Architecture' }
        ]
      }}
    >
      <FeatureArchitecturePage />
    </PageID>
  );
}
