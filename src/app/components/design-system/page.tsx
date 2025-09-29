import PageID from '@/@dront/components/PageID';
import DesignSystemPage from '@/modules/03-Components/design-system';

export default function DesignSystemPageRoute() {
  return (
    <PageID
      title="Design System - CRING! Portal Partner Documentation"
      description="Design system, colors, typography, spacing, dan visual guidelines"
      keywords="Design System, UI Guidelines, Colors, Typography, Spacing"
      breadcrumbs={{
        title: 'Design System',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Design System' }
        ]
      }}
    >
      <DesignSystemPage />
    </PageID>
  );
}
