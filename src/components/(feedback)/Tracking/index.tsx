import { type ReactNode, useState } from 'react';
import { Box, Button, Chip, Collapse, Typography } from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrackingItem from './components/Item';
import type { TrackingProps } from './type';

/**
 * A ui that's designed for show status tracking.
 *
 * @returns {React.JSX}
 */
const Tracking = ({ statusLabel, statusColor, list }: TrackingProps): Readonly<ReactNode> => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box data-testid="Tracking">
      <Box display="flex" justifyContent="space-between" columnGap={4}>
        <Chip color={statusColor} label={statusLabel} />
        <Button
          endIcon={
            <ExpandMoreOutlinedIcon
              fontSize="inherit"
              sx={{ transition: 'all 150ms', transform: `rotate(${!isOpen ? '0deg' : '180deg'})` }}
            />
          }
          onClick={() => setIsOpen(prev => !prev)}
        >
          Lihat Detail
        </Button>
      </Box>
      <Collapse in={isOpen} sx={{ mt: 2, '.MuiCollapse-wrapper': { backgroundColor: 'transparent' } }}>
        {list.length > 0 ? (
          list.map((item, index) => (
            <TrackingItem
              key={item.unique}
              date={item.date}
              desc={item.desc}
              isLast={index === 0}
              time={item.time}
              title={item.title}
            />
          ))
        ) : (
          <Typography alignItems="center" display="flex" fontSize={12} justifyContent="center">
            <InfoOutlinedIcon fontSize="small" sx={{ mr: 2 }} />
            Tidak ada status yang ditemukan!
          </Typography>
        )}
      </Collapse>
    </Box>
  );
};

export default Tracking;
