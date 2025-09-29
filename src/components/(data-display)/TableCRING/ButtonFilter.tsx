import { type ReactNode } from 'react';
import { Button, ClickAwayListener } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import type {
  TableCRINGColumnFilterIDFrom,
  TableCRINGColumnFilterIsOpen,
  TableCRINGColumnFilterNameFrom,
  TableCRINGColumnFilterOnOpen,
  TableCRINGColumnFilters
} from './typeFilter';

interface Props
  extends TableCRINGColumnFilterIsOpen,
    TableCRINGColumnFilterIDFrom,
    TableCRINGColumnFilterNameFrom,
    TableCRINGColumnFilters,
    TableCRINGColumnFilterOnOpen {}

const TableCRINGButtonFilter = ({ isOpen, idFrom, nameFrom, filters, onOpen }: Props): Readonly<ReactNode> => {
  return (
    Array.isArray(filters) && (
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={event => {
          if (isOpen) {
            const isFilterBox = (event.target as HTMLElement).closest(
              '.--filter-box, .MuiMenuItem-root, .MuiAutocomplete-popper, .MuiPaper-root'
            );

            if (!isFilterBox) onOpen({ status: false });
          }
        }}
      >
        <Button
          id={`${idFrom}-button`}
          title="Ketuk untuk menampilkan filter"
          sx={{
            height: 20,
            minWidth: 'unset',
            width: 20,
            p: 0,
            mt: 0.5,
            color: 'white'
          }}
          onClick={() => onOpen({ status: true, idFrom, nameFrom })}
        >
          <FilterAltOutlinedIcon fontSize="inherit" />
        </Button>
      </ClickAwayListener>
    )
  );
};

export default TableCRINGButtonFilter;
