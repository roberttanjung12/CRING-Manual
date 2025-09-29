'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { Collapse, TableCell, TableRow } from '@mui/material';
import onPreventClick from '@/utility/prevent-click';
import TableCRINGAction from './Action';
import TableCRINGRowCell from './RowCell';
import type {
  TableCRINGColumnPropOnClick,
  TableCRINGExpanded,
  TableCRINGPropAction,
  TableCRINGPropColumns
} from './type';
import type { TableCRINGColumnFilterParams } from './typeFilter';

interface Index {
  index: number;
}

interface Data {
  data: Record<string, any>;
}

interface Props
  extends TableCRINGPropColumns,
    Index,
    Data,
    TableCRINGColumnFilterParams,
    TableCRINGExpanded,
    TableCRINGPropAction,
    TableCRINGColumnPropOnClick {}

/**
 * TableCRINGRow component renders a row for a TableCRING component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {number} props.index - The index of the row.
 * @param {Array<any>} props.columns - The column configuration for the table.
 * @param {any} props.data - The data object to be displayed in the row.
 * @param {Function} [props.onClick] - Optional callback function when the row is clicked. Receives the row data as parameter.
 *
 * @returns {React.JSX} A table row element with cells based on the provided columns and data.
 *
 * @example
 * <TableCRINGRow
 *   index={0}
 *   columns={[{name: 'id', label: 'ID'}, {name: 'name', label: 'Name'}]}
 *   data={{id: 1, name: 'John'}}
 *   onClick={(rowData) => console.log(rowData)}
 * />
 */
const TableCRINGRow = ({ index, columns, data, params, expanded, actions, onClick }: Props): Readonly<ReactNode> => {
  const isClickable = useMemo(() => typeof onClick === 'function', [onClick]);

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        data-testid="TableCRINGRow"
        id={`col-${index}`}
        className={isClickable ? '--hover' : ''}
        onClick={event => isClickable && onClick && onPreventClick(event, () => onClick(data), { isAllow: true })}
      >
        {columns.map((column, indexColumn) => (
          <TableCRINGRowCell
            key={column.name}
            index={index}
            indexColumn={indexColumn}
            column={column}
            data={data}
            params={params}
            expanded={expanded}
            open={open}
            onOpen={setOpen}
          />
        ))}
        {actions?.length && (
          <TableCell id={`col-${index}-action`} align="center" sx={{ verticalAlign: 'top' }}>
            <TableCRINGAction actions={actions} data={data} />
          </TableCell>
        )}
      </TableRow>
      {typeof expanded === 'function' && (
        <>
          <TableRow id={`col-${index}-expanded`}>
            <TableCell className="--no-scroll --no-click" colSpan={100} sx={{ p: 0, cursor: 'auto' }}>
              <Collapse in={open}>
                <>{expanded(data)}</>
              </Collapse>
            </TableCell>
          </TableRow>
          <TableRow id={`col-${index}-expanded-close`} />
        </>
      )}
    </>
  );
};

export type { Index as TableCRINGRowIndex, Data as TableCRINGRowData };

export default TableCRINGRow;
