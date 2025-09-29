import type { ReactNode } from 'react';
import { type SvgIconOwnProps, type TooltipProps } from '@mui/material';

interface TooltipCardTooltipEnum {
  /**
   * Placemanet of tooltip.
   * @type {TooltipProps['placement']}
   * @default {'bottom'}
   */
  placement?: TooltipProps['placement'];
  /**
   * Top position.
   * @type {number | string}
   * @default 10
   */
  top?: number | string;
  /**
   * Right position.
   * @type {number | string}
   * @default 10
   */
  right?: number | string;
  /**
   * Left direction.
   * @type {number | string}
   */
  left?: number | string;
  /**
   * bottom direction.
   * @type {number | string}
   */
  bottom?: number | string;
  /**
   * Layer number.
   * @type {number}
   * @default 1
   */
  zIndex?: number;
}

interface TooltipCardIconEnum {
  /**
   * The icon.
   * @type {number | string | ReactNode}
   * @default {ReactNode}
   */
  icon?: number | string | ReactNode;
  /**
   * Size of icon font.
   * @type {SvgIconOwnProps['fontSize']}
   * @default 'small''
   */
  fontSize?: SvgIconOwnProps['fontSize'];
  /**
   * Color of icon.
   * @type {string}
   * @default {'#BFBFBF'}
   */
  color?: string;
}

interface TooltipCardProps {
  /**
   * Title of tooltip card.
   * @type {string | number | ReactNode}
   */
  title: string | number | ReactNode;
  /**
   * Main content of tooltip card.
   * @type {ReactNode}
   */
  children: ReactNode;
  /**
   * Status of visibility the title of tooltip card.
   * @type {boolean}
   * @default true
   */
  isOpen?: boolean;
  /**
   * Config of tooltip.
   * @type {TooltipCardTooltipEnum}
   */
  tooltip?: TooltipCardTooltipEnum;
  /**
   * Config of icon.
   * @type {TooltipCardTooltipEnum}
   */
  icon?: TooltipCardIconEnum;
}

export type { TooltipCardTooltipEnum, TooltipCardIconEnum, TooltipCardProps };
