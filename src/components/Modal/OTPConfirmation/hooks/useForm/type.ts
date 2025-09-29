import type { FieldValues, UseFormReturn } from 'react-hook-form';
import type {
  ModalOTPConfirmationOnCloseProp,
  ModalOTPConfirmationOnError,
  ModalOTPConfirmationOnSucces,
  ModalOTPConfirmationOTPLength,
  ModalOTPConfirmationOTPService
} from '../../type';

interface ModalOTPConfirmationOtpFormValues extends FieldValues {
  otp: string;
  error?: string;
}

interface ModalOTPConfirmationOtpFormOnSubmit {
  onSubmit: (value: ModalOTPConfirmationOtpFormValues) => Promise<void>;
}

interface ModalOTPConfirmationOtpForm extends ModalOTPConfirmationOtpFormOnSubmit {
  method: UseFormReturn<ModalOTPConfirmationOtpFormValues>;
}

interface UseModalOTPConfirmationFormProps
  extends ModalOTPConfirmationOTPService,
    ModalOTPConfirmationOTPLength,
    ModalOTPConfirmationOnCloseProp,
    ModalOTPConfirmationOnError,
    ModalOTPConfirmationOnSucces {}

export type {
  ModalOTPConfirmationOtpFormOnSubmit,
  ModalOTPConfirmationOtpFormValues,
  ModalOTPConfirmationOtpForm,
  UseModalOTPConfirmationFormProps
};
