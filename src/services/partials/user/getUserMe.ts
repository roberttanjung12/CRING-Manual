import { onGet } from '@/services';
import type AuthActor from '@/types/actor';

interface GetUserMeRoleChild {
  name: string;
  description: string;
  id: string;
}

interface GetUserMeCreatedByChild {
  name: string;
  role: string;
}

interface GetUserMe {
  id: string;
  client_id: string;
  username: string;
  fullname: string;
  email: string;
  actor: AuthActor;
  roleId: string;
  role: GetUserMeRoleChild;
  status: boolean;
  createdBy: GetUserMeCreatedByChild;
  createdAt: Date;
  tncStatus: boolean;
}

const onGetUserMe = (token?: string) => onGet<any, GetUserMe>('/user/me', { token });

export type { GetUserMeRoleChild, GetUserMeCreatedByChild, GetUserMe };

export default onGetUserMe;
