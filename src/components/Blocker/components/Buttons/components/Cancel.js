import { Box, Button } from '@mui/material';
import { func, string } from 'prop-types';

const BlockerButtonCancel = ({ textButtonCancel = 'Batal', onCancel = () => null }) => {
  return (
    <Box aria-details="cancel">
      <Button color="secondary" sx={{ minWidth: 0 }} variant="outlined" onClick={onCancel}>
        {textButtonCancel}
      </Button>
    </Box>
  );
};

BlockerButtonCancel.propTypes = {
  textButtonCancel: string,
  onCancel: func
};

export default BlockerButtonCancel;
