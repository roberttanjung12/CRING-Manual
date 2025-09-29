import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import isEmpty from 'is-empty';
import qs from 'qs';
import type { TypePagination } from '@/types/pagination';

interface HeaderEnum {
  ['pagination-page']: number | string;
  ['pagination-rows']: number | string;
}

interface Props {
  path?: string;
  status?: number;
  headers?: HeaderEnum;
  page?: number | string;
}

interface Pagination {
  pagination: TypePagination;
}

interface OnFilterGo<TParams extends Record<string, any> = { [key: string]: any }> {
  onFilterGo: (filters: TParams) => void;
}

interface Returns<TParams extends Record<string, any> = { [key: string]: any }>
  extends Pagination,
    OnFilterGo<TParams> {
  onFilterSet: (filters: TParams) => TParams;
}

/**
 * A custom hook that's used for managing filter.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {Returns}
 */
const useFilter = <TParams extends Record<string, any> = { [key: string]: any }>(
  props?: Props
): Readonly<Returns<TParams>> => {
  const { push } = useRouter();

  const pagination = useMemo<TypePagination>(() => {
    const set: TypePagination = {
      limit: 10,
      total: 0,
      rows: 0,
      page: props?.page ? Number(props.page) : 1
    };

    if (props?.status === 200) {
      set.total = Number(props?.headers?.['pagination-page']);
      set.rows = Number(props?.headers?.['pagination-rows']);
    }

    return set;
  }, [props?.headers, props?.page, props?.status]);

  const onFilterSet = useCallback((filters: TParams) => {
    const set: TParams = { ...filters };

    if (!isEmpty(set)) {
      Object.keys(set).forEach(d => {
        if (isEmpty(set[d])) delete set[d];
      });
    }

    return set;
  }, []);

  const onFilterGo = useCallback(
    (filters: TParams) => {
      push(`${props?.path ?? '/'}?${qs.stringify(onFilterSet(filters))}`);
    },
    [onFilterSet, props?.path, push]
  );

  return {
    pagination,
    onFilterSet,
    onFilterGo
  };
};

export type { Pagination as UseFilterPagination, OnFilterGo as UseFilterOnFilterGo };

export default useFilter;
