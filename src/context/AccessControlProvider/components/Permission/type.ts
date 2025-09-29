import type { ReactNode } from 'react';

interface TypePermission {
  on: string;
  path?: string;
}

interface TypePermissionProp extends TypePermission {
  children: ReactNode;
}

interface TypePermissionHookOnAllowProp extends TypePermission {
  callback: () => void;
}

interface TypePermissionHook {
  isAllow: (args: TypePermission) => boolean;
  onAllow: (args: TypePermissionHookOnAllowProp) => void;
}

export type { TypePermission, TypePermissionProp, TypePermissionHookOnAllowProp, TypePermissionHook };

export default TypePermission;
