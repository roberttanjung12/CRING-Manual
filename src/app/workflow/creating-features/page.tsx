import PageID from '@/@dront/components/PageID';
import CreatingFeaturesPage from '@/modules/06-Workflow/creating-features';

export default function CreatingFeaturesPageRoute() {
  return (
    <PageID
      title="Creating Features - CRING! Portal Partner Documentation"
      description="Step-by-step guide untuk membuat fitur baru dari awal hingga deployment"
      keywords="Feature Development, Step by Step, Feature Creation, Development Workflow"
      breadcrumbs={{
        title: 'Creating Features',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Workflow', href: '/workflow' },
          { label: 'Creating Features' }
        ]
      }}
    >
      <CreatingFeaturesPage />
    </PageID>
  );
}
