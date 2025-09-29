'use client';

import type { ReactNode } from 'react';
import moment from 'moment';
import ButtonDownload from '@/components/Elements/ButtonDownload';
import Permission from '@/context/AccessControlProvider/components/Permission';
import { useDownloadContext } from '@/context/DownloadProviderV2';
import onDownloadButton, { type DownloadButtonType } from './downloadFee';
import type { DownloadButtonProps } from './type';

/**
 * DownloadButton component provides a button for downloading files in various formats.
 *
 * @returns {React.JSX} A button wrapped in a Permission component that triggers a file download when clicked.
 *
 * @example
 * <DownloadButton
 *   name="report"
 *   endpoint="/api/download"
 *   payload={{ filter: 'all' }}
 * />
 */
const DownloadButton = ({ name, endpoint, payload }: DownloadButtonProps): Readonly<ReactNode> => {
  const { onDownload } = useDownloadContext();

  const onNewDownload = async ({ ext, mimeType }: DownloadButtonType) => {
    await onDownload({
      name: `${name}_${moment(new Date()).format('DD-MM-YYYY_HH-mm-ss')}`,
      mimeType,
      ext,
      endpoint: () => onDownloadButton(endpoint, { ...payload, download: ext, offset: 0, limit: 10000000000 })
    });
  };

  return (
    <Permission on="Download">
      <ButtonDownload
        items={[{ label: 'XLSX', onDownload: () => onNewDownload({ ext: 'xlsx', mimeType: 'text/xlsx' }) }]}
        label="Download XLSX"
        variant="outlined"
      />
    </Permission>
  );
};

export default DownloadButton;
