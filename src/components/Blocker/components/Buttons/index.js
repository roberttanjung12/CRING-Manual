import { Box } from '@mui/material';
import { bool, func, object, string } from 'prop-types';
import BlockerButtonCancel from './components/Cancel';
import BlockerButtonSave from './components/Save';

const BlockerButtons = ({
  isLoading = false,
  errors = null,
  textButtonCancel = 'Batal',
  textButtonSave = 'Lihat Data',
  onCancel = () => null
}) => {
  return (
    <Box
      aria-details="buttons"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: 4, mt: 6 }}
    >
      <BlockerButtonCancel textButtonCancel={textButtonCancel} onCancel={onCancel} />
      <BlockerButtonSave
        errors={errors}
        isLoading={isLoading}
        textButtonCancel={textButtonCancel}
        textButtonSave={textButtonSave}
      />
    </Box>
  );
};

BlockerButtons.propTypes = {
  isLoading: bool,
  errors: object,
  textButtonCancel: string,
  textButtonSave: string,
  onCancel: func
};

export default BlockerButtons;
