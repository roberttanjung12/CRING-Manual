import { useEffect, useMemo, type ReactNode } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DateRangePickerV2DatePicker from './components/DatePicker';
import DateRangePickerV2Pick from './components/Pick';
import DateRangePickerV2Quick from './components/Quick';
import useDateRangePickerV2 from './hook';
import type { TypeDateRangePickerV2Prop } from './type';

/**
 * A component that's designed for showing date-range-picker version 2.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {React.JSX}
 */
const DateRangePickerV2 = ({
  defaultValue,
  id = 'field--period',
  disabled = false,
  value = undefined,
  onChange = undefined
}: TypeDateRangePickerV2Prop): Readonly<ReactNode> => {
  const {
    isDisabled,
    isOpen,
    isPick,
    selectedType,
    selectedRanges,
    renderValue,
    variant,
    setup,
    onOpen,
    onClose,
    onChangeQuick,
    onChangePick,
    onNewChange
  } = useDateRangePickerV2({
    value,
    onChange
  });

  const isHideReset = useMemo(
    () =>
      defaultValue?.type === value?.type && defaultValue?.start === value?.start && defaultValue?.end === value?.end,
    [defaultValue?.end, defaultValue?.start, defaultValue?.type, value?.end, value?.start, value?.type]
  );

  useEffect(() => {
    setup();
  }, [setup]);

  return (
    <>
      <Box
        id={id}
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        height="40px"
        py="7.5px"
        px="14px"
        bgcolor={({ palette }) => palette.background.paper}
        color={({ palette }) => palette.grey[100]}
        borderRadius="10px"
        sx={{ border: ({ palette }) => `1px solid ${palette.background.default}` }}
      >
        <InputAdornment position="start">
          <CalendarMonthOutlinedIcon fontSize="inherit" />
        </InputAdornment>
        <Box component="a" display="block" flexBasis="100%" onClick={() => !disabled && onOpen()}>
          {!renderValue?.type ? (
            <Typography>Pilih Tanggal</Typography>
          ) : (
            <Typography>
              <strong>{renderValue?.type}</strong> ({renderValue?.date})
            </Typography>
          )}
        </Box>
        {!isHideReset && (
          <>
            {!disabled && renderValue?.type && (
              <InputAdornment position="end">
                <IconButton title="Reset" onClick={() => onChange?.(undefined)}>
                  <HighlightOffOutlinedIcon fontSize="inherit" />
                </IconButton>
              </InputAdornment>
            )}
          </>
        )}
      </Box>
      <Dialog open={isOpen} fullWidth maxWidth="sm" sx={{ '.MuiPaper-root': { padding: 0 } }}>
        <DialogTitle sx={{ p: 5, mb: 0, borderBottom: 'none' }}>
          <Typography sx={{ color: ({ palette }) => palette.grey.A700, fontWeight: 700 }}>Rentang Waktu</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid size={!isPick ? 12 : 4}>
              {variant.quick.map(({ type, label, quick }) => (
                <DateRangePickerV2Quick
                  key={label}
                  isPick={isPick}
                  isSelected={type === selectedType}
                  type={type}
                  label={label}
                  labelDate={quick?.label ?? ''}
                  value={quick?.value ?? { start: new Date(), end: new Date() }}
                  onChange={onChangeQuick}
                />
              ))}
              <Box px={10}>
                <Divider sx={{ my: 3 }} />
              </Box>
              {variant.pick.map(({ type, label }) => (
                <DateRangePickerV2Pick
                  key={label}
                  isSelected={type === selectedType}
                  type={type}
                  label={label}
                  onChange={onChangeQuick}
                />
              ))}
            </Grid>
            {isPick && (
              <Grid size={8}>
                <DateRangePickerV2DatePicker type={selectedType} ranges={selectedRanges} onChange={onChangePick} />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            py: 6,
            px: 4,
            columnGap: 4,
            backgroundColor: ({ palette }) => palette.background.default,
            borderTop: 'none'
          }}
        >
          <Button color="secondary" variant="outlined" sx={{ minWidth: 150 }} onClick={onClose}>
            Batal
          </Button>
          <Button
            disabled={isDisabled}
            color="primary"
            variant="contained"
            sx={{ minWidth: 150 }}
            onClick={onNewChange}
          >
            Atur
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DateRangePickerV2;
