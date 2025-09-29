import PageID from '@/@dront/components/PageID';
import RoutingNavigationPage from '@/modules/02-Fundamentals/routing-navigation';

export default function RoutingNavigationPageRoute() {
  return (
    <PageID
      title="Routing & Navigation - CRING! Portal Partner Documentation"
      description="Cara kerja routing di Next.js 15 App Router dan navigation patterns"
      keywords="Routing, Navigation, Next.js, App Router, Dynamic Routes"
      breadcrumbs={{
        title: 'Routing & Navigation',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Fundamentals', href: '/fundamentals' },
          { label: 'Routing & Navigation' }
        ]
      }}
    >
      <RoutingNavigationPage />
    </PageID>
  );
}
