import { type ReactNode } from 'react';
import { Box, Fade, Typography } from '@mui/material';
import type { TypeDateRangePickerV2VariantType, TypeDateRangePickerV2VariantValue } from '../type';

interface Type {
  isPick: boolean;
  isSelected: boolean;
  type: TypeDateRangePickerV2VariantType;
  label: string;
  labelDate: string;
  value: TypeDateRangePickerV2VariantValue;
  onChange: (newType: TypeDateRangePickerV2VariantType, newValue: TypeDateRangePickerV2VariantValue) => void;
}

/**
 * A component that's designed for showing quic variant item ui.
 *
 * @returns {React.JSX}
 */
const DateRangePickerV2Quick = ({
  isPick,
  isSelected,
  type,
  label,
  labelDate,
  value,
  onChange
}: Type): Readonly<ReactNode> => {
  const onNewChange = () => {
    if (!isSelected) onChange(type, value);
  };

  return (
    <Box data-testid="DateRangePickerV2Quick" position="relative" py={3} px={10}>
      <Box display="flex" justifyContent="space-between" columnGap={4}>
        <Typography
          component="a"
          fontWeight={600}
          title="Klik untuk memilih tanggal ini"
          sx={{ color: ({ palette }) => (!isSelected ? palette.grey[100] : palette.info.main) }}
          onClick={onNewChange}
        >
          {label}
        </Typography>
        {!isPick && (
          <Typography
            component="a"
            fontWeight={600}
            title="Klik untuk memilih tanggal ini"
            sx={{ color: ({ palette }) => (!isSelected ? palette.grey[100] : palette.info.main) }}
            onClick={onNewChange}
          >
            {labelDate}
          </Typography>
        )}
      </Box>
      <Fade in={isSelected}>
        <Box
          position="absolute"
          top={0}
          left={0}
          height="100%"
          width={7}
          sx={{ backgroundColor: ({ palette }) => palette.primary.dark }}
        />
      </Fade>
    </Box>
  );
};

export default DateRangePickerV2Quick;
