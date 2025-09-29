import { useCallback } from 'react';
import { useAuthenticationProvider } from '@/context/AuthenticationProvider';
import { useDispatch } from '@/store/hooks';
import { onStoreDownloadAdd, onStoreDownloadGet, onStoreDownloadLengthDelete } from '../slice';

/**
 * A hook custom that's used for managing download flag.
 *
 * @typedef Hook
 * @property {Array} downloads list of download
 * @property {Function} setDownloads is used for set downloads
 * @property {Function} onGet is used for get all download
 * @property {Function} onAdd is used for add new download flag
 * @property {Function} onDelete is used for delete a download flag
 *
 * @returns {Hook} useful value.
 */
const useDownloadProviderFlag = () => {
  const dispatch = useDispatch();

  const { username } = useAuthenticationProvider();

  const onGet = useCallback(() => {
    const getStorage = localStorage.getItem('DOWNLOADS');
    const getParse = getStorage ? JSON.parse(getStorage) : [];
    const set = getParse.length ? getParse.filter(item => item.username === username) : [];

    dispatch(onStoreDownloadGet(set));
  }, [username, dispatch]);

  const onAdd = useCallback(
    ({ requestId = '', name = '', mimeType = 'text/csv', ext = 'csv' }) => {
      const getStorage = localStorage.getItem('DOWNLOADS');
      const getParse = getStorage ? JSON.parse(getStorage) : [];
      const set = [...getParse];

      set.push({ requestId, username: username, name, mimeType, ext });

      localStorage.setItem('DOWNLOADS', JSON.stringify(set));

      dispatch(onStoreDownloadAdd(set));
    },
    [username, dispatch]
  );

  const onDelete = useCallback(
    (targetRequestId = '') => {
      const getStorage = localStorage.getItem('DOWNLOADS');
      const getParse = getStorage ? JSON.parse(getStorage) : [];
      const set = [];

      getParse.forEach(item => {
        if (item.requestId !== targetRequestId) set.push(item);
      });

      localStorage.setItem('DOWNLOADS', JSON.stringify(set));

      dispatch(onStoreDownloadLengthDelete());
    },
    [dispatch]
  );

  return { onGet, onAdd, onDelete };
};

export default useDownloadProviderFlag;
