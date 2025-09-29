import { onGet } from '@/services';

type GetUserMenuPermissionType =
  | 'View'
  | 'Create'
  | 'Update'
  | 'Delete'
  | 'Download'
  | 'Send'
  | 'List User'
  | 'Force Debit'
  | 'Active/Inactive'
  | 'Resolve/Ignore';

interface GetUserMenu {
  isNewTab: boolean;
  id: string;
  title: string;
  route: string;
  icon: string;
  permission: GetUserMenuPermissionType[];
  children: GetUserMenu[];
}

const onGetUserMenu = (token?: string) => onGet<any, GetUserMenu[]>('/menus/user', { token });

export type { GetUserMenuPermissionType, GetUserMenu };

export default onGetUserMenu;
