'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button, type ButtonProps } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface Props {
  label: string;
  href: string;
  disabled?: ButtonProps['disabled'];
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  icon?: Readonly<ReactNode>;
  sx?: ButtonProps['sx'];
}

/**
 * A navigation that's designed for show redirect to button.
 *
 * @returns {React.JSX}
 */
const ButtonTo = ({
  label,
  href,
  sx,
  disabled = false,
  color = 'primary',
  variant = 'contained',
  size = 'large',
  icon = <AddCircleIcon fontSize="inherit" />
}: Props): Readonly<ReactNode> => {
  const { push } = useRouter();

  return (
    <Button
      disabled={disabled}
      color={color}
      variant={variant}
      size={size}
      startIcon={icon}
      sx={{ minWidth: 0, whiteSpace: 'pre', ...sx }}
      onClick={() => push(href)}
    >
      {label}
    </Button>
  );
};

export default ButtonTo;
