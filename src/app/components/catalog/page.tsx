import PageID from '@/@dront/components/PageID';
import ComponentCatalogPage from '@/modules/03-Components/catalog';

export default function ComponentCatalogPageRoute() {
  return (
    <PageID
      title="Component Catalog - CRING! Portal Partner Documentation"
      description="Catalog lengkap semua UI components yang tersedia di CRING! Portal Partner"
      keywords="Component Catalog, UI Components, Material-UI, Component Library"
      breadcrumbs={{
        title: 'Component Catalog',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Component Catalog' }
        ]
      }}
    >
      <ComponentCatalogPage />
    </PageID>
  );
}
