'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, Box, Button, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import isEmpty from 'is-empty';
import { bool, element, elementType, func, node, object, oneOfType, string } from 'prop-types';
import { createRoot } from 'react-dom/client';
import theme from '@/@dront/theme';
import { getLocalStorage, removeLocalStorage } from './local-storage';
import redirectToWindow from './redirect-to';

const CustomAlert = ({
  id,
  isShow = false,
  isHideButton = false,
  children,
  type = 'success', // [error, success]
  title = '',
  msg = 'Berhasil',
  msgButton = 'Kembali',
  buttonColor = 'primary',
  buttonVariant = 'outlined',
  size = 'sm',
  special,
  onClose = null
}) => {
  const [isOpen, setIsOpen] = useState(isShow);

  const onDeleteEl = useCallback(() => {
    const getEl = document.getElementById(id);

    if (getEl) getEl.remove();
  }, [id]);

  const onCloseModal = () => {
    setIsOpen(false);

    if (special?.isMultiSession) redirectToWindow('/');

    if (typeof onClose === 'function') onClose();
  };

  const setup = useCallback(() => {
    if (special?.isMultiSession) {
      const getLastPage = getLocalStorage(`CRING_LAST_PAGE`);

      removeLocalStorage(['CRING_AUTH', 'CRING_BLOCKER']);

      if (getLastPage && !getLastPage.includes('?token')) {
        removeLocalStorage(`CRING_LAST_PAGE`);
      }
    }
  }, [special?.isMultiSession]);

  useEffect(() => {
    setup();
  }, [setup]);

  useEffect(() => {
    setIsOpen(isShow);
  }, [isShow]);

  useEffect(() => {
    if (!isOpen) onDeleteEl();
  }, [isOpen, onDeleteEl]);

  return (
    <Dialog
      fullWidth
      container={() => document.getElementById(id)}
      maxWidth={size}
      open={isOpen}
      sx={{ zIndex: '10000' }}
      onClose={() => onCloseModal()}
    >
      <DialogContent sx={{ pb: 6 }}>
        <Box textAlign="center">
          <Box position="relative" width="40%" ml="auto" mr="auto">
            {type === 'success' && (
              <Image
                priority
                alt="Success"
                src="/icon/progress-success.svg"
                height={512}
                width={512}
                style={{ height: 'auto', width: '100%' }}
              />
            )}
            {type === 'error' && (
              <Image
                priority
                alt="Fail"
                src="/icon/progress-fail.svg"
                height={512}
                width={512}
                style={{ height: 'auto', width: '100%' }}
              />
            )}
          </Box>
          <Box mt={2}>
            {title && (
              <Typography
                variant="h6"
                sx={{
                  fontSize: '20px',
                  fontWeight: 700,
                  mb: 3,
                  color: 'text.primary'
                }}
              >
                {title}
              </Typography>
            )}
            {msg && (
              <Typography
                variant="body1"
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  mb: 5,
                  color: 'text.secondary'
                }}
              >
                {msg}
              </Typography>
            )}
            {children && (
              <Box
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  mb: 5,
                  color: 'text.secondary'
                }}
              >
                {children}
              </Box>
            )}
            {!isHideButton && (
              <Box id="box:button">
                <Button
                  color={buttonColor}
                  size="large"
                  sx={{ minWidth: '0' }}
                  variant={buttonVariant}
                  onClick={() => onCloseModal()}
                >
                  {msgButton}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const FacAlert = params => {
  const getSnackWrap = document.body;
  const uniq = params?.id || `id${new Date().getTime()}`;
  const getUniq = document.getElementById(uniq);

  if (getSnackWrap && isEmpty(getUniq)) {
    const create = document.createElement('div');

    create.setAttribute('id', uniq);
    getSnackWrap.appendChild(create);

    const root = createRoot(create);

    root.render(
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme('light')}>
          <CssBaseline />
          <CustomAlert id={uniq} {...params} />
        </ThemeProvider>
      </AppRouterCacheProvider>
    );
  }
};

CustomAlert.propTypes = {
  id: string.isRequired,
  isShow: bool,
  isHideButton: bool,
  children: oneOfType([element, elementType, node]),
  type: string,
  title: string,
  msg: string,
  msgButton: string,
  buttonColor: string,
  buttonVariant: string,
  size: string,
  special: object,
  onClose: func
};

export default FacAlert;
