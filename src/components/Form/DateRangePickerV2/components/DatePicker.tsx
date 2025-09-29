import { useMemo, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { DateRange, type Range } from 'react-date-range';
import type { TypeDateRangePickerV2VariantType } from '../type';

interface Type {
  type: TypeDateRangePickerV2VariantType;
  ranges: Range;
  onChange: (newSelection: Range) => void;
}

/**
 * A component that's designed for showing date picker ui.
 *
 * @returns {React.JSX}
 */
const DateRangePickerV2DatePicker = ({ type, ranges, onChange }: Type): Readonly<ReactNode> => {
  const newKey = useMemo<undefined | string>(
    () => (['choose'].includes(type) ? 'new-key' : ranges.startDate?.toString()),
    [ranges.startDate, type]
  );

  const onChangePerDay = (newSelection: Range) => {
    const { startDate } = newSelection;

    if (startDate) {
      const endDate = new Date(startDate);

      endDate.setDate(startDate.getDate());

      onChange({ startDate, endDate, key: 'selection' });
    }
  };

  const onChangePerWeek = (newSelection: Range) => {
    const { startDate } = newSelection;

    if (startDate) {
      const endDate = new Date(startDate);

      endDate.setDate(startDate.getDate() + 6);

      onChange({ startDate, endDate, key: 'selection' });
    }
  };

  const onChangePerMonth = (newSelection: Range) => {
    const { startDate } = newSelection;

    if (startDate) {
      const endDate = new Date(startDate);

      endDate.setDate(startDate.getDate() + 30);

      onChange({ startDate, endDate, key: 'selection' });
    }
  };

  const onChangeSelect = (newSelection: Range) => {
    if (type === 'per-day') onChangePerDay(newSelection);
    else if (type === 'per-week') onChangePerWeek(newSelection);
    else if (type === 'per-month') onChangePerMonth(newSelection);
    else if (type === 'choose') onChange(newSelection);
  };

  return (
    <Box data-testid="DateRangePickerV2DatePicker">
      <DateRange
        key={newKey}
        showMonthAndYearPickers
        ranges={[ranges]}
        onChange={({ selection }: { selection: Range }) => onChangeSelect(selection)}
      />
    </Box>
  );
};

export default DateRangePickerV2DatePicker;
