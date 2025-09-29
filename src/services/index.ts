import axios, { type AxiosRequestConfig, type AxiosError, type AxiosResponse, type ResponseType } from 'axios';
import isMultiSession from '@/utility/is-multi-session';
import { getValidAccessToken } from '@/utility/local-storage';

interface ServiceProps<TParams> {
  isDisabledAuth?: boolean;
  token?: string;
  params?: TParams;
  contentType?: string;
  responseType?: ResponseType;
}

const instance = axios.create();

const config = <TParams>(newConfig?: ServiceProps<TParams>): AxiosRequestConfig => {
  const getToken = newConfig?.token ?? getValidAccessToken();
  const set: AxiosRequestConfig = {
    headers: {
      'Content-Type': newConfig?.contentType ?? 'application/json',
      Authorization: `Bearer ${getToken}`
    },
    params: newConfig?.params,
    responseType: newConfig?.responseType
  };

  if (newConfig?.isDisabledAuth) delete set.headers?.Authorization;

  return set;
};

const onGet = async <TParams, TResponse>(
  url: string,
  newConfig?: ServiceProps<TParams>,
  onError?: (error: AxiosError<{ message: string; lockTime: Date }>) => void
): Promise<AxiosResponse<TResponse>> => {
  try {
    return await instance.get(url, config<TParams>(newConfig));
  } catch (error) {
    const getError = error as AxiosError<{ message: string; lockTime: Date }>;

    isMultiSession(getError.response, true);

    if (typeof onError === 'function') onError(getError);

    throw error;
  }
};

const onPost = async <TParams, TData, TResponse>(
  url: string,
  data: TData,
  option?: {
    isCloseSession?: boolean;
    config?: ServiceProps<TParams>;
    onError?: (error: AxiosError<{ message: string; lockTime: Date }>) => void;
  }
): Promise<AxiosResponse<TResponse>> => {
  try {
    return await instance.post(url, data, config<TParams>(option?.config));
  } catch (error) {
    const getError = error as AxiosError<{ message: string; lockTime: Date }>;

    if (!option?.isCloseSession) isMultiSession(getError.response, true);

    if (typeof option?.onError === 'function') option.onError(getError);

    throw error;
  }
};

const onPatch = async <TParams, TData, TResponse>(
  url: string,
  data: TData,
  option?: {
    isCloseSession?: boolean;
    config?: ServiceProps<TParams>;
    onError?: (error: AxiosError<{ message: string; lockTime: Date }>) => void;
  }
): Promise<AxiosResponse<TResponse>> => {
  try {
    return await instance.patch(url, data, config<TParams>(option?.config));
  } catch (error) {
    const getError = error as AxiosError<{ message: string; lockTime: Date }>;

    if (!option?.isCloseSession) isMultiSession(getError.response, true);

    if (typeof option?.onError === 'function') option.onError(getError);

    throw error;
  }
};

const onDelete = async <TParams, TResponse>(
  url: string,
  option?: {
    isCloseSession?: boolean;
    config?: ServiceProps<TParams>;
    onError?: (error: AxiosError<{ message: string; lockTime: Date }>) => void;
  }
): Promise<AxiosResponse<TResponse>> => {
  try {
    return await instance.delete(url, config<TParams>(option?.config));
  } catch (error) {
    const getError = error as AxiosError<{ message: string; lockTime: Date }>;

    if (!option?.isCloseSession) isMultiSession(getError.response, true);

    isMultiSession(getError.response, true);

    if (typeof option?.onError === 'function') option.onError(getError);

    throw error;
  }
};

export { instance, onGet, onPost, onPatch, onDelete };

export default onGet;
