import type { ReactNode } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, Box, Button, Typography } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import type { DttotProviderModalProps } from '../type';

/**
 * A modal component that's designed for show modal dttot provider
 *
 * @returns {React.JSX}
 */
const DttotProviderModal = ({
  isOpen,
  isHideNext,
  errorMessage,
  onClose,
  onSubmit
}: DttotProviderModalProps): Readonly<ReactNode> => {
  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen}>
      <DialogContent>
        <Box textAlign="center" p={5}>
          <Box id="box:icon" mb={5}>
            <Image alt="icon" height={190} src="/giff/warning.gif" width={190} />
          </Box>
          <Typography sx={{ mt: 2, fontSize: '20px', fontWeight: 700 }}>Peringatan!</Typography>
          <Typography sx={{ mt: 2 }}>{errorMessage}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: 4, mt: 4 }}>
            <Button color="secondary" size="large" sx={{ minWidth: 0 }} variant="outlined" onClick={() => onClose()}>
              Kembali
            </Button>
            {!isHideNext && (
              <Button color="primary" size="large" sx={{ minWidth: 0 }} variant="contained" onClick={() => onSubmit()}>
                Lanjutkan <ChevronRightOutlinedIcon />
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DttotProviderModal;
