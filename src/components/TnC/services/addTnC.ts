import { onPost } from '@/services';

interface AddTnCPayload {
  tncStatus: boolean;
}

interface AddTnC {
  message: string;
}

const onAddTnC = (payload: AddTnCPayload, token?: string) =>
  onPost<any, AddTnCPayload, AddTnC>('/user/agreement', payload, {
    config: {
      token
    }
  });

export type { AddTnCPayload, AddTnC };

export default onAddTnC;
