import { useMemo } from 'react';
import type { TypeDateRangePickerV2VariantValue } from '../type';

interface Type {
  setGetToday: TypeDateRangePickerV2VariantValue;
  setGetYesterday: TypeDateRangePickerV2VariantValue;
  setGetThisWeek: TypeDateRangePickerV2VariantValue;
  setGetThisMonth: TypeDateRangePickerV2VariantValue;
  setGetLastMonth: TypeDateRangePickerV2VariantValue;
}

/**
 * A hook component that's used for setting new date
 *
 * @property {TypeDateRangePickerV2VariantValue} setGetToday is used for set today date
 * @property {TypeDateRangePickerV2VariantValue} setGetYesterday is used for set yesterday date
 * @property {TypeDateRangePickerV2VariantValue} setGetThisWeek is used for set this week date
 * @property {TypeDateRangePickerV2VariantValue} setGetThisMonth is used for set this month date
 * @property {TypeDateRangePickerV2VariantValue} setGetLastMonth is used for set last month date
 *
 * @returns {Type}
 */
const useDateRangePickerV2Set = (): Readonly<Type> => {
  const setGetToday = useMemo<TypeDateRangePickerV2VariantValue>(() => {
    const getDate = new Date();

    return {
      start: getDate,
      end: getDate
    };
  }, []);

  const setGetYesterday = useMemo<TypeDateRangePickerV2VariantValue>(() => {
    const getDate = new Date();

    getDate.setDate(getDate.getDate() - 1);

    return {
      start: getDate,
      end: getDate
    };
  }, []);

  const setGetThisWeek = useMemo<TypeDateRangePickerV2VariantValue>(() => {
    const getDate = new Date();

    const dayOfWeek = getDate.getDay();

    const offset = (dayOfWeek + 7) % 7;

    const startOfWeek = new Date(getDate.getTime() - offset * 24 * 60 * 60 * 1000);
    const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);

    return {
      start: startOfWeek,
      end: endOfWeek
    };
  }, []);

  const setGetThisMonth = useMemo<TypeDateRangePickerV2VariantValue>(() => {
    const getDate = new Date();

    const year = getDate.getFullYear();
    const month = getDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    return {
      start: firstDayOfMonth,
      end: lastDayOfMonth
    };
  }, []);

  const setGetLastMonth = useMemo<TypeDateRangePickerV2VariantValue>(() => {
    const getDate = new Date();
    const year = getDate.getFullYear();
    const month = getDate.getMonth();
    const firstDayOfLastMonth = new Date(year, month - 1, 1);
    const lastDayOfLastMonth = new Date(year, month, 0);

    return {
      start: firstDayOfLastMonth,
      end: lastDayOfLastMonth
    };
  }, []);

  return {
    setGetToday,
    setGetYesterday,
    setGetThisWeek,
    setGetThisMonth,
    setGetLastMonth
  };
};

export default useDateRangePickerV2Set;
