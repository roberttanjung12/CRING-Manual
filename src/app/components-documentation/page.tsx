'use client';

import PageID from '@/@dront/components/PageID';
import ComponentsDocumentationPage from '@/modules/ComponentsDocumentation';

const Page = () => {
  return (
    <PageID
      title="Components Documentation - CRING! Portal Partner"
      description="Documentation untuk semua UI components yang tersedia di CRING! Portal Partner"
      keywords="Components Documentation, UI Components, Material-UI, React Components"
      breadcrumbs={{
        title: 'Components Documentation',
        routes: [{ label: 'Documentation', href: '/' }, { label: 'Components Documentation' }]
      }}
    >
      <ComponentsDocumentationPage />
    </PageID>
  );
};

export default Page;
