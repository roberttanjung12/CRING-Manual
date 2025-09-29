import { useEffect, useState, type ReactNode } from 'react';
import { Dialog, DialogContent, Typography, DialogTitle, DialogActions, CircularProgress, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import parse from 'html-react-parser';
import useTnCMessage from './hooks/useMessage';
import type { TnCProps } from './type';
import TnCButtonAgree from './ui/(buttons)/ButtonAgree';

/**
 * A modal that's designed for show Terms and Conditional.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const TnC = ({ isService, isOpen, hasAgree, token, onClose, onAgree }: TnCProps): Readonly<ReactNode> => {
  const { isLoading, message } = useTnCMessage({ isOpen });

  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const [hasContent, setHasContent] = useState<boolean>(false);

  const onInit = () => {
    const getTncContent = document.getElementById('tnc-content');

    if (getTncContent) {
      const { scrollTop, scrollHeight, clientHeight } = getTncContent;

      if (scrollTop + clientHeight >= scrollHeight - 10) setIsEnabled(true);
      else setIsEnabled(false);
    }
  };

  const onScroll = (event: Event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget as HTMLElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) setIsEnabled(true);
    else setIsEnabled(false);
  };

  useEffect(() => {
    setTimeout(() => setHasContent(isOpen), 500);
  }, [isOpen]);

  useEffect(() => {
    const getTncContent = document.getElementById('tnc-content');

    if (hasContent && getTncContent) {
      onInit();

      getTncContent.addEventListener('scroll', onScroll);
    }

    return () => {
      if (getTncContent) getTncContent.removeEventListener('scroll', onScroll);
    };
  }, [hasContent]);

  return (
    <Dialog fullWidth maxWidth="lg" open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'end' }}>
        <Typography
          component="a"
          display="flex"
          alignItems="center"
          fontSize={14}
          onClick={onClose}
          sx={{ color: ({ palette }) => palette.info.main }}
        >
          Tutup <CloseIcon sx={{ ml: 2 }} />
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 5,
          px: 0,
          color: ({ palette }) => palette.common.black,
          h3: { textAlign: 'center' }
        }}
      >
        <Box id="tnc-content" maxHeight={{ xs: '65vh', lg: '50vh' }} overflow="auto">
          {isLoading ? (
            <Typography component="div" alignItems="center" display="flex" justifyContent="center">
              <CircularProgress size={14} sx={{ mr: 2 }} />
              Sedang mengambil data...
            </Typography>
          ) : (
            parse(message)
          )}
        </Box>
      </DialogContent>
      {!hasAgree && (
        <DialogActions>
          <TnCButtonAgree isEnabled={isEnabled} isService={isService} token={token} onAgree={onAgree} />
        </DialogActions>
      )}
    </Dialog>
  );
};

export default TnC;
