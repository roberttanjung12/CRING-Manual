'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import useSWR, { useSWRConfig } from 'swr';
import { instance } from '@/services';
import onAddLogout from '@/services/partials/user/addLogout';
import onGetUserMe from '@/services/partials/user/getUserMe';
import { getValidAccessToken, removeLocalStorage, setLocalStorage } from '@/utility/local-storage';
import dataAuthenticationProvider from './data';
import type { AuthenticationProvider, AuthenticationProviderType, UseAuthenticationProviderReturns } from './type';

const useAuthenticationProvider = ({
  type
}: AuthenticationProviderType): Readonly<UseAuthenticationProviderReturns> => {
  const getToken = getValidAccessToken();

  const { cache } = useSWRConfig();

  const [calling, setCalling] = useState(false);

  const [user, setUser] = useState<AuthenticationProvider>(dataAuthenticationProvider);

  const { push, replace } = useRouter();

  const onDestroy = useCallback(() => {
    cache.delete('/authentication');
    cache.delete('/menus');
    removeLocalStorage(['CRING_AUTH', 'CRING_BLOCKER']);
  }, [cache]);

  const { isLoading } = useSWR(
    calling && instance.defaults.headers.common['X-Menu'] && getToken ? '/authentication' : null,
    () => onGetUserMe(getValidAccessToken() ?? undefined),
    {
      onSuccess(data) {
        if (data.status === 200 && data.data.id) {
          const decodeToken: { clientName: string } = jwtDecode(getToken ?? '');

          setUser({
            ID: data.data.id,
            IDMitra: data.data.client_id,
            username: data.data.username,
            email: data.data.email,
            name: data.data.fullname,
            role: data.data.role.name,
            actor: data.data.actor,
            merchantName: decodeToken.clientName
          });

          if (type === 'unauthenticated') replace('/home');
        }
      },
      onError: () => {
        onDestroy();

        if (type === 'authenticated') replace('/');
      }
    }
  );

  const onLogin = useCallback((newUser?: AuthenticationProvider) => newUser?.ID && setUser(newUser), []);

  const onLogout = useCallback(async () => {
    await onAddLogout({ accessToken: getToken ?? '' }, () => {
      onDestroy();
      push('/');
    });

    onDestroy();
    push('/');
  }, [getToken, onDestroy, push]);

  const setup = useCallback(() => {
    if (!getToken && type === 'authenticated') {
      setLocalStorage('CRING_LAST_PAGE', window.location.href);
      replace('/');
    }
  }, [getToken, replace, type]);

  return { isLoading, calling, user, onLogin, onLogout, setup, onCalling: setCalling };
};

export default useAuthenticationProvider;
