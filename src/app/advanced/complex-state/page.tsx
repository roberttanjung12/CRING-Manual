import PageID from '@/@dront/components/PageID';
import ComplexStatePage from '@/modules/07-Advanced/complex-state';

export default function ComplexStatePageRoute() {
  return (
    <PageID
      title="Complex State - CRING! Portal Partner Documentation"
      description="Complex state management patterns, reducers, dan advanced state techniques"
      keywords="Complex State, State Management, Reducers, Advanced State"
      breadcrumbs={{
        title: 'Complex State',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Advanced', href: '/advanced' },
          { label: 'Complex State' }
        ]
      }}
    >
      <ComplexStatePage />
    </PageID>
  );
}
