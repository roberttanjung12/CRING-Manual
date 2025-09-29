'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

/**
 * Component for a button that redirects to the login page.
 *
 * This button is displayed on the expired session page and allows users
 * to navigate back to the login page. It includes a home icon and the "Masuk" label.
 *
 * @returns {React.JSX} A Button component that redirects to the login page when clicked
 */
const ExpiredButtonRedirect = (): Readonly<ReactNode> => {
  const { push } = useRouter();

  return (
    <Button
      variant="contained"
      size="small"
      color="primary"
      startIcon={<HomeOutlinedIcon fontSize="inherit" />}
      onClick={() => push('/')}
    >
      Masuk
    </Button>
  );
};

export default ExpiredButtonRedirect;
