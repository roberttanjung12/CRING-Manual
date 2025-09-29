import { type ReactNode } from 'react';
import { Button } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

interface Props {
  total: number;
}

const TableCRINGButtonSubmit = ({ total }: Props): Readonly<ReactNode> => {
  return (
    total > 1 && (
      <Button
        type="submit"
        variant="contained"
        size="small"
        color="primary"
        sx={{ height: 36, minWidth: 'unset', mt: 5.5 }}
        startIcon={<SearchOutlinedIcon fontSize="inherit" />}
      >
        Cari
      </Button>
    )
  );
};

export default TableCRINGButtonSubmit;
