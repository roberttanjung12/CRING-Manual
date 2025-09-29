import PageID from '@/@dront/components/PageID';
import TechStackPage from '@/modules/01-Onboarding/tech-stack';

export default function TechStackPageRoute() {
  return (
    <PageID
      title="Tech Stack - CRING! Partner Documentation"
      description="Mengenal teknologi dan tools yang digunakan dalam CRING! Partner development"
      keywords="Next.js, TypeScript, Material-UI, React, Tech Stack, CRING"
      breadcrumbs={{
        title: 'Tech Stack',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Onboarding', href: '/onboarding' },
          { label: 'Tech Stack' }
        ]
      }}
    >
      <TechStackPage />
    </PageID>
  );
}
