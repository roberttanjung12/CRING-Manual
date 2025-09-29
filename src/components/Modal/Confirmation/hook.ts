import { useState } from 'react';
import type { UseModalConfirmation } from './type';

/**
 * A hook custom that's used for managing the modal of Confirmation.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {UseModalConfirmation}
 */
const useModalConfirmation = (): Readonly<UseModalConfirmation> => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);

  const onSave = async (cb?: () => Promise<void>) => {
    if (typeof cb === 'function') await cb();

    setIsOpen(false);
  };

  const onCancel = () => setIsOpen(false);

  return {
    isOpen,
    onOpen,
    onSave,
    onCancel,
    onClose: onCancel
  };
};

export default useModalConfirmation;
