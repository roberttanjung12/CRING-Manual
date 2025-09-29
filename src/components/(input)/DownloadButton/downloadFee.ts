import { onPost } from '@/services';
import errorMessage from '@/utility/error-messages';

interface DownloadButtonType {
  ext: 'csv' | 'xlsx';
  mimeType: 'text/csv' | 'text/xlsx';
}

interface DownloadButtonData {
  [key: string]: any;
  download: DownloadButtonType['ext'];
}

interface DownloadButton {
  jobId: string;
}

const onDownloadButton = (endpoint: string, data: DownloadButtonData, onError?: (error: string) => void) =>
  onPost<null, DownloadButtonData, DownloadButton>(endpoint, data, {
    onError: ({ response }) => typeof onError === 'function' && onError(errorMessage(response?.data?.message))
  });

export type { DownloadButtonType, DownloadButtonData, DownloadButton };

export default onDownloadButton;
