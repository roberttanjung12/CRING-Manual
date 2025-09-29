import { type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import type { Option } from '@/types/option';
import selectedText from '@/utility/selected-text';
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
  options: Option<string, string>[];
}

const P2PMerchantCustomerFormFieldSelect = ({ total, name, label, options, onSubmit }: Props): Readonly<ReactNode> => {
  const { control } = useFormContext<UseTableCRINGColumnFilterValues>();

  return (
    <Box data-testid="P2PMerchantCustomerFormFieldSelect">
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
            <Select
              displayEmpty
              fullWidth
              id={`field--${name}`}
              name={`field--${name}`}
              value={value}
              renderValue={(selected?: string) => selectedText(selected, options)}
              onChange={event => (total > 1 ? onChange(event.target.value) : onSubmit({ [name]: event.target.value }))}
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </Box>
    </Box>
  );
};

export default P2PMerchantCustomerFormFieldSelect;
