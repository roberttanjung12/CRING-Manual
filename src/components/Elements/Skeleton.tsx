import { type ReactNode } from 'react';

interface Props {
  isLoading: boolean;
  skeleton: Readonly<ReactNode>;
  children: Readonly<ReactNode>;
}

/**
 * A component that's designed for show skeleton cring ui
 *
 * @returns {React.JSX} skeleton ui
 */
const SkeletonCRING = ({ isLoading, skeleton, children }: Props): Readonly<ReactNode> => {
  const renderLoading = (): Readonly<ReactNode> => skeleton;
  const renderContent = (): Readonly<ReactNode> => children;

  return isLoading ? renderLoading() : renderContent();
};

export default SkeletonCRING!;
