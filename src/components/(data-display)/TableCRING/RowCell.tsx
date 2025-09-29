'use client';

import { type Dispatch, type SetStateAction, type ReactNode } from 'react';
import { IconButton, TableCell } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { TableCRINGRowData, TableCRINGRowIndex } from './Row';
import RowCellContent from './RowCellContent';
import TableCRINGRowCellData from './RowCellData';
import type { TableCRINGColumnJoined, TableCRINGExpanded } from './type';
import type { TableCRINGColumnFilterParams } from './typeFilter';

interface Props extends TableCRINGRowIndex, TableCRINGRowData, TableCRINGColumnFilterParams, TableCRINGExpanded {
  indexColumn: number;
  column: TableCRINGColumnJoined;
  open: boolean;
  onOpen?: Dispatch<SetStateAction<boolean>>;
}

/**
 * TableCRINGRowCell component renders a cell in a CRING table row.
 *
 * @param {object} props - Component props
 * @param {number} props.index - The index of the column
 * @param {object} props.column - The column configuration object
 * @param {string} props.column.name - The name of the column, used as a key to access data
 * @param {object} [props.column.head] - The column header configuration
 * @param {string} [props.column.head.align] - The text alignment of the cell
 * @param {object} [props.column.cell] - Additional props to pass to the TableCell component
 * @param {Function|undefined} [props.column.content] - Optional function to render custom content based on row data
 * @param {object} props.data - The row data object
 *
 * @returns {React.JSX} A TableCell component with either custom rendered content or the data value
 */
const TableCRINGRowCell = ({
  index,
  indexColumn,
  column,
  data,
  params,
  expanded,
  open,
  onOpen
}: Props): Readonly<ReactNode> => {
  return (
    <TableCell
      data-testid="TableCRINGRowCell"
      id={`col-${index}-${column.name}`}
      align={column.head?.align}
      sx={{ verticalAlign: 'top' }}
      {...column.cell}
    >
      {expanded && onOpen && indexColumn === 0 && (
        <IconButton sx={{ position: 'relative', zIndex: 2 }} onClick={() => onOpen(prev => !prev)}>
          {!open && <ChevronRightIcon />}
          {open && <ExpandMoreIcon />}
        </IconButton>
      )}
      {!Array.isArray(column.joined) ? (
        <RowCellContent column={column} data={data} expanded={expanded} indexColumn={indexColumn} params={params} />
      ) : (
        column.joined
          .map((item, index) => ({ ...item, key: `k-${index}` }))
          .map((item, index) => (
            <TableCRINGRowCellData key={item.key} column={item} data={data} params={params} space={index > 0} />
          ))
      )}
    </TableCell>
  );
};

export default TableCRINGRowCell;
