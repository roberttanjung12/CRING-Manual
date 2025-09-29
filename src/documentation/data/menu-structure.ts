import type { DocumentationSection } from '@/documentation/types';

/**
 * Struktur menu dokumentasi handover aplikasi CRING!
 * Updated untuk menyelaraskan dengan struktur dokumentasi modular yang baru
 * Diurutkan dari yang harus diketahui hingga advanced topics
 */
export const documentationMenuStructure: DocumentationSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Panduan dasar untuk memulai development di aplikasi CRING!',
    href: '/documentation/getting-started',
    icon: 'rocket_launch'
  },
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    description: 'Konsep fundamental yang harus dipahami',
    href: '/documentation/fundamentals',
    icon: 'school'
  },
  {
    id: 'components',
    title: 'Components Documentation',
    description: 'Dokumentasi lengkap semua komponen aplikasi CRING',
    href: '/documentation/components',
    icon: 'widgets',
    children: [
      {
        id: 'components-overview',
        title: 'Components Overview',
        description: 'Ringkasan dan navigasi ke semua kategori komponen',
        href: '/documentation/components'
      },
      {
        id: 'form-components',
        title: 'Form Components',
        description: 'ButtonSubmit, AutoAsync, DateRangePicker, react-hook-form components',
        href: '/documentation/components/form-components'
      },
      {
        id: 'modal-components',
        title: 'Modal Components',
        description: 'OTPConfirmation, Detail, Confirmation modals',
        href: '/documentation/components/modal-components'
      },
      {
        id: 'navigation-components',
        title: 'Navigation Components',
        description: 'NavigationTabs, ButtonTo, routing integration',
        href: '/documentation/components/navigation-components'
      },
      {
        id: 'element-components',
        title: 'Element Components',
        description: 'SkeletonCRING, ButtonDownload, Indicator, wrapper components',
        href: '/documentation/components/element-components'
      },
      {
        id: 'table-cring',
        title: 'TableCRING',
        description: 'Komponen tabel utama dengan filtering & pagination',
        href: '/documentation/components/table-cring'
      },
      {
        id: 'zod-validation',
        title: 'Zod Validation',
        description: 'TypeScript validation dengan Zod (mengganti Yup)',
        href: '/documentation/components/zod-validation'
      },
      {
        id: 'context-providers',
        title: 'Context Providers',
        description: 'Context patterns untuk state management',
        href: '/documentation/components/context-providers'
      }
    ]
  },
  {
    id: 'utilities',
    title: 'Utilities Documentation',
    description: 'Dokumentasi lengkap semua utility functions dan custom hooks',
    href: '/documentation/utilities',
    icon: 'handyman',
    children: [
      {
        id: 'utility-functions',
        title: 'Utility Functions',
        description: 'Helper functions, formatters, validators, dan utilities',
        href: '/documentation/utilities/utility-functions'
      },
      {
        id: 'custom-hooks',
        title: 'Custom Hooks',
        description: 'useFilter, useFileUpload, dan custom hooks lainnya',
        href: '/documentation/utilities/custom-hooks'
      },
      {
        id: 'helper-functions-legacy',
        title: 'Helper Functions (Legacy)',
        description: 'Legacy helper functions documentation',
        href: '/documentation/utilities/helper-functions'
      }
    ]
  },
  {
    id: 'service-layer',
    title: 'Service Layer',
    description: 'API services, authentication, dan data management architecture',
    href: '/documentation/service-layer',
    icon: 'cloud'
  },
  {
    id: 'legacy',
    title: 'Legacy Documentation',
    description: 'Dokumentasi lama untuk referensi dan transisi',
    href: '/documentation/components-and-utilities',
    icon: 'archive',
    children: [
      {
        id: 'components-and-utilities',
        title: 'Components & Utilities (Legacy)',
        description: 'Dokumentasi komprehensif lama - gunakan dokumentasi modular yang baru',
        href: '/documentation/components-and-utilities'
      }
    ]
  }
];

export default documentationMenuStructure;
