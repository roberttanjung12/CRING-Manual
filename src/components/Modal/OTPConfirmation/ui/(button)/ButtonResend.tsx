import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import qs from 'qs';
import useSWRImmutable from 'swr/immutable';
import TImer from '@/components/TImer';
import onAddOTPConfirmationResend from '../../services/addOTPConfirmationResend';
import onGetOTPConfirmationResend from '../../services/getOTPConfirmationResend';
import type {
  ModalOTPConfirmationButtonResendLabel,
  ModalOTPConfirmationOnResendAt,
  ModalOTPConfirmationOTPService,
  ModalOTPConfirmationResendAt
} from '../../type';

interface Props
  extends ModalOTPConfirmationOTPService,
    ModalOTPConfirmationResendAt,
    ModalOTPConfirmationButtonResendLabel,
    ModalOTPConfirmationOnResendAt {}

/**
 * A component that's designed for showing resend button.
 *
 * @returns {React.JSX}
 */
const ModalOTPConfirmationButtonResend = ({
  service,
  resendAt,
  buttonResendLabel,
  onResendAt
}: Props): Readonly<ReactNode> => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const params = useMemo(() => {
    const set: { [key: string]: any } = {};

    service.resend.get?.shape.payload.forEach(item => {
      set[item.key] = item.value;
    });

    return set;
  }, [service.resend.get?.shape.payload]);

  useSWRImmutable(
    service.resend.get?.endpoint && `/otp?${qs.stringify(params)}`,
    () => onGetOTPConfirmationResend(service.resend.get?.endpoint ?? '', params),
    {
      onSuccess: data => {
        if (typeof onResendAt === 'function') {
          const getResendAt = service.resend.get?.shape.success.find(item => item.isResendAt);

          if (getResendAt?.key) onResendAt(data?.data[getResendAt.key]);
        }
      }
    }
  );

  const setRenderTimer = useCallback(
    ({ minutes = '00', seconds = '00' }) => (
      <Typography fontWeight={700}>
        {buttonResendLabel} ({minutes}:{seconds})
      </Typography>
    ),
    [buttonResendLabel]
  );

  const setPayload = () => {
    const set: { [key: string]: any } = {};

    service.resend.submit.shape.payload.forEach(item => {
      if (item.value) set[item.key] = item.value;
    });

    return set;
  };

  const onResend = async () => {
    setIsSubmitting(true);

    const { data } = await onAddOTPConfirmationResend(service.resend.submit.endpoint, setPayload());

    if (typeof onResendAt === 'function') {
      const getResendAt = service.resend.submit.shape.success.find(item => item.isResendAt);

      if (getResendAt?.key) onResendAt(data[getResendAt.key]);
    }

    setIsSubmitting(false);
  };

  return (
    <Box data-testid="ModalOTPConfirmationButtonResend" display="flex" justifyContent="center" mt={4}>
      <TImer expiredIn={resendAt ?? new Date()} timer={setRenderTimer}>
        <>
          {!isSubmitting ? (
            <Typography
              component="a"
              fontWeight={700}
              sx={{ color: ({ palette }) => palette.primary.main }}
              onClick={onResend}
            >
              {buttonResendLabel}
            </Typography>
          ) : (
            <Typography fontWeight={700}>Sedang mengirim ulang OTP...</Typography>
          )}
        </>
      </TImer>
    </Box>
  );
};

export default ModalOTPConfirmationButtonResend;
