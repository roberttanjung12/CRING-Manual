'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { useDispatch } from '@/store/hooks';
import { redirectSidebar } from '@/store/slice/appearance';
import type { NavigationWrapperProps } from './navigation-types';

/**
 * A wrapper component for navigation links in the sidebar.
 *
 * - If `hasChildren` is false, renders a `Link` component with the provided `href` and `children`.
 * - If `hasChildren` is true, renders only the `children` without a link.
 * - Supports opening the link in a new tab via the `isNewTab` prop.
 *
 * @param hasChildren - Determines if the component should render only its children or wrap them in a link.
 * @param href - The URL to navigate to when the link is clicked. Defaults to '/' if not provided.
 * @param children - The content to be rendered inside the wrapper.
 * @param isNewTab - If true, the link will open in a new browser tab. Defaults to false.
 *
 * @returns {React.JSX}
 */
const NavigationWrapper = ({
  hasChildren,
  href,
  children,
  isNewTab = false
}: NavigationWrapperProps): Readonly<ReactNode> => {
  const dispatch = useDispatch();

  return !hasChildren ? (
    <Link
      passHref
      as={href || '/'}
      href={href || '/'}
      target={isNewTab ? '_blank' : '_self'}
      style={{ textDecoration: 'none' }}
      onClick={() => dispatch(redirectSidebar())}
    >
      <>{children}</>
    </Link>
  ) : (
    <>{children}</>
  );
};

export default NavigationWrapper;
