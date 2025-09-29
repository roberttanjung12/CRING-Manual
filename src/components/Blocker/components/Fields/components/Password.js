import { useState } from 'react';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { func, object } from 'prop-types';
import ReactHookFromErrorMsg from '@/components/Form/ReactHookFormErrorMsg';

const BlockerFieldPassword = ({ errors = null, register = () => null }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <Box aria-label="field--password">
      <Typography component="label" sx={{ fontSize: '14px', color: '#363333', fontWeight: '600' }} variant="label">
        Password
      </Typography>
      <Box className={errors?.password ? 'spe-error-field' : ''} mt={2}>
        <TextField
          {...register('password')}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsShowPassword(prevValue => !prevValue)}>
                    {!isShowPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
          placeholder="Masukan Password"
          type={!isShowPassword ? 'password' : 'text'}
        />
        <ReactHookFromErrorMsg error={errors} field="password" />
      </Box>
    </Box>
  );
};

BlockerFieldPassword.propTypes = {
  errors: object,
  register: func
};

export default BlockerFieldPassword;
