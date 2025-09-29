import { type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import FormDatePicker from '@/components/Form/DatePicker';
import type {
  TableCRINGColumnFilterItemDate,
  TableCRINGColumnFilterItemLabel,
  TableCRINGColumnFilterItemName,
  UseTableCRINGColumnFilterOnSubmit,
  UseTableCRINGColumnFilterValues
} from './typeFilter';

interface Props
  extends TableCRINGColumnFilterItemName,
    TableCRINGColumnFilterItemLabel,
    TableCRINGColumnFilterItemDate,
    UseTableCRINGColumnFilterOnSubmit {
  total: number;
}

const P2PMerchantCustomerFormFieldDate = ({ total, name, label, date, onSubmit }: Props): Readonly<ReactNode> => {
  const { control } = useFormContext<UseTableCRINGColumnFilterValues>();

  const setValue = (newDate?: Date) => (newDate ? moment(newDate).format(date?.format ?? 'YYYY-MM-DD') : undefined);

  return (
    <Box data-testid="P2PMerchantCustomerFormFieldDate">
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
            <FormDatePicker
              date={value ? new Date(value) : null}
              props={{
                minDate: date?.minDate,
                maxDate: date?.maxDate || new Date()
              }}
              placeholder={`Masukan ${typeof label === 'string' ? label : ''}`}
              onSave={(newDate: Date) =>
                total > 1 ? onChange(setValue(newDate)) : onSubmit({ [name]: setValue(newDate) })
              }
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default P2PMerchantCustomerFormFieldDate;
