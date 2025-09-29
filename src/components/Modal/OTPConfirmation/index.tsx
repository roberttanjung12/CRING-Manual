import { type ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';
import { Alert, Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import useModalOTPConfirmationForm from './hooks/useForm';
import type { ModalOTPConfirmationProps } from './type';
import ModalOTPConfirmationButtonResend from './ui/(button)/ButtonResend';
import ModalOTPConfirmationButtonSubmit from './ui/(button)/ButtonSubmit';
import ModalOTPConfirmationFieldOtp from './ui/(field)/FieldOtp';

/**
 * A component that's designed for showing add bulk.
 *
 * @returns {React.JSX}
 */
const ModalOTPConfirmation = ({
  isOpen,
  service,
  resendAt,
  OTPLength = 6,
  title = 'Verifikasi Keamanan',
  text = (
    <>
      Kami mendeteksi proses masuk yang berbeda. <br /> Masukkan OTP yang telah dikirim ke email Anda.
    </>
  ),
  buttonSubmitLabel = 'Masuk',
  buttonResendLabel = 'Kirim Ulang OTP',
  onClose,
  onResendAt,
  onError,
  onSucess
}: ModalOTPConfirmationProps): Readonly<ReactNode> => {
  const { method, onSubmit } = useModalOTPConfirmationForm({ service, OTPLength, onClose, onError, onSucess });

  const {
    formState: { errors },
    handleSubmit
  } = method;

  return (
    <Dialog data-testid="ModalOTPConfirmationButtonCancelReminder" fullWidth maxWidth="sm" open={isOpen}>
      <DialogContent>
        <FormProvider {...method}>
          <Box component="form" textAlign="center" onSubmit={handleSubmit(onSubmit)}>
            <Typography
              component="div"
              mt={6}
              fontSize={20}
              fontWeight={700}
              sx={{ color: ({ palette }) => palette.common.black }}
            >
              <>{title}</>
            </Typography>
            <Typography component="div" mb={5} fontSize={16} sx={{ color: ({ palette }) => palette.grey[100] }}>
              <>{text}</>
            </Typography>
            <Stack spacing={6} textAlign="left">
              {errors?.error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errors?.error.message}
                </Alert>
              )}
              <ModalOTPConfirmationFieldOtp OTPLength={OTPLength} />
            </Stack>
            <Box mt={6}>
              <ModalOTPConfirmationButtonSubmit buttonSubmitLabel={buttonSubmitLabel} />
              <ModalOTPConfirmationButtonResend
                service={service}
                resendAt={resendAt}
                buttonResendLabel={buttonResendLabel}
                onResendAt={onResendAt}
              />
            </Box>
          </Box>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ModalOTPConfirmation;
