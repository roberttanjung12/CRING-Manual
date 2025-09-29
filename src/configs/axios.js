import axios from 'axios';
import ShortUniqueId from 'short-unique-id';
import { getValidAccessToken } from '@/utility/local-storage';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

const middleware = ({ disableAuth = false, token = '' }) => {
  const serviceToken = token || getValidAccessToken();
  const xMenu = axiosInstance.defaults.headers.common['X-Menu'];
  const baseUrl = `${window.location.origin}${window.location.pathname}`;

  if (!xMenu || !xMenu.includes(baseUrl)) {
    const { randomUUID } = new ShortUniqueId({ length: 36 });

    const randomId = randomUUID();

    const correlationId = `${baseUrl}?correlation-id=${randomId}`;

    axiosInstance.defaults.headers.common['X-Menu'] = correlationId;
  }

  if (serviceToken) axiosInstance.defaults.headers.common.authorization = `Bearer ${serviceToken}`;

  if (disableAuth || !serviceToken) delete axiosInstance.defaults.headers.common.authorization;
};

const instance = async ({
  method = 'GET',
  url,
  disableAuth = false,
  data = null,
  params = null,
  token = '',
  contentType = '',
  responseType = ''
}) => {
  const setInstance = {
    method,
    url
  };

  if (data) setInstance.data = data;

  if (params) setInstance.params = params;

  if (contentType) axiosInstance.defaults.headers['Content-Type'] = contentType;

  if (responseType) setInstance.responseType = 'blob';

  middleware({ disableAuth, token });

  return axiosInstance(setInstance);
};

export { instance, axiosInstance };

export default instance;
