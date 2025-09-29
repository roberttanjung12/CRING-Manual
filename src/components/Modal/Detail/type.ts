import type { ReactNode } from 'react';

interface TypeModalDetailItemConfigChild {
  type: 'text' | 'date' | 'status' | 'json' | 'currency' | 'textarea' | 'indicator' | 'custom';
  indicator?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

interface TypeModalDetailItemGridChild {
  lg: number;
  xs: number;
}

interface TypeModalDetailShareSosmedEnum {
  path: string;
  title: string;
}

interface TypeModalDetailShareEnum {
  copy?: TypeModalDetailShareSosmedEnum;
  telegram?: TypeModalDetailShareSosmedEnum;
  teams?: TypeModalDetailShareSosmedEnum;
  whatsapp?: TypeModalDetailShareSosmedEnum;
}

interface TypeModalDetailShare {
  share?: TypeModalDetailShareEnum;
}

interface TypeModalDetailItem {
  key: string;
  label: string;
  value: any;
  config: TypeModalDetailItemConfigChild;
  isHide?: boolean;
  isHidden?: boolean;
  side?: 'left' | 'right';
  grid?: TypeModalDetailItemGridChild;
}

interface TypeModalDetailProps extends TypeModalDetailShare {
  isLoading: boolean;
  isShow: boolean;
  title: string;
  list: TypeModalDetailItem[];
  mode?: 'style-1' | 'style-2';
  children?: ReactNode;
  onClose?: () => void;
}

export type {
  TypeModalDetailShareSosmedEnum,
  TypeModalDetailShareEnum,
  TypeModalDetailShare,
  TypeModalDetailItem,
  TypeModalDetailProps
};

export default TypeModalDetailProps;
