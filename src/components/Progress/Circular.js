import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { node, number, string } from 'prop-types';

const ProgressCircular = ({ children, status = '', justify = 'start', align = 'inherit', pt = 0, pl = 2 }) => {
  return (
    <Box alignItems={align} display="flex" justifyContent={justify}>
      <div>{children}</div>
      {status === 'sending' && (
        <Box data-testid="progress-circular--sending" pl={pl} pt={pt}>
          <CircularProgress color="primary" size="14px" />
        </Box>
      )}
      {status === 'success' && (
        <Box data-testid="progress-circular--success" pl={pl} pt={pt}>
          <CheckCircleIcon color="success" />
        </Box>
      )}
      {status === 'fail' && (
        <Box data-testid="progress-circular--fail" pl={pl} pt={pt}>
          <HighlightOffIcon color="error" />
        </Box>
      )}
    </Box>
  );
};

ProgressCircular.propTypes = {
  children: node,
  status: string,
  justify: string,
  align: string,
  pt: number,
  pl: number
};

export default ProgressCircular;
