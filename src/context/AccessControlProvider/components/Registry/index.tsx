'use client';

import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { useAccessControl, useAccessControlConfig } from '../..';

const RegistryContext = createContext({ path: '' });

interface Type {
  path: string | null;
  children: ReactNode;
  permission?: string;
  onError?: () => void;
}

/**
 * A component that's designed for showing registry access-control.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @param {Object} prop list of prop
 * @param {String} prop.path path of the page and also will be treated as action in casl
 * @param {React.JSX} prop.children main content
 *
 * @returns {React.JSX}
 */
const Registry = ({ children, onError, path = null, permission = 'page' }: Type): Readonly<ReactNode> => {
  const { hasChecked } = useAccessControlConfig();

  const accessControl = useAccessControl();

  if (typeof accessControl?.can !== 'function') {
    throw new Error('Registry should be wrapped by AccessControlProvider');
  }

  const status = useMemo(() => {
    let set: 'checking' | 'allowed' | 'denied' = 'checking';

    if (path) set = accessControl.can(path, permission) ? 'allowed' : 'denied';

    return set;
  }, [accessControl, path, permission]);

  useEffect(() => {
    if (typeof onError === 'function' && hasChecked && status === 'denied') onError();
  }, [status, onError, hasChecked]);

  return <RegistryContext.Provider value={{ path: path ?? '' }}>{children}</RegistryContext.Provider>;
};

const useRegistry = () => useContext(RegistryContext);

export { useRegistry, Registry };

export default Registry;
