import { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ScrollContainer from 'react-indiana-drag-scroll';
import TableCRINGHeadFilter from './Filter';
import TableCRINGHead from './Head';
import TableCRINGLoader from './Loader';
import TableCRINGPagination from './Pagination';
import TableCRINGRow from './Row';
import type { TableCRINGColumnJoined, TableCRINGProps } from './type';
import type { TableCRINGColumnFilterItem } from './typeFilter';
import useTableCRINGColumnFilter from './useFilter';

const TableCRING = ({
  data,
  columns,
  id = 'Table-CRING',
  isLoading,
  params,
  expanded,
  pagination,
  actions,
  onClick,
  onFilter
}: TableCRINGProps) => {
  const filteredColumns = useMemo(() => {
    const columnOpened = columns
      .map(item => ({
        ...item,
        isOpen: item.isOpen ?? true,
        filters: item.filters?.map(filter => ({ ...filter, label: filter.label || item.label }))
      }))
      .filter(item => item.isOpen);
    const set: TableCRINGColumnJoined[] = [];

    columnOpened.forEach(column => {
      const found = set.find(find => find.join && find.join === column.join);

      if (found?.name) {
        if (Array.isArray(found.label)) found.label.push(column.label as string);
        else found.label = [found.label, column.label];

        if (!found.joined?.length) found.joined = [found];

        found.filters = [...(found.filters || []), ...(column.filters || [])];
        found.joined = [...(found.joined || []), column];
      } else set.push(column);
    });

    return set;
  }, [columns]);

  const getFilters = useMemo(() => {
    const set: TableCRINGColumnFilterItem[] = [];

    filteredColumns.forEach(column => {
      if (Array.isArray(column.filters)) {
        column.filters.forEach(filter => {
          set.push({ ...filter, nameFrom: column.name });
        });
      }
    });

    return set;
  }, [filteredColumns]);

  const { method, isOpen, idFrom, nameFrom, onOpen, onSubmit } = useTableCRINGColumnFilter({
    filters: getFilters,
    params,
    onFilter
  });

  const { handleSubmit } = method;

  return (
    <FormProvider {...method}>
      <Box data-testid="TableCRING" component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box id={id} position="relative">
          <ScrollContainer
            className="scroll-container"
            hideScrollbars={false}
            ignoreElements=".--no-scroll, .tab-filter, .MuiTypography-root"
            style={{ overflow: 'auto' }}
          >
            <TableContainer sx={{ borderRadius: '0', '.MuiTypography-root': { cursor: 'auto' } }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {filteredColumns
                      .map((item, index) => ({ ...item, key: `K-${index}` }))
                      .map(item => (
                        <TableCRINGHead
                          key={item.key}
                          isOpen={isOpen}
                          id={`${id}-head-row-${item.name}`}
                          name={item.name}
                          label={item.label}
                          head={item.head}
                          filters={item.filters}
                          params={params}
                          onOpen={onOpen}
                          onSubmit={onSubmit}
                        />
                      ))}
                    {actions?.length ? <TableCell align="center" sx={{ verticalAlign: 'top' }} /> : undefined}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCRINGLoader
                    isLoading={isLoading}
                    columns={filteredColumns.map(item => item.name)}
                    dataTotal={data.length}
                  >
                    {data
                      .map((item, index) => ({ ...item, key: `K-${index}` }))
                      .map((item, index) => (
                        <TableCRINGRow
                          key={item.key}
                          index={index}
                          columns={filteredColumns}
                          data={item}
                          expanded={expanded}
                          params={params}
                          actions={actions}
                          onClick={onClick}
                        />
                      ))}
                  </TableCRINGLoader>
                </TableBody>
              </Table>
            </TableContainer>
          </ScrollContainer>
        </Box>
        {pagination && (
          <Box mt={10}>
            <TableCRINGPagination
              key={pagination.current}
              id={`${id}-pagination`}
              current={pagination.current}
              limit={pagination.limit}
              rows={pagination.rows}
              total={pagination.total}
              onPage={e => onSubmit({ page: e })}
            />
          </Box>
        )}
        <TableCRINGHeadFilter
          id={id}
          idFrom={idFrom}
          isOpen={isOpen}
          filters={getFilters.filter(filter => filter.nameFrom === nameFrom)}
          onSubmit={onSubmit}
        />
      </Box>
    </FormProvider>
  );
};

export default TableCRING;
