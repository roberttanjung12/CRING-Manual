import { useMemo, type ReactNode } from 'react';
import { Button } from '@mui/material';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import type {
  TableCRINGColumnFilterParams,
  TableCRINGColumnFilters,
  UseTableCRINGColumnFilterOnSubmit
} from './typeFilter';

interface Props extends TableCRINGColumnFilters, TableCRINGColumnFilterParams, UseTableCRINGColumnFilterOnSubmit {}

const TableCRINGButtonReset = ({ filters, params, onSubmit }: Props): Readonly<ReactNode> => {
  const isOpen = useMemo(() => {
    let set = 0;

    filters?.forEach(filter => {
      if (params?.[filter.name] !== undefined) {
        if (typeof params[filter.name] === 'object') {
          Object.keys(params[filter.name]).forEach(param => {
            if (params[filter.name][param]) set += 1;
          });
        } else if (params[filter.name]) set += 1;
      }
    });

    return set > 0;
  }, [filters, params]);

  const resets = useMemo(() => {
    const set = {};

    filters?.forEach(filter => {
      Object.assign(set, { [filter.name]: '' });
    });

    return set;
  }, [filters]);

  return (
    isOpen && (
      <Button
        title="Ketuk untuk menampilkan filter"
        sx={{
          height: 20,
          minWidth: 'unset',
          width: 20,
          p: 0,
          mt: 0.5,
          color: 'white'
        }}
        onClick={() => onSubmit(resets)}
      >
        <RestartAltOutlinedIcon fontSize="inherit" />
      </Button>
    )
  );
};

export default TableCRINGButtonReset;
