'use client';

import type { ReactNode } from 'react';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import type { UseAuthenticationProviderIsLoading } from './type';

/**
 * Displays a loading indicator card when authentication is in progress.
 *
 * @param isLoading - A boolean indicating whether the authentication process is currently loading.
 *
 * @returns {React.JSX} A React node containing a styled loading card if `isLoading` is false; otherwise, returns null.
 */
const AuthenticationProviderLoading = ({ isLoading }: UseAuthenticationProviderIsLoading): Readonly<ReactNode> => {
  return (
    <Snackbar open={isLoading} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert severity="info" icon={<CircularProgress size={14} sx={{ mt: 1 }} />}>
        Sedang memeriksa sesi...
      </Alert>
    </Snackbar>
  );
};

export default AuthenticationProviderLoading;
