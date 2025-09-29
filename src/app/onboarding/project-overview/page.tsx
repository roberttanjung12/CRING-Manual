import PageID from '@/@dront/components/PageID';
import ProjectOverviewPage from '@/modules/01-Onboarding/project-overview';

export default function Page() {
  return (
    <PageID
      title="Project Overview - CRING! Partner Documentation"
      description="Gambaran umum tentang CRING! Partner dan tujuan dokumentasi ini"
      keywords="CRING, Partner, Project Overview, Documentation"
      breadcrumbs={{
        title: 'Project Overview',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Onboarding', href: '/onboarding' },
          { label: 'Project Overview' }
        ]
      }}
    >
      <ProjectOverviewPage />
    </PageID>
  );
}
