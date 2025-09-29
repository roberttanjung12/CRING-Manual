'use client';

import { useCallback } from 'react';
import { AES, enc } from 'crypto-js';

const useAes = () => {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY_LOGIN;

  const onEncrypt = useCallback(
    text => {
      return AES.encrypt(text, secretKey).toString();
    },
    [secretKey]
  );

  const onDecrypt = useCallback(
    ciphertext => {
      const bytes = AES.decrypt(ciphertext, secretKey);

      return bytes.toString(enc.Utf8);
    },
    [secretKey]
  );

  return {
    onEncrypt,
    onDecrypt
  };
};

export default useAes;
