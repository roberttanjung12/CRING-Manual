import { type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import AutocompleteAsync from '@/components/(input)/AutocompleteAsync';
import type { AutocompleteAsyncProps } from '@/components/(input)/AutocompleteAsync/type';
import type {
  TableCRINGColumnFilterItemLabel,
  TableCRINGColumnFilterItemName,
  UseTableCRINGColumnFilterOnSubmit,
  UseTableCRINGColumnFilterValues
} from './typeFilter';

interface Props
  extends TableCRINGColumnFilterItemName,
    TableCRINGColumnFilterItemLabel,
    UseTableCRINGColumnFilterOnSubmit {
  total: number;
  autocomplete: AutocompleteAsyncProps;
}

const P2PMerchantCustomerFormFieldAutocomplete = ({
  total,
  name,
  label,
  autocomplete,
  onSubmit
}: Props): Readonly<ReactNode> => {
  const { control } = useFormContext<UseTableCRINGColumnFilterValues>();

  return (
    <Box data-testid="P2PMerchantCustomerFormFieldAutocomplete">
      {total > 1 && (
        <Typography component="label" fontWeight={600} sx={{ color: ({ palette }) => palette.grey.A200 }} mb={2}>
          {label}
        </Typography>
      )}
      <Box>
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <AutocompleteAsync
              id={`field--${name}`}
              disabled={autocomplete.disabled}
              service={autocomplete.service}
              shapes={autocomplete.shapes}
              value={value}
              placeholder={`-Pilih ${typeof label === 'string' ? label : ''}-`}
              onChange={newValue => {
                const setValue: Record<string, any> = {};

                autocomplete.shapes.forEach(shape => {
                  Object.assign(setValue, { [shape.field]: newValue?.[shape.field] ?? '' });
                });

                if (total > 1) onChange(setValue);
                else onSubmit({ [name]: setValue });
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default P2PMerchantCustomerFormFieldAutocomplete;
