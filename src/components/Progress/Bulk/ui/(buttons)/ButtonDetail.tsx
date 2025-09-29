import { type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';
import type { BulkProgressIsOpen, BulkProgressUrlDetail } from '../../type';

interface Props extends BulkProgressIsOpen, BulkProgressUrlDetail {}

/**
 * A component that's designed for showing detail button.
 *
 * @returns {React.JSX}
 */
const BulkProgressButtonDetail = ({ isOpen, urlDetail }: Props): Readonly<ReactNode> => {
  const { push } = useRouter();

  if (!isOpen) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Button color="primary" variant="contained" onClick={() => push(urlDetail)}>
        Tutup
      </Button>
    </Box>
  );
};

export default BulkProgressButtonDetail;
