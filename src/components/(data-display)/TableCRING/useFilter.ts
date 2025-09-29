import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type {
  TableCRINGColumnFilterNameFrom,
  UseTableCRINGColumnFilter,
  UseTableCRINGColumnFilterProps,
  UseTableCRINGColumnFilterValues
} from './typeFilter';

const useTableCRINGColumnFilter = ({
  filters,
  params,
  onFilter
}: UseTableCRINGColumnFilterProps): Readonly<UseTableCRINGColumnFilter> => {
  const [isOpen, setIsOpen] = useState(false);

  const [idFrom, setIdFrom] = useState('');

  const [nameFrom, setNameFrom] = useState<TableCRINGColumnFilterNameFrom['nameFrom']>('');

  const defaultValues = useMemo(() => {
    const set: UseTableCRINGColumnFilterValues = {};

    if (params) {
      Object.keys(params).forEach(param => {
        set[param] = params[param];
      });
    }

    if (Array.isArray(filters)) {
      filters.forEach(filter => {
        let setValue: string | Record<string, any> = '';

        if (filter.type === 'autocomplete') {
          setValue = {};

          filter.autocomplete.shapes.forEach(shape => {
            Object.assign(setValue, { [shape.field]: '' });
          });
        }

        if (params?.[filter.name]) setValue = params[filter.name];

        Object.assign(set, { [filter.name]: setValue });
      });
    }

    return set;
  }, [params, filters]);

  const method = useForm<UseTableCRINGColumnFilterValues>({ mode: 'all', defaultValues, values: defaultValues });

  const { reset, getValues } = method;

  const onOpen = (props: { status: boolean; idFrom?: string; nameFrom?: string }) => {
    setNameFrom(props.nameFrom ?? '');
    setIdFrom(props.idFrom ?? '');
    setIsOpen(props.status);

    if (!props.status) reset();
  };

  const onSubmit = (values?: UseTableCRINGColumnFilterValues) => {
    if (typeof onFilter === 'function') {
      const setPayload: Record<string, any> = { ...getValues(), ...values, page: values?.page ?? 1 };

      Object.keys(setPayload).forEach(payload => {
        if (typeof setPayload[payload] === 'object') {
          let set = 0;

          Object.keys(setPayload[payload]).forEach(item => {
            if (!setPayload[payload][item]) set += 1;
          });

          if (set > 0) delete setPayload[payload];
        }
      });

      onFilter(setPayload);
      onOpen({ status: false });
    }
  };

  return { isOpen, idFrom, nameFrom, onOpen, method, onSubmit };
};

export default useTableCRINGColumnFilter;
