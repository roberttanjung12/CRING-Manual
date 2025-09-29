import { ErrorMessage } from '@hookform/error-message';
import { Typography } from '@mui/material';
import { array, string, oneOfType, object } from 'prop-types';

const ReactHookFromErrorMsg = ({ type = '', error, field }) => {
  return (
    <Typography sx={{ mt: 1, fontSize: '12px', color: theme => theme.palette.secondary.main }}>
      {type === 'ori' ? <ErrorMessage errors={error} name={field} /> : error[field]?.message}
    </Typography>
  );
};

ReactHookFromErrorMsg.propTypes = {
  type: string,
  error: oneOfType([array, object, string]),
  field: string
};

export default ReactHookFromErrorMsg;
