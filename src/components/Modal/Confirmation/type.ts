import type { MouseEvent, ReactNode } from 'react';
import type { ButtonProps } from '@mui/material';

interface UseModalConfirmationIsOpen {
  /**
   * Status of visibility the modal.
   * @type {boolean}
   * @default false
   */
  isOpen: boolean;
}

interface UseModalConfirmationOnOpen {
  /**
   * Is used for opening the modal.
   * @type {boolean}
   * @returns {VoidFunction}
   */
  onOpen: () => void;
}

interface UseModalConfirmationOnSave {
  /**
   * Is used for saving the activity.
   * @returns {VoidFunction}
   */
  onSave: (cb?: () => Promise<void>) => Promise<void>;
}

interface UseModalConfirmationOnCancel {
  /**
   * Is used for canceling the activity.
   * @returns {VoidFunction}
   */
  onCancel: () => void;
}

interface UseModalConfirmationOnClose {
  /**
   * Is used for closing the modal.
   * @returns {VoidFunction}
   */
  onClose: () => void;
}

interface UseModalConfirmation
  extends UseModalConfirmationIsOpen,
    UseModalConfirmationOnOpen,
    UseModalConfirmationOnSave,
    UseModalConfirmationOnCancel,
    UseModalConfirmationOnClose {}

interface ModalConfirmationProps {
  /**
   * Status of visibility the modal.
   * @type {boolean}
   * @default false
   */
  isShow?: boolean;
  /**
   * Status of requesting.
   * @type {boolean}
   * @default false
   */
  isLoading?: boolean;
  /**
   * Status of hide the cancel button.
   * @type {boolean}
   * @default false
   */
  isHideButtonCancel?: boolean;
  /**
   * Status of hide the button save.
   * @type {boolean}
   * @default false
   */
  isHideButtonSave?: boolean;
  /**
   * Path of icon.
   * @type {string}
   * @default '/giff/question.gif'
   */
  icon?: string;
  /**
   * Title of the modal.
   * @type {string}
   */
  title?: string;
  /**
   * Main content of the modal.
   * @type {React.JSX}
   */
  children?: ReactNode;
  /**
   * Text of the cancel button.
   * @type {string}
   * @default 'Batal'
   */
  textButtonCancel?: string;
  /**
   * Text of the save button.
   * @type {string}
   * @default 'Ya, Ubah'
   */
  textButtonSave?: any;
  /**
   * Color of the cancel button.
   * @type {string}
   * @default 'secondary'
   */
  colorButtonCancel?: ButtonProps['color'];
  /**
   * Text of the save button.
   * @type {string}
   * @default 'primary'
   */
  colorButtonSave?: ButtonProps['color'];
  /**
   * Customize save button.
   * @returns {string}
   */
  customButtonSave?: string;
  /**
   * Is used for canceling the activity.
   * @returns {VoidFunction}
   */
  onCancel?: () => void;
  /**
   * Is used for saving the activity.
   * @returns {VoidFunction}
   */
  onSave?: (event: MouseEvent) => Promise<void>;
  /**
   * Is used for closing the modal.
   * @returns {VoidFunction}
   */
  onClose?: () => void;
}

export type {
  UseModalConfirmationIsOpen,
  UseModalConfirmationOnOpen,
  UseModalConfirmationOnSave,
  UseModalConfirmationOnCancel,
  UseModalConfirmationOnClose,
  UseModalConfirmation,
  ModalConfirmationProps
};
