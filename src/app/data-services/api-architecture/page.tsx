import PageID from '@/@dront/components/PageID';
import APIArchitecturePage from '@/modules/04-Data-Services/api-architecture';

export default function ApiArchitecturePageRoute() {
  return (
    <PageID
      title="API Architecture - CRING! Portal Partner Documentation"
      description="REST API architecture, endpoints, dan integration patterns di CRING!"
      keywords="API Architecture, REST API, Endpoints, Integration, HTTP"
      breadcrumbs={{
        title: 'API Architecture',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Data Services', href: '/data-services' },
          { label: 'API Architecture' }
        ]
      }}
    >
      <APIArchitecturePage />
    </PageID>
  );
}
