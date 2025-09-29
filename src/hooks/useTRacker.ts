import { useCallback, useEffect, useRef } from 'react';

interface UseIdleTimerOptions {
  events?: string[];
  idleTime?: number;
  onLogout: () => void;
}

/**
 * useIdleTimer - React hook to detect user inactivity and trigger a callback after a period of idleness.
 * @param options - Configuration options for the idle timer.
 */
const useTRacker = ({
  events = ['mousemove', 'click', 'scroll', 'keydown'],
  idleTime = 900_000,
  onLogout
}: UseIdleTimerOptions): void => {
  const countdown = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onDestroy = useCallback(
    (cb: EventListenerOrEventListenerObject) => {
      events.forEach(event => {
        document.removeEventListener(event, cb);
      });
      if (countdown.current) clearTimeout(countdown.current);
    },
    [events]
  );

  const onUpdate = useCallback(() => {
    if (countdown.current) clearTimeout(countdown.current);
    countdown.current = setTimeout(() => {
      onLogout();
      onDestroy(onUpdate);
    }, idleTime);
  }, [idleTime, onDestroy, onLogout]);

  const onDetect = useCallback(() => {
    events.forEach(event => {
      document.addEventListener(event, onUpdate);
    });
  }, [events, onUpdate]);

  useEffect(() => {
    onDetect();

    return () => {
      onDestroy(onUpdate);
    };
  }, [onDetect, onDestroy, onUpdate]);
};

export default useTRacker;
