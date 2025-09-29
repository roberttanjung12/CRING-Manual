import { Typography } from '@mui/material';
import { elementType } from 'prop-types';

const FormTitle = ({ children }) => {
  return (
    <Typography
      aria-label="title"
      component="h2"
      data-testid="FormTitle"
      sx={{
        pb: 4,
        borderBottom: theme => `1px solid ${theme.palette.grey[300]}`,
        fontSize: '16px',
        color: theme => theme.palette.grey.A100,
        fontWeight: '700'
      }}
      variant="h2"
    >
      {children}
    </Typography>
  );
};

FormTitle.propTypes = {
  children: elementType
};

export default FormTitle;
