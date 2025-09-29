import type { ReactNode } from 'react';
import type { ButtonProps } from '@mui/material';

interface OnInterceptIcon {
  /**
   * The icon to display in the intercept modal.
   * @type {string | ReactNode}
   * @default '/giff/question.gif'
   */
  icon?: string | ReactNode;
}

interface OnInterceptTitle {
  /**
   * The title of the intercept modal.
   * @type {string}
   */
  title?: string;
}

interface OnInterceptMessage {
  /**
   * The message to display in the intercept modal.
   * @type {string | ReactNode}
   * @default 'Tetap, ingin melanjutkan aktifitas?'
   */
  message?: string | ReactNode;
}

interface OnInterceptButtonEnum {
  size?: ButtonProps['size'];
  sx?: ButtonProps['sx'];
}

interface OnInterceptButtonCancelEnum extends OnInterceptButtonEnum {
  /**
   * Label of the button.
   * @type {string}
   * @default 'Batal'
   */
  label?: string;
  /**
   * Variant of cancel button.
   * @type {ButtonProps['variant']}
   * @default 'outlined'
   */
  variant?: ButtonProps['variant'];
  /**
   * Color of cancel button.
   * @type {ButtonProps['color']}
   * @default 'secondary'
   */
  color?: ButtonProps['color'];
}

interface OnInterceptButtonCancel {
  /**
   * Configuration of cancel button.
   * @type {OnInterceptButtonCancelEnum}
   */
  buttonCancel?: OnInterceptButtonCancelEnum;
}

interface OnInterceptButtonNextEnum extends OnInterceptButtonEnum {
  /**
   * Label of the button.
   * @type {string}
   * @default 'Lanjutkan'
   */
  label?: string;
  /**
   * Variant of next button.
   * @type {ButtonProps['variant']}
   * @default 'contained'
   */
  variant?: ButtonProps['variant'];
  /**
   * Color of next button.
   * @type {ButtonProps['color']}
   * @default 'primary'
   */
  color?: ButtonProps['color'];
}

interface OnInterceptButtonNext {
  /**
   * Configuration of next button.
   * @type {OnInterceptButtonNextEnum}
   */
  buttonNext?: OnInterceptButtonNextEnum;
}

interface OnInterceptProps
  extends OnInterceptIcon,
    OnInterceptTitle,
    OnInterceptMessage,
    OnInterceptButtonCancel,
    OnInterceptButtonNext {}

export type {
  OnInterceptIcon,
  OnInterceptTitle,
  OnInterceptMessage,
  OnInterceptButtonEnum,
  OnInterceptButtonCancelEnum,
  OnInterceptButtonCancel,
  OnInterceptButtonNextEnum,
  OnInterceptButtonNext,
  OnInterceptProps
};
