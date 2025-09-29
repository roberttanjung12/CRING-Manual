/**
 * Semantic Search Index untuk CRING! Partner Documentation
 *
 * Index ini berisi metadata lengkap untuk setiap halaman dokumentasi
 * termasuk keywords, description, content snippets, dan semantic meanings
 * untuk pencarian yang lebih cerdas berdasarkan makna, bukan hanya judul halaman.
 */

export interface DocumentationPage {
  id: string;
  title: string;
  href: string;
  description: string;
  keywords: string[];
  category:
    | 'fundamentals'
    | 'components'
    | 'utilities'
    | 'data-services'
    | 'workflow'
    | 'advanced'
    | 'cookbook'
    | 'documentation';
  priority: 'high' | 'medium' | 'low';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  contentType: 'guide' | 'reference' | 'tutorial' | 'example' | 'overview';
  searchableContent: string[];
  relatedPages: string[];
  lastUpdated: string;
}

export const searchableDocumentation: DocumentationPage[] = [
  // === FUNDAMENTALS ===
  {
    id: 'project-architecture',
    title: 'Project Architecture',
    href: '/fundamentals/project-architecture',
    description: 'Memahami arsitektur high-level dan design patterns yang digunakan di CRING! Partner',
    keywords: ['architecture', 'design patterns', 'structure', 'overview', 'sistem', 'arsitektur'],
    category: 'fundamentals',
    priority: 'high',
    difficulty: 'intermediate',
    contentType: 'guide',
    searchableContent: [
      'Next.js 15 App Router architecture',
      'Component hierarchy dan organization',
      'Data flow patterns',
      'State management architecture',
      'Routing strategy',
      'Folder structure organization'
    ],
    relatedPages: ['folder-structure', 'routing-navigation', 'state-management'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'folder-structure',
    title: 'Folder Structure',
    href: '/fundamentals/folder-structure',
    description: 'Panduan lengkap struktur folder dan file organization di CRING! Partner',
    keywords: ['folder', 'structure', 'organization', 'files', 'directories', 'struktur folder'],
    category: 'fundamentals',
    priority: 'high',
    difficulty: 'beginner',
    contentType: 'reference',
    searchableContent: [
      'src/app routing structure',
      'src/components organization',
      'src/modules feature modules',
      'src/services API layers',
      'src/hooks custom hooks',
      'src/types TypeScript definitions'
    ],
    relatedPages: ['project-architecture', 'routing-navigation'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'routing-navigation',
    title: 'Routing & Navigation',
    href: '/fundamentals/routing-navigation',
    description: 'Cara kerja routing di Next.js 15 App Router dan navigation patterns',
    keywords: ['routing', 'navigation', 'next.js', 'app router', 'dynamic routes', 'navigasi'],
    category: 'fundamentals',
    priority: 'high',
    difficulty: 'intermediate',
    contentType: 'guide',
    searchableContent: [
      'Next.js App Router fundamentals',
      'File-based routing system',
      'Dynamic routes dengan [params]',
      'Route groups dengan (folders)',
      'Navigation methods dan Link components',
      'Middleware untuk route protection'
    ],
    relatedPages: ['project-architecture', 'folder-structure'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'state-management',
    title: 'State Management',
    href: '/fundamentals/state-management',
    description: 'Global state management dengan React Context dan SWR untuk data fetching',
    keywords: ['state management', 'context', 'swr', 'global state', 'react context', 'state'],
    category: 'fundamentals',
    priority: 'high',
    difficulty: 'intermediate',
    contentType: 'guide',
    searchableContent: [
      'React Context patterns',
      'SWR untuk data fetching',
      'Global state management',
      'Context providers setup',
      'State sharing between components',
      'Data synchronization patterns'
    ],
    relatedPages: ['custom-hooks', 'context-providers'],
    lastUpdated: '2025-01-15'
  },

  // === COMPONENTS DOCUMENTATION ===
  {
    id: 'components-overview',
    title: 'Components Overview',
    href: '/documentation/components',
    description: 'Ringkasan dan navigasi ke semua kategori komponen dalam aplikasi CRING',
    keywords: ['components', 'overview', 'ui', 'komponen', 'ringkasan', 'navigasi'],
    category: 'documentation',
    priority: 'high',
    difficulty: 'beginner',
    contentType: 'overview',
    searchableContent: [
      'Form components guide',
      'Modal components patterns',
      'Navigation components',
      'Element components library',
      'TableCRING priority component',
      'Zod validation system'
    ],
    relatedPages: ['form-components', 'modal-components', 'table-cring'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'table-cring',
    title: 'TableCRING Component',
    href: '/documentation/components/table-cring',
    description: 'Komponen tabel utama dengan filtering & pagination - Priority #1 component',
    keywords: ['table', 'tablecring', 'data display', 'filtering', 'pagination', 'tabel', 'data'],
    category: 'components',
    priority: 'high',
    difficulty: 'intermediate',
    contentType: 'reference',
    searchableContent: [
      'TableCRING implementation patterns',
      'Column configuration dengan filters',
      'Text, select, date, autocomplete filters',
      'Pagination dan data loading',
      'Column abilities copy currency styling',
      'Filter types dan query parameters',
      'Production usage examples'
    ],
    relatedPages: ['components-overview', 'data-display', 'custom-hooks'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'zod-validation',
    title: 'Zod Validation',
    href: '/documentation/components/zod-validation',
    description: 'TypeScript validation dengan Zod (mengganti Yup) - Priority #2 component',
    keywords: ['zod', 'validation', 'typescript', 'forms', 'schema', 'validasi', 'yup replacement'],
    category: 'components',
    priority: 'high',
    difficulty: 'intermediate',
    contentType: 'guide',
    searchableContent: [
      'Zod schema definition patterns',
      'React Hook Form integration',
      'Complex validation dengan refinement',
      'Custom validation rules',
      'Error handling patterns',
      'TypeScript type inference',
      'Yup migration guide'
    ],
    relatedPages: ['form-components', 'components-overview'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'form-components',
    title: 'Form Components',
    href: '/documentation/components/form-components',
    description: 'ButtonSubmit, AutoAsync, DateRangePicker, react-hook-form components',
    keywords: ['form', 'input', 'validation', 'react-hook-form', 'button', 'datepicker', 'formulir'],
    category: 'components',
    priority: 'medium',
    difficulty: 'intermediate',
    contentType: 'reference',
    searchableContent: [
      'ButtonSubmit dengan loading states',
      'AutoAsync autocomplete component',
      'DateRangePicker implementation',
      'Form validation patterns',
      'React Hook Form integration',
      'Input component variations',
      'Form submission handling'
    ],
    relatedPages: ['zod-validation', 'components-overview'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'modal-components',
    title: 'Modal Components',
    href: '/documentation/components/modal-components',
    description: 'OTPConfirmation, Detail, Confirmation modals dan dialog patterns',
    keywords: ['modal', 'dialog', 'popup', 'confirmation', 'otp', 'detail modal', 'overlay'],
    category: 'components',
    priority: 'medium',
    difficulty: 'beginner',
    contentType: 'reference',
    searchableContent: [
      'Modal implementation patterns',
      'OTPConfirmation flow',
      'Detail modal untuk data display',
      'Confirmation dialog patterns',
      'Modal state management',
      'Dialog accessibility',
      'Modal composition patterns'
    ],
    relatedPages: ['components-overview', 'navigation-components'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'navigation-components',
    title: 'Navigation Components',
    href: '/documentation/components/navigation-components',
    description: 'NavigationTabs, ButtonTo, routing integration dan navigation patterns',
    keywords: ['navigation', 'tabs', 'routing', 'links', 'breadcrumbs', 'menu', 'navigasi'],
    category: 'components',
    priority: 'medium',
    difficulty: 'beginner',
    contentType: 'reference',
    searchableContent: [
      'NavigationTabs component',
      'ButtonTo routing integration',
      'Breadcrumb navigation',
      'Menu navigation patterns',
      'Link component usage',
      'Navigation state management',
      'Active route detection'
    ],
    relatedPages: ['routing-navigation', 'components-overview'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'element-components',
    title: 'Element Components',
    href: '/documentation/components/element-components',
    description: 'SkeletonCRING, ButtonDownload, Indicator, wrapper components',
    keywords: ['skeleton', 'loading', 'indicator', 'button', 'download', 'wrapper', 'ui elements'],
    category: 'components',
    priority: 'low',
    difficulty: 'beginner',
    contentType: 'reference',
    searchableContent: [
      'SkeletonCRING loading states',
      'ButtonDownload functionality',
      'Indicator status components',
      'Wrapper components untuk layout',
      'Surface styling components',
      'Loading state management',
      'Status display patterns'
    ],
    relatedPages: ['components-overview', 'ui-patterns'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'context-providers',
    title: 'Context Providers',
    href: '/documentation/components/context-providers',
    description: 'Context patterns untuk state management dan data sharing',
    keywords: ['context', 'providers', 'state management', 'global state', 'react context', 'context patterns'],
    category: 'components',
    priority: 'high',
    difficulty: 'intermediate',
    contentType: 'guide',
    searchableContent: [
      'Context provider patterns',
      'Global state management',
      'Authentication context',
      'Theme context providers',
      'Data sharing patterns',
      'Context composition',
      'Provider setup dan usage'
    ],
    relatedPages: ['state-management', 'custom-hooks'],
    lastUpdated: '2025-01-15'
  },

  // === UTILITIES ===
  {
    id: 'custom-hooks',
    title: 'Custom Hooks',
    href: '/documentation/utilities/custom-hooks',
    description: 'useFilter, useFileUpload, data fetching hooks dan state management hooks',
    keywords: ['hooks', 'custom hooks', 'useFilter', 'useFileUpload', 'data fetching', 'state hooks'],
    category: 'utilities',
    priority: 'high',
    difficulty: 'intermediate',
    contentType: 'reference',
    searchableContent: [
      'Data fetching hooks dengan SWR',
      'useFilter untuk table filtering',
      'useFileUpload file handling',
      'Form management hooks',
      'State management hooks',
      'API integration hooks',
      'Custom hook patterns'
    ],
    relatedPages: ['table-cring', 'helper-functions'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'utility-functions',
    title: 'Utility Functions',
    href: '/documentation/utilities/utility-functions',
    description: 'Helper functions, formatters, validators, dan common utilities',
    keywords: ['utility', 'functions', 'helpers', 'formatters', 'validators', 'utils', 'tools'],
    category: 'utilities',
    priority: 'medium',
    difficulty: 'beginner',
    contentType: 'reference',
    searchableContent: [
      'String manipulation utilities',
      'Date formatting functions',
      'Number formatting utilities',
      'Validation helper functions',
      'Data transformation utilities',
      'Common utility patterns',
      'Performance optimization utilities'
    ],
    relatedPages: ['helper-functions', 'custom-hooks'],
    lastUpdated: '2025-01-15'
  },

  {
    id: 'helper-functions',
    title: 'Helper Functions (Legacy)',
    href: '/documentation/utilities/helper-functions',
    description: 'Legacy helper functions documentation dan migration patterns',
    keywords: ['helper', 'functions', 'legacy', 'migration', 'deprecated', 'old patterns'],
    category: 'utilities',
    priority: 'low',
    difficulty: 'beginner',
    contentType: 'reference',
    searchableContent: [
      'Legacy helper function patterns',
      'Migration guide to new utilities',
      'Deprecated function alternatives',
      'Backward compatibility patterns',
      'Legacy code maintenance',
      'Function migration examples',
      'Upgrade path recommendations'
    ],
    relatedPages: ['utility-functions', 'migration-guide'],
    lastUpdated: '2025-01-15'
  },

  // === SERVICE LAYER ===
  {
    id: 'service-layer',
    title: 'Service Layer Guide',
    href: '/documentation/service-layer',
    description: 'API services, authentication, error handling dan data management architecture',
    keywords: ['api', 'services', 'authentication', 'error handling', 'http', 'rest', 'service layer'],
    category: 'data-services',
    priority: 'high',
    difficulty: 'intermediate',
    contentType: 'guide',
    searchableContent: [
      'Service layer architecture',
      'API integration patterns',
      'Authentication service',
      'Error handling strategies',
      'HTTP client configuration',
      'Request/response interceptors',
      'Service composition patterns'
    ],
    relatedPages: ['authentication', 'api-architecture'],
    lastUpdated: '2025-01-15'
  },

  // === LEGACY & COMPREHENSIVE ===
  {
    id: 'components-and-utilities',
    title: 'Components and Utilities Guide',
    href: '/documentation/components-and-utilities',
    description: 'Panduan komprehensif komponen dan utilitas - Legacy comprehensive guide',
    keywords: ['comprehensive', 'complete guide', 'all components', 'all utilities', 'legacy guide', 'panduan lengkap'],
    category: 'documentation',
    priority: 'medium',
    difficulty: 'intermediate',
    contentType: 'guide',
    searchableContent: [
      'Complete component guide',
      'All utilities documentation',
      'Production implementation patterns',
      'Best practices guide',
      'Comprehensive examples',
      'Legacy pattern support',
      'Migration recommendations'
    ],
    relatedPages: ['components-overview', 'utility-functions'],
    lastUpdated: '2025-01-15'
  },

  // === INTERACTIVE TOOLS ===
  {
    id: 'interactive-playground',
    title: 'Interactive Component Playground',
    href: '/tools/interactive-playground',
    description: 'Playground interaktif untuk bereksperimen dengan components, props, dan code generation',
    keywords: ['playground', 'interactive', 'components', 'props', 'code generator', 'examples', 'real-time'],
    category: 'documentation',
    priority: 'high',
    difficulty: 'beginner',
    contentType: 'tutorial',
    searchableContent: [
      'Interactive component examples',
      'Real-time props editing',
      'Generated code preview',
      'Component configuration',
      'Live preview functionality',
      'Props editor interface',
      'Code copy functionality'
    ],
    relatedPages: ['table-cring', 'zod-validation', 'components-overview'],
    lastUpdated: '2025-01-15'
  }
];

/**
 * Fuzzy search implementation
 */
export function calculateSearchScore(query: string, page: DocumentationPage): number {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);

  let score = 0;

  // Exact title match (highest priority)
  if (page.title.toLowerCase().includes(queryLower)) {
    score += 100;
  }

  // Keyword matches
  queryWords.forEach(word => {
    // Title word match
    if (page.title.toLowerCase().includes(word)) {
      score += 50;
    }

    // Keywords match
    page.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(word)) {
        score += 30;
      }
    });

    // Description match
    if (page.description.toLowerCase().includes(word)) {
      score += 20;
    }

    // Content match
    page.searchableContent.forEach(content => {
      if (content.toLowerCase().includes(word)) {
        score += 15;
      }
    });

    // Category match
    if (page.category.toLowerCase().includes(word)) {
      score += 10;
    }
  });

  // Priority boost
  switch (page.priority) {
    case 'high':
      score += 25;
      break;
    case 'medium':
      score += 15;
      break;
    case 'low':
      score += 5;
      break;
  }

  // Difficulty penalty for complex searches
  if (queryWords.length === 1 && page.difficulty === 'advanced') {
    score -= 10;
  }

  return score;
}

/**
 * Semantic search function
 */
export function searchDocumentation(query: string): DocumentationPage[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const results = searchableDocumentation
    .map(page => ({
      ...page,
      score: calculateSearchScore(query, page)
    }))
    .filter(page => page.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Limit to top 10 results

  return results;
}

/**
 * Get suggestions based on partial query
 */
export function getSearchSuggestions(query: string): string[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const queryLower = query.toLowerCase();
  const suggestions = new Set<string>();

  searchableDocumentation.forEach(page => {
    // Add matching keywords
    page.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(queryLower)) {
        suggestions.add(keyword);
      }
    });

    // Add matching titles
    if (page.title.toLowerCase().includes(queryLower)) {
      suggestions.add(page.title);
    }
  });

  return Array.from(suggestions)
    .sort((a, b) => a.length - b.length)
    .slice(0, 5);
}
