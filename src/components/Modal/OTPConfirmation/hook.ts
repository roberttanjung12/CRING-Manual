import { useState } from 'react';
import type { ModalOTPConfirmationIsOpen, UseModalOTPConfirmation } from './type';

/**
 * A hook custom that's used for managing otp confirmation.
 *
 * @returns {UseModalOTPConfirmation}
 */
const useModalOTPConfirmation = (): Readonly<UseModalOTPConfirmation> => {
  const [isOpen, setIsOpen] = useState<ModalOTPConfirmationIsOpen['isOpen']>(false);

  const [resendAt, setResendAt] = useState<Date>(new Date());

  const onOpen = (data?: { resendAt?: Date }): void => {
    if (data?.resendAt) setResendAt(data.resendAt);

    setIsOpen(true);
  };

  const onClose = (): void => setIsOpen(false);

  const onResendAt = (newResendAt: Date) => setResendAt(newResendAt);

  return {
    isOpen,
    resendAt,
    onOpen,
    onClose,
    onResendAt
  };
};

export default useModalOTPConfirmation;
