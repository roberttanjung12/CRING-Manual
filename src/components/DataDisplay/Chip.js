import Chip from '@mui/material/Chip';
import { string, object } from 'prop-types';

const DataDisplayChip = ({ label, color, sx }) => {
  // group: set
  const setBackground = () => {
    let set = '';

    if (color === 'success') set = 'rgba(22, 126, 60, 0.2)';
    else if (color === 'secondary') set = 'rgba(198, 37, 37, 0.2)';

    return set;
  };

  const setColor = () => {
    let set = '';

    if (color === 'success') set = 'rgb(22, 126, 60)';
    else if (color === 'secondary') set = 'rgb(198, 37, 37)';

    return set;
  };

  return (
    <Chip
      label={label}
      role="note"
      sx={{
        padding: '8px 12px',
        borderRadius: '8px',
        background: setBackground(),
        color: setColor(),
        fontWeight: 'bold',
        ...sx
      }}
    />
  );
};

DataDisplayChip.propTypes = {
  label: string,
  color: string,
  sx: object
};

export default DataDisplayChip;
