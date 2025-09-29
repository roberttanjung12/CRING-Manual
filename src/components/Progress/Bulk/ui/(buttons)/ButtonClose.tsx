import { type ReactNode } from 'react';
import { Box, Button } from '@mui/material';
import type { BulkProgressOnStatus } from '../../type';

interface Props extends BulkProgressOnStatus {
  isOpen: boolean;
}

/**
 * A component that's designed for showing close button.
 *
 * @returns {React.JSX}
 */
const BulkProgressButtonClose = ({ isOpen, onStatus }: Props): Readonly<ReactNode> => {
  if (!isOpen) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Button color="secondary" variant="outlined" onClick={() => onStatus('form')}>
        Tutup
      </Button>
    </Box>
  );
};

export default BulkProgressButtonClose;
