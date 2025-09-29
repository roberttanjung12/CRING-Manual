import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value.
 *
 * @param {*} value - The value to be debounced.
 * @param {number} delay - The delay in milliseconds before updating the debounced value.
 * @returns {*} The debounced value.
 */
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
