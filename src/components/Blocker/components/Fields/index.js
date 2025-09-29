import { Alert, Box } from '@mui/material';
import { func, object } from 'prop-types';
import BlockerFieldPassword from './components/Password';

const BlockerFields = ({ errors = null, register = () => null }) => {
  return (
    <Box aria-details="fields" sx={{ mt: 6 }}>
      {errors?.errors && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors?.errors?.message}
        </Alert>
      )}
      <BlockerFieldPassword errors={errors} register={register} />
    </Box>
  );
};

BlockerFields.propTypes = {
  errors: object,
  register: func
};

export default BlockerFields;
