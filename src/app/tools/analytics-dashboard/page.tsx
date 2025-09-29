import type { Metadata } from 'next';
import AnalyticsDashboardPage from '@/modules/AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Analytics Dashboard - CRING Documentation',
  description: 'Track user behavior, page performance, and engagement metrics for CRING documentation platform',
  keywords: ['analytics', 'dashboard', 'metrics', 'insights', 'documentation', 'usage tracking', 'cring']
};

export default function Page() {
  return <AnalyticsDashboardPage />;
}
