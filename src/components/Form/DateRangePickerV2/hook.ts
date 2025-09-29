import { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import type { Range } from 'react-date-range';
import useDateRangePickerV2Set from './hooks/useSetDate';
import type {
  TypeDateRangePickerV2,
  TypeDateRangePickerV2PropValue,
  TypeDateRangePickerV2Variant,
  TypeDateRangePickerV2VariantType,
  TypeDateRangePickerV2VariantValue
} from './type';

/**
 * A hook custom that's used for managing date-range-picker-v2.
 *
 * @returns {TypeDateRangePickerV2}
 */
const useDateRangePickerV2 = ({
  value,
  onChange
}: {
  value?: TypeDateRangePickerV2PropValue;
  onChange?: (newValue: TypeDateRangePickerV2PropValue) => void;
}): Readonly<TypeDateRangePickerV2> => {
  const dateFormat = 'DD MMMM YYYY';

  const { setGetToday, setGetYesterday, setGetThisWeek, setGetThisMonth, setGetLastMonth } = useDateRangePickerV2Set();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedType, setSelectedType] = useState<TypeDateRangePickerV2VariantType>('');

  const [selectedRanges, setSelectedRanges] = useState<Range>({
    startDate: undefined,
    endDate: undefined,
    key: 'selection'
  });

  const isDisabled = useMemo<boolean>(
    () => !(!!selectedType && !!selectedRanges.startDate && !!selectedRanges.endDate),
    [selectedRanges, selectedType]
  );

  const variants = useMemo<Array<TypeDateRangePickerV2Variant>>(
    () => [
      {
        type: 'today',
        kind: 'quick',
        label: 'Hari Ini',
        quick: {
          value: setGetToday,
          label: moment(setGetToday.start).format(dateFormat)
        }
      },
      {
        type: 'yesterday',
        kind: 'quick',
        label: 'Kemarin',
        quick: {
          value: setGetYesterday,
          label: moment(setGetYesterday.start).format(dateFormat)
        }
      },
      {
        type: 'this-week',
        kind: 'quick',
        label: 'Minggu Ini',
        quick: {
          value: setGetThisWeek,
          label: `${moment(setGetThisWeek.start).format(dateFormat)} - ${moment(setGetThisWeek.end).format(dateFormat)}`
        }
      },
      {
        type: 'this-month',
        kind: 'quick',
        label: 'Bulan Ini',
        quick: {
          value: setGetThisMonth,
          label: `${moment(setGetThisMonth.start).format(dateFormat)} - ${moment(setGetThisMonth.end).format(dateFormat)}`
        }
      },
      {
        type: 'last-month',
        kind: 'quick',
        label: 'Bulan Kemarin',
        quick: {
          value: setGetLastMonth,
          label: `${moment(setGetLastMonth.start).format(dateFormat)} - ${moment(setGetLastMonth.end).format(dateFormat)}`
        }
      },
      {
        type: 'per-day',
        kind: 'pick',
        label: 'Per Hari'
      },
      {
        type: 'per-week',
        kind: 'pick',
        label: 'Per Minggu'
      },
      {
        type: 'per-month',
        kind: 'pick',
        label: 'Per Bulan'
      },
      {
        type: 'choose',
        kind: 'pick',
        label: 'Pilih Tanggal'
      }
    ],
    [setGetLastMonth, setGetThisMonth, setGetThisWeek, setGetToday, setGetYesterday]
  );

  const isPick = useMemo<boolean>(
    () => !!selectedType && variants.find(({ type }) => type === selectedType)?.kind === 'pick',
    [selectedType, variants]
  );

  const quickVariants = useMemo<Array<TypeDateRangePickerV2Variant>>(
    () => variants.filter(({ kind }) => kind === 'quick'),
    [variants]
  );

  const pickVariants = useMemo<Array<TypeDateRangePickerV2Variant>>(
    () => variants.filter(({ kind }) => kind === 'pick'),
    [variants]
  );

  const renderValue = useMemo(() => {
    const set: { type?: string; date?: string } = {
      type: '',
      date: ''
    };

    if (value?.type) {
      const getVariant = variants.find(({ type }) => type === value?.type);
      const getDateStart = moment(value?.start).format(dateFormat);
      const getDateEnd = moment(value?.end).format(dateFormat);
      const getDate = getDateStart !== getDateEnd ? `${getDateStart} - ${getDateEnd}` : `${getDateStart}`;

      set.type = getVariant?.label;
      set.date = getDate;
    }

    return set;
  }, [value?.end, value?.start, value?.type, variants]);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setSelectedType('');

    setSelectedRanges(prev => ({ ...prev, startDate: undefined, endDate: undefined }));

    setIsOpen(false);
  };

  const onChangeQuick = (newType: TypeDateRangePickerV2VariantType, newValue?: TypeDateRangePickerV2VariantValue) => {
    setSelectedType(newType);

    setSelectedRanges(prev => ({ ...prev, startDate: newValue?.start, endDate: newValue?.end }));
  };

  const onChangePick = (newSelection: Range) => {
    setSelectedRanges(newSelection);
  };

  const onNewChange = () => {
    onChange?.({
      type: selectedType,
      start: selectedRanges.startDate,
      end: selectedRanges.endDate
    });

    onClose();
  };

  const setup = useCallback(() => {
    if (value?.type) setSelectedType(value?.type);

    if (value?.start && value?.end) {
      const newDateStart = new Date(value.start);
      const newDateEnd = new Date(value.end);

      setSelectedRanges(prev => ({ ...prev, startDate: newDateStart, endDate: newDateEnd }));
    }
  }, [value?.end, value?.start, value?.type]);

  return {
    isDisabled,
    isOpen,
    isPick,
    selectedType,
    selectedRanges,
    variant: {
      quick: quickVariants,
      pick: pickVariants
    },
    renderValue,
    setup,
    onOpen,
    onClose,
    onChangeQuick,
    onChangePick,
    onNewChange
  };
};

export default useDateRangePickerV2;
