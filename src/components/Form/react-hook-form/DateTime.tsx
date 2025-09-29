import { type FocusEvent, useMemo, useState, type ReactNode } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { LocalizationProvider, StaticDatePicker, TimeClock } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';

type TypeValue = undefined | Date;

interface Type {
  value: TypeValue;
  onChange: (newValue: TypeValue) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
import { ReactNode } from 'react';
 * A component that's designed for show date-time-picker ui.
 * 
 * @returns {React.JSX}
 */
const RHFDateTimePicker = ({
  disabled = false,
  value = undefined,
  placeholder = 'DD/MM/YYYY - HH:mm',
  onChange
}: Type): Readonly<ReactNode> => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [newValue, setNewValue] = useState<TypeValue | null>(null);

  const renderValue = useMemo<string | Date>(
    () => (value && ['object', 'string'].includes(typeof value) ? moment(value).format('DD/MM/YYYY - HH:mm') : ''),
    [value]
  );

  const onOpen = (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>): void => {
    setIsOpen(true);
    event.target.blur();
  };

  const onCancel = (): void => {
    setIsOpen(false);
  };

  const onChangeModal = (): void => {
    onChange(newValue as Date);
    onCancel();
  };

  return (
    <>
      <TextField
        data-testid="RHFDateTimePicker"
        fullWidth
        disabled={disabled}
        value={renderValue}
        placeholder={placeholder}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {!disabled && renderValue && (
                  <IconButton onClick={() => onChange(undefined)}>
                    <HighlightOffOutlinedIcon fontSize="inherit" />
                  </IconButton>
                )}
                <CalendarMonthOutlinedIcon />
              </InputAdornment>
            )
          }
        }}
        onFocus={onOpen}
      />
      <Dialog data-testid="RHFDateTimePickerDialog" maxWidth="md" open={isOpen}>
        <DialogContent>
          <Box display="flex" alignItems="center">
            <Box aria-label="field-date">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  sx={{ boxShadow: '1px 2px 6px 0px #13235914' }}
                  value={newValue}
                  onChange={newDate => newDate && setNewValue(newDate)}
                />
              </LocalizationProvider>
            </Box>
            <Box aria-label="field-time">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimeClock
                  ampm={false}
                  openTo="hours"
                  sx={{ padding: '0' }}
                  value={newValue}
                  onChange={newTime => newTime && setNewValue(newTime)}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Batal</Button>
          <Button disabled={!newValue} onClick={onChangeModal}>
            Atur
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RHFDateTimePicker;
