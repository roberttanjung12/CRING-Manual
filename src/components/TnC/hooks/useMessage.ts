import { useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';
import onGetTnC from '../services/getTnC';
import type { TnCIsOpen } from '../type';

interface Returns {
  isLoading: boolean;
  message: string;
}

/**
 * A hook custom that's used for managing modal of Terms and Conditional.
 *
 * @author Robert Tanjung <robert.tanjung@spesolution.com>
 *
 * @returns {Returns}
 */
const useTnCMessage = ({ isOpen }: TnCIsOpen): Readonly<Returns> => {
  const { isLoading, data } = useSWRImmutable(isOpen && '/tnc', onGetTnC);

  const message = useMemo(
    () => (data?.status !== 200 ? `<h3>Not Found</h3>` : data?.data.message),
    [data?.data.message, data?.status]
  );

  return { isLoading, message };
};

export default useTnCMessage;
