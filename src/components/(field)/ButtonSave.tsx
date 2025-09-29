import { type ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, type ButtonProps, CircularProgress } from '@mui/material';

interface Props {
  /**
   * Label for the button
   * @default 'Simpan'
   */
  label?: string;
  /**
   * Size of the button
   */
  size?: ButtonProps['size'];
  /**
   * Variant of the button
   */
  variant?: ButtonProps['variant'];
  /**
   * Color of the button
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
}

/**
 * A form save button component that integrates with React Hook Form.
 *
 * This component automatically handles form submission state by:
 * - Disabling the button when the form is invalid or currently submitting
 * - Switching from submit to button type during submission to prevent multiple submissions
 * - Displaying a loading spinner instead of the start icon during submission
 *
 * @returns {React.JSX} A readonly React node representing the save button
 *
 * @requires useFormContext - Must be used within a FormProvider context from React Hook Form
 */
const ButtonSave = ({ label = 'Simpan', size, variant, color, startIcon, buttonProps }: Props): Readonly<ReactNode> => {
  const {
    formState: { isValid, isSubmitting }
  } = useFormContext();

  return (
    <Button
      type={!isSubmitting ? 'submit' : 'button'}
      disabled={!isValid || isSubmitting}
      size={size}
      variant={variant}
      color={color}
      startIcon={!isSubmitting ? startIcon : <CircularProgress size={14} />}
      sx={{ minWidth: 'unset' }}
      {...buttonProps}
    >
      {label}
    </Button>
  );
};

export default ButtonSave;
