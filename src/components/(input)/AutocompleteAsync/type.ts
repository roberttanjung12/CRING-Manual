import type { TextFieldProps } from '@mui/material';

interface AutocompleteAsyncShape {
  [key: string]: any;
  field: string;
  from: null | string;
}

interface AutocompleteAsyncDisabledOpt {
  [key: string]: any;
  field: string;
  value: string;
}

interface AutocompleteAsyncProps {
  shapes: AutocompleteAsyncShape[];
  service: {
    endpoint: string;
    keyword: string[];
    params?: { [key: string]: any };
  };
  isReset?: boolean;
  id?: string;
  disabled?: boolean;
  disableOpt?: AutocompleteAsyncDisabledOpt[];
  value?: { [key: string]: any };
  error?: boolean;
  placeholder?: string;
  sx?: TextFieldProps['sx'];
  onBlur?: () => void;
  onChange?: (value: { [key: string]: any } | null) => void;
}

export type { AutocompleteAsyncShape, AutocompleteAsyncDisabledOpt, AutocompleteAsyncProps };
