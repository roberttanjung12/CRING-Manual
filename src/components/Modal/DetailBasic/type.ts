interface ModalDetailBasicList {
  /**
   * Label of detail
   * @type {String}
   */
  label: string;
  /**
   * Value of detail
   * @type {String}
   */
  value: number | string;
}

interface ModalDetailBasicProps {
  /**
   * A flag that indicates whether the modal is shown or not
   * @type {Boolean}
   */
  isOpen: boolean;
  /**
   * Status of requesting
   * @type {Boolean}
   */
  isLoading: boolean;
  /**
   * Title of modal
   * @type {String}
   */
  title: string;
  /**
   * List of detail
   * @type {Array}
   */
  list: ModalDetailBasicList[];
  /**
   * Is used for closing the modal
   * @returns {VoidFunction}
   */
  onClose: () => void;
}

export type { ModalDetailBasicList, ModalDetailBasicProps };
