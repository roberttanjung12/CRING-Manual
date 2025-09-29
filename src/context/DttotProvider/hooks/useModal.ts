import { useCallback, useState } from 'react';
import type { DttotProviderActionsEnum, UseDttotProviderModalReturns } from '../type';

/**
 * A hook custom that's used for modal management in DTTOT Provider
 *
 * @returns {UseDttotProviderModalReturns}
 */
const useDttotProviderModal = (): Readonly<UseDttotProviderModalReturns> => {
  const [isOpen, setIsOpen] = useState(false);

  const [nextClose, setNextClose] = useState<() => void>(() => () => {});

  const [nextSubmit, setNextSubmit] = useState<() => void>(() => () => {});

  const onOpen = useCallback(({ onClose, onSubmit }: DttotProviderActionsEnum) => {
    setIsOpen(true);

    setNextClose(() => onClose);
    setNextSubmit(() => onSubmit);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);

    nextClose();
  }, [nextClose]);

  const onSubmit = useCallback(() => {
    nextSubmit();

    setIsOpen(false);
  }, [nextSubmit]);

  return {
    isOpen,
    onOpen,
    onClose,
    onSubmit
  };
};

export default useDttotProviderModal;
