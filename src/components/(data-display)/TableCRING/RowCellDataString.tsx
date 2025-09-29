'use client';

import { useMemo, type ReactNode } from 'react';
import { Typography } from '@mui/material';
import Highlighter from 'react-highlight-words';
import Clipboard from '@/components/(feedback)/Clipboard';
import thousand from '@/utility/thousand';
import type { TableCRINGRowData } from './Row';
import type { TableCRINGColumnProps } from './type';
import type { TableCRINGColumnFilterParams } from './typeFilter';

interface Props extends TableCRINGRowData, TableCRINGColumnFilterParams {
  column: TableCRINGColumnProps;
}

/**
 * Component that renders a cell containing string data in the CRING table.
 *
 * Features:
 * - Formats data as currency if specified in column abilities
 * - Adds copy-to-clipboard functionality if specified in column abilities
 * - Highlights search terms in the text if search parameters are provided
 * - Displays a dash ('-') for null or undefined data
 *
 * @param {Object} props - Component props
 * @param {Object} props.column - The column configuration object
 * @param {boolean} [props.column.ability.copy] - Whether the cell content can be copied to clipboard
 * @param {string} [props.column.ability.currency] - Currency symbol to prepend to the data
 * @param {Object} [props.column.ability.prop] - Additional props to pass to the Typography component
 * @param {string} props.column.name - The name of the column (used for highlighting)
 * @param {string} props.data - The cell data to display
 * @param {Object} [props.params] - Search parameters object where keys match column names
 *
 * @returns {React.JSX} The rendered cell component
 */
const TableCRINGRowCellDataString = ({ column, data, params }: Props): Readonly<ReactNode> => {
  const getData = useMemo(() => (typeof data !== 'string' ? data[column.name] : data), [column.name, data]);

  const dataTransformed = useMemo(() => String(getData), [getData]);

  const newData = useMemo(() => {
    let set = dataTransformed || '-';

    if (column.ability?.currency) set = `${column.ability.currency} ${thousand(dataTransformed)}`;

    return set;
  }, [column.ability?.currency, dataTransformed]);

  const paramsSearch = useMemo(() => {
    if (!params) return [];

    const search = params[column.name as keyof typeof params];

    if (typeof search === 'string') return [search];
    if (Array.isArray(search)) return search.filter(s => typeof s === 'string');

    return [];
  }, [column.name, params]);

  return (
    <Clipboard isCopy={Boolean(column.ability?.copy)} text={dataTransformed}>
      <Typography component="span" className="--no-scroll" sx={{ cursor: 'text', ...column.ability?.sx }}>
        <Highlighter
          autoEscape
          highlightClassName="text-highlight"
          searchWords={paramsSearch}
          textToHighlight={newData}
        />
      </Typography>
    </Clipboard>
  );
};

export default TableCRINGRowCellDataString;
