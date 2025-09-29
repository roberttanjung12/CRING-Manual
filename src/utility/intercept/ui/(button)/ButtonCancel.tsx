import { type ReactNode } from 'react';
import { Button } from '@mui/material';
import type { OnInterceptButtonCancelEnum } from '../../type';

interface Props extends OnInterceptButtonCancelEnum {
  IDElement: string;
  onOpen: (status: boolean) => void;
  onCancel?: () => void;
}

/**
 * A button that's designed for showing cancel button.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const InterceptButtonCancel = ({
  IDElement,
  label = 'Batal',
  variant = 'outlined',
  color = 'secondary',
  size = 'large',
  sx,
  onOpen,
  onCancel
}: Props): Readonly<ReactNode> => {
  const onClose = () => {
    const getIDElement = document.getElementById(IDElement);

    onOpen(false);
    onCancel?.();

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

export default InterceptButtonCancel;
