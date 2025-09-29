import Image from 'next/image';
import { Dialog, DialogContent, Box, Button } from '@mui/material';
import PropsTypes from 'prop-types';

const ModalReminder = ({
  isShow,
  icon = '/assets/images/icons/deleted.svg',
  msg = 'Apakah anda yakin?',
  msgText = '',
  msgButtonCancel = 'Batal',
  msgButtonOk = 'Hapus',
  onClose = null,
  onReminderOk = null
}) => {
  return (
    <Dialog fullWidth maxWidth="sm" open={isShow} onClose={onClose}>
      <DialogContent>
        <Box textAlign="center" p={5}>
          {icon && (
            <Box id="box:icon" mb={5}>
              <Image alt="icon" height={205} src={icon} width={232} />
            </Box>
          )}
          <Box id="box:msg--button">
            <Box className="text-semi-bold" id="box:msg" mb={8} sx={{ fontSize: '16px' }}>
              {msg}
            </Box>
            {msgText && (
              <Box id="box:msg-text" mb={8}>
                {msgText}
              </Box>
            )}
            <Box display="flex" id="box:button" justifyContent="center">
              {msgButtonCancel && (
                <Box mx={3}>
                  <Button color="primary" size="large" variant="outlined" onClick={() => onClose()}>
                    {msgButtonCancel}
                  </Button>
                </Box>
              )}
              {msgButtonOk && (
                <Box mx={3}>
                  <Button color="secondary" size="large" variant="contained" onClick={() => onReminderOk()}>
                    {msgButtonOk}
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

ModalReminder.propTypes = {
  isShow: PropsTypes.bool,
  icon: PropsTypes.string,
  msg: PropsTypes.string,
  msgText: PropsTypes.string,
  msgButtonCancel: PropsTypes.string,
  msgButtonOk: PropsTypes.string,
  onClose: PropsTypes.func,
  onReminderOk: PropsTypes.func
};

export default ModalReminder;
