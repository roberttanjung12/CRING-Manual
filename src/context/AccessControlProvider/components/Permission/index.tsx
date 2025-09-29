'use client';

import { useMemo, type ReactNode } from 'react';
import type { TypePermissionProp } from './type';
import { CanContext } from '../..';
import { useRegistry } from '../Registry';
import usePermission from './hook';

/**
 * A component that's designed for showing casl enabler.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const Permission = ({ on, path, children }: TypePermissionProp): Readonly<ReactNode> => {
  const { path: pathRegis } = useRegistry();

  const newPath = useMemo<string>(() => path ?? pathRegis, [path, pathRegis]);

  if (!pathRegis.length) {
    throw new Error('Permission should be wrapped by Registry and the Path property should be filled');
  }

  return (
    <CanContext I={newPath} this={on as any}>
      {children}
    </CanContext>
  );
};

export { Permission, usePermission };

export default Permission;
