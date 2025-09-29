import { AES, enc } from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_LOGIN;

if (!secretKey) {
  throw new Error(
    'Secret key for AES encryption is not defined. Please set NEXT_PUBLIC_SECRET_KEY_LOGIN in your environment variables.'
  );
}

const onEncrypt = text => {
  return AES.encrypt(String(text), secretKey).toString();
};

const onDecrypt = ciphertext => {
  const bytes = AES.decrypt(ciphertext, secretKey);

  return bytes.toString(enc.Utf8);
};

export { onEncrypt, onDecrypt };

export default onEncrypt;
