import { Box, Collapse, IconButton, Typography } from '@mui/material';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import { func } from 'prop-types';
import { useSelector, useDispatch } from '@/store/hooks';
import { onStoreDownloadShowToggle } from '../../slice';
import DownloadProviderDownload from '../../ui/Download';

/**
 * A provider that's designed for show wrapper.
 *
 * @param {Object} props list of prop
 * @param {Function} props.onDelete is used for delete request
 *
 * @returns {React.JSX} wrapper ui.
 */
const DownloadProviderWrapper = ({ onDelete = () => null }) => {
  const dispatch = useDispatch();

  const {
    downloadIsOpen,
    downloadIsShow,
    downloadData: downloads,
    downloadLength
  } = useSelector(state => state.download);

  const onShowToggle = (status = false) => {
    dispatch(onStoreDownloadShowToggle(status));
  };

  return (
    <Collapse data-testid="DownloadProviderWrapper" in={downloadIsOpen}>
      <Box
        bottom={0}
        boxShadow="0 0 8px #888"
        position="fixed"
        right={20}
        sx={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
        width={325}
        zIndex={1000}
      >
        <Box
          alignItems="center"
          bgcolor="#681298"
          boxShadow="0 4px 5px #cfcfcf"
          columnGap={2}
          display="flex"
          justifyContent="space-between"
          px={4}
          py={2}
          sx={{ borderTopRightRadius: 10, borderTopLeftRadius: 10, color: ({ palette }) => palette.common.white }}
        >
          <Typography fontWeight={700}>Daftar Download ({downloadLength})</Typography>
          <IconButton
            size="large"
            title="Buka daftar berkas yang sedang didownload"
            onClick={() => onShowToggle(!downloadIsShow)}
            color="inherit"
          >
            <ExpandCircleDownOutlinedIcon
              fontSize="medium"
              sx={{ transition: 'all .25s ease-in-out', transform: `rotate(${downloadIsShow ? 180 : 0}deg)` }}
            />
          </IconButton>
        </Box>
        <Collapse data-testid="DownloadProviderWrapper" in={downloadIsShow}>
          <Box bgcolor={({ palette }) => palette.background.default} height={300} overflow="auto">
            {downloads.map(({ requestId, name, mimeType, ext }) => (
              <DownloadProviderDownload
                key={requestId}
                ext={ext}
                mimeType={mimeType}
                name={name}
                requestId={requestId}
                onDelete={onDelete}
              />
            ))}
          </Box>
        </Collapse>
      </Box>
    </Collapse>
  );
};

DownloadProviderWrapper.propTypes = {
  onDelete: func
};

export default DownloadProviderWrapper;
