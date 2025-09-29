'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { createMongoAbility } from '@casl/ability';
import { createContextualCan } from '@casl/react';
import useAccessControlProvider from './hook';
import type {
  AccessControlProviderHookHasChecked,
  AccessControlProviderHookReturn,
  AccessControlProviderProp
} from './type';

const AccessControlProviderConfigContext = createContext<AccessControlProviderHookHasChecked>({
  hasChecked: false
});

const AbilityContext = createContext<AccessControlProviderHookReturn['accessControl']>(createMongoAbility());

const CanContext = createContextualCan(AbilityContext.Consumer);

/**
 * A provider that's used for managing access-control.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @param {Object} prop list of prop
 * @param {Object} prop.from where the data comes from
 * @param {Function} [prop.from.service] where the data comes from service
 * @param {Array} [prop.from.static] where the data comes from static
 * @param {Object} prop.shape list of data define data
 * @param {String} prop.shape.path get action from define data
 * @param {String} prop.shape.permission get subject from define data
 * @param {String} prop.shape.children repeat define data if the data has children
 * @param {React.JSX} prop.children main of content
 *
 * @returns {React.JSX}
 */
const AccessControlProvider = ({ from, shape, children }: AccessControlProviderProp): Readonly<ReactNode> => {
  const { hasChecked, accessControl } = useAccessControlProvider({ from, shape });

  return (
    <AccessControlProviderConfigContext.Provider value={{ hasChecked }}>
      <AbilityContext.Provider value={accessControl}>{children}</AbilityContext.Provider>
    </AccessControlProviderConfigContext.Provider>
  );
};

const useAccessControlConfig = () => useContext(AccessControlProviderConfigContext);

const useAccessControl = () => useContext(AbilityContext);

export { AccessControlProvider, useAccessControlConfig, useAccessControl, CanContext };

export default AccessControlProvider;
