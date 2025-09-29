import PageID from '@/@dront/components/PageID';
import UtilitiesPage from '@/modules/08-Cookbook/utilities';

export default function UtilitiesPageRoute() {
  return (
    <PageID
      title="Utilities - CRING! Portal Partner Documentation"
      description="Utility functions, helpers, dan common utilities cookbook"
      keywords="Utilities, Helper Functions, Common Utilities, Utils"
      breadcrumbs={{
        title: 'Utilities',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Cookbook', href: '/cookbook' },
          { label: 'Utilities' }
        ]
      }}
    >
      <UtilitiesPage />
    </PageID>
  );
}
