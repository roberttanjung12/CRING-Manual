import { type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Typography } from '@mui/material';
import moment from 'moment';
import PayDateRangePicker from '@/components/Form/DateRangePicker';
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

const P2PMerchantCustomerFormFieldDateRange = ({ total, name, label, date, onSubmit }: Props): Readonly<ReactNode> => {
  const { control } = useFormContext<UseTableCRINGColumnFilterValues>();

  const setValue = (newDate?: Date) => (newDate ? moment(newDate).format(date?.format ?? 'YYYY-MM-DD') : undefined);

  return (
    <Box data-testid="P2PMerchantCustomerFormFieldDateRange">
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
            <PayDateRangePicker
              start={value?.start ? new Date(value?.start) : undefined}
              end={value?.end ? new Date(value?.end) : undefined}
              minDate={date?.minDate}
              maxDate={date?.maxDate || new Date()}
              onDelete={() => (total > 1 ? onChange(undefined) : onSubmit({ [name]: undefined }))}
              onSet={(start: Date, end: Date) =>
                total > 1
                  ? onChange({ start: setValue(start), end: setValue(end) })
                  : onSubmit({ [name]: { start: setValue(start), end: setValue(end) } })
              }
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default P2PMerchantCustomerFormFieldDateRange;
