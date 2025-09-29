import { onGet } from '@/services';

const onGetOTPConfirmationResend = (url: string, params?: { [key: string]: any }) =>
  onGet<any, { [key: string]: any }>(url, { params });

export default onGetOTPConfirmationResend;
