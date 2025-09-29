import PageID from '@/@dront/components/PageID';
import TroubleshootingPage from '@/modules/06-Workflow/troubleshooting';

export default function TroubleshootingPageRoute() {
  return (
    <PageID
      title="Troubleshooting - CRING! Portal Partner Documentation"
      description="Common issues, debugging strategies, dan problem solving guide"
      keywords="Troubleshooting, Debugging, Common Issues, Problem Solving"
      breadcrumbs={{
        title: 'Troubleshooting',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Workflow', href: '/workflow' },
          { label: 'Troubleshooting' }
        ]
      }}
    >
      <TroubleshootingPage />
    </PageID>
  );
}
