import { useMemo, type ReactNode } from 'react';
import { Box, TableCell, Typography } from '@mui/material';
import TableCRINGButtonFilter from './ButtonFilter';
import TableCRINGButtonReset from './ButtonReset';
import type { TableCRINGColumnPropHead, TableCRINGColumnPropLabel, TableCRINGColumnPropName } from './type';
import type {
  TableCRINGColumnFilterIsOpen,
  TableCRINGColumnFilterOnOpen,
  TableCRINGColumnFilterParams,
  TableCRINGColumnFilters,
  UseTableCRINGColumnFilterOnSubmit
} from './typeFilter';

interface Props
  extends TableCRINGColumnFilterIsOpen,
    TableCRINGColumnPropName,
    TableCRINGColumnPropLabel,
    TableCRINGColumnPropHead,
    TableCRINGColumnFilters,
    TableCRINGColumnFilterParams,
    TableCRINGColumnFilterOnOpen,
    UseTableCRINGColumnFilterOnSubmit {
  id: string;
}

const TableCRINGHead = ({
  isOpen,
  id,
  name,
  label,
  head,
  filters,
  params,
  onOpen,
  onSubmit
}: Props): Readonly<ReactNode> => {
  const justifyContent = useMemo(() => {
    let set = 'start';

    if (head?.align === 'center') set = 'center';
    else if (head?.align === 'right') set = 'end';

    return set;
  }, [head?.align]);

  return (
    <TableCell id={`${id}-head-row`} sx={{ verticalAlign: 'top' }} {...head}>
      <Box
        display="flex"
        justifyContent={justifyContent}
        columnGap={2}
        fontWeight={700}
        whiteSpace="pre"
        sx={{
          '.MuiTypography-root': {
            fontWeight: 700
          }
        }}
      >
        {label !== null && (typeof label === 'string' || (typeof label === 'object' && '$$typeof' in label))
          ? label
          : undefined}
        {Array.isArray(label) && (
          <Box>
            {label.map((item, index) => (
              <Box key={`${id}-head-label-${item}`}>
                {index > 0 && <Typography component="span">/&nbsp;</Typography>}
                <Typography component="span">{item}</Typography>
              </Box>
            ))}
          </Box>
        )}
        <TableCRINGButtonFilter isOpen={isOpen} idFrom={id} nameFrom={name} filters={filters} onOpen={onOpen} />
        <TableCRINGButtonReset filters={filters} params={params} onSubmit={onSubmit} />
      </Box>
    </TableCell>
  );
};

export default TableCRINGHead;
