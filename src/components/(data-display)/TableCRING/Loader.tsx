import type { ReactNode } from 'react';
import { Box, Skeleton, TableCell, TableRow } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { TableCRINGColumnPropIsLoading } from './type';

interface Props extends TableCRINGColumnPropIsLoading {
  columns: string[];
  dataTotal: number;
  children: Readonly<ReactNode>;
}

/**
 * TableCRINGLoader Component
 *
 * A component that provides loading state feedback for table data.
 * When loading, it displays skeleton placeholders across multiple rows.
 * When not loading and no data is available, it shows a "no data found" message.
 * Otherwise, it renders the children components.
 *
 * @param props - Component properties
 * @param props.isLoading - Boolean flag indicating if data is being loaded
 * @param props.columns - Array of column identifiers to create skeleton cells
 * @param props.dataTotal - Total number of data items available
 * @param props.children - Content to render when data is loaded and available
 *
 * @returns {React.JSX} React node representing either loading state, empty state, or actual table content
 */
const TableCRINGLoader = ({ isLoading, columns, dataTotal, children }: Props): Readonly<ReactNode> => {
  return (
    <>
      {isLoading && (
        <>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(row => (
            <TableRow key={row}>
              {columns.map(item => (
                <TableCell key={item}>
                  <Skeleton variant="rounded" width="100%" height={20} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </>
      )}
      {!isLoading && dataTotal === 0 ? (
        <TableRow>
          <TableCell colSpan={100}>
            <Box alignItems="center" display="flex" justifyContent="center">
              <InfoOutlinedIcon fontSize="small" sx={{ mr: 2 }} />
              Tidak ada yang ditemukan!
            </Box>
          </TableCell>
        </TableRow>
      ) : (
        children
      )}
    </>
  );
};

export default TableCRINGLoader;
