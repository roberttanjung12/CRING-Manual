export interface DocumentationSection {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: string;
  children?: DocumentationSection[];
}

export interface CodeExampleProps {
  title: string;
  description?: string;
  code: string;
  language?: 'tsx' | 'ts' | 'js' | 'json' | 'bash' | 'text' | 'typescript';
  showCopy?: boolean;
  expandable?: boolean;
}

export interface NavigationGuideProps {
  currentSection: string;
  previousSection?: {
    title: string;
    href: string;
  };
  nextSection?: {
    title: string;
    href: string;
  };
}

export interface DocumentationPageProps {
  title: string;
  description: string;
  sections: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
  codeExamples?: CodeExampleProps[];
  relatedLinks?: {
    title: string;
    href: string;
    description: string;
  }[];
}
