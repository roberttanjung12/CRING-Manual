import { type ReactNode } from 'react';
import { Button } from '@mui/material';
import type { OnInterceptButtonNextEnum } from '../../type';

interface Props extends OnInterceptButtonNextEnum {
  IDElement: string;
  onOpen: (status: boolean) => void;
  onNext: () => void;
}

/**
 * A button that's designed for showing next button.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const InterceptButtonNext = ({
  IDElement,
  label = 'Lanjutkan',
  variant = 'contained',
  color = 'primary',
  size = 'large',
  sx,
  onOpen,
  onNext
}: Props): Readonly<ReactNode> => {
  const onClose = () => {
    const getIDElement = document.getElementById(IDElement);

    onOpen(false);
    onNext();

    if (getIDElement) {
      setTimeout(() => getIDElement.remove(), 300);
    }
  };

  return (
    <Button variant={variant} color={color} size={size} sx={{ minWidth: 0, ...sx }} onClick={onClose}>
      {label}
    </Button>
  );
};

export default InterceptButtonNext;
