import PageID from '@/@dront/components/PageID';
import ComponentsAndUtilities from '@/modules/Documentation/ComponentsAndUtilities';

export default function ComponentsAndUtilitiesRoute() {
  return (
    <PageID
      title="Components and Utilities Guide - CRING! Portal Partner Documentation"
      description="Panduan komprehensif komponen dan utilitas dalam aplikasi CRING! Portal Partner"
      keywords="Components, Utilities, TableCRING, Hooks, Services, CRING Portal Partner"
      breadcrumbs={{
        title: 'Components and Utilities Guide',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Guides', href: '/documentation' },
          { label: 'Components and Utilities' }
        ]
      }}
    >
      <ComponentsAndUtilities />
    </PageID>
  );
}
