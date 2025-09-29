import { onPost } from '@/services';
import errorMessage from '@/utility/error-messages';

interface AddDttotProviderPayload {
  name: string;
}

interface AddDttotProvider {
  isDTTOT: boolean;
  isPPSPM: boolean;
  name: string;
}

const onAddDttotProvider = (payload: AddDttotProviderPayload, onError?: (error: string) => void) =>
  onPost<any, AddDttotProviderPayload, AddDttotProvider>('/fds/monitoring/check', payload, {
    onError: ({ response }) => typeof onError === 'function' && onError(errorMessage(response?.data?.message))
  });

export type { AddDttotProviderPayload, AddDttotProvider };

export default onAddDttotProvider;
