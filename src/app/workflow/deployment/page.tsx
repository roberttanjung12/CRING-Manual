import PageID from '@/@dront/components/PageID';
import DeploymentPage from '@/modules/06-Workflow/deployment';

export default function DeploymentPageRoute() {
  return (
    <PageID
      title="Deployment - CRING! Portal Partner Documentation"
      description="Deployment strategies, CI/CD, dan production environment setup"
      keywords="Deployment, CI/CD, Production, DevOps, Build Process"
      breadcrumbs={{
        title: 'Deployment',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Workflow', href: '/workflow' },
          { label: 'Deployment' }
        ]
      }}
    >
      <DeploymentPage />
    </PageID>
  );
}
