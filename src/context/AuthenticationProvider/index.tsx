'use client';

import { type ReactNode, createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import ShortUniqueId from 'short-unique-id';
import { axiosInstance } from '@/configs/axios';
import { instance } from '@/services';
import dataAuthenticationProvider from './data';
import useAuthenticationProviderHook from './hook';
import useAuthenticationProviderMenu from './hooks/useMenu';
import AuthenticationProviderLoading from './loading';
import type {
  AuthenticationProviderContext as AuthenticationProviderContextProps,
  AuthenticationProviderProps
} from './type';

const AuthenticationProviderContext = createContext<AuthenticationProviderContextProps>({
  ...dataAuthenticationProvider,
  menus: [],
  onLogin: () => {},
  onLogout: async () => {}
});

const useAuthenticationProvider = () => useContext(AuthenticationProviderContext);

/**
 * Provides authentication context to its children, including user data, authentication actions,
 * and dynamic menus based on the authentication type.
 *
 * @param {AuthenticationProviderProps} props - The props for the provider.
 * @param {'type'} props.type - The type of authentication to use.
 * @param {ReactNode} props.children - The child components that will have access to the authentication context.
 *
 * @returns {React.JSX} The provider wrapping its children with authentication context.
 *
 * @remarks
 * This component initializes authentication state and exposes login, logout, and menu data
 * to its descendants via context. It also displays a loading indicator while authentication state is being resolved.
 */
const AuthenticationProvider = ({ type, children }: AuthenticationProviderProps): Readonly<ReactNode> => {
  const pathname = usePathname();

  const { randomUUID } = new ShortUniqueId({ length: 36 });

  const randomId = randomUUID();

  const { isLoading, calling, user, onLogin, onLogout, setup, onCalling } = useAuthenticationProviderHook({ type });

  const { menus } = useAuthenticationProviderMenu({ type, calling });

  const value = useMemo(() => ({ ...user, menus, onLogin, onLogout }), [menus, onLogin, onLogout, user]);

  const onClick = useCallback(() => {
    const correlationId = `${window.location.origin}${pathname}?correlation-id=${randomId}`;

    axiosInstance.defaults.headers.common['X-Menu'] = correlationId;
    instance.defaults.headers.common['X-Menu'] = correlationId;
  }, [pathname, randomId]);

  useEffect(() => {
    const correlationId = `${window.location.origin}${pathname}?correlation-id=${randomId}`;

    axiosInstance.defaults.headers.common['X-Menu'] = correlationId;
    instance.defaults.headers.common['X-Menu'] = correlationId;

    onCalling(true);

    setup();

    window.addEventListener('click', onClick);
  }, [onCalling, onClick, pathname, randomId, setup]);

  useEffect(() => {
    return () => {
      onCalling(false);
      window.removeEventListener('click', onClick);
    };
  }, [onCalling, onClick]);

  return (
    <AuthenticationProviderContext.Provider value={value}>
      <>{children}</>
      <AuthenticationProviderLoading isLoading={isLoading} />
    </AuthenticationProviderContext.Provider>
  );
};

export { useAuthenticationProvider };

export default AuthenticationProvider;
