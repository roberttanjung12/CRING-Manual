type UseAuthenticationProviderMenuPermissionType =
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

interface UseAuthenticationProviderMenu {
  id: string;
  title: string;
  icon: string;
  href: string;
  permission: UseAuthenticationProviderMenuPermissionType[];
  sub: UseAuthenticationProviderMenu[];
  isNewTab?: boolean;
}

interface UseAuthenticationProviderMenus {
  menus: UseAuthenticationProviderMenu[];
}

export type {
  UseAuthenticationProviderMenuPermissionType,
  UseAuthenticationProviderMenu,
  UseAuthenticationProviderMenus
};
