import PageID from '@/@dront/components/PageID';
import FormsPage from '@/modules/05-Features/forms';

export default function FormsPageRoute() {
  return (
    <PageID
      title="Forms - CRING! Portal Partner Documentation"
      description="Form handling, validation, dan form components yang tersedia di CRING!"
      keywords="Forms, Validation, Form Components, React Hook Form"
      breadcrumbs={{
        title: 'Forms',
        routes: [{ label: 'Documentation', href: '/' }, { label: 'Features', href: '/features' }, { label: 'Forms' }]
      }}
    >
      <FormsPage />
    </PageID>
  );
}
