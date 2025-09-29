import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import PayDateRangePicker from '@/components/Form/DateRangePicker';
import onDefaultPeriod from '@/utility/default-period';
import type { FilterPeriodProps } from './type';

/**
 * A component that renders a date range picker with a label for filtering based on a time period.
 *
 * @returns {React.JSX} A Box component containing a label and a PayDateRangePicker component.
 *
 * @example
 * <FilterPeriod
 *   label="Date Range"
 *   params={{ date1: new Date(2023, 0, 1), date2: new Date(2023, 0, 31) }}
 *   onFilterGo={(updatedParams) => handleFilterChange(updatedParams)}
 * />
 */
const FilterPeriod = ({
  label = 'Tanggal Transaksi',
  params,
  defaultStart = onDefaultPeriod.start,
  defaultEnd = onDefaultPeriod.end,
  onFilterGo
}: FilterPeriodProps): Readonly<ReactNode> => {
  return (
    <Box data-testid="FilterPeriod">
      <Typography component="label" fontWeight={600}>
        {label}
      </Typography>
      <Box mt={2}>
        <PayDateRangePicker
          end={params?.date2 ?? defaultEnd}
          start={params?.date1 ?? defaultStart}
          maxDate={new Date()}
          onDelete={() => onFilterGo({ ...params, date1: onDefaultPeriod.start, date2: onDefaultPeriod.end, page: 1 })}
          onSet={(start: Date, end: Date) => onFilterGo({ ...params, date1: start, date2: end, page: 1 })}
        />
      </Box>
    </Box>
  );
};

export default FilterPeriod;
