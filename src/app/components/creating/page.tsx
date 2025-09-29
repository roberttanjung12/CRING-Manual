import PageID from '@/@dront/components/PageID';
import CreatingPage from '@/modules/03-Components/creating';

export default function CreatingComponentsPageRoute() {
  return (
    <PageID
      title="Creating Components - CRING! Portal Partner Documentation"
      description="Step-by-step guide untuk membuat custom components yang reusable dan maintainable"
      keywords="Creating Components, Custom Components, Component Development, React"
      breadcrumbs={{
        title: 'Creating Components',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Creating Components' }
        ]
      }}
    >
      <CreatingPage />
    </PageID>
  );
}
