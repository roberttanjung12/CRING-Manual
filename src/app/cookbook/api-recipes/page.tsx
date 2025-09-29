import PageID from '@/@dront/components/PageID';
import APIRecipesPage from '@/modules/08-Cookbook/api-recipes';

export default function APIRecipesPageRoute() {
  return (
    <PageID
      title="API Recipes - CRING! Portal Partner Documentation"
      description="API integration recipes, common API patterns, dan data fetching examples"
      keywords="API Recipes, Data Fetching, API Integration, HTTP Requests"
      breadcrumbs={{
        title: 'API Recipes',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Cookbook', href: '/cookbook' },
          { label: 'API Recipes' }
        ]
      }}
    >
      <APIRecipesPage />
    </PageID>
  );
}
