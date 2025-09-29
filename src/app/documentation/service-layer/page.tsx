import PageID from '@/@dront/components/PageID';
import ServiceLayerGuide from '@/modules/Documentation/ServiceLayerGuide';

export default function ServiceLayerGuideRoute() {
  return (
    <PageID
      title="Service Layer Architecture Guide - CRING! Portal Partner Documentation"
      description="Panduan arsitektur service layer dalam aplikasi CRING! Portal Partner"
      keywords="Service Layer, API, HTTP Functions, Architecture, CRING Portal Partner"
      breadcrumbs={{
        title: 'Service Layer Architecture',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Guides', href: '/documentation' },
          { label: 'Service Layer' }
        ]
      }}
    >
      <ServiceLayerGuide />
    </PageID>
  );
}
