import type { UseFilterOnFilterGo } from '@/hooks/useFilter';
import type { AutocompleteAsyncProps } from '../AutocompleteAsync/type';

interface FilterAutocompleteAsyncProps extends UseFilterOnFilterGo {
  label: string;
  service: AutocompleteAsyncProps['service'];
  shapes: AutocompleteAsyncProps['shapes'];
  query: string;
  isOpen?: boolean;
  disabled?: boolean;
  id?: string;
  params?: { [key: string]: any };
}

export type { FilterAutocompleteAsyncProps };
