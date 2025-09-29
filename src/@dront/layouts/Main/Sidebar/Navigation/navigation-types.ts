import type { ReactNode } from 'react';

interface NavigationItemHref {
  href: string;
}

interface NavigationItemIsNewTab {
  isNewTab?: boolean;
}

interface NavigationItem extends NavigationItemHref, NavigationItemIsNewTab {
  id: string;
  title: string;
  icon: string;
  sub: NavigationItem[];
}

interface NavigationProps extends NavigationItem {
  isFirst: boolean;
}

interface NavigationWrapperProps extends NavigationItemHref, NavigationItemIsNewTab {
  hasChildren: boolean;
  children: Readonly<ReactNode>;
}

export type { NavigationItemHref, NavigationItemIsNewTab, NavigationItem, NavigationProps, NavigationWrapperProps };
