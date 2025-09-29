import type { HTMLInputTypeAttribute, ReactNode } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import type { AutocompleteAsyncProps } from '@/components/(input)/AutocompleteAsync/type';
import type { Option } from '@/types/option';
import type { TableCRINGColumnPropName, TableCRINGColumnPropOnFilter } from './type';

interface TableCRINGColumnFilterIsOpen {
  isOpen: boolean;
}

interface TableCRINGColumnFilterIDFrom {
  idFrom: string;
}

interface TableCRINGColumnFilterNameFrom {
  nameFrom: TableCRINGColumnPropName['name'];
}

interface TableCRINGColumnFilterItemName {
  name: string;
}

interface TableCRINGColumnFilterItemQuery {
  query: string;
}

interface TableCRINGColumnFilterItemLabel {
  label?: string | string[] | ReactNode;
}

interface TableCRINGColumnFilterItemParamEnum {
  key: string;
  value: string | { from: string };
}

interface TableCRINGColumnFilterItemResetEnum {
  key: string;
  value: string;
}

interface TableCRINGColumnFilterItemDateEnum {
  format?: string;
  minDate?: Date;
  maxDate?: Date;
}

interface TableCRINGColumnFilterItemDate {
  date?: TableCRINGColumnFilterItemDateEnum;
}

interface TableCRINGColumnFilterItemBase
  extends TableCRINGColumnFilterItemName,
    TableCRINGColumnFilterItemQuery,
    TableCRINGColumnFilterItemLabel {
  nameFrom?: TableCRINGColumnPropName['name'];
  params?: TableCRINGColumnFilterItemParamEnum | TableCRINGColumnFilterItemParamEnum[];
  resets?: string | string[] | TableCRINGColumnFilterItemResetEnum | TableCRINGColumnFilterItemResetEnum[];
}

type TableCRINGColumnFilterItem =
  | (Omit<TableCRINGColumnFilterItemBase, 'type' | 'inputType'> & {
      type: 'text';
      inputType?: HTMLInputTypeAttribute;
    })
  | (Omit<TableCRINGColumnFilterItemBase, 'type' | 'options'> & {
      type: 'select';
      options: Option<string, string>[];
    })
  | (Omit<TableCRINGColumnFilterItemBase, 'type' | 'autocomplete'> & {
      type: 'autocomplete';
      autocomplete: AutocompleteAsyncProps;
    })
  | (Omit<TableCRINGColumnFilterItemBase, 'type' | 'date'> & {
      type: 'date' | 'date-range';
      date?: TableCRINGColumnFilterItemDateEnum;
    });

interface TableCRINGColumnFilters {
  filters?: TableCRINGColumnFilterItem[];
}

interface TableCRINGColumnFilterParams {
  params?: { [key: string]: any };
}

interface UseTableCRINGColumnFilterValues extends FieldValues {
  [key: string]: any;
}

interface TableCRINGColumnFilterOnOpen {
  onOpen: (args: { status: boolean; idFrom?: string; nameFrom?: string }) => void;
}

interface UseTableCRINGColumnFilterOnSubmit {
  onSubmit: (value?: UseTableCRINGColumnFilterValues) => void;
}

interface UseTableCRINGColumnFilter
  extends TableCRINGColumnFilterIsOpen,
    TableCRINGColumnFilterIDFrom,
    TableCRINGColumnFilterNameFrom,
    TableCRINGColumnFilterOnOpen,
    UseTableCRINGColumnFilterOnSubmit {
  method: UseFormReturn<UseTableCRINGColumnFilterValues>;
}

interface UseTableCRINGColumnFilterProps
  extends TableCRINGColumnFilters,
    TableCRINGColumnFilterParams,
    TableCRINGColumnPropOnFilter {}

interface TableCRINGColumnFilterProps
  extends TableCRINGColumnFilterIsOpen,
    TableCRINGColumnFilterIDFrom,
    TableCRINGColumnFilters,
    UseTableCRINGColumnFilterOnSubmit {
  id: string;
}

export type {
  TableCRINGColumnFilterIsOpen,
  TableCRINGColumnFilterIDFrom,
  TableCRINGColumnFilterNameFrom,
  TableCRINGColumnFilterItemName,
  TableCRINGColumnFilterItemQuery,
  TableCRINGColumnFilterItemLabel,
  TableCRINGColumnFilterItem,
  TableCRINGColumnFilterItemDateEnum,
  TableCRINGColumnFilterItemDate,
  TableCRINGColumnFilters,
  TableCRINGColumnFilterParams,
  UseTableCRINGColumnFilterValues,
  TableCRINGColumnFilterOnOpen,
  UseTableCRINGColumnFilterOnSubmit,
  UseTableCRINGColumnFilter,
  UseTableCRINGColumnFilterProps,
  TableCRINGColumnFilterProps
};
