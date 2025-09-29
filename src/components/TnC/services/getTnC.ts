import onGet from '@/services';

interface GetTnC {
  message: string;
}

const onGetTnC = () => onGet<any, GetTnC>('/user/tnc', { isDisabledAuth: true });

export type { GetTnC };

export default onGetTnC;
