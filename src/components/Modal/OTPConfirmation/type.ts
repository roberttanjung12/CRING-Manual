import type { ReactNode } from 'react';

interface ModalOTPConfirmationIsOpen {
  /**
   * Status of visibility of modal.
   * @type {boolean}
   */
  isOpen: boolean;
}

interface ModalOTPConfirmationResendAt {
  resendAt?: Date;
}

interface ModalOTPConfirmationServiceKeyValue {
  key: string;
  isOtp?: boolean;
  isResendAt?: boolean;
  value?: any;
}

interface ModalOTPConfirmationServiceServiceShapeEnum {
  payload: ModalOTPConfirmationServiceKeyValue[];
  success: ModalOTPConfirmationServiceKeyValue[];
}

interface ModalOTPConfirmationServiceServiceEnpointEnum {
  endpoint: string;
  shape: ModalOTPConfirmationServiceServiceShapeEnum;
}

interface ModalOTPConfirmationServiceServiceResendEnum {
  get?: ModalOTPConfirmationServiceServiceEnpointEnum;
  submit: ModalOTPConfirmationServiceServiceEnpointEnum;
}

interface ModalOTPConfirmationServiceServiceEnum {
  submit: ModalOTPConfirmationServiceServiceEnpointEnum;
  resend: ModalOTPConfirmationServiceServiceResendEnum;
}

interface ModalOTPConfirmationOTPService {
  service: ModalOTPConfirmationServiceServiceEnum;
}

interface ModalOTPConfirmationOTPLength {
  OTPLength?: number;
}

interface ModalOTPConfirmationButtonSubmitLabel {
  buttonSubmitLabel?: string;
}

interface ModalOTPConfirmationButtonResendLabel {
  buttonResendLabel?: string;
}

interface ModalOTPConfirmationOnOpen {
  /**
   * Is used for close the modal.
   * @type {Function}
   * @returns {VoidFunction}
   */
  onOpen: (args?: { resendAt?: Date }) => void;
}

interface ModalOTPConfirmationOnClose {
  /**
   * Is used for close the modal.
   * @type {Function}
   * @returns {VoidFunction}
   */
  onClose: () => void;
}

interface ModalOTPConfirmationOnCloseProp {
  /**
   * Is used for close the modal.
   * @type {Function}
   * @returns {VoidFunction}
   */
  onClose?: () => void;
}

interface ModalOTPConfirmationOnResendAt {
  onResendAt?: (newResendAt: Date) => void;
}

interface ModalOTPConfirmationOnError {
  onError?: (errorMessage: string) => void;
}

interface ModalOTPConfirmationOnSucces {
  onSucess?: () => void;
}

interface UseModalOTPConfirmation
  extends ModalOTPConfirmationIsOpen,
    ModalOTPConfirmationResendAt,
    ModalOTPConfirmationOnOpen,
    ModalOTPConfirmationOnClose,
    ModalOTPConfirmationOnResendAt {}

interface ModalOTPConfirmationProps
  extends ModalOTPConfirmationIsOpen,
    ModalOTPConfirmationResendAt,
    ModalOTPConfirmationOTPService,
    ModalOTPConfirmationOTPLength,
    ModalOTPConfirmationButtonSubmitLabel,
    ModalOTPConfirmationButtonResendLabel,
    ModalOTPConfirmationOnCloseProp,
    ModalOTPConfirmationOnResendAt,
    ModalOTPConfirmationOnError,
    ModalOTPConfirmationOnSucces {
  title?: string | ReactNode;
  text?: string | ReactNode;
}

export type {
  ModalOTPConfirmationIsOpen,
  ModalOTPConfirmationResendAt,
  ModalOTPConfirmationServiceKeyValue,
  ModalOTPConfirmationServiceServiceShapeEnum,
  ModalOTPConfirmationServiceServiceEnpointEnum,
  ModalOTPConfirmationServiceServiceResendEnum,
  ModalOTPConfirmationServiceServiceEnum,
  ModalOTPConfirmationOTPService,
  ModalOTPConfirmationOTPLength,
  ModalOTPConfirmationButtonSubmitLabel,
  ModalOTPConfirmationButtonResendLabel,
  ModalOTPConfirmationOnOpen,
  ModalOTPConfirmationOnClose,
  ModalOTPConfirmationOnCloseProp,
  ModalOTPConfirmationOnResendAt,
  ModalOTPConfirmationOnError,
  ModalOTPConfirmationOnSucces,
  UseModalOTPConfirmation,
  ModalOTPConfirmationProps
};
