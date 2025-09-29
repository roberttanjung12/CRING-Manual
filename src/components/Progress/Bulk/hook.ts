import { useState } from 'react';
import type { BulkProgressStatusStatic, UseBulkProgress } from './type';

/**
 * A hook custom that's used for managing progress bulk.
 *
 * @returns {React.JSX}
 */
const useBulkProgress = (): Readonly<UseBulkProgress> => {
  const [status, setStatus] = useState<BulkProgressStatusStatic>('form');

  return { status, onStatus: setStatus };
};

export default useBulkProgress;
