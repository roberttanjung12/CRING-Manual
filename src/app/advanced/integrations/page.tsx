import PageID from '@/@dront/components/PageID';
import IntegrationsPage from '@/modules/07-Advanced/integrations';

export default function IntegrationsPageRoute() {
  return (
    <PageID
      title="Integrations - CRING! Portal Partner Documentation"
      description="Third-party integrations, APIs, dan external service connections"
      keywords="Integrations, Third Party, APIs, External Services, Connections"
      breadcrumbs={{
        title: 'Integrations',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Advanced', href: '/advanced' },
          { label: 'Integrations' }
        ]
      }}
    >
      <IntegrationsPage />
    </PageID>
  );
}
