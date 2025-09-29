import { useMemo, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, InputAdornment, TextField } from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import moment from 'moment';
import { DateRangePicker, type Range } from 'react-date-range';

const RHFDateRangePicker = ({
  id = 'field--period',
  name = 'field--period',
  disabled = false,
  value = { start: undefined, end: undefined },
  minDate = undefined,
  maxDate = undefined,
  onChange = undefined
}: {
  id?: string;
  name?: string;
  disabled?: boolean;
  value?: {
    start?: Date | string;
    end?: Date | string;
  };
  minDate?: Date;
  maxDate?: Date;
  onChange?: ({ start, end }: { start?: Date; end?: Date }) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectionRange, setSelectionRange] = useState<Array<Range>>([
    {
      startDate: undefined,
      endDate: undefined,
      key: 'selection'
    }
  ]);

  const valueRender = useMemo(() => {
    let set = '';

    if (value?.start && value?.end) {
      set = `${moment(value?.start).format('DD MMMM YYYY')} - ${moment(value?.end).format('DD MMMM YYYY')}`;
    }

    return set;
  }, [value?.start, value?.end]);

  const onRange = (ranges: Array<Range>) => {
    let newStart: Date = new Date();
    let newEnd: Date = newStart;

    if (ranges[0].startDate) newStart = ranges[0].startDate;

    if (ranges[0].endDate) newEnd = ranges[0].endDate;

    if (typeof onChange === 'function') {
      onChange({
        start: newStart,
        end: newEnd
      });
    }

    setIsOpen(false);
  };

  return (
    <>
      <TextField
        fullWidth
        id={id}
        name={name}
        disabled={disabled}
        value={valueRender}
        placeholder="Tanggal Tampil - Akhir"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <CalendarMonthOutlinedIcon fontSize="inherit" />
              </InputAdornment>
            )
          }
        }}
        onFocus={event => {
          setIsOpen(true);
          event.target.blur();
        }}
      />
      <Dialog open={isOpen}>
        <DialogContent>
          <DateRangePicker
            minDate={minDate}
            maxDate={maxDate}
            ranges={selectionRange}
            onChange={(item: { selection: Range }) => setSelectionRange([item.selection])}
          />
        </DialogContent>
        <DialogActions>
          <Box display="flex" alignItems="center" columnGap={6}>
            <Button color="secondary" variant="outlined" onClick={() => setIsOpen(false)}>
              Batal
            </Button>
            <Button color="primary" variant="contained" onClick={() => onRange(selectionRange)}>
              Atur
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RHFDateRangePicker;
