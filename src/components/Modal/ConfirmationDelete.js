import Image from 'next/image';
import { Dialog, DialogContent, Box, Button, CircularProgress } from '@mui/material';
import PropsTypes from 'prop-types';

const ModalConfirmationDelete = ({
  isShow = false,
  isLoading = false,
  icon = '/assets/images/icons/deleted.svg',
  title,
  children,
  textButtonCancel = 'Batal',
  textButtonSave = 'Hapus',
  onCancel,
  onSave,
  onClose
}) => {
  // group: action
  const onModalClose = () => {
    if (typeof onClose === 'function') onClose();
  };

  const onModalCancel = () => {
    if (typeof onCancel === 'function') onCancel();

    onModalClose();
  };

  const onModalSave = async () => {
    if (typeof onSave === 'function') await onSave();
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={isShow} onClose={onModalClose}>
      <DialogContent>
        <Box textAlign="center" p={5}>
          {icon && (
            <Box id="box:icon">
              <Image alt="icon" height={163} src={icon} width={163} />
            </Box>
          )}
          <Box id="box:title">
            {title && (
              <Box className="text-bold" id="box:title" mt={5} sx={{ fontSize: '20px', whiteSpace: 'pre-line' }}>
                {title}
              </Box>
            )}
            {children && (
              <Box className="text-semi-bold" id="box:msg" mt={3} sx={{ fontSize: '16px', color: '#747070' }}>
                {children}
              </Box>
            )}
            <Box alignItems="center" columnGap={4} display="flex" id="box:button" justifyContent="center" mt={5}>
              <Button color="secondary" size="large" sx={{ minWidth: '0' }} variant="outlined" onClick={onModalCancel}>
                {textButtonCancel}
              </Button>
              <Button color="secondary" size="large" sx={{ minWidth: '0' }} variant="contained" onClick={onModalSave}>
                {textButtonSave}
              </Button>
              {isLoading && <CircularProgress size={24} sx={{ mr: 2 }} />}
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

ModalConfirmationDelete.propTypes = {
  isShow: PropsTypes.bool,
  isLoading: PropsTypes.bool,
  icon: PropsTypes.string,
  title: PropsTypes.string,
  children: PropsTypes.node,
  textButtonCancel: PropsTypes.string,
  textButtonSave: PropsTypes.string,
  onCancel: PropsTypes.func,
  onSave: PropsTypes.func,
  onClose: PropsTypes.func
};

export default ModalConfirmationDelete;
