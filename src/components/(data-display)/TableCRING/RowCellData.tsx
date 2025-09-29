'use client';

import { Fragment, useMemo, type ReactNode } from 'react';
import { Box, Chip } from '@mui/material';
import type { TableCRINGRowData } from './Row';
import TableCRINGRowCellDataString from './RowCellDataString';
import type { TableCRINGColumnProps } from './type';
import type { TableCRINGColumnFilterParams } from './typeFilter';

interface Props extends TableCRINGRowData, TableCRINGColumnFilterParams {
  column: TableCRINGColumnProps;
  space?: boolean;
  isExpandableCell?: boolean;
}

/**
 * TableCRINGRowCellData component renders a cell in a CRING table row
 * with various formatting options and capabilities.
 *
 * The component transforms the data based on column abilities:
 * - Displays a dash ('-') for empty values
 * - Formats currency values with thousand separators
 * - Supports text highlighting based on search params
 * - Provides clipboard copy functionality when enabled
 *
 * @param {Object} props - Component props
 * @param {Object} props.column - Column configuration object
 * @param {string} props.column.name - The name of the column (key in data object)
 * @param {Object} [props.column.ability] - Optional column capabilities
 * @param {boolean} [props.column.ability.copy] - Whether to enable copy-to-clipboard
 * @param {string} [props.column.ability.currency] - Currency symbol for formatting
 * @param {Object} [props.column.ability.prop] - Additional props for Typography component
 * @param {Object} props.data - The data object containing values for the row
 * @param {Object} [props.params] - Optional search parameters for text highlighting
 *
 * @returns {React.JSX} The rendered cell content with appropriate formatting
 */
const TableCRINGRowCellData = ({ column, data, params, space, isExpandableCell }: Props): Readonly<ReactNode> => {
  const getData = useMemo(() => data[column.name], [column.name, data]);

  return (
    <>
      {space && <Box component="br" />}
      {getData?.label && (
        <Chip
          label={getData.label}
          color={getData.color}
          sx={{ width: isExpandableCell ? 'calc(100% - 42px)' : '100%' }}
        />
      )}
      {Array.isArray(getData) &&
        getData
          .map((item, index) => ({ key: `k-${index}`, data: item }))
          .map((item, index) => (
            <Fragment key={item.key}>
              {index > 0 && <Box component="br" />}
              <TableCRINGRowCellDataString column={column} data={item.data} params={params} />
            </Fragment>
          ))}
      {typeof getData === 'string' || typeof getData === 'number' ? (
        <TableCRINGRowCellDataString column={column} data={data} params={params} />
      ) : undefined}
    </>
  );
};

export default TableCRINGRowCellData;
