import type { ReactNode } from 'react';
import { type ButtonProps, Button } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useBlockerContext } from '@/context/BlockerProvider';

interface Props {
  labelLocked?: string;
  labelUnlocked?: string;
  color?: ButtonProps['color'];
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
}

/**
 * Renders a button that toggles between "locked" and "unlocked" states based on the context.
 *
 * - When locked, displays a button with a "visibility" icon and the `labelLocked` text.
 * - When unlocked, displays a button with a "visibility off" icon and the `labelUnlocked` text.
 * - Button appearance can be customized via `color`, `size`, and `variant` props.
 *
 * @returns {React.JSX} A readonly React node representing the toggle button.
 */
const BlockerProviderButtonMask = ({
  labelLocked = 'Lihat Data',
  labelUnlocked = 'Tutup Data',
  color = 'primary',
  size,
  variant = 'outlined'
}: Props): Readonly<ReactNode> => {
  const { isLocked, onOpen, onClose } = useBlockerContext();

  return isLocked ? (
    <Button color={color} size={size} variant={variant} sx={{ minWidth: 0, whiteSpace: 'pre' }} onClick={onOpen}>
      <VisibilityOutlinedIcon sx={{ mr: 2 }} />
      {labelLocked}
    </Button>
  ) : (
    <Button color={color} size={size} variant={variant} sx={{ minWidth: 0, whiteSpace: 'pre' }} onClick={onClose}>
      <VisibilityOffOutlinedIcon sx={{ mr: 2 }} />
      {labelUnlocked}
    </Button>
  );
};

export default BlockerProviderButtonMask;
