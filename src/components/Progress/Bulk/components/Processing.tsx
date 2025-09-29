import { useMemo, type ReactNode } from 'react';
import Image from 'next/image';
import { Box, Grid, Stack, Typography } from '@mui/material';
import useSWRImmutable from 'swr/immutable';
import onGetBulkProgress from '../service';
import type {
  BulkProgressJobId,
  BulkProgressSuccessMessage,
  BulkProgressUrlCheck,
  BulkProgressUrlDetail,
  BulkProgressUrlSkip
} from '../type';
import BulkProgressButtonDetail from '../ui/(buttons)/ButtonDetail';
import BulkProgressButtonSkip from '../ui/(buttons)/ButtonSkip';

interface Detail {
  percentage: number;
  total: number;
  valid: number;
  invalid: number;
}

interface Props
  extends BulkProgressJobId,
    BulkProgressUrlCheck,
    BulkProgressUrlSkip,
    BulkProgressUrlDetail,
    BulkProgressSuccessMessage {}

/**
 * A modal that's designed for showing processing of file upload.
 *
 * @returns {React.JSX}
 */
const BulkProgressProcessing = ({
  jobId,
  urlCheck,
  urlSkip,
  urlDetail,
  successMessage = 'Data invalid bisa di download pada table bulk transfer.'
}: Props): Readonly<ReactNode> => {
  const { data } = useSWRImmutable(`${urlDetail}/${jobId}`, () => onGetBulkProgress(urlCheck, jobId), {
    refreshInterval: 3000
  });

  const detail = useMemo<Detail>(() => {
    const set: Detail = {
      percentage: 0,
      total: 0,
      valid: 0,
      invalid: 0
    };

    if (data?.status === 200) {
      set.percentage = data.data.precentage;
      set.total = data.data.total;
      set.valid = data.data.done;
      set.invalid = data.data.failed;
    }

    return set;
  }, [data?.data.done, data?.data.failed, data?.data.precentage, data?.data.total, data?.status]);

  const isDone = useMemo<boolean>(
    () => detail.invalid + detail.valid === detail.total,
    [detail.invalid, detail.total, detail.valid]
  );

  return (
    <Box data-testid="BulkProgressProcessing" textAlign="center">
      <Box position="relative" width={280} mx="auto">
        {!isDone ? (
          <Image
            alt="Proggress"
            height={310}
            src="/icon/coffee-waiting.gif"
            width={307}
            style={{ height: 'auto', width: '100%' }}
          />
        ) : (
          <Image
            priority
            alt="Success"
            src="/icon/progress-success.svg"
            height={512}
            width={512}
            style={{ height: 'auto', width: '100%' }}
          />
        )}
      </Box>
      <Typography mt={3} fontSize={24} fontWeight={700} sx={{ color: ({ palette }) => palette.common.black }}>
        {!isDone ? 'File Sedang Di Proses...' : 'Bulk Upload Selesai!'}
      </Typography>
      <Stack mt={2} spacing={2}>
        <Grid container>
          <Grid size={7}>
            <Typography sx={{ color: ({ palette }) => palette.common.black }}>Total Pengajuan</Typography>
          </Grid>
          <Grid size={5}>
            <Typography sx={{ color: ({ palette }) => palette.common.black }}>{detail.total}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={7}>
            <Typography sx={{ color: ({ palette }) => palette.common.black }}>
              {!isDone ? 'Valid' : 'Berhasil'}
            </Typography>
          </Grid>
          <Grid size={5}>
            <Typography sx={{ color: ({ palette }) => palette.common.black }}>{detail.valid}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={7}>
            <Typography sx={{ color: ({ palette }) => palette.common.black }}>
              {!isDone ? 'Invalid' : 'Gagal'}
            </Typography>
          </Grid>
          <Grid size={5}>
            <Typography sx={{ color: ({ palette }) => palette.common.black }}>{detail.invalid}</Typography>
          </Grid>
        </Grid>
      </Stack>
      <Typography mt={2} sx={{ color: ({ palette }) => palette.common.black }}>
        {successMessage}
      </Typography>
      <BulkProgressButtonSkip isOpen={!isDone} urlSkip={urlSkip} />
      <BulkProgressButtonDetail isOpen={isDone} urlDetail={urlDetail} />
    </Box>
  );
};

export default BulkProgressProcessing;
