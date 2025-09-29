'use client';

import PageID from '@/@dront/components/PageID';
import HomePage from '@/modules/Home';

const Page = () => {
  return (
    <PageID
      title="CRING! Partner Documentation"
      description="Comprehensive documentation untuk development CRING! Partner - Next.js 15, TypeScript, Material-UI"
      keywords="CRING, Partner, Documentation, Next.js, TypeScript, Material-UI, React"
      breadcrumbs={{
        title: 'Documentation Home',
        routes: [{ label: 'Documentation' }]
      }}
    >
      <HomePage />
    </PageID>
  );
};

export default Page;
