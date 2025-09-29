import { Box } from '@mui/material';
import isEmpty from 'is-empty';
import { bool, object, string } from 'prop-types';
import ButtonSubmit from '@/components/Form/ButtonSubmit';

const BlockerButtonSave = ({ isLoading = false, errors = null, textButtonSave = 'Lihat Data' }) => {
  const setCheckError = errors2 => {
    let set = false;
    let count = 0;

    if (!isEmpty(errors2?.errors)) count -= 1;

    if (!isEmpty(errors2)) count += 1;

    if (count > 0) set = true;

    return set;
  };

  return (
    <Box aria-details="save">
      <ButtonSubmit
        color="primary"
        disabled={setCheckError(errors)}
        isFail={setCheckError(errors)}
        isSend={isLoading}
        label={textButtonSave}
        sx={{ minWidth: '145px' }}
        type="submit"
        variant="contained"
      />
    </Box>
  );
};

BlockerButtonSave.propTypes = {
  isLoading: bool,
  errors: object,
  textButtonSave: string
};

export default BlockerButtonSave;
