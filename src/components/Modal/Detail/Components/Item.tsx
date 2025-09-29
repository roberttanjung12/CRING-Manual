import { type ReactNode } from 'react';
import { Box, Chip, InputAdornment, TextField, TextareaAutosize, Typography } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ScrollContainer from 'react-indiana-drag-scroll';
import Indicator from '@/components/Elements/Indicator';
import setJson from '@/utility/set-json';
import type { TypeModalDetailItem } from '../type';

/**
 * A component that's designed for show item modal
 *
 * @param {Object} props list of prop
 * @param {TypeModalDetailItem} props.data list of data
 * @param {Number} props.index number of index
 *
 * @returns {React.JSX}
 */
const ModalDetailItem = ({ data, index }: { data: TypeModalDetailItem; index: number }): Readonly<ReactNode> => {
  return (
    <Box aria-label={`modal-detail-item-${index}`} data-testid="ModalDetailItem">
      {data.label && data.config.type !== 'indicator' && (
        <Typography component="label" sx={{ fontSize: '14px', color: '#363333', fontWeight: '600' }}>
          {data.label}
        </Typography>
      )}
      {data.label && data.config.type === 'indicator' && (
        <Indicator color={data.config.indicator}>{data.label}</Indicator>
      )}
      <Box mt={data.label ? 2 : 0}>
        {data.config.type === 'text' && <TextField disabled fullWidth value={data.value} />}
        {data.config.type === 'date' && (
          <TextField
            disabled
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarMonthOutlinedIcon />
                  </InputAdornment>
                )
              }
            }}
            value={data.value}
          />
        )}
        {data.config.type === 'status' && <Chip color={data.value?.color} label={data.value?.name} />}
        {data.config.type === 'json' && (
          <Box sx={{ p: 4, backgroundColor: '#DEDEDE', borderRadius: '5px' }}>
            <ScrollContainer
              className="scroll-container"
              hideScrollbars={false}
              ignoreElements=".--no-scroll, .tab-filter"
              style={{ overflow: 'auto' }}
            >
              <Box sx={{ whiteSpace: 'pre' }}>
                <span className="cursor-text --no-scroll" style={{ fontFamily: 'monospace' }}>
                  {setJson(data.value)}
                </span>
              </Box>
            </ScrollContainer>
          </Box>
        )}
        {data.config.type === 'currency' && (
          <TextField
            disabled
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 2 }}>
                    Rp
                  </InputAdornment>
                )
              }
            }}
            value={data.value}
          />
        )}
        {data.config.type === 'textarea' && <TextareaAutosize disabled minRows={2} value={data.value} />}
        {data.config.type === 'indicator' && (
          <TextField
            disabled
            fullWidth
            sx={{ '& > .MuiInputBase-root': { background: '#C6252533' } }}
            value={data.value}
          />
        )}
        {data.config.type === 'custom' && <>{data.value}</>}
      </Box>
    </Box>
  );
};

export default ModalDetailItem;
