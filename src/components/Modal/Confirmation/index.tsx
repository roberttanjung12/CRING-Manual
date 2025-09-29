import type { MouseEvent, ReactNode } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, Box, Button, CircularProgress, Typography } from '@mui/material';
import type { ModalConfirmationProps } from './type';

/**
 * A modal that's designed for showing the modal of Confirmation.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const ModalConfirmation = ({
  title,
  children,
  onCancel,
  onSave,
  onClose,
  customButtonSave,
  isShow = false,
  isLoading = false,
  isHideButtonCancel = false,
  isHideButtonSave = false,
  icon = '/giff/question.gif',
  textButtonCancel = 'Batal',
  textButtonSave = 'Ya, Ubah',
  colorButtonCancel = 'secondary',
  colorButtonSave = 'primary'
}: ModalConfirmationProps): Readonly<ReactNode> => {
  const onModalClose = () => typeof onClose === 'function' && onClose();

  const onModalCancel = () => {
    if (typeof onCancel === 'function') onCancel();

    onModalClose();
  };

  const onModalSave = async (event: MouseEvent) => typeof onSave === 'function' && (await onSave(event));

  return (
    <Dialog fullWidth maxWidth="sm" open={isShow} onClose={onModalClose}>
      <DialogContent>
        <Box textAlign="center" p={5}>
          {icon && (
            <Box mb={5}>
              <Image alt="icon" height={163} src={icon} width={163} />
            </Box>
          )}
          <Box>
            {title && (
              <Typography
                mb={3}
                fontSize="20px"
                fontWeight={700}
                whiteSpace="pre-line"
                sx={{ color: ({ palette }) => palette.common.black }}
              >
                {title}
              </Typography>
            )}
            {children && (
              <Typography component="div" mb={5} fontSize="16px" sx={{ color: ({ palette }) => palette.grey[100] }}>
                {children}
              </Typography>
            )}
            <Box alignItems="center" display="flex" id="box:button" justifyContent="center">
              {!isHideButtonCancel && (
                <Box mx={3}>
                  <Button
                    className="--no-click"
                    color={colorButtonCancel}
                    size="large"
                    sx={{ minWidth: '0' }}
                    variant="outlined"
                    onClick={onModalCancel}
                  >
                    {textButtonCancel}
                  </Button>
                </Box>
              )}
              {!isHideButtonSave && (
                <Box mx={3}>
                  {customButtonSave === 'FreezeAccount' ? (
                    <Box mx={3}>{textButtonSave}</Box>
                  ) : (
                    <Button
                      aria-label="ModalConfirmation-button-save"
                      className="--no-click"
                      disabled={isLoading}
                      color={colorButtonSave}
                      size="large"
                      sx={{ minWidth: '0' }}
                      variant="contained"
                      onClick={onModalSave}
                    >
                      {textButtonSave}
                    </Button>
                  )}
                </Box>
              )}
              {isLoading && <CircularProgress size={24} sx={{ mr: 2 }} />}
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalConfirmation;
