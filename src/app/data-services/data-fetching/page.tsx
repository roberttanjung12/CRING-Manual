import PageID from '@/@dront/components/PageID';
import DataFetchingPage from '@/modules/04-Data-Services/data-fetching';

export default function DataFetchingPageRoute() {
  return (
    <PageID
      title="Data Fetching - CRING! Portal Partner Documentation"
      description="Panduan data fetching patterns, hooks, dan best practices dalam CRING! Portal Partner"
      keywords="Data Fetching, API, React Hooks, SWR, CRING Portal Partner"
      breadcrumbs={{
        title: 'Data Fetching',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Data & Services', href: '/data-services' },
          { label: 'Data Fetching' }
        ]
      }}
    >
      <DataFetchingPage />
    </PageID>
  );
}
