import PageID from '@/@dront/components/PageID';
import DevelopmentSetupPage from '@/modules/01-Onboarding/development-setup';

export default function DevelopmentSetupPageRoute() {
  return (
    <PageID
      title="Development Setup - CRING! Partner Documentation"
      description="Cara setup development environment untuk CRING! Partner"
      keywords="Development Setup, Environment, Installation, CRING"
      breadcrumbs={{
        title: 'Development Setup',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Onboarding', href: '/onboarding' },
          { label: 'Development Setup' }
        ]
      }}
    >
      <DevelopmentSetupPage />
    </PageID>
  );
}
