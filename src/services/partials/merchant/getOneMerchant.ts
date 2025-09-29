'use client';

import { onGet } from '@/services';
import onEncrypt from '@/utility/aes';

interface GetOneMerchantParams {
  isMasking: string;
}

interface GetOneMerchantCreatedBy {
  name: string;
  role: string;
}

interface GetOneMerchantDocument {
  label: string;
  name: string;
  mimeType: string;
  file: string;
}

interface GetOneMerchantProduct {
  status: boolean;
  account_no: string;
  api_key: string;
  bank: string;
  channel_id: string;
  cid: string;
  client_id: string;
  email_approver: string;
  partner_service_id: string;
  password: string;
  product_id: string;
  secret_key: string;
  username: string;
}

interface GetOneMerchant {
  isHaveSubMerchant: true;
  isDTTOT: boolean;
  isPPSPM: boolean;
  id: string;
  secret: string;
  name: string;
  address: string;
  city: string;
  province: string;
  email: string;
  phone: string;
  businessType: string;
  mccId: string;
  status: true;
  joinedDate: Date;
  joiningEndDate: Date;
  callback: URL;
  callback_rdl: URL;
  legalType: string;
  totalEmployee: string;
  picName: string;
  picEmail: string;
  picPhone: string;
  picChangeStatus: string;
  createdBy: GetOneMerchantCreatedBy;
  createdAt: Date;
  parentId: string;
  parentName: string;
  statusPKS: 'Belum Ditentukan' | 'Kadaluwarsa' | 'Segera Berakhir' | 'Aktif';
  makerChangeStatus: string;
  approverChangeStatus: string;
  ipAddress: string[];
  mccName: string;
  mccMdrOnUs: number;
  mccMdrOffUs: number;
  documents: GetOneMerchantDocument[];
  products: [GetOneMerchantProduct];
}

const onGetOneMerchant = (id: string, params?: GetOneMerchantParams) =>
  onGet<any, GetOneMerchant>(`/merchants/${id}`, { params: { isMasking: onEncrypt('true'), ...params } });

export type {
  GetOneMerchantParams,
  GetOneMerchantCreatedBy,
  GetOneMerchantDocument,
  GetOneMerchantProduct,
  GetOneMerchant
};

export default onGetOneMerchant;
