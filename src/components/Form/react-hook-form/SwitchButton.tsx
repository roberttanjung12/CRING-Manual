import { type SyntheticEvent, type ReactNode } from 'react';
import { Box, FormControlLabel, type FormControlLabelProps, Switch } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface Props {
  value: boolean;
  onChange?: (event: SyntheticEvent, checked: boolean) => void;
  label?: string;
  isDisabled?: boolean;
  params?: FormControlLabelProps;
}

/**
 * A component that's designed for showing switch button.
 *
 * @returns {React.JSX}
 */
const RHSwitchButton = ({ params, isDisabled, value, label, onChange }: Props): Readonly<ReactNode> => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ position: 'relative', '&:hover .--icon': { display: isDisabled ? 'block' : 'none' } }}>
        <FormControlLabel
          {...params}
          checked={value}
          control={<Switch />}
          disabled={isDisabled}
          label={label}
          onChange={onChange}
        />
        <ErrorOutlineOutlinedIcon
          className="--icon"
          fontSize="large"
          sx={{ display: 'none', position: 'absolute', bottom: '5px', left: '30px', zIndex: '3' }}
        />
      </Box>
    </Box>
  );
};

export default RHSwitchButton;
