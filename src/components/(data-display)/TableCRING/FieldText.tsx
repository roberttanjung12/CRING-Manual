import { type HTMLInputTypeAttribute, type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, TextField, Typography } from '@mui/material';
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
  inputType?: HTMLInputTypeAttribute;
}

const P2PMerchantCustomerFormFieldText = ({
  total,
  name,
  label,
  inputType = 'text',
  onSubmit
}: Props): Readonly<ReactNode> => {
  const { control } = useFormContext<UseTableCRINGColumnFilterValues>();

  return (
    <Box data-testid="P2PMerchantCustomerFormFieldText">
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
            <TextField
              fullWidth
              id={`field--${name}`}
              name={`field--${name}`}
              type={inputType}
              autoFocus
              value={value}
              placeholder={`Masukkan ${typeof label === 'string' ? label : ''}`}
              onChange={onChange}
              onKeyUp={event => {
                if (total === 1 && event.key === 'Enter') onSubmit();
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default P2PMerchantCustomerFormFieldText;
