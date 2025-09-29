import AxiosError from 'axios-error';
import isMultiSession from '@/utility/is-multi-session';
import serviceError from '@/utility/service-error';
import instance from './axios';

const services = async ({
  method = 'GET',
  url = '',
  data = null,
  params,
  contentType = '',
  responseType = '',
  token = '',
  configs = null,
  onError = null
}) => {
  try {
    const set = {
      method,
      url
    };

    if (token) set.token = token;

    if (data) set.data = data;

    if (params) set.params = params;

    if (contentType) set.contentType = contentType;

    if (responseType) set.responseType = responseType;

    const send = await instance(set);

    return { status: true, data: send };
  } catch (err) {
    const getErrors = new AxiosError(err).response;
    let isShowPopupError = method !== 'GET';

    isMultiSession(err);

    if (configs?.isHidePopupError) isShowPopupError = false;

    if (isShowPopupError) serviceError(err);

    if (typeof onError === 'function') onError(err);

    return { status: false, data: getErrors };
  }
};

export default services;
