import { type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';
import type { BulkProgressUrlSkip } from '../../type';

interface Props extends BulkProgressUrlSkip {
  isOpen: boolean;
  isSubmitting?: boolean;
}

/**
 * A component that's designed for showing skip button.
 *
 * @returns {React.JSX}
 */
const BulkProgressButtonSkip = ({ isOpen, isSubmitting, urlSkip }: Props): Readonly<ReactNode> => {
  const { push } = useRouter();

  if (!isOpen) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Button disabled={isSubmitting} color="primary" variant="outlined" onClick={() => push(urlSkip)}>
        Lewati
      </Button>
    </Box>
  );
};

export default BulkProgressButtonSkip;
