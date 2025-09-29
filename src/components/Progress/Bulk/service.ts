import { onGet } from '@/services';

interface GetBulkProgress {
  done: number;
  failed: number;
  total: number;
  precentage: number;
}

const onGetBulkProgress = async (url: string, jobId: string) => await onGet<null, GetBulkProgress>(`${url}/${jobId}`);

export type { GetBulkProgress };

export default onGetBulkProgress;
