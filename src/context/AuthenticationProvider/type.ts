import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { UseAuthenticationProviderMenus } from './hooks/useMenu/type';

interface AuthenticationProviderType {
  type: 'public' | 'authenticated' | 'unauthenticated';
}

interface AuthenticationProvider {
  ID: string;
  IDMitra: string;
  username: string;
  email: string;
  name: string;
  role: string;
  actor: '' | 'SPE' | 'Reseller' | 'Merchant';
  merchantName: string;
}

interface UseAuthenticationProviderIsLoading {
  isLoading: boolean;
}

interface UseAuthenticationProviderCalling {
  calling: boolean;
}

interface UseAuthenticationProviderOnLogin {
  onLogin: (newUser?: AuthenticationProvider) => void;
}

interface UseAuthenticationProviderOnLogout {
  onLogout: () => Promise<void>;
}

interface UseAuthenticationProvider
  extends UseAuthenticationProviderIsLoading,
    UseAuthenticationProviderOnLogin,
    UseAuthenticationProviderOnLogout {
  user: AuthenticationProvider;
}

interface UseAuthenticationProviderReturns extends UseAuthenticationProvider, UseAuthenticationProviderCalling {
  setup: () => void;
  onCalling: Dispatch<SetStateAction<boolean>>;
}

interface AuthenticationProviderContext
  extends AuthenticationProvider,
    UseAuthenticationProviderMenus,
    UseAuthenticationProviderOnLogin,
    UseAuthenticationProviderOnLogout {}

interface AuthenticationProviderProps extends AuthenticationProviderType {
  children: Readonly<ReactNode>;
}

export type {
  AuthenticationProviderType,
  AuthenticationProvider,
  UseAuthenticationProviderIsLoading,
  UseAuthenticationProviderCalling,
  UseAuthenticationProviderOnLogin,
  UseAuthenticationProviderOnLogout,
  UseAuthenticationProvider,
  UseAuthenticationProviderReturns,
  AuthenticationProviderContext,
  AuthenticationProviderProps
};
