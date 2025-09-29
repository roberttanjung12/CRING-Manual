import { useCallback } from 'react';

/**
 * A hook custom that's used for download.
 *
 * @param {Object} props list of prop
 * @param {Function} props.onAddFlag is used for add flag
 *
 * @typedef Hook
 * @property {Function} onAdd is used for download
 *
 * @returns {Hook} useful value.
 */
const useDownloadProviderAdd = ({ onAddFlag = () => null }) => {
  const onAdd = useCallback(
    async ({ name = '', mimeType = 'text/csv', ext = 'csv', endpoint = () => {} }) => {
      const { status, data } = await endpoint();

      if (status === true || status === 200) {
        const jobId = data?.data?.jobId || data?.jobId;

        onAddFlag({
          requestId: jobId,
          name,
          mimeType,
          ext
        });
      }
    },
    [onAddFlag]
  );

  return onAdd;
};

export default useDownloadProviderAdd;
