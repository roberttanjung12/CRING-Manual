import isEmpty from 'is-empty';

const errorMessage = (msg, transType = 'trans') => {
  const msgToLowerCase = msg ? msg.toLowerCase() : '';

  const errors = [
    {
      ori: 'invalid credential',
      trans: 'Username / password yang anda masukan salah',
      trans2: 'Password yang anda masukan salah'
    },
    {
      ori: 'user have not set password',
      trans: 'Password anda belum diatur'
    },
    {
      ori: 'inactive user',
      trans:
        'Akun Anda belum aktif. Silahkan periksa email Anda untuk link aktivasi atau menggunakan fitur Aktivasi Akun dibawah'
    },
    {
      ori: 'sesi anda di perangkat ini telah berakhir. anda saat ini masuk menggunakan perangkat lain',
      trans: 'Sesi anda di perangkat ini telah berakhir. Anda saat ini masuk menggunakan perangkat lain'
    },
    {
      ori: 'batch transfer max 1000 rows',
      trans: 'Max 1000 baris data'
    },
    {
      ori: 'incorrect otp.',
      trans: 'Kode OTP tidak sesuai!'
    },
    {
      ori: 'you have reached the maximum limit of otp input attempts.',
      trans: 'Anda telah gagal sebanyak 3x!'
    }
  ];
  let set = 'Terjadi Kesalahan';

  if (msgToLowerCase) {
    const getError = errors.find(find => find.ori === msgToLowerCase);

    if (!isEmpty(getError)) set = !isEmpty(getError[transType]) ? getError[transType] : getError.trans;
    else set = msg;
  }

  return set;
};

export default errorMessage;
