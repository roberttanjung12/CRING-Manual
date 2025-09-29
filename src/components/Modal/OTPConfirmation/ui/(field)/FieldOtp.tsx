import React, { type ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box } from '@mui/material';
import OtpInput from 'react-otp-input';
import ReactHookFromErrorMsg from '@/components/Form/ReactHookFormErrorMsg';
import type { ModalOTPConfirmationOtpFormValues } from '../../hooks/useForm/type';
import type { ModalOTPConfirmationOTPLength } from '../../type';

/**
 * A field component that's designed for field otp.
 *
 * @returns {React.JSX}
 */
const ModalOTPConfirmationFieldOtp = ({ OTPLength = 6 }: ModalOTPConfirmationOTPLength): Readonly<ReactNode> => {
  const {
    formState: { isSubmitting, errors },
    control
  } = useFormContext<ModalOTPConfirmationOtpFormValues>();

  return (
    <Box data-testid="ModalOTPConfirmationFieldOtp" display="flex" justifyContent="center">
      <Box className={errors?.otp ? 'spe-error-field' : ''}>
        <Controller
          control={control}
          name="otp"
          render={({ field: { value, onChange } }) => (
            <OtpInput
              shouldAutoFocus
              isDisabled={isSubmitting}
              inputStyle={{ height: '38px', width: '38px', border: '1px solid #8F8F8F', borderRadius: '8px' }}
              numInputs={OTPLength}
              separator={<div style={{ margin: '0 10px' }} />}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <ReactHookFromErrorMsg error={errors} field="otp" type="ori" />
      </Box>
    </Box>
  );
};

export default ModalOTPConfirmationFieldOtp;
