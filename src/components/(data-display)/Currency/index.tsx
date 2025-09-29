import { useMemo, type ReactNode } from 'react';
import { Tooltip, Typography } from '@mui/material';

interface Props {
  amount: number;
  /**
   * Status of visibility.
   * @type {boolean}
   * @default true
   */
  isOpen?: boolean;
  locale?: 'en' | 'id';
  currency?: 'Rp' | 'IDR';
  amountEmpty?: 0 | '-';
}

/**
 * A data display that's designed for showing Currency.
 *
 * @returns {React.JSX}
 */
const Currency = ({
  amount,
  currency = 'Rp',
  locale = 'en',
  amountEmpty = 0,
  isOpen = true
}: Props): Readonly<ReactNode> => {
  const title = useMemo(() => (amount ? amount.toLocaleString(locale) : amountEmpty), [amount, amountEmpty, locale]);

  const newAmount = useMemo(
    () => (amount ? amount.toLocaleString(locale) : amountEmpty),
    [amount, amountEmpty, locale]
  );

  return (
    isOpen && (
      <Typography data-testid="Currency" component="span">
        <Tooltip title={`${currency} ${title}`} placement="bottom-start">
          <Typography component="span" className="cursor-text --no-scroll">
            {currency} {newAmount}
          </Typography>
        </Tooltip>
      </Typography>
    )
  );
};

export default Currency;
