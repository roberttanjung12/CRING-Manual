import { Typography } from '@mui/material';
import { elementType } from 'prop-types';

const FormLabel = ({ children }) => {
  return (
    <Typography
      component="label"
      data-testid="FormLabel"
      sx={{ fontSize: '14px', color: '#363333', fontWeight: '600' }}
      variant="label"
    >
      {children}
    </Typography>
  );
};

FormLabel.propTypes = {
  children: elementType
};

export default FormLabel;
