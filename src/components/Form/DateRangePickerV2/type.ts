import type { Range } from 'react-date-range';

type TypeDateRangePickerV2VariantType =
  | ''
  | 'today'
  | 'yesterday'
  | 'this-week'
  | 'this-month'
  | 'last-month'
  | 'per-day'
  | 'per-week'
  | 'per-month'
  | 'choose';

type TypeDateRangePickerV2VariantValue = {
  start: Date;
  end: Date;
};

type TypeDateRangePickerV2PropValue = {
  type: TypeDateRangePickerV2VariantType;
  start?: Date;
  end?: Date;
};

interface TypeDateRangePickerV2Prop {
  defaultValue?: TypeDateRangePickerV2PropValue;
  id?: string;
  disabled?: boolean;
  value?: TypeDateRangePickerV2PropValue;
  onChange?: (newValue?: TypeDateRangePickerV2PropValue) => void;
}

interface TypeDateRangePickerV2Variant {
  type: TypeDateRangePickerV2VariantType;
  kind: 'quick' | 'pick';
  label: string;
  quick?: {
    value: TypeDateRangePickerV2VariantValue;
    label: string;
  };
}

interface TypeDateRangePickerV2ReturnRenderValue {
  type?: string;
  date?: string;
}

interface TypeDateRangePickerV2 {
  isDisabled: boolean;
  isOpen: boolean;
  isPick: boolean;
  selectedType: TypeDateRangePickerV2VariantType;
  selectedRanges: Range;
  renderValue: TypeDateRangePickerV2ReturnRenderValue;
  variant: {
    quick: Array<TypeDateRangePickerV2Variant>;
    pick: Array<TypeDateRangePickerV2Variant>;
  };
  setup: () => void;
  onOpen: () => void;
  onClose: () => void;
  onChangeQuick: (newType: TypeDateRangePickerV2VariantType, newValue?: TypeDateRangePickerV2VariantValue) => void;
  onChangePick: (newSelection: Range) => void;
  onNewChange: () => void;
}

export type {
  TypeDateRangePickerV2VariantType,
  TypeDateRangePickerV2VariantValue,
  TypeDateRangePickerV2PropValue,
  TypeDateRangePickerV2Prop,
  TypeDateRangePickerV2Variant,
  TypeDateRangePickerV2ReturnRenderValue,
  TypeDateRangePickerV2
};

export default TypeDateRangePickerV2;
