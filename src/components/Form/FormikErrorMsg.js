import { Box, Typography } from '@mui/material';
import { bool, string } from 'prop-types';

const FormikErrorMsg = ({ id, touch, error, field }) => {
  return (
    <Box key={id} id={`box:error--${id}`}>
      {touch && Boolean(error) && (
        <Typography
          variant="caption"
          sx={{
            color: 'error.main',
            fontSize: '12px',
            display: 'block',
            mt: 0.5
          }}
        >
          {field}
        </Typography>
      )}
    </Box>
  );
};

FormikErrorMsg.propTypes = {
  id: string,
  touch: bool,
  error: bool,
  field: string
};

export default FormikErrorMsg;
