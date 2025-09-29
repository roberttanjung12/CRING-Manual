const passwordPatterns = [
  { key: 'key-0', isFail: true, reg: /^.{15,}$/, text: 'Minimal 15 karakter' },
  { key: 'key-1', isFail: true, reg: /[A-Z]+/, text: 'Ada huruf kapital' },
  { key: 'key-2', isFail: true, reg: /[a-z]+/, text: 'Ada huruf kecil' },
  {
    key: 'key-3',
    isFail: true,
    reg: /[!@#$%^&*()_+{}[\]:;<>,.?~\\\-='"/`|]/,
    text: 'Ada special karakter (contoh: !@#$%)'
  },
  { key: 'key-4', isFail: true, reg: /^(?=.{0,150}$)\D*\d/, text: 'Ada angka' }
];

export default passwordPatterns;
