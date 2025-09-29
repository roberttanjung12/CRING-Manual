import type { ReactNode } from 'react';

type TypeNavigationTabsItem = {
  id: string;
  label: string;
  content: Readonly<ReactNode>;
  isClose?: boolean;
};

interface TypeNavigationTabsPropRightChild {
  content?: ReactNode | string;
}

interface TypeNavigationTabsProps {
  tabs: Array<TypeNavigationTabsItem>;
  tab: string;
  onChange: (newTab: string) => void;
  isHideHead?: boolean;
  right?: TypeNavigationTabsPropRightChild;
}

export type { TypeNavigationTabsPropRightChild, TypeNavigationTabsItem, TypeNavigationTabsProps };
