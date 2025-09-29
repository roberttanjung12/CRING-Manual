import type { NavigationProps } from '@/@dront/layouts/Main/Sidebar/Navigation/navigation-types';

const menus: NavigationProps[] = [
  // === ONBOARDING PHASE ===
  {
    isFirst: true,
    id: 'onboarding',
    title: 'Onboarding',
    icon: 'rocket_launch',
    href: '#',
    sub: [
      {
        id: 'quick-start-guide',
        title: 'Quick Start Guide',
        icon: 'flash_on',
        href: '/onboarding/quick-start-guide',
        sub: []
      },
      {
        id: 'project-overview',
        title: 'Project Overview',
        icon: 'info',
        href: '/onboarding/project-overview',
        sub: []
      },
      {
        id: 'tech-stack',
        title: 'Tech Stack',
        icon: 'layers',
        href: '/onboarding/tech-stack',
        sub: []
      },
      {
        id: 'development-setup',
        title: 'Development Setup',
        icon: 'construction',
        href: '/onboarding/development-setup',
        sub: []
      }
    ]
  },

  // === FUNDAMENTALS ===
  {
    isFirst: false,
    id: 'fundamentals',
    title: 'Fundamentals',
    icon: 'school',
    href: '#',
    sub: [
      {
        id: 'project-architecture',
        title: 'Project Architecture',
        icon: 'architecture',
        href: '/fundamentals/project-architecture',
        sub: []
      },
      {
        id: 'folder-structure',
        title: 'Folder Structure',
        icon: 'folder_open',
        href: '/fundamentals/folder-structure',
        sub: []
      },
      {
        id: 'routing-navigation',
        title: 'Routing & Navigation',
        icon: 'navigation',
        href: '/fundamentals/routing-navigation',
        sub: []
      },
      {
        id: 'state-management',
        title: 'State Management',
        icon: 'storage',
        href: '/fundamentals/state-management',
        sub: []
      }
    ]
  },

  // === COMPONENTS LIBRARY ===
  {
    isFirst: false,
    id: 'components',
    title: 'Components',
    icon: 'widgets',
    href: '#',
    sub: [
      {
        id: 'design-system',
        title: 'Design System',
        icon: 'palette',
        href: '/components/design-system',
        sub: []
      },
      {
        id: 'component-catalog',
        title: 'Component Catalog',
        icon: 'view_comfy',
        href: '/components/catalog',
        sub: []
      },
      {
        id: 'usage-patterns',
        title: 'Usage Patterns',
        icon: 'pattern',
        href: '/components/patterns',
        sub: []
      },
      {
        id: 'creating-components',
        title: 'Creating Components',
        icon: 'add_box',
        href: '/components/creating',
        sub: []
      }
    ]
  },

  // === DATA & SERVICES ===
  {
    isFirst: false,
    id: 'data-services',
    title: 'Data & Services',
    icon: 'cloud',
    href: '#',
    sub: [
      {
        id: 'api-architecture',
        title: 'API Architecture',
        icon: 'api',
        href: '/data-services/api-architecture',
        sub: []
      },
      {
        id: 'authentication',
        title: 'Authentication',
        icon: 'security',
        href: '/data-services/authentication',
        sub: []
      },
      {
        id: 'data-fetching',
        title: 'Data Fetching',
        icon: 'download',
        href: '/data-services/data-fetching',
        sub: []
      },
      {
        id: 'error-handling',
        title: 'Error Handling',
        icon: 'error',
        href: '/data-services/error-handling',
        sub: []
      }
    ]
  },

  // === FEATURES & MODULES ===
  {
    isFirst: false,
    id: 'features',
    title: 'Features',
    icon: 'featured_play_list',
    href: '#',
    sub: [
      {
        id: 'feature-architecture',
        title: 'Feature Architecture',
        icon: 'account_tree',
        href: '/features/architecture',
        sub: []
      },
      {
        id: 'form-handling',
        title: 'Form Handling',
        icon: 'edit_note',
        href: '/features/forms',
        sub: []
      },
      {
        id: 'table-data',
        title: 'Tables & Data Display',
        icon: 'table_view',
        href: '/features/tables',
        sub: []
      },
      {
        id: 'file-uploads',
        title: 'File Uploads',
        icon: 'upload_file',
        href: '/features/file-uploads',
        sub: []
      }
    ]
  },

  // === DEVELOPMENT WORKFLOW ===
  {
    isFirst: false,
    id: 'workflow',
    title: 'Workflow',
    icon: 'timeline',
    href: '#',
    sub: [
      {
        id: 'creating-features',
        title: 'Creating New Features',
        icon: 'add_circle',
        href: '/workflow/creating-features',
        sub: []
      },
      {
        id: 'testing-guidelines',
        title: 'Testing Guidelines',
        icon: 'quiz',
        href: '/workflow/testing',
        sub: []
      },
      {
        id: 'deployment',
        title: 'Deployment',
        icon: 'rocket',
        href: '/workflow/deployment',
        sub: []
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        icon: 'build',
        href: '/workflow/troubleshooting',
        sub: []
      }
    ]
  },

  // === DOCUMENTATION (COMPREHENSIVE) ===
  {
    isFirst: false,
    id: 'documentation',
    title: 'Documentation',
    icon: 'library_books',
    href: '#',
    sub: [
      {
        id: 'components-overview',
        title: 'Components Overview',
        icon: 'dashboard',
        href: '/documentation/components',
        sub: []
      },
      {
        id: 'doc-components',
        title: 'Component Categories',
        icon: 'widgets',
        href: '#',
        sub: [
          {
            id: 'form-components-doc',
            title: 'Form Components',
            icon: 'edit_note',
            href: '/documentation/components/form-components',
            sub: []
          },
          {
            id: 'modal-components-doc',
            title: 'Modal Components',
            icon: 'web_asset',
            href: '/documentation/components/modal-components',
            sub: []
          },
          {
            id: 'navigation-components-doc',
            title: 'Navigation Components',
            icon: 'navigation',
            href: '/documentation/components/navigation-components',
            sub: []
          },
          {
            id: 'element-components-doc',
            title: 'Element Components',
            icon: 'category',
            href: '/documentation/components/element-components',
            sub: []
          },
          {
            id: 'table-cring-doc',
            title: 'TableCRING',
            icon: 'table_view',
            href: '/documentation/components/table-cring',
            sub: []
          },
          {
            id: 'zod-validation-doc',
            title: 'Zod Validation',
            icon: 'verified',
            href: '/documentation/components/zod-validation',
            sub: []
          },
          {
            id: 'context-providers-doc',
            title: 'Context Providers',
            icon: 'hub',
            href: '/documentation/components/context-providers',
            sub: []
          }
        ]
      },
      {
        id: 'doc-utilities',
        title: 'Utilities',
        icon: 'handyman',
        href: '#',
        sub: [
          {
            id: 'utility-functions-doc',
            title: 'Utility Functions',
            icon: 'functions',
            href: '/documentation/utilities/utility-functions',
            sub: []
          },
          {
            id: 'custom-hooks-doc',
            title: 'Custom Hooks',
            icon: 'extension',
            href: '/documentation/utilities/custom-hooks',
            sub: []
          },
          {
            id: 'helper-functions-doc',
            title: 'Helper Functions (Legacy)',
            icon: 'functions',
            href: '/documentation/utilities/helper-functions',
            sub: []
          }
        ]
      },
      {
        id: 'service-layer-doc',
        title: 'Service Layer',
        icon: 'cloud',
        href: '/documentation/service-layer',
        sub: []
      },
      {
        id: 'components-and-utilities-doc',
        title: 'Components & Utilities (Legacy)',
        icon: 'view_module',
        href: '/documentation/components-and-utilities',
        sub: []
      }
    ]
  },

  // === COOKBOOK (REFERENCE) ===
  {
    isFirst: false,
    id: 'cookbook',
    title: 'Cookbook',
    icon: 'menu_book',
    href: '#',
    sub: [
      {
        id: 'common-patterns',
        title: 'Common Patterns',
        icon: 'content_copy',
        href: '/cookbook/patterns',
        sub: []
      },
      {
        id: 'ui-recipes',
        title: 'UI Recipes',
        icon: 'restaurant',
        href: '/cookbook/ui-recipes',
        sub: []
      },
      {
        id: 'api-recipes',
        title: 'API Recipes',
        icon: 'http',
        href: '/cookbook/api-recipes',
        sub: []
      },
      {
        id: 'utilities-reference',
        title: 'Utilities Reference',
        icon: 'handyman',
        href: '/cookbook/utilities',
        sub: []
      }
    ]
  },

  // === INTERACTIVE TOOLS ===
  {
    isFirst: false,
    id: 'tools',
    title: 'Tools & Playground',
    icon: 'construction',
    href: '#',
    sub: [
      {
        id: 'interactive-playground',
        title: 'Component Playground',
        icon: 'play_circle',
        href: '/tools/interactive-playground',
        sub: []
      },
      {
        id: 'code-generator',
        title: 'Code Generator',
        icon: 'code',
        href: '/tools/code-generator',
        sub: []
      },
      {
        id: 'analytics-dashboard',
        title: 'Analytics Dashboard',
        icon: 'analytics',
        href: '/tools/analytics-dashboard',
        sub: []
      },
      {
        id: 'migration-assistant',
        title: 'Migration Assistant',
        icon: 'transform',
        href: '/tools/migration-assistant',
        sub: []
      }
    ]
  }
];

export default menus;
