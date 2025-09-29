import PageID from '@/@dront/components/PageID';
import ProjectArchitecturePage from '@/modules/02-Fundamentals/project-architecture';

export default function Page() {
  return (
    <PageID
      title="Project Architecture - CRING! Portal Partner Documentation"
      description="Arsitektur aplikasi dan design patterns yang digunakan dalam CRING! Portal Partner"
      keywords="Architecture, Design Patterns, Clean Code, CRING"
      breadcrumbs={{
        title: 'Project Architecture',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Fundamentals', href: '/fundamentals' },
          { label: 'Project Architecture' }
        ]
      }}
    >
      <ProjectArchitecturePage />
    </PageID>
  );
}
