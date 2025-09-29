import { onGet } from '@/services';

type GetMerchantStatusPks = 'Aktif' | 'Kadaluwarsa' | 'Segera Berakhir' | 'Belum Ditentukan';

interface GetMerchantKeyParams {
  keys:
    | 'limit'
    | 'offset'
    | 'parentId'
    | 'merchantId'
    | 'name'
    | 'mccName'
    | 'statusPKS'
    | 'active'
    | 'isDTTOT'
    | 'isPPSPM'
    | 'statusApplication';
}

interface GetMerchantParams {
  limit: number;
  offset: number;
  parentId?: string;
  merchantId?: string;
  name?: string;
  mccName?: string;
  statusPKS?: GetMerchantStatusPks;
  active?: 'true' | 'false';
  isDTTOT?: 'true' | 'false';
  isPPSPM?: 'true' | 'false';
  parentOnly?: 'true' | 'false';
  statusApplication?: string;
}

interface GetMerchantCreatedByEnum {
  name: string;
  role: string;
}

interface GetMerchant {
  isDTTOT: boolean;
  isPPSPM: boolean;
  status: boolean;
  id: string;
  name: string;
  mccName: string;
  createdBy: GetMerchantCreatedByEnum;
  updatedBy: GetMerchantCreatedByEnum;
  parentId: string;
  parentName: string;
  ipAddress: string[];
  createdAt: Date;
  updatedAt: Date;
  joinedDate: Date;
  joiningEndDate: Date;
  statusPKS: GetMerchantStatusPks;
  picChangeStatus: string;
  statusApplication: string;
  countView: number;
  actionDate: string;
}

const onGetMerchant = (params?: GetMerchantParams) => onGet<GetMerchantParams, GetMerchant[]>('/merchants', { params });

export type { GetMerchantStatusPks, GetMerchantKeyParams, GetMerchantParams, GetMerchant };

export default onGetMerchant;
