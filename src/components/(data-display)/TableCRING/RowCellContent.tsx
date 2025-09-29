import type { ReactNode } from 'react';
import type { TableCRINGRowData } from './Row';
import TableCRINGRowCellData from './RowCellData';
import type { TableCRINGColumnJoined, TableCRINGExpanded } from './type';
import type { TableCRINGColumnFilterParams } from './typeFilter';

interface Props extends TableCRINGRowData, TableCRINGColumnFilterParams, TableCRINGExpanded {
  indexColumn: number;
  column: TableCRINGColumnJoined;
}

/**
 * Renders the content of a table row cell based on the provided column configuration and data.
 *
 * If the column's `content` property is a function, it invokes the function with the row data.
 * Otherwise, it renders a default cell component with additional props.
 *
 * @param column - The column configuration object, which may contain a custom content renderer.
 * @param data - The data object for the current row.
 * @param expanded - Indicates whether the row is expanded.
 * @param indexColumn - The index of the current column in the row.
 * @param params - Additional parameters to pass to the cell component.
 * @returns The rendered cell content as a ReactNode.
 */
const RowCellContent = ({ column, data, expanded, indexColumn, params }: Props): Readonly<ReactNode> => {
  if (typeof column?.content === 'function') return column.content(data);

  return (
    <TableCRINGRowCellData
      column={column}
      data={data}
      params={params}
      isExpandableCell={Boolean(indexColumn === 0 && expanded)}
    />
  );
};

export default RowCellContent;
