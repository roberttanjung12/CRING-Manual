import { onGet } from '@/services';

const onGetAutocompleteAsync = (path: string, params?: { [key: string]: any }) =>
  onGet<{ [key: string]: any }, { [key: string]: any }[]>(path, { params });

export default onGetAutocompleteAsync;
