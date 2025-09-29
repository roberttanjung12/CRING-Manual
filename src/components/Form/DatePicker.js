import { useState } from 'react';
import { Dialog, DialogContent, TextField, InputAdornment, IconButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import moment from 'moment';
import { oneOfType, string, object, func, bool } from 'prop-types';

/**
 * FormDatePicker is a date picker component that displays a date selection dialog.
 * It allows users to pick a date, with options to disable past dates and the component itself.
 * The selected date can be saved or cancelled via dialog actions.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Date|string|null} props.date - The currently selected date.
 * @param {Boolean} [props.errors] - The currently selected date.
 * @param {boolean} [props.disabled=false] - If true, disables the date picker.
 * @param {boolean} [props.disablePast=false] - If true, disables selection of past dates.
 * @param {string} [props.placeholder='Masukan Tanggal'] - Placeholder text for the date input.
 * @param {function} [props.onSave] - Callback function called with the selected date when saved.
 * @param {Object} [props.props] - Additional props to pass to the StaticDatePicker component.
 *
 * @returns {React.JSX} The rendered date picker component.
 */
const FormDatePicker = ({
  date,
  errors,
  disabled = false,
  disablePast = false,
  placeholder = 'Masukan Tanggal',
  onSave,
  props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [fdDate, setFdDate] = useState(null);

  const onOpen = () => {
    if (!disabled) {
      if (!fdDate) setFdDate(date);
      setIsOpen(true);
    }
  };

  const onModalClose = () => {
    setIsOpen(false);
  };

  const onModalCancel = () => {
    setFdDate(date);

    onModalClose();
  };

  const onModalSave = direction => {
    if (typeof onSave === 'function') onSave(direction !== 'reset' ? fdDate : undefined);

    onModalClose();
  };

  return (
    <>
      <TextField
        fullWidth
        disabled={disabled}
        value={date ? moment(date).format('DD/MM/YYYY') : ''}
        placeholder={placeholder}
        error={errors}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {!disabled && date && (
                  <IconButton title="Reset tanggal" onClick={() => onModalSave('reset')}>
                    <HighlightOffOutlinedIcon />
                  </IconButton>
                )}
                <CalendarMonthIcon />
              </InputAdornment>
            )
          }
        }}
        onFocus={event => {
          onOpen();
          event.currentTarget.blur();
        }}
      />
      <Dialog open={isOpen} onClose={onModalClose}>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              defaultValue={date}
              disablePast={disablePast}
              displayStaticWrapperAs="desktop"
              openTo="day"
              onChange={e => setFdDate(e)}
              onAccept={onModalSave}
              onClose={onModalCancel}
              {...props}
            />
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};

FormDatePicker.propTypes = {
  date: oneOfType([string, object]),
  errors: bool,
  disabled: bool,
  disablePast: bool,
  placeholder: string,
  onSave: func,
  props: object
};

export default FormDatePicker;
