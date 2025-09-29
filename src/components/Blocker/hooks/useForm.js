'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { func } from 'prop-types';
import { useAuthenticationProvider } from '@/context/AuthenticationProvider';
import useAes from '@/hooks/useAes';
import { onMaskDetailData } from '@/services/manage-merchant';
import errorMessage from '@/utility/error-messages';
import { setAuthUserData, setLocalStorage } from '@/utility/local-storage';
import useBlockerValidations from './useValidations';

const useBlockerForm = ({ onSuccess = () => null }) => {
  const { onEncrypt } = useAes();

  const { schema } = useBlockerValidations();

  const { username } = useAuthenticationProvider();

  const { refresh } = useRouter();

  const {
    formState: { errors, isSubmitting },
    setError,
    register,
    reset,
    clearErrors,
    handleSubmit
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema()),
    defaultValues: {
      password: ''
    }
  });

  const onSubmit = async value => {
    const { data } = await onMaskDetailData(
      false,
      {
        userId: onEncrypt(username),
        password: onEncrypt(value.password)
      },
      { isHidePopupError: true }
    );

    if (data) {
      const date = new Date();
      const dateExp = new Date(date.getTime() + 5 * 60000);
      const authData = {
        authUserAccessToken: data.data.accessToken,
        authUserRefreshToken: '',
        authUserLoginAt: moment().format(),
        authUserExpiresIn: moment()
          .add(data.data.expiresIn || 3600, 'seconds')
          .format()
      };

      setAuthUserData(authData);

      setLocalStorage('CRING_BLOCKER', dateExp);

      reset();
      onSuccess();
      refresh();
    } else setError('errors', { type: 'custom', message: errorMessage(data?.data?.message, 'trans2') });
  };

  return {
    isLoading: isSubmitting,
    errors,
    register,
    reset,
    clearErrors,
    handleSubmit,
    onSubmit
  };
};

useBlockerForm.propTypes = {
  onSuccess: func
};

export default useBlockerForm;
