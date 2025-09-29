import type { ReactNode } from 'react';
import type { AbilityTuple, MongoAbility, MongoQuery } from '@casl/ability';

interface AccessControlProviderHookProp {
  from: {
    service?: () => Promise<{ data: Array<{ [key: string]: any }> }>;
    static?: Array<{ [key: string]: any }>;
  };
  shape: {
    path: string;
    permission: string;
    children?: string;
  };
}

interface AccessControlProviderHookDefine {
  action: string;
  subject: Array<string>;
}

interface AccessControlProviderHookHasChecked {
  hasChecked: boolean;
}

interface AccessControlProviderHookReturn extends AccessControlProviderHookHasChecked {
  accessControl: MongoAbility<AbilityTuple, MongoQuery>;
}

interface AccessControlProviderProp extends AccessControlProviderHookProp {
  children: ReactNode;
}

export type {
  AccessControlProviderHookProp,
  AccessControlProviderHookDefine,
  AccessControlProviderHookHasChecked,
  AccessControlProviderHookReturn,
  AccessControlProviderProp
};

export default AccessControlProviderProp;
