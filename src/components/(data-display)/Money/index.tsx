import { type ReactNode } from 'react';
import { Typography } from '@mui/material';
import thousand from '@/utility/thousand';
import type { MoneyProps } from './type';

/**
 * Money component for displaying monetary amounts with styling.
 *
 * This component renders a monetary value with currency prefix and appropriate styling
 * based on whether the amount is positive or negative. Positive amounts are displayed
 * in green with a '+' prefix, while negative amounts are displayed in red with a '-' prefix.
 * The amount is formatted with thousand separators for better readability.
 *
 * @param {object} props - Component props
 * @param {number} props.amount - The monetary amount to display
 * @param {string} [props.currency='Rp'] - Currency symbol to display before the amount
 * @returns {React.JSX} A formatted monetary value with appropriate styling
 *
 * @example
 * // Displays "+Rp 1,000" in green
 * <Money amount={1000} />
 *
 * @example
 * // Displays "-$ 500" in red
 * <Money amount={-500} currency="$" />
 */
const Money = ({ amount, currency = 'Rp' }: MoneyProps): Readonly<ReactNode> => {
  return (
    <Typography
      className="--no-click --no-scroll"
      component="span"
      fontWeight={700}
      sx={{ color: ({ palette }) => (amount > 0 ? palette.success.dark : palette.error.dark), cursor: 'text' }}
    >
      {amount < 0 && '-'}
      {amount > 0 && '+'} {currency} {thousand(Math.abs(amount))}
    </Typography>
  );
};

export default Money;
