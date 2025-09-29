interface TnCIsService {
  /**
   * If true, the service will be hitted when agreeing the tnc.
   * @type {boolean}
   */
  isService: boolean;
}

interface TnCIsOpen {
  /**
   * Status of visibility the modal.
   * @type {boolean}
   */
  isOpen: boolean;
}

interface TnCHasAgree {
  /**
   * Status of agreement.
   * @type {boolean}
   */
  hasAgree: boolean;
}

interface TnCToken {
  /**
   * Bearer token.
   * @type {string}
   */
  token?: string;
}

interface TnCOnOpen {
  /**
   * Is used for opening the modal.
   * @type {VoidFunction}
   */
  onOpen: (cb?: () => void, config?: { token?: string }) => void;
}

interface TnCOnRead {
  /**
   * Is used for reading the tnc.
   * @type {VoidFunction}
   */
  onRead: () => void;
}

interface TnCOnClose {
  /**
   * Is used for closing the modal.
   * @type {VoidFunction}
   */
  onClose: () => void;
}

interface TnCOnAgree {
  /**
   * Is used for agreeing.
   * @type {VoidFunction}
   */
  onAgree: (cb?: () => void) => void;
}

interface UseTnC extends TnCIsOpen, TnCHasAgree, TnCToken, TnCOnOpen, TnCOnRead, TnCOnClose, TnCOnAgree {}

interface TnCProps extends TnCIsService, TnCIsOpen, TnCHasAgree, TnCToken, TnCOnClose, TnCOnAgree {}

export type { TnCIsService, TnCIsOpen, TnCHasAgree, TnCToken, TnCOnOpen, TnCOnClose, TnCOnAgree, UseTnC, TnCProps };
