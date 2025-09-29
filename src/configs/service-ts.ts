import type { AxiosError } from 'axios';
import isMultiSession from '@/utility/is-multi-session';
import serviceError from '@/utility/service-error';
import instance from './axios';

interface TypeServices {
  status: boolean;
  data: {
    data?: unknown;
    headers?: any;
  };
}

const services = async ({
  url,
  method = 'GET',
  data,
  params,
  contentType,
  responseType,
  token,
  configs,
  onError
}: {
  url: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  data?: { [key: string]: any };
  params?: { [key: string]: any };
  contentType?: string;
  responseType?: string;
  token?: string;
  configs?: { isHidePopupError?: boolean };
  onError?: (err: any) => void;
}): Promise<TypeServices> => {
  try {
    const set = {
      method,
      url
    };

    if (token) Object.assign(set, { token });

    if (data) Object.assign(set, { data });

    if (params) Object.assign(set, { params });

    if (contentType) Object.assign(set, { contentType });

    if (responseType) Object.assign(set, { responseType });

    const send = await instance(set);

    return { status: true, data: send };
  } catch (err) {
    const getErrors = err as AxiosError;
    let isShowPopupError = method !== 'GET';

    isMultiSession(err);

    if (configs?.isHidePopupError) isShowPopupError = false;

    if (isShowPopupError) serviceError(err);

    if (typeof onError === 'function') onError(err);

    return { status: false, data: { data: getErrors.response?.data } };
  }
};

export type { TypeServices };

export default services;
