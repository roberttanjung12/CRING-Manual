import React, { type ReactNode } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, Skeleton, Stack, Box, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ModalDetailBasicProps } from './type';

/**
 * A component that's designed for show detail modal
 *
 * @returns {React.JSX}
 */
const ModalDetailBasic = ({ isOpen, isLoading, title, list, onClose }: ModalDetailBasicProps): Readonly<ReactNode> => {
  return (
    <Dialog fullWidth data-testid="ModalDetailBasic" maxWidth="md" open={isOpen} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', columnGap: 2 }}>
        <Typography sx={{ fontSize: '16px', color: ({ palette }) => palette.grey.A100 }}>{title}</Typography>
        <Typography
          component="a"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            color: ({ palette }) => palette.info.main
          }}
          onClick={onClose}
        >
          Tutup <CloseIcon sx={{ ml: 2 }} />
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 5, px: 0 }}>
        <Stack spacing={6}>
          {list.map(item => (
            <Box key={item.label}>
              <Typography mb={2} fontWeight={600} sx={{ color: ({ palette }) => palette.grey.A200 }}>
                {item.label}
              </Typography>
              {isLoading ? (
                <Skeleton sx={{ height: '50px', width: '100%', fontSize: '14px' }} variant="rounded" />
              ) : (
                <TextField fullWidth disabled multiline value={item.value ?? '-'} />
              )}
            </Box>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetailBasic;
