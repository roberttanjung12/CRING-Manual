import { useState } from 'react';
import type { TnCHasAgree, TnCIsOpen, TnCToken, UseTnC } from './type';

/**
 * A hook custom that's used for managing modal of Terms and Conditional.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {UseTnC}
 */
const useTnC = (): Readonly<UseTnC> => {
  const [isOpen, setIsOpen] = useState<TnCIsOpen['isOpen']>(false);

  const [hasAgree, setHasAgree] = useState<TnCHasAgree['hasAgree']>(false);

  const [token, setToken] = useState<TnCToken['token']>('');

  const onOpen = (cb?: () => void, config?: { token?: string }) => {
    if (!hasAgree) {
      if (config?.token) setToken(config?.token);

      setIsOpen(true);
    } else if (typeof cb === 'function') cb();
  };

  const onRead = () => setIsOpen(true);

  const onClose = () => setIsOpen(false);

  const onAgree = (cb?: () => void) => {
    setHasAgree(true);
    setIsOpen(false);

    if (typeof cb === 'function') cb();
  };

  return {
    isOpen,
    hasAgree,
    token,
    onOpen,
    onRead,
    onClose,
    onAgree
  };
};

export default useTnC;
