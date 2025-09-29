import { onPost } from '@/services';
import errorMessage from '@/utility/error-messages';

const onAddOTPConfirmationResend = (url: string, payload: { [key: string]: any }, onError?: (error: string) => void) =>
  onPost<any, { [key: string]: any }, { [key: string]: any }>(url, payload, {
    onError: ({ response }) => typeof onError === 'function' && onError(errorMessage(response?.data?.message))
  });

export default onAddOTPConfirmationResend;
