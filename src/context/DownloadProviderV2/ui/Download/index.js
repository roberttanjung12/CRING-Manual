import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
import fileDownload from 'js-file-download';
import { func, oneOf, string } from 'prop-types';
import useSWRImmutable from 'swr/immutable';
import onGetDownloadStatus, { onGetDownloadFile } from '@/services/download';
import DownloadDownloadIndicator from './components/Indicator';

/**
 * A provider that's designed for show download.
 *
 * @param {Object} props list of prop
 * @param {String} props.requestId id of request
 * @param {String} props.name name of request
 * @param {'text/csv'|'text/xlsx'} props.mimeType name of request
 * @param {'csv'|'xlsx'} props.ext name of request
 * @param {Function} props.onDelete is used for delete flag
 *
 * @returns {React.JSX} download ui.
 */
const DownloadDownload = ({ requestId = '', name = '', mimeType = 'text/csv', ext = 'csv', onDelete = () => null }) => {
  const [refreshInterval, setRefreshInterval] = useState(5000);

  const [isDeleted, setIsDeleted] = useState(false);

  const [status, setStatus] = useState('');

  const {
    data = {
      status: false,
      data: {
        data: {
          percentage: 0
        }
      }
    }
  } = useSWRImmutable(
    !isDeleted && requestId && `/download-check/${requestId}`,
    () => onGetDownloadStatus({ id: requestId }),
    { refreshInterval }
  );

  const newData = useMemo(() => {
    const set = {
      percentage: 0
    };

    if (data.status) set.percentage = data.data.data.percentage * 100;

    return set;
  }, [data.data.data.percentage, data.status]);

  const { percentage } = newData;

  const {
    data: dataGenerate = {
      status: false,
      data: {
        data: null
      }
    }
  } = useSWRImmutable(
    !isDeleted && refreshInterval <= 0 && percentage >= 100 && `/download-generate/${requestId}`,
    () => onGetDownloadFile({ mimeType, params: { id: requestId } })
  );

  const onDownload = useCallback(() => {
    if (!isDeleted && dataGenerate.status) {
      const fileName = `${name}.${ext}`;

      fileDownload(dataGenerate.data.data, fileName);

      onDelete(requestId);

      setStatus('generated');
    }
  }, [dataGenerate.data.data, dataGenerate.status, ext, isDeleted, name, onDelete, requestId]);

  const onNewDelete = () => {
    onDelete(requestId);
    setIsDeleted(true);
  };

  useEffect(() => {
    if (percentage >= 100) setRefreshInterval(0);
  }, [percentage]);

  useEffect(() => {
    if (refreshInterval <= 0) onDownload();
  }, [onDownload, refreshInterval]);

  return (
    !isDeleted && (
      <Box
        borderBottom="1px solid #dbdbdb"
        columnGap={2}
        data-testid="DownloadDownload"
        display="flex"
        flexWrap="nowrap"
        position="relative"
        px={4}
        py={3}
      >
        <Box width="100%">
          <Typography fontSize={12} fontWeight={700}>
            {name}.{ext}
          </Typography>
          <LinearProgress
            sx={{
              width: '100%',
              '& .MuiLinearProgress-bar1Determinate': {
                background: ({ palette }) => (percentage < 100 ? palette.primary.main : palette.success.main)
              }
            }}
            value={percentage}
            variant="determinate"
          />
          {percentage >= 100 && status !== 'generated' && (
            <Typography data-testid="DownloadDownloadGenerate" fontSize={10} mt={1}>
              <CircularProgress size={7} /> Generating...
            </Typography>
          )}
        </Box>
        <DownloadDownloadIndicator percentage={percentage} status={status} onDelete={onNewDelete} />
      </Box>
    )
  );
};

DownloadDownload.propTypes = {
  requestId: string,
  name: string,
  mimeType: oneOf(['text/csv', 'text/xlsx']),
  ext: oneOf(['csv', 'xlsx']),
  onDelete: func
};

export default DownloadDownload;
