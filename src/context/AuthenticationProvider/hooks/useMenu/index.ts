import { useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';
import onGetUserMenu, { type GetUserMenu } from '@/services/partials/user/getUserMenu';
import { getValidAccessToken } from '@/utility/local-storage';
import type { UseAuthenticationProviderMenu, UseAuthenticationProviderMenus } from './type';
import type { AuthenticationProviderType, UseAuthenticationProviderCalling } from '../../type';

interface Props extends AuthenticationProviderType, UseAuthenticationProviderCalling {}

const useAuthenticationProviderMenu = ({ type, calling }: Props): Readonly<UseAuthenticationProviderMenus> => {
  const getToken = getValidAccessToken();

  const { data } = useSWRImmutable(calling && type === 'authenticated' && getToken && '/menus', () =>
    onGetUserMenu(getToken ?? undefined)
  );

  const menus = useMemo<UseAuthenticationProviderMenu[]>(() => {
    if (data?.status !== 200 || !Array.isArray(data?.data)) return [];

    const mapMenu = (item: GetUserMenu): UseAuthenticationProviderMenu => ({
      id: item.id,
      title: item.title,
      icon: item.icon,
      href: !item.isNewTab ? item.route : `${process.env.NEXT_PUBLIC_BASE_PORTAL_TRANSFER}${item.route}`,
      permission: item.permission,
      sub: Array.isArray(item.children) ? item.children.map(mapMenu) : [],
      isNewTab: item.isNewTab
    });

    return data.data.map(mapMenu);
  }, [data?.data, data?.status]);

  return { menus };
};

export default useAuthenticationProviderMenu;
