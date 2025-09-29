import { Box, IconButton, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { func, number, oneOf } from 'prop-types';

/**
 * A provider that's designed for show download indicator.
 *
 * @param {Object} props list of prop
 * @param {Boolean} props.isDeleted status of deleted
 * @param {''|'generated'} props.status status of generated
 * @param {Number} props.percentage number of percent
 * @param {Function} props.onDelete is used for delete flag
 *
 * @returns {React.JSX} download indicator ui.
 */
const DownloadDownloadIndicator = ({ status = '', percentage = 0, onDelete = () => null }) => {
  return (
    <Box alignItems="center" columnGap={2} display="flex">
      {status !== 'generated' && (
        <>
          <Typography
            fontSize={12}
            fontWeight={percentage < 100 ? 400 : 600}
            pt={1}
            whiteSpace="pre"
            sx={{ color: ({ palette }) => (percentage < 100 ? palette.grey.A100 : palette.success.contrastText) }}
          >
            {percentage}%
          </Typography>
          <IconButton color="secondary" size="small" title="Hapus download" onClick={onDelete}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </>
      )}
      {status === 'generated' && <CheckCircleIcon color="success" />}
    </Box>
  );
};

DownloadDownloadIndicator.propTypes = {
  status: oneOf(['', 'generated']),
  percentage: number,
  onDelete: func
};

export default DownloadDownloadIndicator;
