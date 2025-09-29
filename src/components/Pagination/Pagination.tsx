import { useState, useEffect, type ReactNode } from 'react';
import { Box, Pagination, TextField, Button } from '@mui/material';

interface Props {
  onPage: (page: number) => void;
  id?: string;
  current?: number;
  limit?: number;
  total?: number;
  rows?: number;
}

const CompPagination = ({
  onPage,
  id = 'cring',
  current = 0,
  limit = 0,
  total = 0,
  rows = 0
}: Props): Readonly<ReactNode> => {
  const [fdGo, setFdGo] = useState<number>(current);

  const setTotal = () => {
    let set = current * limit;

    if (set > rows) set = rows;

    return set;
  };

  useEffect(() => {
    setFdGo(current);
  }, [current]);

  return (
    <Box
      id={`box:pagination-${id}`}
      display="flex"
      justifyContent={{ xs: 'start', lg: 'space-between' }}
      flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
      rowGap={{ xs: 4, lg: 0 }}
      columnGap={{ xs: 0, lg: 4 }}
    >
      <Box id="box:view">
        <Box className="text-blur">
          Menampilkan {current * limit - (limit - 1)} - {setTotal()} dari {rows} data
        </Box>
      </Box>
      <Box
        id="box:jump--pagination"
        display="flex"
        alignItems={{ xs: 'normal', lg: 'center' }}
        flexWrap={{ xs: 'wrap', lg: 'nowrap' }}
        rowGap={{ xs: 4, lg: 0 }}
        columnGap={{ xs: 0, lg: 4 }}
      >
        <Box id="box:jump" alignItems="center" className="text-blur" display="flex">
          Menuju halaman &nbsp;
          <TextField
            className="--pagination"
            placeholder="Ketik halaman disini..."
            value={fdGo}
            sx={{ width: 40, input: { px: 1, textAlignLast: 'center' } }}
            onChange={e => {
              const value = e.currentTarget.value;

              if (!isNaN(Number(value))) setFdGo(Number(value));
            }}
            onKeyUp={event => {
              if (event.key === 'Enter') onPage(fdGo);
            }}
          />{' '}
          &nbsp;
          <Button
            color="primary"
            size="small"
            sx={{ minWidth: '30px' }}
            variant="contained"
            onClick={() => onPage(fdGo)}
          >
            Go
          </Button>
        </Box>
        <Box id="box:pagination" flexBasis={{ xs: '100%', lg: 'auto' }}>
          <Pagination
            color="primary"
            count={total}
            page={current}
            defaultPage={6}
            boundaryCount={2}
            shape="circular"
            onChange={(e, v) => onPage(v)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CompPagination;
