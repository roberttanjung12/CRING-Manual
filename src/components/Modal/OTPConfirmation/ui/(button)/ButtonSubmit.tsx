import { type ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button, CircularProgress } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import type { ModalOTPConfirmationOtpFormValues } from '../../hooks/useForm/type';
import type { ModalOTPConfirmationButtonSubmitLabel } from '../../type';

/**
 * A component that's designed for showing submit button.
 *
 * @returns {React.JSX}
 */
const ModalOTPConfirmationButtonSubmit = ({
  buttonSubmitLabel
}: ModalOTPConfirmationButtonSubmitLabel): Readonly<ReactNode> => {
  const {
    formState: { isValid, isSubmitting }
  } = useFormContext<ModalOTPConfirmationOtpFormValues>();

  if (isSubmitting) {
    return (
      <Button disabled color="primary" variant="contained" endIcon={<CircularProgress size={14} />} type="submit">
        Memproses...
      </Button>
    );
  }

  return (
    <Button
      disabled={!isValid}
      color="primary"
      variant="contained"
      endIcon={<ChevronRightOutlinedIcon fontSize="inherit" />}
      type="submit"
    >
      {buttonSubmitLabel}
    </Button>
  );
};

export default ModalOTPConfirmationButtonSubmit;
