import PageID from '@/@dront/components/PageID';
import CustomHooksPage from '@/modules/07-Advanced/custom-hooks';

export default function CustomHooksPageRoute() {
  return (
    <PageID
      title="Custom Hooks - CRING! Portal Partner Documentation"
      description="Advanced React hooks, custom hook creation, dan reusable hook patterns"
      keywords="Custom Hooks, React Hooks, Advanced Hooks, Hook Patterns"
      breadcrumbs={{
        title: 'Custom Hooks',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Advanced', href: '/advanced' },
          { label: 'Custom Hooks' }
        ]
      }}
    >
      <CustomHooksPage />
    </PageID>
  );
}
