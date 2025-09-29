import PageID from '@/@dront/components/PageID';
import AuthenticationPage from '@/modules/04-Data-Services/authentication';

export default function AuthenticationPageRoute() {
  return (
    <PageID
      title="Authentication - CRING! Portal Partner Documentation"
      description="Authentication strategies, login/logout, dan user session management"
      keywords="Authentication, Login, Session Management, Security, JWT"
      breadcrumbs={{
        title: 'Authentication',
        routes: [
          { label: 'Documentation', href: '/' },
          { label: 'Data Services', href: '/data-services' },
          { label: 'Authentication' }
        ]
      }}
    >
      <AuthenticationPage />
    </PageID>
  );
}
