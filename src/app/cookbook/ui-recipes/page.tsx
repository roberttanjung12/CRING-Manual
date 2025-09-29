import PageID from '@/@dront/components/PageID';
import UIRecipesPage from '@/modules/08-Cookbook/ui-recipes';

export default function UIRecipesPageRoute() {
  return (
    <PageID
      title="UI Recipes - CRING! Portal Partner Documentation"
      description="UI component recipes, layout patterns, dan interface building examples"
      keywords="UI Recipes, Component Recipes, Layout Patterns, Interface Design"
      breadcrumbs={{
        title: 'UI Recipes',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Cookbook', href: '/cookbook' },
          { label: 'UI Recipes' }
        ]
      }}
    >
      <UIRecipesPage />
    </PageID>
  );
}
