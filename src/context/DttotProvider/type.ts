import type { ReactNode } from 'react';

interface DttotProviderActionsEnum {
  onClose: () => void;
  onSubmit: () => void;
}

interface DttotProviderIsOpen {
  /**
   * Status of visibility the modal.
   * @type {boolean}
   */
  isOpen: boolean;
}

interface DttotProviderErrorMessage {
  errorMessage: string;
}

interface DttotProviderIsHideNext {
  /**
   * Status of visibility next button.
   * @type {boolean}
   */
  isHideNext?: boolean;
}

interface DttotProviderName {
  /**
   * Name of the suspect.
   * @type {string}
   */
  name: string;
}

interface DttotProviderChildren {
  /**
   * Main of content.
   * @type {React.JSX}
   */
  children: Readonly<ReactNode>;
}

interface DttotProviderOnClose {
  /**
   * Function to close the modal.
   * @type {() => void}
   */
  onClose: (onNewClose?: () => void) => void;
}

interface DttotProviderOnOpen {
  /**
   * Function to open the modal.
   * @type {() => void}
   */
  onOpen: (args: DttotProviderActionsEnum) => void;
}

interface DttotProviderOnSubmit {
  /**
   * Function to submit the modal.
   * @type {() => void}
   */
  onSubmit: (onNewSubmit?: () => void) => void;
}

interface DttotProviderOnCheckProps extends DttotProviderActionsEnum {
  isCheck: boolean;
  name: DttotProviderName['name'];
  onDttot: () => void;
}

interface UseDttotProviderProps extends DttotProviderName, DttotProviderOnOpen {}

interface DttotProviderProps extends DttotProviderName, DttotProviderChildren, DttotProviderIsHideNext {}

interface DttotProviderModalProps
  extends DttotProviderIsOpen,
    DttotProviderErrorMessage,
    DttotProviderIsHideNext,
    DttotProviderOnClose,
    DttotProviderOnSubmit {}

interface UseDttotProviderModalReturns
  extends DttotProviderIsOpen,
    DttotProviderOnOpen,
    DttotProviderOnClose,
    DttotProviderOnSubmit {}

interface UseDttotProviderCreateReturns {
  isDTTOT: boolean;
  isPPSPM: boolean;
  onReset: () => void;
  onCheck: (args: DttotProviderOnCheckProps) => Promise<void>;
}

interface UseDttotProviderReturns extends DttotProviderErrorMessage, UseDttotProviderCreateReturns {}

export type {
  DttotProviderActionsEnum,
  DttotProviderIsOpen,
  DttotProviderErrorMessage,
  DttotProviderIsHideNext,
  DttotProviderName,
  DttotProviderChildren,
  DttotProviderOnOpen,
  DttotProviderOnClose,
  DttotProviderOnSubmit,
  DttotProviderOnCheckProps,
  UseDttotProviderProps,
  DttotProviderProps,
  DttotProviderModalProps,
  UseDttotProviderModalReturns,
  UseDttotProviderCreateReturns,
  UseDttotProviderReturns
};
