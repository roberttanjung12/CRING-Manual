import { type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import type { TrackingRow } from '../type';

interface Props extends TrackingRow {
  isLast: boolean;
}

/**
 * A ui that's designed for show item status tracking.
 *
 * @returns {React.JSX}
 */
const TrackingItem = ({ isLast, date, time, title, desc }: Props): Readonly<ReactNode> => {
  return (
    <Box columnGap={2} data-testid="TrackingItem" display="flex" flexWrap="nowrap" mt={4}>
      <Box textAlign="right" whiteSpace="pre" width={80}>
        <Typography sx={{ color: ({ palette }) => palette.grey[100] }}>{date}</Typography>
        <Typography sx={{ color: ({ palette }) => palette.grey[100] }}>{time}</Typography>
      </Box>
      <Box
        borderRadius="100%"
        flex="0 0 21px"
        height="21px"
        sx={{
          borderWidth: 4,
          borderStyle: 'solid',
          borderColor: ({ palette }) => (!isLast ? '#DEDEDE' : palette.info.main)
        }}
        width="21px"
      />
      <Box width="100%">
        <Typography fontWeight={700}>{title}</Typography>
        <Typography sx={{ color: ({ palette }) => palette.grey[100] }}>{desc}</Typography>
      </Box>
    </Box>
  );
};

export default TrackingItem;
