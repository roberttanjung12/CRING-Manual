import PageID from '@/@dront/components/PageID';
import StateManagementPage from '@/modules/02-Fundamentals/state-management';

export default function StateManagementPageRoute() {
  return (
    <PageID
      title="State Management - CRING! Portal Partner Documentation"
      description="Context API, Redux Toolkit, dan state management patterns di CRING! Portal Partner"
      keywords="State Management, Context API, Redux Toolkit, React State"
      breadcrumbs={{
        title: 'State Management',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Fundamentals', href: '/fundamentals' },
          { label: 'State Management' }
        ]
      }}
    >
      <StateManagementPage />
    </PageID>
  );
}
