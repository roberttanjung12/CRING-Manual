import PageID from '@/@dront/components/PageID';
import InteractiveExamplesPage from '@/modules/InteractiveExamples';

export default function InteractiveExamplesRoute() {
  return (
    <PageID
      title="Interactive Component Playground - CRING! Partner Documentation"
      description="Playground interaktif untuk bereksperimen dengan components, mengubah props, dan melihat generated code"
      keywords="Interactive, Playground, Components, Props, Code Generator, Examples, TableCRING, Zod Validation"
      breadcrumbs={{
        title: 'Interactive Examples',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Tools', href: '/tools' },
          { label: 'Interactive Playground' }
        ]
      }}
    >
      <InteractiveExamplesPage />
    </PageID>
  );
}
