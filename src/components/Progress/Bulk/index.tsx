import { type ReactNode } from 'react';
import Image from 'next/image';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import BulkProgressProcessing from './components/Processing';
import type { BulkProgressProps } from './type';
import BulkProgressButtonClose from './ui/(buttons)/ButtonClose';
import BulkProgressButtonSkip from './ui/(buttons)/ButtonSkip';

/**
 * A modal that's designed for showing upload progress.
 *
 * @returns {React.JSX}
 */
const BulkProgress = ({
  isOpen,
  status,
  jobId,
  urlCheck,
  urlSkip,
  urlDetail,
  error,
  successMessage,
  onStatus
}: BulkProgressProps): Readonly<ReactNode> => {
  return (
    <Dialog disableEscapeKeyDown fullWidth maxWidth="xs" open={isOpen}>
      <DialogContent sx={{ textAlign: 'center' }}>
        {status === 'uploading' && (
          <>
            <Image alt="Loading" height={310} src="/icon/cloud-uploading.gif" width={307} />
            <Typography mt={3} fontSize={24} fontWeight={700} sx={{ color: ({ palette }) => palette.common.black }}>
              File Sedang Di Upload...
            </Typography>
            <BulkProgressButtonSkip isOpen isSubmitting urlSkip={urlSkip} />
          </>
        )}
        {status === 'failed' && (
          <>
            <Box position="relative" width="40%" ml="auto" mr="auto">
              <Image
                priority
                alt="Fail"
                src="/icon/progress-fail.svg"
                height={512}
                width={512}
                style={{ height: 'auto', width: '100%' }}
              />
            </Box>
            <Typography mt={3} fontSize={24} fontWeight={700} sx={{ color: ({ palette }) => palette.common.black }}>
              File Anda gagal terupload.
            </Typography>
            <Typography mt={3} sx={{ color: ({ palette }) => palette.common.black }}>
              {error}
            </Typography>
            <BulkProgressButtonClose isOpen onStatus={onStatus} />
          </>
        )}
        {status === 'processing' && (
          <BulkProgressProcessing
            jobId={jobId}
            urlCheck={urlCheck}
            urlSkip={urlSkip}
            urlDetail={urlDetail}
            successMessage={successMessage}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BulkProgress;
