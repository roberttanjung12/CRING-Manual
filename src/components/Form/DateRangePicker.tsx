import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { Box, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import isEmpty from 'is-empty';
import moment from 'moment';
import { DateRangePicker, type Range } from 'react-date-range';
import onDefaultPeriod from '@/utility/default-period';

interface Type {
  onSet: (start: Date, end: Date) => void;
  start?: Date;
  end?: Date;
  onDelete: () => void;
  isHideTimes?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

/**
 * A component that's designed for showing date-range-picker
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const PayDateRangePicker = ({
  isHideTimes,
  minDate,
  maxDate,
  start,
  end,
  onSet,
  onDelete
}: Type): Readonly<ReactNode> => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectionRange, setSelectionRange] = useState<Range[]>([
    {
      startDate: undefined,
      endDate: undefined,
      key: 'selection'
    }
  ]);

  const setIsValue = () => !!(start && end);

  const setValue = () => {
    let set = '';

    if (start) set += `${moment(start).format('DD MMM YYYY')}`;
    else set += 'Dari';

    if (end) set += ` - ${moment(end).format('DD MMM YYYY')}`;
    else set += ' - Hingga';

    return set;
  };

  const setIsShowReset = () => {
    let set2 = false;
    let count = 0;

    if (!isEmpty(start) && !isEmpty(end)) {
      const start1 = moment(start).format('DD/MM/YYYY');
      const start2 = moment(onDefaultPeriod.start).format('DD/MM/YYYY');
      const end1 = moment(end).format('DD/MM/YYYY');
      const end2 = moment(onDefaultPeriod.end).format('DD/MM/YYYY');

      if (start1 !== start2) count += 1;
      if (end1 !== end2) count += 1;
    }

    if (isHideTimes) count = 0;

    if (count > 0) set2 = true;

    return set2;
  };

  const setup = () => {
    setTimeout(() => {
      const getEl = document.querySelector('.rdrInputRanges');

      if (getEl) getEl.remove();
    }, 1000);
  };

  const onSetDate = useCallback(() => {
    setSelectionRange(prevValue => {
      const setRange = [...prevValue];

      if (start && moment(start).format('DD/MM/YYYY') !== moment(setRange[0].startDate).format('DD/MM/YYYY'))
        setRange[0].startDate = new Date(start);
      if (end && moment(end).format('DD/MM/YYYY') !== moment(setRange[0].endDate).format('DD/MM/YYYY'))
        setRange[0].endDate = new Date(end);

      if (!start) setRange[0].startDate = undefined;
      if (!end) setRange[0].endDate = undefined;

      return setRange;
    });
  }, [end, start]);

  const onRange = (ranges: Range[]) => {
    let newStart: Date = new Date(moment(new Date()).format());
    let newEnd: Date = newStart;

    if (ranges[0].startDate) newStart = ranges[0].startDate;

    if (ranges[0].endDate) newEnd = ranges[0].endDate;

    if (typeof onSet === 'function') onSet(new Date(moment(newStart).format()), new Date(moment(newEnd).format()));

    setIsOpen(false);
  };

  useEffect(() => {
    setup();
  }, []);
  useEffect(() => {
    onSetDate();
  }, [onSetDate]);

  return (
    <Box>
      <div style={{ position: 'relative' }}>
        <Box
          alignItems="center"
          display="flex"
          id="field:spe-date-range"
          sx={{
            padding: '7.3px',
            backgroundColor: ({ palette }) => palette.background.paper,
            borderRadius: '5px',
            color: ({ palette }) => palette.grey.A100
          }}
        >
          <Box alignItems="center" display="flex" id="spe-date-range:calendar">
            <CalendarMonthIcon />
          </Box>
          <Box
            id="spe-date-range:field"
            mx={3}
            sx={{
              color: ({ palette }) => (setIsValue() ? palette.grey.A100 : palette.grey[100]),
              cursor: 'pointer'
            }}
            onClick={() => setIsOpen(true)}
          >
            {setValue()}
          </Box>
          {setIsShowReset() && (
            <Box
              alignItems="center"
              display="flex"
              id="spe-date-range:close"
              sx={{ cursor: 'pointer' }}
              onClick={onDelete}
            >
              <HighlightOffIcon />
            </Box>
          )}
        </Box>
        <Box>
          <Dialog open={isOpen} onClose={() => setIsOpen(true)}>
            <DialogContent>
              <Box>
                <DateRangePicker
                  minDate={minDate}
                  maxDate={maxDate}
                  ranges={selectionRange}
                  onChange={(item: { selection: Range }) => setSelectionRange([item.selection])}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Box display="flex">
                <Box id="button:cancel" mx={2}>
                  <Button color="secondary" variant="outlined" onClick={() => setIsOpen(false)}>
                    Batal
                  </Button>
                </Box>
                <Box id="button:save" mx={2}>
                  <Button color="primary" variant="contained" onClick={() => onRange(selectionRange)}>
                    Atur
                  </Button>
                </Box>
              </Box>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </Box>
  );
};

export default PayDateRangePicker;
