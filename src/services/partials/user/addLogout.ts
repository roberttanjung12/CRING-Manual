import { onPost } from '@/services';
import errorMessage from '@/utility/error-messages';

interface AddLogoutPayload {
  accessToken: string;
}

interface AddLogout {
  message: string;
}

const onAddLogout = (payload: AddLogoutPayload, onError?: (args: { message: string; lockTime: Date }) => void) =>
  onPost<any, AddLogoutPayload, AddLogout>('/user/logout', payload, {
    onError: ({ response }) =>
      typeof onError === 'function' &&
      onError({ message: errorMessage(response?.data?.message), lockTime: response?.data?.lockTime ?? new Date() })
  });

export type { AddLogoutPayload, AddLogout };

export default onAddLogout;
