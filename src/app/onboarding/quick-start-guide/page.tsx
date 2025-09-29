import type { Metadata } from 'next';
import QuickStartGuidePage from '@/modules/QuickStartGuide';

export const metadata: Metadata = {
  title: 'Quick Start Guide - CRING Documentation',
  description:
    'Get up and running with CRING! Partner development in 30 minutes - step-by-step guide for new developers',
  keywords: ['quick start', 'getting started', 'onboarding', 'beginner', 'developer guide', 'cring', 'tutorial']
};

export default function Page() {
  return <QuickStartGuidePage />;
}
