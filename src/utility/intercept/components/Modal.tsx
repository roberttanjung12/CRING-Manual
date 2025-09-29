import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, Box, Typography } from '@mui/material';
import type { OnInterceptProps } from '../type';
import InterceptButtonCancel from '../ui/(button)/ButtonCancel';
import InterceptButtonNext from '../ui/(button)/ButtonNext';

interface Props extends OnInterceptProps {
  IDElement: string;
  onNext: () => void;
  onCancel?: () => void;
}

/**
 * A modal that's designed for showing the modal of Intercept.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const InterceptModal = ({
  IDElement,
  icon = '/giff/question.gif',
  title = 'Lanjutkan aktifitas?',
  message = 'Tetap, ingin melanjutkan aktifitas?',
  buttonCancel,
  buttonNext,
  onNext,
  onCancel
}: Props): Readonly<ReactNode> => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog id={IDElement} fullWidth maxWidth="sm" open={isOpen}>
      <DialogContent sx={{ py: 6 }}>
        <Box display="flex" justifyContent="center">
          <Box>{typeof icon === 'string' ? <Image alt="icon" height={163} src={icon} width={163} /> : icon}</Box>
        </Box>
        <Typography mt={4} textAlign="center" fontSize="20px" fontWeight={700} whiteSpace="pre-line">
          {title}
        </Typography>
        <Typography
          component="div"
          mt={2}
          textAlign="center"
          fontSize="16px"
          sx={{ color: ({ palette }) => palette.grey[100] }}
        >
          {message}
        </Typography>
        <Box display="flex" justifyContent="center" columnGap={4} mt={4}>
          <InterceptButtonCancel
            IDElement={IDElement}
            label={buttonCancel?.label}
            variant={buttonCancel?.variant}
            color={buttonCancel?.color}
            size={buttonCancel?.size}
            sx={buttonCancel?.sx}
            onOpen={setIsOpen}
            onCancel={onCancel}
          />
          <InterceptButtonNext
            IDElement={IDElement}
            label={buttonNext?.label}
            variant={buttonNext?.variant}
            color={buttonNext?.color}
            size={buttonNext?.size}
            sx={buttonNext?.sx}
            onOpen={setIsOpen}
            onNext={onNext}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InterceptModal;
