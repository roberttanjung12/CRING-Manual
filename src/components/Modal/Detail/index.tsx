import { type ReactNode, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Skeleton,
  Grid,
  DialogActions,
  Stack,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModalDetailItem from './Components/Item';
import ModalDetailShare from './Components/Share';
import type { TypeModalDetailItem, TypeModalDetailProps } from './type';

/**
 * A component that's designed for show detail modal
 *
 * @param {Object} props list of prop
 * @param {Boolean} props.isShow open dialog
 * @param {Boolean} props.isLoading waiting for requesting
 * @param {'style-1' | 'style-2'} props.mode mode of style
 * @param {String} props.title name of the dialog
 * @param {Array} props.list main content of the dialog
 * @param {[Object]} props.share action footer
 * @param {[React.JSX]} props.children action footer
 * @param {[Function]} props.onClose function that close the dialog
 *
 * @returns {React.JSX}
 */
const ModalDetail = ({
  isShow = false,
  isLoading = false,
  mode = 'style-1',
  title = 'Detail',
  list = [],
  share = undefined,
  children = undefined,
  onClose = undefined
}: TypeModalDetailProps): Readonly<ReactNode> => {
  const list1 = useMemo<Array<TypeModalDetailItem>>(() => (mode === 'style-1' ? list : []), [list, mode]);

  const list2 = useMemo<Array<{ side: 'left' | 'right'; lines: Array<TypeModalDetailItem> }>>(() => {
    const set: Array<{ side: 'left' | 'right'; lines: Array<TypeModalDetailItem> }> = [
      { side: 'left', lines: [] },
      { side: 'right', lines: [] }
    ];

    if (mode === 'style-2') {
      set[0].lines = list.filter(({ side }: TypeModalDetailItem) => side === 'left' || !side);
      set[1].lines = list.filter(({ side }: TypeModalDetailItem) => side === 'right');
    }

    return set;
  }, [list, mode]);

  const isList = useMemo(() => list1 || list2, [list1, list2]);

  const onModalClose = () => {
    if (typeof onClose === 'function') onClose();
  };

  return (
    <Dialog fullWidth data-testid="ModalDetail" maxWidth="md" open={isShow} onClose={onModalClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', columnGap: 2 }}>
        <Typography sx={{ fontSize: '16px', color: ({ palette }) => palette.grey.A100 }}>
          {isLoading ? (
            <Skeleton sx={{ width: { xs: '100px', lg: '200px' }, fontSize: '16px' }} variant="text" />
          ) : (
            title
          )}
        </Typography>
        <Box display="flex" alignItems="center" columnGap={2}>
          {share && <ModalDetailShare share={share} />}
          <Typography
            component="a"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              color: ({ palette }) => palette.info.main
            }}
            onClick={onModalClose}
          >
            Tutup <CloseIcon sx={{ ml: 2 }} />
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 5, px: 0 }}>
        {isLoading ? (
          <Grid
            size={{
              lg: 6,
              xs: 12
            }}
          >
            <Skeleton sx={{ width: { xs: '30%', lg: '25%' }, fontSize: '14px' }} variant="text" />
            <Skeleton sx={{ height: '50px', width: { xs: '100%', lg: '50%' }, fontSize: '14px' }} variant="rounded" />
          </Grid>
        ) : (
          <>
            {!isList ? (
              <Grid container spacing={6}>
                <Grid alignItems="center" display="flex" justifyContent="center" size={12}>
                  <InfoOutlinedIcon fontSize="small" sx={{ mr: 2 }} />
                  Tidak ada data yang ditemukan!
                </Grid>
              </Grid>
            ) : (
              <>
                {mode === 'style-1' && (
                  <Grid container spacing={6}>
                    {list1.map(
                      (item, itemIndex) =>
                        !item?.isHide && (
                          <Grid
                            key={item.key}
                            size={{
                              lg: item?.grid?.lg ?? 6,
                              xs: item?.grid?.xs ?? 12
                            }}
                          >
                            {!item?.isHidden && <ModalDetailItem data={item} index={itemIndex} />}
                          </Grid>
                        )
                    )}
                  </Grid>
                )}
                {mode === 'style-2' && (
                  <Grid container spacing={6}>
                    {list2.map(({ side, lines }) => (
                      <Grid
                        key={side}
                        size={{
                          lg: 6,
                          xs: 12
                        }}
                      >
                        <Stack spacing={6}>
                          {lines.map(
                            (item, itemIndex) =>
                              !item?.isHide &&
                              !item?.isHidden && (
                                <Box key={item.key}>
                                  <ModalDetailItem data={item} index={itemIndex} />
                                </Box>
                              )
                          )}
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </DialogContent>
      {children && <DialogActions>{children}</DialogActions>}
    </Dialog>
  );
};

export default ModalDetail;
