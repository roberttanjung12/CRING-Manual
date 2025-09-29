import AxiosError from 'axios-error';
import FacAlert from './fac-alert';

const isMultiSession = (errors, isV2) => {
  const getErrors = !isV2 ? new AxiosError(errors).response : errors;

  if (getErrors?.status === 403 || getErrors?.data?.message === 'Forbidden') {
    FacAlert({
      id: 'multi-session',
      isShow: true,
      type: 'error',
      title: 'Anda Tidak Memiliki Akses',
      children: <>Akses anda telah diubah dan dibatasi. Silahkan masuk kembali</>,
      msg: '',
      msgButton: 'Login Kembali',
      buttonVariant: 'contained',
      special: {
        isMultiSession: true
      }
    });

    return;
  }

  if (
    getErrors?.data?.message ===
    'Sesi anda di perangkat ini telah berakhir. Anda saat ini masuk menggunakan perangkat lain.'
  ) {
    FacAlert({
      id: 'multi-session',
      isShow: true,
      type: 'error',
      title: 'Sesi Berakhir',
      children: <>Sesi anda di perangkat ini telah berakhir. Anda saat ini masuk menggunakan perangkat lain</>,
      msg: '',
      msgButton: 'Login Kembali',
      buttonVariant: 'contained',
      special: {
        isMultiSession: true
      }
    });

    return;
  }

  if (getErrors?.data?.message === 'invalid token') {
    FacAlert({
      id: 'multi-session',
      isShow: true,
      type: 'error',
      title: 'Sesi Berakhir',
      children: <>Sesi anda di perangkat ini telah berakhir.</>,
      msg: '',
      msgButton: 'Login Kembali',
      buttonVariant: 'contained',
      special: {
        isMultiSession: true
      }
    });
  }
};

export default isMultiSession;
