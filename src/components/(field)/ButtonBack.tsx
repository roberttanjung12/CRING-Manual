import React, { type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { Button, type ButtonProps } from '@mui/material';

interface Props {
  /**
   * The URL to navigate to when the button is clicked
   */
  href: string;
  /**
   * Label for the button
   * @default 'Kembali'
   */
  label?: string;
  /**
   * Size of the button
   */
  size?: ButtonProps['size'];
  /**
   * Variant of the button
   * @default 'outlined'
   */
  variant?: ButtonProps['variant'];
  /**
   * Color of the button
   * @default 'error'
   */
  color?: ButtonProps['color'];
  /**
   * Start icon for the button
   */
  startIcon?: ReactNode;
  /**
   * Props to be passed to the button component
   */
  buttonProps?: Omit<ButtonProps, 'variant' | 'color' | 'startIcon'>;
  onBack?: () => void;
}

/**
 * A back navigation button component that integrates with React Hook Form and Next.js router.
 *
 * @returns {React.JSX} A readonly React node representing the back button
 *
 * @remarks
 * The button is automatically disabled when a form is submitting (determined by React Hook Form's isSubmitting state).
 * If onBack function is provided, it takes precedence over href navigation.
 */
const ButtonBack = ({
  href,
  label = 'Kembali',
  size,
  variant = 'outlined',
  color = 'error',
  startIcon,
  buttonProps,
  onBack
}: Props): Readonly<ReactNode> => {
  const {
    formState: { isSubmitting }
  } = useFormContext();

  const { push } = useRouter();

  return (
    <Button
      disabled={isSubmitting}
      size={size}
      variant={variant}
      color={color}
      startIcon={startIcon}
      sx={{ minWidth: 'unset' }}
      onClick={() => (typeof onBack === 'function' ? onBack() : push(href))}
      {...buttonProps}
    >
      {label}
    </Button>
  );
};

export default ButtonBack;
