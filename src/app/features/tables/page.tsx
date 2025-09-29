import PageID from '@/@dront/components/PageID';
import TablesPage from '@/modules/05-Features/tables';

export default function TablesPageRoute() {
  return (
    <PageID
      title="Tables - CRING! Portal Partner Documentation"
      description="Data tables, pagination, filtering, dan table components di CRING!"
      keywords="Tables, Data Grid, Pagination, Filtering, Sorting"
      breadcrumbs={{
        title: 'Tables',
        routes: [{ label: 'Documentation', href: '/' }, { label: 'Features', href: '/features' }, { label: 'Tables' }]
      }}
    >
      <TablesPage />
    </PageID>
  );
}
