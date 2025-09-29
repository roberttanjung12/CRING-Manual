import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import moment from 'moment';

interface Props {
  /**
   * Cooldown time according to its expired in
   * @type {Date}
   */
  expiredIn: Date;
  /**
   * A ui that will be showed when cooldown was over
   * @type {React.JSX}
   */
  children: Readonly<ReactNode>;
  /**
   * A ui that show customize cooldown
   * @type {Function}
   * @returns {React.JSX}
   */
  timer?: (props: { hours: string; minutes: string; seconds: string }) => ReactNode;
}

/**
 * T-Imer or we can address it as Tanjung tImer is a component that's designed to show cooldown ui
 *
 * @returns {React.JSX}
 */
const TImer = ({ expiredIn, timer, children }: Props): Readonly<ReactNode> => {
  const [cooldown, setCooldown] = useState<{
    isShow: boolean;
    number: number;
    timeout: any;
  }>({
    isShow: false,
    number: 0,
    timeout: null
  });

  const newCooldown = useMemo(() => {
    const totalSeconds = cooldown.number / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const totalMinutes = Math.floor(remainingSeconds / 60);
    const newTotalSeconds = Math.floor(remainingSeconds % 60);

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: totalMinutes.toString().padStart(2, '0'),
      seconds: newTotalSeconds.toString().padStart(2, '0')
    };
  }, [cooldown.number]);

  const onCooldown = useCallback(() => {
    const dateExpiredMilliseconds = moment(expiredIn).diff(new Date(), 'milliseconds');

    setCooldown(prev => {
      const copy = { ...prev };

      if (copy.isShow && dateExpiredMilliseconds > 0) {
        copy.number = dateExpiredMilliseconds;

        clearTimeout(copy.timeout);

        copy.timeout = setTimeout(() => {
          onCooldown();
        }, 1000);
      } else if (copy.isShow) {
        copy.number = 0;

        clearTimeout(copy.timeout);
      }

      if (!copy.isShow) {
        copy.isShow = true;

        onCooldown();
      }

      return copy;
    });
  }, [expiredIn]);

  useEffect(() => {
    return () => {
      setCooldown({ isShow: false, number: 0, timeout: null });
    };
  }, []);

  useEffect(() => {
    onCooldown();
  }, [onCooldown]);

  return (
    <Box data-testid="TImer">
      {cooldown.number > 0 && typeof timer === 'function' && timer(newCooldown)}
      {cooldown.number > 0 && !timer && (
        <Box>
          {newCooldown.hours}:{newCooldown.minutes}:{newCooldown.seconds}
        </Box>
      )}
      {cooldown.isShow && cooldown.number <= 0 && children}
    </Box>
  );
};

export default TImer;
