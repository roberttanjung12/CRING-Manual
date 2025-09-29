import type { ReactNode } from 'react';
import type { TableCellProps } from '@mui/material';
import type { SxProps } from '@mui/system';
import type { TableCRINGActionProps } from './typeAction';
import type { TableCRINGColumnFilterParams, TableCRINGColumnFilters } from './typeFilter';

interface TableCRINGColumnPropIsLoading {
  isLoading?: boolean;
}

interface TableCRINGColumnPropOnClick {
  onClick?: (args: Record<string, any>) => void;
}

interface TableCRINGColumnPropOnFilter {
  onFilter?: (arg: Record<string, any>) => void;
}

interface TableCRINGColumnPropLabel {
  label: string | string[] | ReactNode;
}

interface TableCRINGColumnPropName {
  name: string;
}

interface TableCRINGColumnPropIsOpen {
  isOpen?: boolean;
}

interface TableCRINGColumnPropJoin {
  join?: string;
}

interface TableCRINGColumnPropAbilityEnum {
  sx?: SxProps;
  copy?: boolean;
  currency?: 'Rp' | 'IDR';
}

interface TableCRINGColumnPropAbility {
  ability?: TableCRINGColumnPropAbilityEnum;
}

interface TableCRINGColumnPropHead {
  head?: TableCellProps;
}

interface TableCRINGColumnPropCell {
  cell?: TableCellProps;
}

interface TableCRINGColumnPropContent<T = any> {
  content?: (args: T) => ReactNode;
}

interface TableCRINGPropAction {
  actions?: TableCRINGActionProps[];
}

interface TableCRINGColumnProps<T = any>
  extends TableCRINGColumnPropLabel,
    TableCRINGColumnPropName,
    TableCRINGColumnPropIsOpen,
    TableCRINGColumnPropJoin,
    TableCRINGColumnPropAbility,
    TableCRINGColumnPropHead,
    TableCRINGColumnPropCell,
    TableCRINGColumnPropContent<T>,
    TableCRINGColumnFilters {}

interface TableCRINGColumnJoined<T = any>
  extends TableCRINGColumnPropLabel,
    TableCRINGColumnPropName,
    TableCRINGColumnPropIsOpen,
    TableCRINGColumnPropJoin,
    TableCRINGColumnPropAbility,
    TableCRINGColumnPropHead,
    TableCRINGColumnPropCell,
    TableCRINGColumnPropContent<T>,
    TableCRINGColumnFilters {
  joined?: TableCRINGColumnProps<T>[];
}

interface TableCRINGPropColumns<T = any> {
  columns: TableCRINGColumnProps<T>[];
}

interface TableCRINGExpanded<T = any> {
  expanded?: (data: T) => string | ReactNode;
}

interface TableCRINGPaginationProps {
  current: number;
  limit: number;
  total: number;
  rows: number;
}

interface TableCRINGProps
  extends TableCRINGPropColumns,
    TableCRINGColumnPropIsLoading,
    TableCRINGColumnFilterParams,
    TableCRINGExpanded,
    TableCRINGPropAction,
    TableCRINGColumnPropOnClick,
    TableCRINGColumnPropOnFilter {
  data: Record<string, any>[];
  id?: string;
  pagination?: TableCRINGPaginationProps;
}

export type {
  TableCRINGColumnPropIsLoading,
  TableCRINGColumnPropOnClick,
  TableCRINGColumnPropOnFilter,
  TableCRINGColumnPropLabel,
  TableCRINGColumnPropName,
  TableCRINGColumnPropIsOpen,
  TableCRINGColumnPropJoin,
  TableCRINGColumnPropAbilityEnum,
  TableCRINGColumnPropAbility,
  TableCRINGColumnPropHead,
  TableCRINGColumnPropCell,
  TableCRINGColumnPropContent,
  TableCRINGColumnProps,
  TableCRINGColumnJoined,
  TableCRINGPropColumns,
  TableCRINGExpanded,
  TableCRINGPaginationProps,
  TableCRINGPropAction,
  TableCRINGProps
};
