import { useState, type ReactNode } from 'react';
import { Box, Pagination, TextField, Button, Typography } from '@mui/material';
import type { TableCRINGPaginationProps } from './type';

interface Props extends TableCRINGPaginationProps {
  id: string;
  onPage: (next: number) => void;
}

/**
 * TableCRINGPagination Component
 *
 * Renders a pagination control for a table with navigation options.
 *
 * @param {object} props - Component props
 * @param {string} props.id - Unique identifier for the pagination component
 * @param {number} props.current - Current page number
 * @param {number} props.limit - Number of items per page
 * @param {number} props.total - Total number of pages
 * @param {number} props.rows - Total number of rows/items in the data set
 * @param {function} props.onPage - Callback function when page changes, receives the new page number
 *
 * @returns {React.JSX} A pagination control with:
 *   - Display showing current range of items being shown (e.g., "Showing 1-10 of 100 data")
 *   - "Go to page" input field with a Go button
 *   - Page navigation buttons
 *
 * @example
 * <TableCRINGPagination
 *   id="users-table"
 *   current={2}
 *   limit={10}
 *   total={5}
 *   rows={45}
 *   onPage={(newPage) => handlePageChange(newPage)}
 * />
 */
const TableCRINGPagination = ({ id, current, limit, total, rows, onPage }: Props): Readonly<ReactNode> => {
  const [page, setPage] = useState<number>(current);

  const setTotal = () => {
    let set = current * limit;

    if (set > rows) set = rows;

    return set;
  };

  return (
    <Box
      id={`box:pagination-${id}`}
      display="flex"
      justifyContent={{ xs: 'start', lg: 'space-between' }}
      flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
      rowGap={{ xs: 4, lg: 0 }}
      columnGap={{ xs: 0, lg: 4 }}
    >
      <Typography sx={{ color: ({ palette }) => palette.grey[600] }}>
        Menampilkan {current * limit - (limit - 1)} - {setTotal()} dari {rows} data
      </Typography>
      <Box
        display="flex"
        alignItems={{ xs: 'normal', lg: 'center' }}
        flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
        rowGap={{ xs: 4, lg: 0 }}
        columnGap={{ xs: 0, lg: 4 }}
      >
        <Box display="flex" alignItems="center" color={({ palette }) => palette.grey[600]}>
          Menuju halaman &nbsp;
          <TextField
            className="--pagination"
            placeholder="Ketik halaman disini..."
            value={page}
            sx={{ width: 40, input: { px: 1, textAlignLast: 'center' } }}
            onChange={e => {
              const value = e.currentTarget.value;

              if (!isNaN(Number(value))) setPage(Number(value));
            }}
            onKeyUp={event => {
              if (event.key === 'Enter') onPage(page);
            }}
          />{' '}
          &nbsp;
          <Button
            color="primary"
            size="small"
            sx={{ minWidth: '30px' }}
            variant="contained"
            onClick={() => onPage(current)}
          >
            Go
          </Button>
        </Box>
        <Box flexBasis={{ xs: '100%', lg: 'auto' }}>
          <Pagination
            color="primary"
            count={total}
            page={current}
            defaultPage={6}
            boundaryCount={2}
            shape="circular"
            onChange={(event, next) => onPage(next)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TableCRINGPagination;
