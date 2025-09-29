import { type ReactNode } from 'react';
import { Box, Fade, Typography } from '@mui/material';
import type { TypeDateRangePickerV2VariantType } from '../type';

interface Type {
  isSelected: boolean;
  type: TypeDateRangePickerV2VariantType;
  label: string;
  onChange: (newType: TypeDateRangePickerV2VariantType) => void;
}

/**
 * A component that's designed for showing pick variant item ui.
 *
 * @returns {React.JSX}
 */
const DateRangePickerV2Pick = ({ isSelected, type, label, onChange }: Type): Readonly<ReactNode> => {
  const onNewChange = () => {
    if (!isSelected) onChange(type);
  };

  return (
    <Box data-testid="DateRangePickerV2Pick" position="relative" py={3} px={10}>
      <Box display="flex" justifyContent="space-between" columnGap={4}>
        <Typography
          component="a"
          role="presentation"
          fontWeight={600}
          title="Klik untuk memilih tanggal ini"
          sx={{ color: ({ palette }) => (!isSelected ? palette.grey[100] : palette.info.main) }}
          onClick={onNewChange}
        >
          {label}
        </Typography>
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

export default DateRangePickerV2Pick;
