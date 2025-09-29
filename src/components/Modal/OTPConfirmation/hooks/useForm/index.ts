import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAes from '@/hooks/useAes';
import validationModalOTPConfirmationOtpForm from './schema';
import type {
  ModalOTPConfirmationOtpForm,
  ModalOTPConfirmationOtpFormValues,
  UseModalOTPConfirmationFormProps
} from './type';
import onAddOTPConfirmation from '../../services/addOTPConfirmation';

/**
 * A hook custom that's used for managing accept bulk form.
 *
 * @param {Props}
 *
 * @returns {ModalOTPConfirmationOtpForm}
 */
const useModalOTPConfirmationForm = ({
  service,
  OTPLength = 6,
  onClose,
  onError,
  onSucess
}: UseModalOTPConfirmationFormProps): ModalOTPConfirmationOtpForm => {
  const { onEncrypt } = useAes();

  const method = useForm<ModalOTPConfirmationOtpFormValues>({
    mode: 'all',
    resolver: zodResolver(validationModalOTPConfirmationOtpForm(OTPLength)),
    defaultValues: {
      otp: '',
      error: ''
    }
  });

  const { reset, setError } = method;

  const setPayload = (value: ModalOTPConfirmationOtpFormValues) => {
    const set: { [key: string]: any } = {};

    service.submit.shape.payload.forEach(item => {
      if (item.isOtp) set[item.key] = onEncrypt(value.otp);
      else set[item.key] = item.value;
    });

    return set;
  };

  const onSubmit = async (value: ModalOTPConfirmationOtpFormValues): Promise<void> => {
    await onAddOTPConfirmation(service.submit.endpoint, setPayload(value), message => {
      setError('error', { type: 'onChange', message });

      if (typeof onError === 'function') onError(message);
    });

    reset();

    if (typeof onSucess === 'function') onSucess();

    if (typeof onClose === 'function') onClose();
  };

  return { method, onSubmit };
};

export default useModalOTPConfirmationForm;
